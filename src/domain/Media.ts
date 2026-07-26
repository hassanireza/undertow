import { AppConfig } from "@/config/env";

export type MediaType = "image" | "video";

export interface MediaProps {
  readonly id: number;
  readonly file: string;
  readonly mediaType: MediaType;
  readonly altText: string;
}

export class Media {
  readonly id: number;
  readonly url: string;
  readonly mediaType: MediaType;
  readonly altText: string;

  constructor(props: MediaProps) {
    this.id = props.id;
    this.url = Media.resolveUrl(props.file);
    this.mediaType = props.mediaType;
    this.altText = props.altText;
  }

  private static resolveUrl(file: string): string {
    if (/^https?:\/\//.test(file)) return file;
    const origin = new URL(AppConfig.getInstance().apiBaseUrl).origin;
    return `${origin}${file.startsWith("/") ? "" : "/"}${file}`;
  }

  get isVideo(): boolean {
    return this.mediaType === "video";
  }

  static fromApi(raw: Readonly<Record<string, unknown>>): Media {
    return new Media({
      id: raw["id"] as number,
      file: raw["file"] as string,
      mediaType: raw["media_type"] as MediaType,
      altText: (raw["alt_text"] as string) ?? "",
    });
  }
}
