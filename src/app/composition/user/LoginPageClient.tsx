"use client";

import { useMemo } from "react";
import { BrowserSessionStorage } from "@/features/auth/infrastructure";
import { LoginPageView } from "@/features/auth/presentation/LoginPageView";
import type {
  LoginAuthenticationInput,
  LoginAuthenticationResult,
  LoginPageContent
} from "@/features/auth/presentation/LoginPageModel";

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
    <LoginPageView
      authenticate={authenticate}
      content={content}
      persistSession={(session) => sessionStorage.saveSnapshot(session)}
    />
  );
}
