import Image from "next/image";

const photos: Record<
  string,
  { src: string; width: number; height: number; alt: string }
> = {
  pads: {
    src: "/pads.png",
    width: 342,
    height: 316,
    alt: "תחבושות עטופות של LILA",
  },
  underwear: {
    src: "/underwear.png",
    width: 435,
    height: 348,
    alt: "תחתוני וסת של LILA",
  },
  letter: {
    src: "/card.png",
    width: 296,
    height: 370,
    alt: "מכתב לילדה מ־LILA",
  },
  case: {
    src: "/case.png",
    width: 340,
    height: 334,
    alt: "נרתיק צבעוני של LILA",
  },
};

export function ProductMark({
  slug,
  className = "",
  size = "card",
}: {
  slug: string;
  className?: string;
  size?: "card" | "hero";
}) {
  const photo = photos[slug];

  if (photo) {
    const frame =
      size === "hero"
        ? "flex min-h-64 items-center justify-center p-4"
        : "flex h-36 items-center justify-center p-3 sm:h-40";

    return (
      <span className={`mb-3 block overflow-hidden rounded-2xl bg-white/70 ${frame}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-h-full w-auto max-w-full object-contain"
          sizes="(min-width: 768px) 280px, 80vw"
        />
      </span>
    );
  }

  if (slug === "tampons") {
    return (
      <svg viewBox="0 0 120 88" className={className} aria-hidden>
        <rect x="50" y="10" width="20" height="56" rx="10" fill="#E8B7D0" />
        <rect x="54" y="16" width="12" height="36" rx="6" fill="#FDF4F8" />
        <path d="M60 66v12" stroke="#8A4A76" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 88" className={className} aria-hidden>
      <rect x="34" y="20" width="52" height="48" rx="6" fill="#6B355C" />
      <rect x="42" y="30" width="36" height="6" rx="3" fill="#F3D4E4" />
      <rect x="42" y="42" width="24" height="5" rx="2" fill="#E8B7D0" />
    </svg>
  );
}
