import type {
  AuthApiClientPort,
  AuthApiPath,
  AuthApiRequest,
  AuthApiResponse
} from "../AuthApiClient";

type AxiosLikeClient = {
  post<TResponse>(path: string, body: unknown): Promise<{ data: TResponse }>;
};

export class AuthAxiosApiClient implements AuthApiClientPort {
  constructor(private readonly axiosClient: AxiosLikeClient) {}

  async post(
    path: AuthApiPath,
    body: AuthApiRequest
  ): Promise<AuthApiResponse> {
    const response = await this.axiosClient.post<AuthApiResponse>(path, body);

    return response.data;
  }
}
