export interface PackageFeatureProps {
  readonly id: number;
  readonly text: string;
}

export class PackageFeature {
  readonly id: number;
  readonly text: string;

  constructor(props: PackageFeatureProps) {
    this.id = props.id;
    this.text = props.text;
  }

  static fromApi(raw: Readonly<Record<string, unknown>>): PackageFeature {
    return new PackageFeature({ id: raw["id"] as number, text: raw["text"] as string });
  }
}

export interface PackageProps {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly tagline: string;
  readonly priceDisplay: string;
  readonly isFeatured: boolean;
  readonly features: readonly PackageFeature[];
}

export class Package {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly tagline: string;
  readonly priceDisplay: string;
  readonly isFeatured: boolean;
  readonly features: readonly PackageFeature[];

  constructor(props: PackageProps) {
    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.tagline = props.tagline;
    this.priceDisplay = props.priceDisplay;
    this.isFeatured = props.isFeatured;
    this.features = props.features;
  }

  static fromApi(raw: Readonly<Record<string, unknown>>): Package {
    const features = ((raw["features"] as Record<string, unknown>[]) ?? []).map((f) =>
      PackageFeature.fromApi(f),
    );
    return new Package({
      id: raw["id"] as number,
      name: raw["name"] as string,
      slug: raw["slug"] as string,
      tagline: (raw["tagline"] as string) ?? "",
      priceDisplay: raw["price_display"] as string,
      isFeatured: Boolean(raw["is_featured"]),
      features,
    });
  }
}
