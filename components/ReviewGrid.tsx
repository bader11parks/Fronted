import { REVIEWS, type Review } from "@/lib/reviews";
import { Stars } from "./ProductCard";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <blockquote className="flex h-full flex-col border border-ritual-sand bg-ritual-paper p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ritual-sand font-display text-lg text-ritual-cacao">
          {review.name[0]}
        </span>
        <div>
          <p className="text-sm text-ritual-ink">
            {review.name} · {review.city}
          </p>
          <Stars stars={review.stars} />
        </div>
      </div>
      <p className="flex-1 leading-8">«{review.text}»</p>
    </blockquote>
  );
}

export function ReviewGrid({ reviews = REVIEWS.slice(0, 6), title = "بنات جربن الطقس، لا الإعلان." }: { reviews?: Review[]; title?: string }) {
  return (
    <section className="px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">إثبات اجتماعي</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-ritual-ink-soft">شهادات بيت مبكر — تُستبدل بتقييمات الطلبات الحقيقية بعد الإطلاق.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={`${r.name}-${r.city}-${r.ritual}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
