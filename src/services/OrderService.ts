import { ApiClient } from "@/api/ApiClient";

export interface OrderPayload {
  packageSlug: string;
  clientName: string;
  clientEmail: string;
}

export interface CheckoutResult {
  orderId: number;
  mode: "demo" | "stripe";
  checkoutUrl: string | null;
}

export class OrderService {
  constructor(private readonly client: ApiClient = new ApiClient()) {}

  async submit(payload: OrderPayload): Promise<CheckoutResult> {
    const raw = await this.client.post<Record<string, unknown>>("/orders/", {
      package_slug: payload.packageSlug,
      client_name: payload.clientName,
      client_email: payload.clientEmail,
    });
    return {
      orderId: raw["order_id"] as number,
      mode: raw["mode"] as "demo" | "stripe",
      checkoutUrl: (raw["checkout_url"] as string) ?? null,
    };
  }
}
