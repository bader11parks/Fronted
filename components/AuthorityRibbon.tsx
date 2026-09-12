import { BadgeCheck, FlaskConical, ShieldCheck, Truck, PhoneCall, CalendarHeart } from "lucide-react";
import { AUTHORITY, AUTHORITY_CHIPS } from "@/lib/copy";

const ICONS = [ShieldCheck, FlaskConical, BadgeCheck, Truck, PhoneCall, CalendarHeart];

export function AuthorityRibbon() {
  return (
    <section className="border-y border-ritual-sand bg-ritual-paper/70 py-5">
      <div className="mx-auto flex max-w-[1200px] gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {AUTHORITY_CHIPS.map((t) => (
          <span
            key={t}
            className="shrink-0 border border-ritual-bronze/45 bg-ritual-cream px-4 py-2 text-[12px] tracking-wide text-ritual-ink-soft whitespace-nowrap md:text-[13px]"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

export function AuthorityGrid() {
  return (
    <section className="bg-ritual-cacao px-4 py-16 text-ritual-paper lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">سلطة · سوق سعودي</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">بيت جادّ — مو دكّة عروض.</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-ritual-paper/80">
          ما نخترع رقم هيئة. نعرض إطار الالتزام: غذاء، مختبر، تصنيع، شحن، وضمان. التفاصيل تُطبع على العبوة لما تكتمل الأوراق.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUTHORITY.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <article key={item.title} className="border border-ritual-paper/15 bg-ritual-cacao p-6">
                <Icon size={22} strokeWidth={1.4} className="text-ritual-bronze" />
                <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ritual-paper/75">{item.body}</p>
                {item.note ? <p className="mt-3 text-[11px] tracking-wide text-ritual-bronze">{item.note}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
