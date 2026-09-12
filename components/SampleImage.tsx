import { cn } from "@/lib/cn";

type Props = {
  title: string;
  kicker?: string;
  caption?: string;
  ratio?: "4/5" | "16/9" | "1/1" | "3/4";
  className?: string;
  priority?: boolean;
  tone?: "cream" | "sand" | "sage" | "cacao";
};

const RATIO: Record<NonNullable<Props["ratio"]>, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  cream: "from-[#fff9f2] via-[#f4ede3] to-[#e7d8c4]",
  sand: "from-[#f4ede3] via-[#e7d8c4] to-[#d9b7b0]/40",
  sage: "from-[#f4ede3] via-[#e7d8c4] to-[#3f5648]/25",
  cacao: "from-[#f4ede3] via-[#e7d8c4] to-[#5c3228]/20",
};

export function SampleImage({
  title,
  kicker,
  caption = "مساحة للصورة",
  ratio = "4/5",
  className,
  tone = "cream",
}: Props) {
  return (
    <div
      dir="rtl"
      className={cn(
        "relative overflow-hidden border border-ritual-bronze/35 bg-ritual-cream",
        RATIO[ratio],
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", TONE[tone])} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(196,165,116,0.35), transparent 42%), radial-gradient(circle at 80% 80%, rgba(92,50,40,0.12), transparent 40%)",
        }}
      />
      <div className="absolute inset-3 border border-ritual-bronze/25" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ritual-cacao font-english text-2xl text-ritual-paper">
          M
        </span>
        {kicker ? (
          <p className="mt-5 text-[11px] tracking-[0.28em] text-ritual-bronze">{kicker}</p>
        ) : null}
        <p className="mt-2 font-display text-xl text-ritual-ink md:text-2xl">{title}</p>
        <p className="mt-3 text-[11px] tracking-widest text-ritual-ink-soft">{caption}</p>
      </div>
    </div>
  );
}
