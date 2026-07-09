import type { Metadata } from "next";
import { LoginPageContainer } from "@/composition/auth/LoginPageContainer";
import { createLoginPageComposition } from "@/composition/auth/loginComposition";

export function generateMetadata(): Metadata {
  const { content } = createLoginPageComposition();

  return {
    title: `${content.title} | ${content.projectName}`,
    description: content.description
  };
}

export default function LoginPage() {
  return <LoginPageContainer />;
}
