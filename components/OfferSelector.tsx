"use client";

import { DEFAULT_OFFER, OFFERS, type OfferId } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatSar } from "@/lib/money";

const COPY: Record<OfferId, { title: string; hint: string; badge?: string }> = {
  one: { title: "حبة واحدة", hint: "١ منتج في السلة = ١٧٩ ر.س" },
  two: { title: "حبتين", hint: "٢ منتج في السلة = ٢٧٩ ر.س — امزجي كيف ما تبغين", badge: "الأكثر اختياراً" },
  three: { title: "ثلاث حبات", hint: "٣ منتجات في السلة = ٣٧٩ ر.س — أفضل قيمة", badge: "أفضل قيمة" },
};

export function OfferSelector({
  value,
  onChange,
}: {
  value: OfferId;
  onChange: (id: OfferId) => void;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
      {(Object.keys(OFFERS) as OfferId[]).map((id) => {
        const selected = value === id;
        const meta = COPY[id];
        const large = id === "three";
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "relative flex flex-1 flex-col items-start border px-4 py-4 text-start",
              selected ? "border-ritual-cacao bg-ritual-paper shadow-[inset_0_0_0_1px_#5c3228]" : "border-ritual-sand bg-ritual-cream",
              large && "md:min-h-[7.5rem]"
            )}
          >
            {meta.badge ? (
              <span className="mb-1 text-[11px] tracking-wide text-ritual-bronze">{meta.badge}</span>
            ) : null}
            {id === "three" ? (
              <span className="mb-1 text-[11px] text-ritual-bronze">الأذكى لروتين الشهر</span>
            ) : null}
            <span className="font-medium">{meta.title}</span>
            <span className="mt-1 text-lg" dir="ltr">
              {formatSar(OFFERS[id].sar)}
            </span>
            <span className="text-xs leading-5 text-ritual-ink-soft">{meta.hint}</span>
            {selected ? (
              <span className="absolute top-3 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-ritual-bronze text-[10px] text-ritual-paper">
                ✓
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export { DEFAULT_OFFER };
