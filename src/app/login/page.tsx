import type { Metadata } from "next";
import { LoginPageContainer } from "@/app/composition/user/LoginPageContainer";
import { createLoginPageComposition } from "@/app/composition/user/loginComposition";

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
