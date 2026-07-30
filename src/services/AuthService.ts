import { ApiClient } from "@/api/ApiClient";
import { AuthTokenStore } from "@/auth/AuthTokenStore";

export class AuthService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async register(email: string, password: string): Promise<void> {
    await this.client.post<Record<string, unknown>>("/auth/register/", { email, password });
  }

  async login(email: string, password: string): Promise<void> {
    const raw = await this.client.post<Record<string, unknown>>("/auth/login/", { email, password });
    AuthTokenStore.set(raw["token"] as string, raw["email"] as string);
  }

  async acceptInvite(token: string, password: string): Promise<void> {
    const raw = await this.client.post<Record<string, unknown>>("/auth/accept-invite/", { token, password });
    AuthTokenStore.set(raw["token"] as string, raw["email"] as string);
  }

  logout(): void {
    AuthTokenStore.clear();
  }

  isAuthenticated(): boolean {
    return AuthTokenStore.isAuthenticated();
  }

  currentEmail(): string | null {
    return AuthTokenStore.getEmail();
  }
}
