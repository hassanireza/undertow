export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "chevron-down"
  | "close"
  | "menu"
  | "mail"
  | "phone"
  | "location"
  | "calendar"
  | "download"
  | "linkedin"
  | "play"
  | "quote"
  | "plus"
  | "minus"
  | "external-link";

export const ICON_PATHS: Record<IconName, string> = {
  "arrow-right": `<path d="M4 12h16M14 6l6 6-6 6"/>`,
  "arrow-up-right": `<path d="M7 17 17 7M9 7h8v8"/>`,
  "chevron-down": `<path d="M5 8.5 12 15l7-6.5"/>`,
  "close": `<path d="M6 6l12 12M18 6 6 18"/>`,
  "menu": `<path d="M4 7h16M4 12h16M4 17h16"/>`,
  "mail": `<path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/>`,
  "phone": `<path d="M6 4c1 3 2 5 4 7s4 3 7 4l2-3c0-1-1-2-2-2l-3 1c-2-1-3.5-2.5-4.5-4.5l1-3c0-1-1-2-2-2H6z"/>`,
  "location": `<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>`,
  "calendar": `<rect x="4" y="5.5" width="16" height="14" rx="1"/><path d="M4 10h16M8 3.5v3M16 3.5v3"/>`,
  "download": `<path d="M12 4v11M7.5 11 12 15.5 16.5 11"/><path d="M5 19h14"/>`,
  "linkedin": `<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M8 10.5v6M8 7.8v.1"/><path d="M11.5 16.5v-3.6c0-1.3.9-2.2 2-2.2s1.8.9 1.8 2.2v3.6M11.5 10.5v6"/>`,
  "play": `<path d="M8 5.5 19 12 8 18.5z"/>`,
  "quote": `<path d="M5 9c0-2.2 1.8-4 4-4v3c-1 0-1.5.6-1.5 1.5H9v4H5z"/><path d="M14 9c0-2.2 1.8-4 4-4v3c-1 0-1.5.6-1.5 1.5H18v4h-4z"/>`,
  "plus": `<path d="M12 5v14M5 12h14"/>`,
  "minus": `<path d="M5 12h14"/>`,
  "external-link": `<path d="M9 6H5v13h13v-4"/><path d="M14 5h5v5M19 5l-8 8"/>`,
};
