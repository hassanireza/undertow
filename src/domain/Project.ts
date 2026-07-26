import { Category } from "@/domain/Category";
import { Media } from "@/domain/Media";

export interface ProjectSummaryProps {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly category: Category | null;
  readonly coverMedia: Media | null;
  readonly clientName: string;
}

export class ProjectSummary {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly category: Category | null;
  readonly coverMedia: Media | null;
  readonly clientName: string;

  constructor(props: ProjectSummaryProps) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.summary = props.summary;
    this.category = props.category;
    this.coverMedia = props.coverMedia;
    this.clientName = props.clientName;
  }

  static fromApi(raw: Readonly<Record<string, unknown>>): ProjectSummary {
    const category = raw["category"];
    const coverMedia = raw["cover_media"];
    return new ProjectSummary({
      id: raw["id"] as number,
      title: raw["title"] as string,
      slug: raw["slug"] as string,
      summary: (raw["summary"] as string) ?? "",
      category: category ? Category.fromApi(category as Record<string, unknown>) : null,
      coverMedia: coverMedia ? Media.fromApi(coverMedia as Record<string, unknown>) : null,
      clientName: (raw["client_name"] as string) ?? "",
    });
  }
}

export class ProjectDetail extends ProjectSummary {
  readonly body: string;
  readonly gallery: readonly Media[];
  readonly createdAt: Date;

  constructor(props: ProjectSummaryProps & { body: string; gallery: readonly Media[]; createdAt: Date }) {
    super(props);
    this.body = props.body;
    this.gallery = props.gallery;
    this.createdAt = props.createdAt;
  }

  static override fromApi(raw: Readonly<Record<string, unknown>>): ProjectDetail {
    const summary = ProjectSummary.fromApi(raw);
    const gallery = ((raw["gallery"] as Record<string, unknown>[]) ?? []).map((m) => Media.fromApi(m));
    return new ProjectDetail({
      ...summary,
      body: (raw["body"] as string) ?? "",
      gallery,
      createdAt: new Date(raw["created_at"] as string),
    });
  }
}
