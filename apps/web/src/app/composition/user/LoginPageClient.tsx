"use client";

import { useMemo } from "react";
import { BrowserSessionStorage } from "@core/features/auth/infrastructure";
import { LoginPageControllerProvider } from "@core/features/auth/presentation/LoginPageController";
import { LoginPageView } from "@core/features/auth/presentation/LoginPageView";
import type {
  LoginAuthenticationInput,
  LoginAuthenticationResult,
  LoginPageContent
} from "@core/features/auth/presentation/LoginPageModel";

type LoginPageClientProps = {
  content: LoginPageContent;
  authenticate(input: LoginAuthenticationInput): Promise<LoginAuthenticationResult>;
};

export function LoginPageClient({
  content,
  authenticate
}: LoginPageClientProps) {
  const sessionStorage = useMemo(() => new BrowserSessionStorage(), []);

  return (
    <LoginPageControllerProvider
      authenticate={authenticate}
      persistSession={(session) => sessionStorage.saveSnapshot(session)}
    >
      <LoginPageView content={content} />
    </LoginPageControllerProvider>
  );
}
