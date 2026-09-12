import { DISCLAIMER, INGREDIENTS, type Ingredient } from "@/lib/copy";

export function ScienceGrid({ items = INGREDIENTS }: { items?: Ingredient[] }) {
  return (
    <section className="px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">علم بهدوء</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">مكونات لها اسم. مو بودرة بلا هوية.</h2>
        <p className="mt-4 max-w-2xl leading-8 text-ritual-ink-soft">
          نكتب الآلية بحذر: «يُدرس لـ» و«يرتبط بـ». مو يعالج، مو يشفي. الطقس في الفنجان، والصدق في الجملة.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((ing) => (
            <article key={ing.id} className="flex flex-col border border-ritual-sand bg-ritual-paper p-6">
              <p className="text-[11px] tracking-[0.22em] text-ritual-bronze">{ing.kicker}</p>
              <h3 className="mt-2 font-display text-2xl">{ing.name}</h3>
              <p className="mt-3 text-sm leading-7 text-ritual-ink-soft">{ing.body}</p>
              <p className="mt-4 flex-1 border-t border-ritual-sand pt-4 text-sm leading-7 text-ritual-ink">
                {ing.mechanism}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs leading-6 text-ritual-ink-soft">{DISCLAIMER}</p>
      </div>
    </section>
  );
}
