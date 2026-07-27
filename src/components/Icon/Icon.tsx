import type { ReactElement } from "react";

import { ICON_PATHS, type IconName } from "./icons";

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string | undefined;
  title?: string;
}

export function Icon({ name, size = 20, strokeWidth = 1.6, className, title }: IconProps): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{
        __html: (title ? `<title>${title}</title>` : "") + ICON_PATHS[name],
      }}
    />
  );
}
