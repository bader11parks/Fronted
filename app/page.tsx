import Link from "next/link";
import { AuthorityGrid, AuthorityRibbon } from "@/components/AuthorityRibbon";
import { EditorialSplit } from "@/components/EditorialSplit";
import { FaqList } from "@/components/FaqList";
import { GuaranteeBand, TrustPills } from "@/components/Guarantee";
import { ProductGrid } from "@/components/ProductCard";
import { ReviewGrid } from "@/components/ReviewGrid";
import { SampleImage } from "@/components/SampleImage";
import { ScienceGrid } from "@/components/ScienceGrid";
import { PRODUCTS } from "@/lib/catalog";
import { DESIRES, PAINS, RITUAL_STEPS } from "@/lib/copy";

export default function HomePage() {
  return (
    <>
      <section className="px-4">
        <div
          dir="ltr"
          className="mx-auto grid max-w-[1200px] items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20"
        >
          <SampleImage title="مزاجك له طقوس" kicker="MAZAJRITUALS" ratio="16/9" className="lg:aspect-[4/5]" tone="sand" />
          <div dir="rtl">
            <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">بيت لطقوس المزاج</p>
            <h1 className="mt-3 font-display text-[36px] leading-tight md:text-[56px]">مزاجك له طقوس.</h1>
            <div className="hairline my-6" />
            <p className="text-lg leading-8 text-ritual-ink-soft">
              ثلاث تركيبات لفنجان يهدّي يومك: صباح هادئ، ظهر ألطف، وليل ينزل برفق. مو زيادة طاقة. مو حبة صيدلية. نظام يوم
              للمرأة اللي متوقع منها تكون جاهزة طول الوقت.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/collections" className="btn-primary">
                تسوقي الطقوس
              </Link>
              <Link href="/products/matcha-theanine" className="btn-secondary">
                طقس الصباح
              </Link>
            </div>
            <TrustPills className="mt-6" />
          </div>
        </div>
      </section>

      <section className="border-y border-ritual-sand bg-ritual-paper/50 px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-center text-[11px] tracking-[0.28em] text-ritual-bronze">ثلاث دقات</p>
          <p className="mt-3 text-center font-display text-3xl md:text-4xl">صباح فيه صحو. ظهر فيه نفس. ليل فيه نزول.</p>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.sku}
                href={`/products/${p.slug}`}
                className="group flex h-full flex-col border border-ritual-sand bg-ritual-cream p-8 text-center transition-colors hover:border-ritual-bronze"
              >
                <p className="text-[11px] tracking-[0.25em] text-ritual-bronze">{p.kicker}</p>
                <h2 className="mt-4 font-display text-3xl">{p.houseName}</h2>
                <p className="mt-3 text-sm leading-7 text-ritual-ink-soft">{p.heading}</p>
                <p className="mt-2 text-xs text-ritual-ink-soft">{p.microProof}</p>
                <span className="mt-auto inline-block pt-6 text-sm text-ritual-cacao">اكتشفي الطقس</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AuthorityRibbon />

      <EditorialSplit index={0} title="القهوة ما عادت تكفي. والعصبية ما هي شخصيتك." kicker="الألم" imageTitle="قهوة وأعصاب" tone="cacao">
        <p>
          بين الشغل والبيت والجوال، مزاجك يتعب وأنتِ ساكتة. متوقع منكِ تكونين تمام: شغل، بيت، بشرة، ردود واتساب. القهوة
          تسرّع. السكر يهدّ. النوم يتأخر. وطول الوقت تحسين إنكِ «تزيدين».
        </p>
        <p>طقوس مزاج مو منتج زيادة طاقة. هذا روتين فخم، بهدوء، عشان ترجعين لنفسك ثلاث مرات في اليوم.</p>
      </EditorialSplit>

      <section className="bg-ritual-paper px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">كلامها، مو كلام الإعلان</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">الأشياء اللي البنات في السعودية يسكتون عنها.</h2>
          <p className="mt-4 max-w-2xl leading-8 text-ritual-ink-soft">
            هذي مو قائمة تسويق. هذي الإحساس اللي يخلي فنجان القهوة ما يكفي، ويخلي المنتج الرخيص يخوّف لما يوصل الباب.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PAINS.map((p) => (
              <figure key={p.quote} className="border border-ritual-sand bg-ritual-cream p-6">
                <blockquote className="font-display text-xl text-ritual-ink">«{p.quote}»</blockquote>
                <figcaption className="mt-3 text-sm leading-7 text-ritual-ink-soft">{p.detail}</figcaption>
              </figure>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-3 text-sm text-ritual-sage">
            {DESIRES.map((d) => (
              <li key={d} className="border border-ritual-sage/30 px-3 py-1">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">البيت</p>
        <h2 className="mb-8 font-display text-3xl md:text-4xl">ثلاث طقوس. يوم واحد أهدى.</h2>
        <ProductGrid />
      </section>

      <ScienceGrid />
      <AuthorityGrid />
      <ReviewGrid />

      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-10 font-display text-3xl">كيف الطقس</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {RITUAL_STEPS.map((s) => (
              <li key={s.title} className="border border-ritual-sand bg-ritual-paper p-8">
                <span className="font-english text-ritual-bronze">{s.n}</span>
                <p className="mt-3 font-display text-2xl">{s.title}</p>
                <p className="mt-3 text-sm leading-7 text-ritual-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqList teaser />
      <GuaranteeBand />

      <section className="bg-ritual-cacao py-20 text-center text-ritual-paper">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">هدوء له طعم. وطقس له اسم.</p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl">ابدئي بطقس واحد. أو ملكي اليوم كامل.</h2>
        <p className="mx-auto mt-4 max-w-lg text-ritual-paper/75">١٧٩ ريال لطقس الشهر. مو اعتذار عن السعر — قيمة ثلاثين يوم مزاج.</p>
        <Link href="/collections" className="mt-8 inline-block border border-ritual-paper px-8 py-3">
          اكتشفي الطقوس
        </Link>
      </section>
    </>
  );
}
