const STORAGE_KEY = "undertow_portal_token";
const EMAIL_KEY = "undertow_portal_email";

export class AuthTokenStore {
  static get(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }

  static set(token: string, email?: string): void {
    localStorage.setItem(STORAGE_KEY, token);
    if (email) localStorage.setItem(EMAIL_KEY, email);
  }

  static getEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY);
  }

  static clear(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }

  static isAuthenticated(): boolean {
    return this.get() !== null;
  }
}
