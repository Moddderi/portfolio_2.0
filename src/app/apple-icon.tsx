import { renderBrandIcon } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so keep the artwork square.
export default function AppleIcon() {
  return renderBrandIcon(180, false);
}
