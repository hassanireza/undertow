export class ServiceOffering {
  constructor(
    readonly title: string,
    readonly description: string,
  ) {}
}

export class PricingPlan {
  constructor(
    readonly name: string,
    readonly price: string,
    readonly features: readonly string[],
    readonly featured: boolean = false,
  ) {}
}

export const SERVICES: readonly ServiceOffering[] = [
  new ServiceOffering(
    "Web Design",
    "Interfaces built around one clear hierarchy, considered type, and motion that earns its place.",
  ),
  new ServiceOffering(
    "Motion Graphics",
    "Frame-by-frame animation and title sequences for brand film, product launches, and gallery work.",
  ),
  new ServiceOffering(
    "Art Direction",
    "One point of view, carried across your site, your film, and everything printed or projected around it.",
  ),
];

export const PLANS: readonly PricingPlan[] = [
  new PricingPlan("Starter", "From $1,200", [
    "Single-page site",
    "Fully responsive build",
    "Light motion polish",
    "Delivered in two weeks",
  ]),
  new PricingPlan(
    "Studio",
    "From $4,500",
    ["Multi-page site", "Custom art direction", "One motion sequence included", "Client review portal"],
    true,
  ),
  new PricingPlan("Premium", "Custom scope", [
    "Full brand and site system",
    "Bespoke animation work",
    "Ongoing art direction",
    "Priority turnaround",
  ]),
];
