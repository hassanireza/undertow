import { AppConfig } from "@/config/env";
import { ApiError } from "@/api/ApiError";
import { AuthTokenStore } from "@/auth/AuthTokenStore";

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

  async postForm<T>(path: string, form: FormData): Promise<T> {
    return this.request<T>(path, { method: "POST", body: form });
  }

  private authHeaders(path: string): Record<string, string> {
    const needsAuth = path.startsWith("/portal/") || path.startsWith("/orders/");
    if (!needsAuth) return {};
    const token = AuthTokenStore.get();
    return token ? { Authorization: `Token ${token}` } : {};
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const headers = { ...(init.headers ?? {}), ...this.authHeaders(path) };
    const response = await fetch(`${this.baseUrl}${path}`, { ...init, headers });

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
