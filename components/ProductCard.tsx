import Link from "next/link";
import { OFFERS, PRODUCTS, type Product } from "@/lib/catalog";
import { formatSar } from "@/lib/money";
import { SampleImage } from "./SampleImage";

export function Stars({ stars = 5, showLabel = true }: { stars?: 4 | 5 | number; showLabel?: boolean }) {
  const filled = Math.round(stars);
  const glyphs = Array.from({ length: 5 }, (_, i) => (i < filled ? "★" : "☆")).join("");
  return (
    <span className="inline-flex items-center gap-1 text-ritual-bronze" aria-label="تقييمات العميلات">
      <span aria-hidden>{glyphs}</span>
      {showLabel ? <span className="text-xs text-ritual-ink-soft">تقييمات العميلات</span> : null}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col border border-ritual-sand/80 bg-ritual-paper p-3">
      <Link href={`/products/${product.slug}`} className="block">
        <SampleImage title={product.houseName} kicker={product.kicker} tone={toneFor(product.sku)} />
      </Link>
      <p className="mt-5 text-[11px] tracking-[0.22em] text-ritual-bronze">{product.kicker}</p>
      <h3 className="mt-2 font-display text-2xl leading-snug text-ritual-ink">{product.heading}</h3>
      <p className="mt-2 text-sm leading-7 text-ritual-ink-soft">{product.sub}</p>
      <div className="mt-3">
        <Stars showLabel={false} />
      </div>
      <p className="mt-2 text-sm" dir="ltr">
        من {formatSar(OFFERS.one.sar)} · ٢ منتج = {formatSar(OFFERS.two.sar)} · امزجي الطقوس
      </p>
      <p className="mt-1 text-xs text-ritual-ink-soft">{product.microProof}</p>
      <p className="mt-2 inline-block self-start border border-ritual-sand px-2 py-0.5 text-[11px] text-ritual-ink-soft">
        دفعة محدودة
      </p>
      <Link
        href={`/products/${product.slug}`}
        className="btn-primary mt-auto inline-flex w-full items-center justify-center pt-5"
      >
        اكتشفي الطقس
      </Link>
    </article>
  );
}

export function ProductGrid() {
  return (
    <div className="grid items-stretch gap-8 md:grid-cols-3">
      {PRODUCTS.map((p) => (
        <ProductCard key={p.sku} product={p} />
      ))}
    </div>
  );
}

function toneFor(sku: string): "cream" | "sand" | "sage" | "cacao" {
  if (sku === "MR-MATCHA") return "sage";
  if (sku === "MR-CACAO") return "cacao";
  return "sand";
}
