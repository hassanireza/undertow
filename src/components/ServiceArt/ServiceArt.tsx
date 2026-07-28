import type { ReactElement } from "react";

import { ArtDirectionArt } from "./ArtDirectionArt";
import { MotionGraphicsArt } from "./MotionGraphicsArt";
import { WebDesignArt } from "./WebDesignArt";

export type ServiceArtVariant = "web-design" | "motion-graphics" | "art-direction";

interface ServiceArtProps {
  variant: ServiceArtVariant;
}

export function ServiceArt({ variant }: ServiceArtProps): ReactElement {
  switch (variant) {
    case "web-design":
      return <WebDesignArt />;
    case "motion-graphics":
      return <MotionGraphicsArt />;
    case "art-direction":
      return <ArtDirectionArt />;
  }
}
