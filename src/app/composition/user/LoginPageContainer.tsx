import { authenticateUser } from "./loginActions";
import { LoginPageClient } from "./LoginPageClient";
import { createLoginPageComposition } from "./loginComposition";

export function LoginPageContainer() {
  const composition = createLoginPageComposition();

  return (
    <LoginPageClient
      authenticate={authenticateUser}
      content={composition.content}
    />
  );
}
