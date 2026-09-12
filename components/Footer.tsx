"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { PRODUCTS } from "@/lib/catalog";
import { WARRANTY } from "@/lib/copy";
import { cn } from "@/lib/cn";
import { Mark, Wordmark } from "./Header";

function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-ritual-sand/70 md:border-0">
      <button
        type="button"
        className="flex w-full items-center gap-3 py-4 text-start md:hidden"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={cn("shrink-0 text-ritual-bronze transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
        <h3 className="flex-1 text-sm tracking-wide text-ritual-bronze">{title}</h3>
      </button>
      <h3 className="mb-3 hidden text-sm tracking-wide text-ritual-bronze md:block">{title}</h3>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out md:block md:grid-rows-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "md:overflow-visible"
        )}
      >
        <div className="overflow-hidden md:overflow-visible">{children}</div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 border-t border-ritual-sand bg-[#efe6d8]">
      <div className="mx-auto max-w-[1200px] gap-10 px-4 py-16 md:grid md:grid-cols-4">
        <div className="mb-8 md:mb-0">
          <div className="mb-4 flex items-center gap-3">
            <Mark size={36} />
            <Wordmark />
          </div>
          <p className="text-sm leading-8 text-ritual-ink-soft">هدوء له طعم. وطقس له اسم.</p>
          <p className="mt-3 text-xs leading-6 text-ritual-ink-soft">
            نلتزم باشتراطات السوق السعودي للمنتجات الغذائية. رقم هيئة الغذاء والدواء يُضاف على العبوة — لا نخترع أرقاماً.
          </p>
        </div>

        <FooterAccordion title="الطقوس">
          <ul className="space-y-2 pb-4 text-sm md:pb-0">
            {PRODUCTS.map((p) => (
              <li key={p.sku}>
                <Link href={`/products/${p.slug}`}>{p.houseName}</Link>
              </li>
            ))}
          </ul>
        </FooterAccordion>

        <FooterAccordion title="المساعدة">
          <ul className="space-y-2 pb-4 text-sm md:pb-0">
            <li>
              <Link href="/contact">تواصلي</Link>
            </li>
            <li>
              <a href="mailto:contact@mazajrituals.shop" className="text-ritual-ink-soft hover:text-ritual-cacao" dir="ltr">
                contact@mazajrituals.shop
              </a>
            </li>
            <li>
              <Link href="/faq">أسئلة</Link>
            </li>
            <li>
              <Link href="/privacy">سياسة الخصوصية</Link>
            </li>
            <li>
              <Link href="/terms">الشروط</Link>
            </li>
          </ul>
        </FooterAccordion>

        <FooterAccordion title="الثقة">
          <ul className="space-y-2 pb-4 text-sm text-ritual-ink-soft md:pb-0">
            <li>الدفع عند الاستلام</li>
            <li>شحن لكل مدن المملكة</li>
            <li>طلب آمن — نتصل للتأكيد</li>
            <li>{WARRANTY.chip}</li>
          </ul>
          <p className="mt-4 pb-4 text-sm text-ritual-ink-soft md:pb-0">سناب · تيك توك · إنستغرام</p>
        </FooterAccordion>
      </div>
      <div className="border-t border-ritual-sand px-4 py-4 text-center text-xs text-ritual-ink-soft">
        © طقوس مزاج · mazajrituals.shop · ليس دواءً
      </div>
    </footer>
  );
}
