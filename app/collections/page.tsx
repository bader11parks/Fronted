import type { Metadata } from "next";
import Link from "next/link";
import { AuthorityRibbon } from "@/components/AuthorityRibbon";
import { EditorialSplit } from "@/components/EditorialSplit";
import { GuaranteeBand } from "@/components/Guarantee";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import { formatSar } from "@/lib/money";

export const metadata: Metadata = {
  title: "الطقوس",
  description: "ثلاث تركيبات ليوم أهدى: صباح، ظهر، وليل. بيت طقوس مزاج.",
};

export default function CollectionsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-20">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">مجموعة البيت</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">الطقوس</h1>
        <div className="hairline my-6" />
        <p className="max-w-2xl leading-8 text-ritual-ink-soft">
          ثلاث تركيبات. يوم واحد أهدى. اختاري الصباح إذا القهوة تعصّبك، الظهر إذا ما تلحقين نفسك، الليل إذا عقلك يرفض ينطفي —
          أو ملكيهم كلهم كبيت واحد على الطاولة.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {PRODUCTS.map((p) => (
            <a key={p.sku} href={`#${p.slug}`} className="border border-ritual-sand px-4 py-1.5 hover:border-ritual-bronze">
              {p.ritualSlot}
            </a>
          ))}
        </div>
      </div>
      <AuthorityRibbon />
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div key={p.sku} id={p.slug} className="scroll-mt-28">
              <ProductCard product={p} />
              <p className="mt-3 text-xs" dir="ltr">
                {formatSar(179)} / {formatSar(279)} / {formatSar(379)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20 border border-ritual-sand bg-ritual-paper p-8 md:p-12">
          <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">اليوم الكامل</p>
          <h2 className="mt-3 font-display text-3xl">صباح فيه صحو. ظهر فيه نفس. ليل فيه نزول.</h2>
          <p className="mt-4 max-w-2xl leading-8 text-ritual-ink-soft">
            أعلى قيمة ليست حبة أرخص. أعلى قيمة إن يومك يصير له نظام: طاقة هادئة، نزول دافئ، هبوط ليلي. كل طقس SKU لوحده —
            تجميع اليوم هو القصة، مو تخفيض.
          </p>
        </div>
      </div>
      <EditorialSplit index={0} title="ليش مو ماتشا رخيصة" kicker="سعر له معنى" imageTitle="بيت لا يعتذر" tone="cacao">
        <p>
          ١٧٩ ريال لحبة مو غلطة. هذا طقس يجلس على الطاولة مثل عطر، مو كيس بلا اسم. العروض ١ و٢ و٣ لتخزين الشهر — مو حرق أسعار.
        </p>
        <p>المرأة اللي تشتري سكينكير فخم تعرف الفرق. البيت ما يعتذر عن السعر. يشرح القيمة: ثلاثين يوم مزاج، مو جرامات.</p>
        <Link href="/about" className="mt-2 inline-block text-ritual-cacao">
          قصتنا
        </Link>
      </EditorialSplit>
      <GuaranteeBand />
    </>
  );
}
