"use client";

import { useEffect, useMemo, useState } from "react";
import { LoginUserUseCase, RegisterUserUseCase } from "../application";
import {
  ApiAuthRepository,
  BrowserSessionStorage,
  createAuthApiClient
} from "../infrastructure";
import { clientEventBus } from "@/shared/events/clientEventBus";
import { AuthToastSubscriber } from "@/features/notification/application";
import type { ToastMessage } from "@/features/notification/domain";

export function LoginPageView() {
  const [username, setUsername] = useState("fikret");
  const [password, setPassword] = useState("fikret");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const services = useMemo(() => {
    const repository = new ApiAuthRepository(createAuthApiClient());

    return {
      loginUser: new LoginUserUseCase(repository, clientEventBus),
      registerUser: new RegisterUserUseCase(repository, clientEventBus),
      sessionStorage: new BrowserSessionStorage()
    };
  }, []);

  useEffect(() => {
    const subscriber = new AuthToastSubscriber(clientEventBus, setToast);

    return subscriber.subscribe();
  }, []);

  async function authenticate(mode: "login" | "register") {
    setStatus("loading");
    setMessage("");

    try {
      const session =
        mode === "login"
          ? await services.loginUser.execute({ username, password })
          : await services.registerUser.execute({ username, password });

      services.sessionStorage.save(session);
      setStatus("success");
      setMessage(`Token kaydedildi: ${session.token.value()}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Beklenmeyen hata.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-sm">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Kullanici adi ve sifre: fikret / fikret
        </p>
        <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <label className="block text-sm">
            Kullanici adi
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </label>
          <label className="block text-sm">
            Sifre
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
          <div className="flex gap-2">
            <button
              className="rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:bg-zinc-400"
              disabled={status === "loading"}
              onClick={() => authenticate("login")}
              type="button"
            >
              Login
            </button>
            <button
              className="rounded border border-zinc-300 px-4 py-2 text-sm font-medium disabled:text-zinc-400"
              disabled={status === "loading"}
              onClick={() => authenticate("register")}
              type="button"
            >
              Register
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`mt-4 text-sm ${
              status === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {message}
          </p>
        )}
        {toast && (
          <div className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            {toast.message}
          </div>
        )}
      </section>
    </main>
  );
}

