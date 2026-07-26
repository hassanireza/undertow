import { ApiClient } from "@/api/ApiClient";
import { ProjectDetail, ProjectSummary } from "@/domain/Project";

interface PaginatedResponse<T> {
  results: T[];
}

export class ProjectService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async listPublished(): Promise<ProjectSummary[]> {
    const data = await this.client.get<PaginatedResponse<Record<string, unknown>>>("/projects/");
    return data.results.map((raw) => ProjectSummary.fromApi(raw));
  }

  async getBySlug(slug: string): Promise<ProjectDetail> {
    const raw = await this.client.get<Record<string, unknown>>(`/projects/${slug}/`);
    return ProjectDetail.fromApi(raw);
  }
}
