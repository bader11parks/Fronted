import type { Metadata } from "next";
import { WARRANTY } from "@/lib/copy";

export const metadata: Metadata = { title: "الشروط" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[760px] px-4 py-16 leading-8">
      <h1 className="font-display text-4xl">الشروط</h1>
      <div className="hairline my-6" />
      <p>الأسعار بالريال السعودي. الدفع عند الاستلام بعد مكالمة تأكيد. بدون رسوم خفية على الشحن أو COD.</p>
      <p className="mt-4">مدة الشحن المتوقعة ١–٣ أيام عمل حسب المدينة (تقديري حتى تثبيت شركة الشحن).</p>
      <p className="mt-4">الإلغاء متاح بهدوء قبل خروج الشحنة. الطلب المرفوض عند الباب قد يتحمّل تكلفة معقولة حسب الحالة.</p>
      <p className="mt-4">
        {WARRANTY.title} {WARRANTY.body}
      </p>
      <p className="mt-4">المنتجات ليست دواءً وليست استشارة طبية. الحامل والمرضعة يستشرن الطبيب.</p>
      <p className="mt-4">الماتشا تحتوي كافيين لطيف. لا تضعّفين مصادر الكافيين إذا كنتِ حسّاسة.</p>
    </article>
  );
}
