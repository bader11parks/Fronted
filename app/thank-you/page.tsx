"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { apiGet, type FinalizeResponse } from "@/lib/api";
import { COD_CONFIRMATION, WARRANTY } from "@/lib/copy";
import { formatSar } from "@/lib/money";
import { REVIEWS } from "@/lib/reviews";

function ThankYouInner() {
  const params = useSearchParams();
  const id = params.get("order");
  const [order, setOrder] = useState<FinalizeResponse | null>(null);

  useEffect(() => {
    if (!id) return;
    apiGet<FinalizeResponse>(`/orders/${id}/public`)
      .then(setOrder)
      .catch(() => setOrder(null));
  }, [id]);

  const name = order?.customer_name || "";
  const total = order?.total_sar ?? 0;
  const first = name.split(" ")[0] || name;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/9665XXXXXXXX";

  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">تم الاستلام</p>
      <h1 className="mt-3 font-display text-4xl leading-tight">وصلنا طلبكِ{first ? `، يا ${first}` : ""}</h1>
      <div className="hairline my-6" />
      <p className="leading-8 text-ritual-ink-soft">باقي خطوة واحدة: مكالمة تأكيد قصيرة، وبعدها يتحرك الشحن.</p>
      {order ? (
        <p className="mt-3 text-sm text-ritual-ink-soft">رقم الطلب: {order.order_id}</p>
      ) : (
        <p className="mt-3 text-sm text-ritual-ink-soft">إذا ما ظهر الرقم، احتفظي برسالة الجوال. الطلب واصلنا.</p>
      )}

      {total > 0 ? (
        <div className="mt-8 border border-ritual-bronze/40 bg-ritual-paper px-6 py-8 text-center">
          <p className="text-xs tracking-wide text-ritual-ink-soft">جهّزي الكاش للمندوبة</p>
          <p className="mt-2 font-display text-5xl" dir="ltr">
            {formatSar(total)}
          </p>
          <p className="mt-3 text-sm text-ritual-ink-soft">{COD_CONFIRMATION.cash}</p>
        </div>
      ) : null}

      <ol className="mt-10 space-y-6">
        {[
          { n: "١", t: "خلّي جوالك قريب", d: COD_CONFIRMATION.pickupPhone },
          { n: "٢", t: "نأكد بهدوء", d: "بنتصل خلال ساعات العمل. مكالمة قصيرة: الاسم، العنوان، والمبلغ." },
          { n: "٣", t: "جهّزي المبلغ", d: total ? `الكاش ${total} ر.س. المندوبة ما معها شبكة تنتظر.` : "الكاش يظهر هنا مع رقم الطلب." },
          { n: "٤", t: "التوصيل", d: "عادة ١–٣ أيام حسب المدينة: الرياض، جدة، الدمام، وكل المملكة." },
        ].map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="font-english text-ritual-bronze">{s.n}</span>
            <div>
              <p className="font-medium">{s.t}</p>
              <p className="mt-1 text-sm leading-7 text-ritual-ink-soft">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 border border-ritual-sand bg-ritual-paper p-6">
        <h2 className="font-display text-2xl">ليش نتصل؟</h2>
        <p className="mt-3 leading-8 text-ritual-ink-soft">{COD_CONFIRMATION.whyCall}</p>
        <p className="mt-3 leading-8">{COD_CONFIRMATION.soft}</p>
      </div>

      {order ? (
        <div className="mt-8">
          <h2 className="font-display text-2xl">وش في الطلب</h2>
          <ul className="mt-4 space-y-2 border border-ritual-sand p-4">
            {order.items.map((i) => (
              <li key={i.sku + i.offer_id} className="flex justify-between gap-3 text-sm">
                <span>{i.name_ar}</span>
                <span className="text-ritual-ink-soft">{i.qty} حبة</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ritual-ink-soft">{WARRANTY.short}</p>
        </div>
      ) : null}

      <blockquote className="mt-10 border-s-2 border-ritual-bronze ps-4 text-sm leading-7 text-ritual-ink-soft">
        {REVIEWS[0].name} · {REVIEWS[0].city} — «{REVIEWS[0].text}»
      </blockquote>

      <p className="mt-8 text-sm leading-7 text-ritual-ink-soft">
        قراركِ ذكي: طقس له اسم، مو كيس بلا هوية. ننتظر تأكيدكِ عشان الشحنة تمشي.
      </p>

      <a href={wa} className="btn-secondary mt-8 inline-block">
        واتساب الدعم
      </a>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouInner />
    </Suspense>
  );
}
