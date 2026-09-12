import Link from "next/link";
import { WARRANTY } from "@/lib/copy";

export function GuaranteeBand({ ctaHref = "/collections", showCta = true }: { ctaHref?: string; showCta?: boolean }) {
  return (
    <section className="px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] border border-ritual-bronze/40 bg-ritual-paper px-6 py-12 text-center md:px-16">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">{WARRANTY.kicker}</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{WARRANTY.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-ritual-ink-soft">{WARRANTY.body}</p>
        <p className="mt-6 text-sm text-ritual-sage">الدفع عند الاستلام · شحن مجاني · نأكد الاتصال</p>
        {showCta ? (
          <Link href={ctaHref} className="btn-primary mt-8 inline-flex">
            اختاري طقسكِ
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function TrustPills({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 text-[12px] text-ritual-ink-soft ${className}`}>
      {["الدفع عند الاستلام", "شحن مجاني لكل المدن", "نأكد الاتصال", WARRANTY.chip].map((t) => (
        <li key={t} className="border border-ritual-sand bg-ritual-paper px-3 py-1">
          {t}
        </li>
      ))}
    </ul>
  );
}
