export class ApiError extends Error {
  status: number;
  response: unknown;

  constructor(message: string, status: number, response: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

export type CreateRequestOptions = {
  apiBaseUrl?: string;
  credentials?: RequestCredentials;
};

export type RequestOptions = {
  method: 'get' | 'post' | 'put' | 'delete';
  endpoint: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

export const createRequest = (createOptions?: CreateRequestOptions) => {
  const { apiBaseUrl, credentials } = createOptions ?? {};

  return async <Result = void>(options: RequestOptions): Promise<Result> => {
    const { method, endpoint, headers, body } = options;

    const url = apiBaseUrl ? new URL(endpoint, apiBaseUrl) : endpoint;
    const response = await fetch(url, {
      method,
      headers,
      body,
      credentials,
    });

    if (!response.ok) {
      try {
        const details = await response.json();
        throw new ApiError(response.statusText, response.status, details);
      } catch {
        throw new ApiError(response.statusText, response.status, undefined);
      }
    }
    const result = await response.json();
    return result;
  };
};
