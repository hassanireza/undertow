import type { ServiceArtVariant } from "@/components/ServiceArt/ServiceArt";

export class ServiceOffering {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly artVariant: ServiceArtVariant,
  ) {}
}

export const SERVICES: readonly ServiceOffering[] = [
  new ServiceOffering(
    "Web Design",
    "Interfaces built around one clear hierarchy, considered type, and motion that earns its place.",
    "web-design",
  ),
  new ServiceOffering(
    "Motion Graphics",
    "Frame-by-frame animation and title sequences for brand film, product launches, and gallery work.",
    "motion-graphics",
  ),
  new ServiceOffering(
    "Art Direction",
    "One point of view, carried across your site, your film, and everything printed or projected around it.",
    "art-direction",
  ),
];
