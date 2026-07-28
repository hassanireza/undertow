const STORAGE_KEY = "undertow_portal_token";

export class AuthTokenStore {
  static get(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }

  static set(token: string): void {
    localStorage.setItem(STORAGE_KEY, token);
  }

  static clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static isAuthenticated(): boolean {
    return this.get() !== null;
  }
}
