import { AppConfig } from "@/config/env";
import { ApiError } from "@/api/ApiError";

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = AppConfig.getInstance().apiBaseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "GET" });
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, init);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new ApiError(`Request to ${path} failed with ${response.status}`, response.status, body);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}
