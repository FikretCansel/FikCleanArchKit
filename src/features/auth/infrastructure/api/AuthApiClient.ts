export type AuthApiResponse = {
  user: {
    username: string;
    displayName: string;
  };
  token: string;
};

export type AuthApiPath = "/user/login" | "/user/register";

export type AuthApiRequest = {
  username: string;
  password: string;
};

export interface AuthApiClientPort {
  post(path: AuthApiPath, body: AuthApiRequest): Promise<AuthApiResponse>;
}
