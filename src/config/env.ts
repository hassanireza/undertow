export class AppConfig {
  private static instance: AppConfig | null = null;

  private constructor(public readonly apiBaseUrl: string) {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      const apiBaseUrl = import.meta.env["VITE_API_BASE_URL"] as string | undefined;
      if (!apiBaseUrl) {
        throw new Error("VITE_API_BASE_URL is not set. Copy .env.example to .env.local.");
      }
      AppConfig.instance = new AppConfig(apiBaseUrl);
    }
    return AppConfig.instance;
  }
}
