"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type {
  LoginAuthenticationInput,
  LoginAuthenticationResult
} from "./LoginPageModel";

type LoginStatus = "idle" | "loading" | "success" | "error";

type LoginToastMessage = {
  message: string;
};

type LoginPageControllerValue = {
  username: string;
  password: string;
  status: LoginStatus;
  message: string;
  toast: LoginToastMessage | null;
  setUsername(username: string): void;
  setPassword(password: string): void;
  submitAuthentication(mode: LoginAuthenticationInput["mode"]): Promise<void>;
};

type LoginPageControllerProviderProps = {
  authenticate(input: LoginAuthenticationInput): Promise<LoginAuthenticationResult>;
  persistSession(session: LoginAuthenticationResult): void;
  children: ReactNode;
};

const LoginPageControllerContext =
  createContext<LoginPageControllerValue | null>(null);

export function LoginPageControllerProvider({
  authenticate,
  persistSession,
  children
}: LoginPageControllerProviderProps) {
  const [username, setUsername] = useState("fikret");
  const [password, setPassword] = useState("fikret");
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<LoginToastMessage | null>(null);

  const value = useMemo<LoginPageControllerValue>(
    () => ({
      username,
      password,
      status,
      message,
      toast,
      setUsername,
      setPassword,
      async submitAuthentication(mode) {
        setStatus("loading");
        setMessage("");
        setToast(null);

        try {
          const session = await authenticate({
            mode,
            username,
            password
          });

          persistSession(session);
          setStatus("success");
          setMessage(`Token kaydedildi: ${session.token}`);
          setToast({ message: `${session.username} icin oturum acildi.` });
        } catch (error) {
          setStatus("error");
          setMessage(
            error instanceof Error ? error.message : "Beklenmeyen hata."
          );
        }
      }
    }),
    [authenticate, message, password, persistSession, status, toast, username]
  );

  return (
    <LoginPageControllerContext.Provider value={value}>
      {children}
    </LoginPageControllerContext.Provider>
  );
}

export function useLoginPageController(): LoginPageControllerValue {
  const context = useContext(LoginPageControllerContext);

  if (!context) {
    throw new Error(
      "useLoginPageController must be used inside LoginPageControllerProvider."
    );
  }

  return context;
}
