import type { ReactNode } from "react";
import { BuyBox, RepeatCta, StickyAtc } from "@/components/BuyBox";
import { EditorialSplit } from "@/components/EditorialSplit";
import { AuthorityGrid, AuthorityRibbon } from "@/components/AuthorityRibbon";
import { FaqList } from "@/components/FaqList";
import { GuaranteeBand } from "@/components/Guarantee";
import { ProductCard } from "@/components/ProductCard";
import { ReviewGrid } from "@/components/ReviewGrid";
import { ViewContentOnMount } from "@/components/ViewContentOnMount";
import { DISCLAIMER, INGREDIENTS, WARRANTY, scienceFor } from "@/lib/copy";
import { otherProducts, type Product } from "@/lib/catalog";
import { REVIEWS } from "@/lib/reviews";

export function ProductLanding({ product }: { product: Product }) {
  const sci = scienceFor(product.sku);
  const reviews = REVIEWS.filter((r) => r.ritual === product.slug);
  const extras = REVIEWS.filter((r) => r.ritual !== product.slug);
  const all = [...reviews, ...extras].slice(0, 10);
  const ings = INGREDIENTS.filter((i) => sci.ingredients.includes(i.id));

  return (
    <article className="pb-24">
      <ViewContentOnMount product={product} />
      <div className="mx-auto max-w-[1200px] px-4 py-10 lg:py-16">
        <BuyBox product={product} />
      </div>
      <AuthorityRibbon />

      <EditorialSplit index={0} title="لمن هذا الطقس" kicker="الألم · الإحساس" imageTitle="يومك قبل الفنجان" tone="sand">
        <p className="font-display text-xl text-ritual-ink md:text-2xl">«{sci.painLead}»</p>
        <p>{sci.painBody}</p>
        <p className="text-ritual-ink">{sci.identity}</p>
      </EditorialSplit>

      <EditorialSplit index={1} title="التركيبة والمكونات" kicker="علم بهدوء" imageTitle="مكونات لها اسم" tone="sage">
        {ings.map((ing) => (
          <div key={ing.id}>
            <p className="text-ritual-ink">
              <strong>{ing.name}.</strong> {ing.body}
            </p>
            <p className="text-sm">{ing.mechanism}</p>
          </div>
        ))}
        <p>{sci.whyPair}</p>
        <p className="text-sm">{DISCLAIMER}</p>
      </EditorialSplit>

      <EditorialSplit index={2} title="كيف تستخدمينه" kicker="الطقس" imageTitle="فنجان الدقيقة" tone="cream">
        <p>{sci.ritualHow}</p>
        <p>{sci.servings}</p>
        <p>{sci.notThis}</p>
      </EditorialSplit>

      <EditorialSplit index={3} title="ليش طقوس مزاج مو أي بودرة" kicker="بيت يملك التركيبة" imageTitle="هوية البيت" tone="cacao">
        <p>
          ما نبيع «عرض من الصين». نكتب تركيبات لها اسم، وطقس له وقت، وبيت تتركينه على الطاولة بفخر — جنب العود، مو جنب كيس بلا علامة.
        </p>
        <p>
          نلتزم باشتراطات السوق السعودي للمنتجات الغذائية. شارة هيئة الغذاء والدواء بانتظار رقم التسجيل الرسمي — التفاصيل تُضاف على العبوة. لا نخترع أرقاماً عشان الإعلان.
        </p>
        <p>فحص مختبر وإطار GMP/ISO: إطار جودة، مو PDF درجات مزيفة.</p>
        <p>{WARRANTY.short}</p>
      </EditorialSplit>

      <EditorialSplit index={4} title="قبل / بعد شعوري" kicker="من العميلات" imageTitle="شهادة هادئة" tone="sand">
        <p>{sci.beforeAfter}</p>
        <p className="text-sm">{sci.giftLine}</p>
      </EditorialSplit>

      <ScienceNotes productSku={product.sku} extra={ings.length === 1 ? extraNightScience() : null} />

      <ReviewGrid reviews={all} title="تقييمات العميلات" />
      <AuthorityGrid />
      <FaqList />
      <GuaranteeBand showCta={false} />

      <section className="mx-auto max-w-[1200px] px-4 py-12">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">أكملي اليوم</p>
        <h2 className="mt-3 mb-8 font-display text-3xl">صباح فيه صحو. ظهر فيه نفس. ليل فيه نزول.</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {otherProducts(product.sku).map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-4 py-16 text-center">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">العرض</p>
        <h2 className="mt-3 font-display text-3xl">{product.pdpH1}</h2>
        <p className="mt-3 text-ritual-ink-soft">{product.pdpSub}</p>
        <p className="mt-4 text-sm text-ritual-ink-soft">إذا تغيّر رأيك قبل الشحن، قولي لنا على الاتصال بهدوء.</p>
        <RepeatCta product={product} />
      </section>
      <StickyAtc product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.nameAr,
            brand: "طقوس مزاج",
            description: product.pdpSub,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "SAR",
              lowPrice: 179,
              highPrice: 379,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </article>
  );
}

function ScienceNotes({ productSku, extra }: { productSku: string; extra: ReactNode }) {
  const sci = scienceFor(productSku);
  return (
    <section className="border-y border-ritual-sand bg-ritual-paper/60 px-4 py-16">
      <div className="mx-auto max-w-[800px]">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">ليش هالتركيبة</p>
        <h2 className="mt-3 font-display text-3xl">الآلية، من غير مبالغة.</h2>
        <p className="mt-4 leading-8 text-ritual-ink-soft">{sci.whyPair}</p>
        {extra}
        <p className="mt-6 text-xs leading-6 text-ritual-ink-soft">{DISCLAIMER}</p>
      </div>
    </section>
  );
}

function extraNightScience() {
  return (
    <p className="mt-4 leading-8 text-ritual-ink-soft">
      الصيغة المسائية لطيفة الإحساس. ما نطبع اسم ملح على الموقع حتى تثبت العبوة. المغنيسيوم هنا روتين هبوط — مو وعد نوم فوري.
    </p>
  );
}
