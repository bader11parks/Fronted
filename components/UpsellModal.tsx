"use client";

import { useEffect, useState } from "react";
import { type DraftResponse } from "@/lib/api";
import { formatSar } from "@/lib/money";
import { SampleImage } from "./SampleImage";

type Props = {
  draft: DraftResponse;
  onAccept: () => void;
  onSkip: () => void;
};

export function UpsellModal({ draft, onAccept, onSkip }: Props) {
  const [n, setN] = useState(12);

  useEffect(() => {
    const tick = setInterval(() => {
      setN((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    const done = setTimeout(() => {
      onSkip();
    }, 12000);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [onSkip]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ritual-ink/60 p-4">
      <div role="dialog" aria-modal className="w-full max-w-md bg-ritual-paper p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ritual-bronze text-xl">
          {n}
        </div>
        <h2 className="font-display text-2xl">لحظة واحدة قبل ما نقفل طلبكِ</h2>
        <div className="mx-auto mt-4 max-w-[200px]">
          <SampleImage title={draft.upsell.name_ar} kicker="إضافة لمرة واحدة بعد الطلب" />
        </div>
        <p className="mt-4 text-sm leading-7">
          {draft.upsell.name_ar} بـ {formatSar(109)} — سعر ما يتكرر على الموقع.
        </p>
        <p className="mt-1 text-xs text-ritual-ink-soft">109 ر.س بدل 179</p>
        <p className="mt-2 text-sm">العرض ينتهي خلال {n}</p>
        <button type="button" className="btn-primary mt-4 w-full" onClick={onAccept}>
          أضيفيه بـ 109
        </button>
        <button type="button" className="mt-3 w-full text-sm" onClick={onSkip}>
          لا، كمّلي بدون
        </button>
      </div>
    </div>
  );
}
