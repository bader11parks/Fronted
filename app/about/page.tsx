import type { Metadata } from "next";
import Link from "next/link";
import { AuthorityGrid } from "@/components/AuthorityRibbon";
import { EditorialSplit } from "@/components/EditorialSplit";
import { GuaranteeBand } from "@/components/Guarantee";
import { ScienceGrid } from "@/components/ScienceGrid";

export const metadata: Metadata = {
  title: "قصتنا",
  description: "بيت لطقوس المزاج. نظام يوم للمرأة السعودية — صباح، ظهر، وليل.",
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-[800px] px-4 py-16 lg:py-24">
        <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">بيت لطقوس المزاج</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">طقوس، مو ضوضاء.</h1>
        <div className="hairline my-6" />
        <p className="leading-8 text-ritual-ink-soft">
          نكتب للمرأة السعودية اللي تعطي الكل، وتحتاج دقيقة تكون لها. شغل، بيت، مظهر، واتساب — ومزاج يتآكل وأنتِ ساكتة.
        </p>
      </div>

      <EditorialSplit index={0} title="من وين البيت" kicker="القصة" imageTitle="ملاحظة بسيطة" tone="sand">
        <p>
          البيت بدأ من ملاحظة: مزاج المرأة في السعودية يتأكل بين الالتزامات. القهوة تسرّع. السكر يهدّ. النوم يتأخر. والعصبية
          تبان على الصوت قبل ما تبان على الوجه.
        </p>
        <p>طقوس مزاج بُنيت كـ نظام يوم — مش منتج واحد ينتظر معجزة. فريق طقوس مزاج. ثلاث تركيبات تملك اسمها.</p>
      </EditorialSplit>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-3">
          {[
            { t: "صباح", s: "طاقة هادئة. ماتشا وإل-ثيانين." },
            { t: "ظهر", s: "نزول دافئ. كاكاو وأشواغاندا." },
            { t: "ليل", s: "هبوط ناعم. مغنيسيوم المساء." },
          ].map((x) => (
            <div key={x.t} className="border border-ritual-sand bg-ritual-paper p-8 text-center">
              <p className="font-display text-3xl">{x.t}</p>
              <p className="mt-3 text-sm text-ritual-ink-soft">{x.s}</p>
            </div>
          ))}
        </div>
      </section>

      <EditorialSplit index={1} title="نساء المملكة" kicker="من الرياض لجدة للخبر" imageTitle="فنجان على الطاولة" tone="sage">
        <p>
          ما نصوركِ كإعلان. نحترم يومك: الزحمة، الالتزام، الخوف من منتج شكله رخيص يوصل الباب ويندم عليه الكل. البيت فخم عشان
          القرار يبين ذكي — لكِ، وللي يسأل عن السعر.
        </p>
      </EditorialSplit>

      <ScienceGrid />
      <AuthorityGrid />
      <GuaranteeBand />
      <div className="px-4 pb-16 text-center">
        <Link href="/collections" className="btn-primary inline-block">
          تسوقي الطقوس
        </Link>
      </div>
    </>
  );
}
