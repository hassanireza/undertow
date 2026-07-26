export class Category {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly slug: string,
  ) {}

  static fromApi(raw: Readonly<Record<string, unknown>>): Category {
    return new Category(raw["id"] as number, raw["name"] as string, raw["slug"] as string);
  }
}
