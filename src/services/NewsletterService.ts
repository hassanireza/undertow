import { ApiClient } from "@/api/ApiClient";

export class NewsletterService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async subscribe(email: string): Promise<void> {
    await this.client.post<void>("/newsletter/subscribers/", { email });
  }
}
