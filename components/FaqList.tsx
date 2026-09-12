"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FAQS, HOME_FAQ } from "@/lib/copy";
import { cn } from "@/lib/cn";

export function FaqList({ items = FAQS, teaser = false }: { items?: { q: string; a: string }[]; teaser?: boolean }) {
  const list = teaser ? HOME_FAQ : items;
  const [open, setOpen] = useState<Record<string, boolean>>({});

  function toggle(q: string) {
    setOpen((prev) => ({ ...prev, [q]: !prev[q] }));
  }

  return (
    <section className="px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-[800px]">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">أسئلة بهدوء</p>
        <h2 className="mt-3 font-display text-3xl">اللي تسأله قبل ما تطلبين</h2>
        <div className="mt-8 divide-y divide-ritual-sand border-y border-ritual-sand">
          {list.map((f) => {
            const isOpen = Boolean(open[f.q]);
            return (
              <div key={f.q}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 py-5 text-start"
                  aria-expanded={isOpen}
                  onClick={() => toggle(f.q)}
                >
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className={cn("shrink-0 text-ritual-bronze transition-transform duration-200", isOpen && "rotate-180")}
                    aria-hidden
                  />
                  <span className="flex-1 font-medium text-ritual-ink">{f.q}</span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pe-1 leading-8 text-ritual-ink-soft">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {teaser ? (
          <Link href="/faq" className="mt-6 inline-block text-sm text-ritual-cacao">
            كل الأسئلة
          </Link>
        ) : null}
      </div>
    </section>
  );
}
