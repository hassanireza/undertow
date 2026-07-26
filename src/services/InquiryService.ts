import { ApiClient } from "@/api/ApiClient";

export interface InquiryPayload {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
}

export class InquiryService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async submit(payload: InquiryPayload): Promise<void> {
    await this.client.post<void>("/inquiries/", {
      name: payload.name,
      email: payload.email,
      project_type: payload.projectType,
      budget_range: payload.budgetRange,
      message: payload.message,
    });
  }
}
