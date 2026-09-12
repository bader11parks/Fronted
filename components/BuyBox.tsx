"use client";

import { useState } from "react";
import { DEFAULT_OFFER, OFFERS, promoTotalForQty, type Product, type OfferId } from "@/lib/catalog";
import { DISCLAIMER, INGREDIENTS, WARRANTY, scienceFor } from "@/lib/copy";
import { projectedQtyAfterAdd, useCart } from "@/lib/cart-store";
import { formatSar } from "@/lib/money";
import { newEventId } from "@/lib/tracking/queue";
import { trackAddToCart } from "@/lib/tracking/track";
import { OfferSelector } from "./OfferSelector";
import { Stars } from "./ProductCard";
import { SampleImage } from "./SampleImage";
import { TrustPills } from "./Guarantee";
import { REVIEWS } from "@/lib/reviews";

const SLOTS = [
  { id: "1-hero", label: "العبوة" },
  { id: "2-lifestyle", label: "الفنجان" },
  { id: "3-ingredients", label: "المكونات" },
  { id: "4-ritual", label: "الطقس" },
] as const;

export function BuyBox({ product }: { product: Product }) {
  const [offer, setOffer] = useState<OfferId>(DEFAULT_OFFER);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const addOffer = useCart((s) => s.addOffer);
  const openDrawer = useCart((s) => s.openDrawer);
  const cartItems = useCart((s) => s.items);
  const offerQty = OFFERS[offer].qty;
  const previewQty = projectedQtyAfterAdd(cartItems, product.sku, offer);
  const previewTotal = promoTotalForQty(previewQty);
  const sci = scienceFor(product.sku);
  const quote = REVIEWS.find((r) => r.ritual === product.slug);
  const chips = INGREDIENTS.filter((i) => sci.ingredients.includes(i.id));

  function add() {
    setBusy(true);
    addOffer(product.sku, offer);
    openDrawer();
    const event_id = newEventId();
    trackAddToCart({
      event_id,
      value: previewTotal,
      contents: [{ id: product.sku, quantity: offerQty, item_price: previewTotal / previewQty }],
      content_ids: [product.sku],
      num_items: previewQty,
    });
    setTimeout(() => setBusy(false), 400);
  }

  return (
    <div dir="ltr" className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <SampleImage
          title={product.houseName}
          kicker={SLOTS[active].label}
          ratio="4/5"
          tone={product.sku === "MR-NIGHT" ? "sand" : product.sku === "MR-CACAO" ? "cacao" : "sage"}
        />
        <div className="mt-3 grid grid-cols-4 gap-2">
          {SLOTS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={i === active ? "ring-1 ring-ritual-cacao ring-offset-2 ring-offset-ritual-cream" : "opacity-80"}
            >
              <SampleImage title={s.label} kicker={product.houseName} ratio="4/5" />
            </button>
          ))}
        </div>
      </div>
      <div dir="rtl">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">{product.kicker}</p>
        <h1 className="mt-3 font-display text-[28px] leading-snug md:text-[40px]">{product.pdpH1}</h1>
        <p className="mt-4 text-lg leading-8 text-ritual-ink-soft">{product.pdpSub}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Stars />
          <a href="#reviews" className="text-xs text-ritual-cacao">
            اقرئي الشهادات
          </a>
        </div>
        {quote ? (
          <p className="mt-4 border-s-2 border-ritual-bronze ps-4 text-sm leading-7 text-ritual-ink-soft">
            «{quote.text}» — {quote.name}، {quote.city}
          </p>
        ) : null}
        <p className="mt-4 inline-block border border-ritual-sand px-3 py-1 text-xs text-ritual-ink-soft">
          دفعة هذا الأسبوع محدودة — الطلبات تطلع حسب الدور
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c.id} className="border border-ritual-bronze/50 bg-ritual-paper px-3 py-1 text-xs text-ritual-cacao">
              {c.name}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <OfferSelector value={offer} onChange={setOffer} />
        </div>
        <p className="mt-5 font-display text-4xl" dir="ltr">
          {formatSar(previewTotal)}
        </p>
        <p className="text-sm text-ritual-ink-soft">
          {previewQty} {previewQty === 1 ? "منتج" : "منتجات"} في سلتك · ٣٠ يوم مزاج، مو جرامات بودرة
        </p>
        <button
          type="button"
          onClick={add}
          disabled={busy}
          className="btn-primary mt-6 w-full disabled:opacity-50"
        >
          {busy ? "جاري الإضافة" : product.pdpCta}
        </button>
        <p className="mt-3 text-center text-sm text-ritual-success">الدفع عند الاستلام — بدون رسوم خفية</p>
        <TrustPills className="mt-4 justify-center" />
        <ul className="mt-5 space-y-2 text-sm leading-7 text-ritual-ink-soft">
          <li>تركيبة بيت — مو بودرة بلا اسم</li>
          <li>{sci.servings}</li>
          <li>{WARRANTY.short}</li>
          <li>شحن داخل المملكة · يمكن إلغاء قبل الشحن بهدوء</li>
        </ul>
        <p className="mt-4 text-[11px] leading-6 text-ritual-ink-soft">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

export function RepeatCta({ product }: { product: Product }) {
  const addOffer = useCart((s) => s.addOffer);
  const openDrawer = useCart((s) => s.openDrawer);
  const cartItems = useCart((s) => s.items);
  return (
    <button
      type="button"
      className="btn-primary mt-6"
      onClick={() => {
        const previewQty = projectedQtyAfterAdd(cartItems, product.sku, DEFAULT_OFFER);
        const previewTotal = promoTotalForQty(previewQty);
        addOffer(product.sku, DEFAULT_OFFER);
        openDrawer();
        trackAddToCart({
          event_id: newEventId(),
          value: previewTotal,
          contents: [{ id: product.sku, quantity: OFFERS[DEFAULT_OFFER].qty, item_price: previewTotal / previewQty }],
          content_ids: [product.sku],
          num_items: previewQty,
        });
      }}
    >
      {product.pdpCta}
    </button>
  );
}

export function StickyAtc({ product }: { product: Product }) {
  const [offer, setOffer] = useState<OfferId>(DEFAULT_OFFER);
  const cartOpen = useCart((s) => s.open);
  const checkoutOpen = useCart((s) => s.checkoutOpen);
  const cartItems = useCart((s) => s.items);
  const addOffer = useCart((s) => s.addOffer);
  const openDrawer = useCart((s) => s.openDrawer);
  if (cartOpen || checkoutOpen) return null;
  const previewQty = projectedQtyAfterAdd(cartItems, product.sku, offer);
  const previewTotal = promoTotalForQty(previewQty);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-ritual-sand bg-ritual-paper/95 px-3 py-3 backdrop-blur lg:hidden">
      <div className="min-w-0">
        <p className="truncate text-sm">{product.houseName}</p>
        <p dir="ltr" className="text-sm">
          {formatSar(previewTotal)}
        </p>
      </div>
      <select
        className="border border-ritual-sand bg-ritual-cream px-2 py-2 text-sm"
        value={offer}
        onChange={(e) => setOffer(e.target.value as OfferId)}
        aria-label="العرض"
      >
        <option value="one">حبة · 179</option>
        <option value="two">حبتين · 279</option>
        <option value="three">ثلاث · 379</option>
      </select>
      <button
        type="button"
        className="btn-primary shrink-0 px-4 py-3 text-sm"
        onClick={() => {
          addOffer(product.sku, offer);
          openDrawer();
          trackAddToCart({
            event_id: newEventId(),
            value: previewTotal,
            contents: [{ id: product.sku, quantity: OFFERS[offer].qty, item_price: previewTotal / previewQty }],
            content_ids: [product.sku],
            num_items: previewQty,
          });
        }}
      >
        أضيفي
      </button>
    </div>
  );
}
