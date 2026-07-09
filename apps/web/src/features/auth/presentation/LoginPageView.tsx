"use client";

import { Button } from "@/components/buttons";
import { useLoginPageController } from "./LoginPageController";
import type { LoginPageContent } from "./LoginPageViewModel";

type LoginPageViewProps = {
  content: LoginPageContent;
};

export function LoginPageView({ content }: LoginPageViewProps) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-sm">
        <p className="text-sm font-medium text-zinc-500">{content.projectName}</p>
        <h1 className="mt-1 text-2xl font-semibold">{content.title}</h1>
        <p className="mt-2 text-sm text-zinc-600">
          {content.description}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          {content.credentialsHint}
        </p>
        <LoginForm />
      </section>
    </main>
  );
}

function LoginForm() {
  return (
    <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
      <LoginCredentialsFields />
      <LoginActionButtons />
      <LoginFeedback />
    </form>
  );
}

function LoginCredentialsFields() {
  const { password, setPassword, setUsername, username } =
    useLoginPageController();

  return (
    <>
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
    </>
  );
}

function LoginActionButtons() {
  const { status, submitAuthentication } = useLoginPageController();
  const isLoading = status === "loading";

  return (
    <div className="flex gap-2">
      <Button
        disabled={isLoading}
        onClick={() => submitAuthentication("login")}
        variant="danger"
      >
        Login
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => submitAuthentication("register")}
        variant="secondary"
      >
        Register
      </Button>
    </div>
  );
}

function LoginFeedback() {
  const { message, status, toast } = useLoginPageController();

  return (
    <>
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
    </>
  );
}
