import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[760px] px-4 py-16 leading-8">
      <h1 className="font-display text-4xl">سياسة الخصوصية</h1>
      <p className="mt-6">طقوس مزاج — mazajrituals.shop</p>
      <p className="mt-4">نجمع: الاسم، رقم الجوال، عنوان IP، متصفح الجهاز، عناصر الطلب، ومعرّفات الإعلانات (مثل fbclid).</p>
      <p className="mt-4">السبب: تنفيذ طلبات الدفع عند الاستلام، تأكيد الطلب، وقياس الإعلانات (CAPI).</p>
      <p className="mt-4">المعالجون: الاستضافة، Google Sheets، ميتا، تيك توك، سناب.</p>
      <p className="mt-4">نحتفظ بالطلبات لأغراض محاسبية لمدة تقارب ٢٤ شهراً.</p>
      <p className="mt-4">حقوقكِ: الوصول، التصحيح، الحذف عبر صفحة تواصلي. لا نبيع بياناتكِ.</p>
      <p className="mt-4">نستخدم ملفات تعريف ارتباط لقياس الإعلانات. رقم الجوال للتوصيل والتأكيد فقط.</p>
    </article>
  );
}
