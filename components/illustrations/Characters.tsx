import Image from "next/image";

const art = {
  "girl-kit": {
    src: "/illustrations/girl-kit.png",
    width: 337,
    height: 1000,
    alt: "איור של ילדה עם שיער כהה, מחזיקה את קופסת LILA",
  },
  together: {
    src: "/illustrations/together.png",
    width: 521,
    height: 1000,
    alt: "איור של אם ובת הולכות יד ביד, והבת מחזיקה את קופסת LILA",
  },
  hug: {
    src: "/illustrations/hug.png",
    width: 900,
    height: 900,
    alt: "איור של אם מחבקת את בתה, וזר לבנדר ביניהן",
  },
  "girl-book": {
    src: "/illustrations/girl-book.png",
    width: 410,
    height: 640,
    alt: "איור של ילדה מחזיקה ספר",
  },
  growing: {
    src: "/illustrations/growing.png",
    width: 990,
    height: 700,
    alt: "שלושה איורים של אותה ילדה: עם ספר, עם קופסת LILA, ובבגדי יום-יום",
  },
  reading: {
    src: "/illustrations/reading.png",
    width: 400,
    height: 400,
    alt: "איור של אם ובת קוראות יחד",
  },
  bouquet: {
    src: "/illustrations/bouquet.png",
    width: 290,
    height: 400,
    alt: "",
  },
  garland: {
    src: "/illustrations/garland.png",
    width: 550,
    height: 150,
    alt: "",
  },
} as const;

export type CharacterName = keyof typeof art;

export function Character({
  name,
  className = "",
  priority = false,
  decorative = false,
}: {
  name: CharacterName;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const item = art[name];
  const alt = decorative ? "" : item.alt;

  return (
    <Image
      src={item.src}
      alt={alt}
      width={item.width}
      height={item.height}
      priority={priority}
      sizes={
        name === "growing" || name === "garland"
          ? "(min-width: 768px) 768px, 100vw"
          : "(min-width: 1024px) 420px, 70vw"
      }
      className={`max-w-full object-contain ${className}`}
      aria-hidden={decorative || alt === "" ? true : undefined}
    />
  );
}

export function Garland({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden>
      <Character name="garland" decorative className="h-14 w-auto sm:h-20" />
    </div>
  );
}
