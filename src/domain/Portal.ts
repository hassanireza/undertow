import { Media } from "@/domain/Media";
import { Package } from "@/domain/Package";

export class Comment {
  constructor(
    readonly id: number,
    readonly authorEmail: string,
    readonly body: string,
    readonly createdAt: Date,
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): Comment {
    return new Comment(
      raw["id"] as number,
      raw["author_email"] as string,
      raw["body"] as string,
      new Date(raw["created_at"] as string),
    );
  }
}

export type ApprovalStatus = "pending" | "approved" | "revision_requested";

export class Approval {
  constructor(
    readonly status: ApprovalStatus,
    readonly decidedAt: Date | null,
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>> | null): Approval {
    if (!raw) return new Approval("pending", null);
    return new Approval(
      raw["status"] as ApprovalStatus,
      raw["decided_at"] ? new Date(raw["decided_at"] as string) : null,
    );
  }
}

export class DeliverableVersion {
  constructor(
    readonly id: number,
    readonly fileUrl: string,
    readonly versionNumber: number,
    readonly uploadedAt: Date,
    readonly comments: readonly Comment[],
    readonly approval: Approval,
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): DeliverableVersion {
    const comments = ((raw["comments"] as Record<string, unknown>[]) ?? []).map((c) => Comment.fromApi(c));
    return new DeliverableVersion(
      raw["id"] as number,
      Media.resolveStandaloneUrl(raw["file"] as string),
      raw["version_number"] as number,
      new Date(raw["uploaded_at"] as string),
      comments,
      Approval.fromApi((raw["approval"] as Record<string, unknown>) ?? null),
    );
  }
}

export class Deliverable {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly versions: readonly DeliverableVersion[],
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): Deliverable {
    const versions = ((raw["versions"] as Record<string, unknown>[]) ?? []).map((v) =>
      DeliverableVersion.fromApi(v),
    );
    return new Deliverable(raw["id"] as number, raw["title"] as string, versions);
  }
}

export class PortalMessage {
  constructor(
    readonly id: number,
    readonly authorEmail: string,
    readonly body: string,
    readonly createdAt: Date,
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): PortalMessage {
    return new PortalMessage(
      raw["id"] as number,
      raw["author_email"] as string,
      raw["body"] as string,
      new Date(raw["created_at"] as string),
    );
  }
}

export class ClientUpload {
  constructor(
    readonly id: number,
    readonly fileUrl: string,
    readonly note: string,
    readonly createdAt: Date,
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): ClientUpload {
    return new ClientUpload(
      raw["id"] as number,
      Media.resolveStandaloneUrl(raw["file"] as string),
      (raw["note"] as string) ?? "",
      new Date(raw["created_at"] as string),
    );
  }
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "demo_paid"
  | "in_progress"
  | "delivered"
  | "cancelled";

export class PortalOrder {
  constructor(
    readonly id: number,
    readonly status: OrderStatus,
    readonly createdAt: Date,
    readonly pkg: Package | null,
    readonly deliverables: readonly Deliverable[],
    readonly messages: readonly PortalMessage[],
    readonly clientUploads: readonly ClientUpload[],
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): PortalOrder {
    const pkgRaw = raw["package"] as Record<string, unknown> | null;
    const deliverables = ((raw["deliverables"] as Record<string, unknown>[]) ?? []).map((d) =>
      Deliverable.fromApi(d),
    );
    const messages = ((raw["messages"] as Record<string, unknown>[]) ?? []).map((m) => PortalMessage.fromApi(m));
    const clientUploads = ((raw["client_uploads"] as Record<string, unknown>[]) ?? []).map((u) =>
      ClientUpload.fromApi(u),
    );
    return new PortalOrder(
      raw["id"] as number,
      raw["status"] as OrderStatus,
      new Date(raw["created_at"] as string),
      pkgRaw ? Package.fromApi(pkgRaw) : null,
      deliverables,
      messages,
      clientUploads,
    );
  }
}
