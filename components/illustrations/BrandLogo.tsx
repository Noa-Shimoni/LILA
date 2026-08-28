import Image from "next/image";
import { brand } from "@/content/site";

export function BrandLogo({
  className = "",
  decorative = false,
  priority = false,
}: {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={decorative ? "" : brand.name}
      width={318}
      height={192}
      priority={priority}
      className={`h-10 w-auto sm:h-11 ${className}`}
    />
  );
}
