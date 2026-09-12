import { cn } from "@/lib/cn";
import { SampleImage } from "./SampleImage";

type Props = {
  index: number;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  imageTitle: string;
  imageKicker?: string;
  tone?: "cream" | "sand" | "sage" | "cacao";
  className?: string;
};

/**
 * Physical left/right, independent of RTL.
 * Even index: image LEFT, text RIGHT.
 * Odd index: text LEFT, image RIGHT.
 * Mobile: image then text.
 */
export function EditorialSplit({
  index,
  title,
  kicker,
  children,
  imageTitle,
  imageKicker,
  tone,
  className,
}: Props) {
  const imagePhysicalLeft = index % 2 === 0;
  return (
    <section className={cn("px-4 py-14 lg:py-24", className)}>
      <div
        dir="ltr"
        className={cn(
          "mx-auto flex max-w-[1200px] flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-16",
          !imagePhysicalLeft && "lg:flex-row-reverse"
        )}
      >
        <div className="lg:w-1/2">
          <SampleImage
            title={imageTitle}
            kicker={imageKicker ?? kicker}
            ratio="16/9"
            className="lg:aspect-[4/5]"
            tone={tone ?? (imagePhysicalLeft ? "cream" : "sand")}
          />
        </div>
        <div dir="rtl" className="lg:w-1/2">
          {kicker ? (
            <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">{kicker}</p>
          ) : null}
          <h2 className="mt-3 font-display text-[26px] leading-snug text-ritual-ink md:text-[36px]">{title}</h2>
          <div className="hairline mt-6 mb-6" />
          <div className="space-y-4 text-base leading-8 text-ritual-ink-soft md:text-lg">{children}</div>
        </div>
      </div>
    </section>
  );
}
