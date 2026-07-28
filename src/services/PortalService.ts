import { ApiClient } from "@/api/ApiClient";
import { Comment, PortalMessage, PortalOrder } from "@/domain/Portal";

interface PaginatedResponse<T> {
  results: T[];
}

export class PortalService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async listOrders(): Promise<PortalOrder[]> {
    const data = await this.client.get<PaginatedResponse<Record<string, unknown>>>("/portal/orders/");
    return data.results.map((raw) => PortalOrder.fromApi(raw));
  }

  async getOrder(orderId: number): Promise<PortalOrder> {
    const raw = await this.client.get<Record<string, unknown>>(`/portal/orders/${orderId}/`);
    return PortalOrder.fromApi(raw);
  }

  async postMessage(orderId: number, body: string): Promise<PortalMessage> {
    const raw = await this.client.post<Record<string, unknown>>(`/portal/orders/${orderId}/messages/`, { body });
    return PortalMessage.fromApi(raw);
  }

  async uploadFile(orderId: number, file: File, note: string): Promise<void> {
    const form = new FormData();
    form.append("file", file);
    form.append("note", note);
    await this.client.postForm(`/portal/orders/${orderId}/uploads/`, form);
  }

  async postComment(versionId: number, body: string): Promise<Comment> {
    const raw = await this.client.post<Record<string, unknown>>(
      `/portal/deliverable-versions/${versionId}/comments/`,
      { body },
    );
    return Comment.fromApi(raw);
  }

  async decideApproval(versionId: number, status: "approved" | "revision_requested"): Promise<void> {
    await this.client.post(`/portal/deliverable-versions/${versionId}/approval/`, { status });
  }
}
