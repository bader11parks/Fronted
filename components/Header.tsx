"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cartTotalQty, useCart } from "@/lib/cart-store";
import { PROMO_BANNER_PARTS } from "@/lib/copy";

export function Mark({ size = 40 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-ritual-cacao text-ritual-paper"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="font-english text-[0.95em] leading-none">M</span>
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-[18px] text-ritual-ink md:text-[22px]">طقوس مزاج</span>
      <span className="mt-1 font-english text-[9px] tracking-[0.28em] text-ritual-bronze md:text-[11px]">
        MAZAJRITUALS
      </span>
    </span>
  );
}

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "الطقوس" },
  { href: "/about", label: "قصتنا" },
  { href: "/contact", label: "تواصلي" },
];

function PromoBannerContent({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-3 whitespace-nowrap px-4" aria-hidden={duplicate}>
      {PROMO_BANNER_PARTS.map((part, i) => (
        <span key={`${duplicate ? "dup" : "main"}-${i}`} className="inline-flex items-center gap-3">
          {i > 0 ? <span className="text-ritual-bronze">•</span> : null}
          <span className={part.price ? "font-english font-semibold text-ritual-bronze" : undefined} dir={part.price ? "ltr" : undefined}>
            {part.label}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Header() {
  const count = useCart((s) => cartTotalQty(s.items));
  const openDrawer = useCart((s) => s.openDrawer);
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-ritual-sand bg-ritual-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Mark />
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-8 text-[15px] text-ritual-ink lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-ritual-cacao">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative rounded-full p-2 text-ritual-ink"
            aria-label="السلة"
            onClick={openDrawer}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {ready && count > 0 ? (
              <span className="absolute -start-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ritual-cacao px-1 text-[11px] text-ritual-paper">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="p-2 lg:hidden"
            aria-label="القائمة"
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {menu ? (
        <div className="border-t border-ritual-sand px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-lg">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenu(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-ritual-cacao py-2 text-[12px] tracking-wide text-ritual-paper md:text-[13px]" role="marquee">
      <div className="promo-marquee overflow-hidden" dir="ltr">
        <div className="promo-marquee-track flex w-max">
          <PromoBannerContent />
          <PromoBannerContent duplicate />
        </div>
      </div>
      <p className="promo-marquee-static hidden px-4 text-center">
        {PROMO_BANNER_PARTS.map((part) => part.label).join(" • ")}
      </p>
    </div>
  );
}
