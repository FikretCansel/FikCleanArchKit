"use server";

import { headers } from "next/headers";
import type {
  LoginAuthenticationInput,
  LoginAuthenticationResult
} from "@/features/auth/presentation/LoginPageModel";
import { createLoginApplicationComposition } from "./loginComposition";

export async function authenticateUser(
  input: LoginAuthenticationInput
): Promise<LoginAuthenticationResult> {
  const services = createLoginApplicationComposition({
    baseUrl: await getRequestBaseUrl()
  });

  const session =
    input.mode === "login"
      ? await services.loginUser.execute(input)
      : await services.registerUser.execute(input);

  return {
    username: session.user.value(),
    token: session.token.value()
  };
}

async function getRequestBaseUrl(): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return "http://localhost:3000";
  }

  return `${protocol}://${host}`;
}
