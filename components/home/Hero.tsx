import Image from "next/image";
import { Character } from "@/components/illustrations/Characters";
import { Blob, Daisy, Flower, Spark } from "@/components/illustrations/Motifs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-8 pt-6 sm:pb-16 sm:pt-12">
      <Blob className="pointer-events-none absolute -left-16 top-8 h-56 w-56 opacity-80" color="#E8D0D6" />
      <Blob className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 opacity-70" color="#D9D1EA" />
      <Container className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
        <div className="relative z-10">
          <p className="text-sm font-medium text-rose">LILA · מלוות ילדות והורים</p>
          <h1 className="mt-4 max-w-xl text-balance font-serif text-[2.15rem] font-medium leading-[1.25] tracking-tight text-ink sm:text-5xl">
            גדלות יחד. מכירות את הגוף. מתכוננות לשינויים.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            LILA מלווה ילדות והורים במסע ההתבגרות, עם מוצרים, ידע וכלים שמעניקים ביטחון לקראת
            הווסת הראשונה ולאורך הדרך.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#world" trackId="hero-world" className="w-full sm:w-auto">
              לגלות את העולם של LILA
            </Button>
            <Button href="#products" variant="secondary" trackId="hero-kits" className="w-full sm:w-auto">
              להכיר את הערכות שלנו
            </Button>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-2xl items-end">
          <Flower className="absolute end-1 top-2 z-20 h-14 w-14 sm:h-16 sm:w-16" />
          <Spark className="absolute start-1/3 top-6 z-20 h-8 w-8" />
          <Daisy className="absolute -bottom-4 end-6 z-20 h-12 w-12" />
          <Character
            name="girl-kit"
            priority
            className="relative z-10 h-64 w-auto shrink-0 sm:h-80 lg:h-[30rem]"
          />
          <div className="relative z-0 -ms-8 min-w-0 flex-1 overflow-hidden rounded-[2rem] bg-white/70 p-2 shadow-soft ring-1 ring-ink/10 sm:-ms-12 sm:p-3">
            <Image
              src="/full-kit.jpg"
              alt="ערכת LILA בקופסה לילך: תחתוני מחזור, תחבושות, נרתיק, ומכתב עם איור של ילדה"
              width={1400}
              height={1003}
              priority
              sizes="(min-width: 1024px) 36vw, 70vw"
              className="h-auto w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
