import { ApiClient } from "@/api/ApiClient";
import { Package } from "@/domain/Package";

interface PaginatedResponse<T> {
  results: T[];
}

export class PackageService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async listPackages(): Promise<Package[]> {
    const data = await this.client.get<PaginatedResponse<Record<string, unknown>>>("/packages/");
    return data.results.map((raw) => Package.fromApi(raw));
  }

  async getBySlug(slug: string): Promise<Package> {
    const raw = await this.client.get<Record<string, unknown>>(`/packages/${slug}/`);
    return Package.fromApi(raw);
  }
}
