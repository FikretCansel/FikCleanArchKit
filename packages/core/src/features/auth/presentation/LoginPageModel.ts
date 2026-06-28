export type LoginPageContent = {
  projectName: string;
  title: string;
  description: string;
  credentialsHint: string;
};

export type LoginAuthenticationInput = {
  mode: "login" | "register";
  username: string;
  password: string;
};

export type LoginAuthenticationResult = {
  username: string;
  token: string;
};
