"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ApiError, apiPost, type DraftResponse } from "@/lib/api";
import { cartSubtotal, cartTotalQty, useCart } from "@/lib/cart-store";
import { formatSar } from "@/lib/money";
import { isValidKsaPhone, isValidName } from "@/lib/phone";
import { getClickContext } from "@/lib/tracking/cookies";
import { newEventId } from "@/lib/tracking/queue";

type Props = {
  onDraft: (draft: DraftResponse, name: string, phone: string) => void;
};

export function CheckoutModal({ onDraft }: Props) {
  const { items, checkoutOpen, closeCheckout } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const subtotal = cartSubtotal(items);
  const totalQty = cartTotalQty(items);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (checkoutOpen) {
      document.body.style.overflow = "hidden";
      nameRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen]);

  const phoneOk = isValidKsaPhone(phone);
  const nameOk = isValidName(name);

  async function submit() {
    setErr("");
    if (!nameOk) {
      setErr("اكتبي اسمك عشان مندوبة التوصيل");
      return;
    }
    if (!phoneOk) {
      setErr("دخّلي رقم سعودي صحيح يبدا بـ 05");
      return;
    }
    setBusy(true);
    try {
      const ctx = getClickContext();
      const draft = await apiPost<DraftResponse>("/orders/draft", {
        customer_name: name.trim(),
        phone,
        items: items.map((i) => ({ sku: i.sku, offer_id: i.offerId })),
        landing_page: window.location.href,
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        fbp: ctx.fbp,
        fbc: ctx.fbc,
        ttclid: ctx.ttclid,
        ttp: ctx.ttp,
        sccid: ctx.sccid,
        event_id_initiate: newEventId(),
        utm: ctx.utm,
      });
      onDraft(draft, name.trim(), phone);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.detail === "geo_blocked") {
          setErr("الطلب متاح داخل السعودية فقط");
        } else if (e.detail === "vpn_blocked") {
          setErr("يرجى إيقاف VPN أو البروكسي ثم المحاولة مرة أخرى");
        } else {
          setErr("ما قدرنا نحفظ الطلب. جرّبي مرة ثانية.");
        }
      } else {
        setErr("ما قدرنا نحفظ الطلب. جرّبي مرة ثانية.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {checkoutOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-ritual-ink/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex min-h-[100dvh] min-h-screen items-center justify-center">
            <motion.div
              role="dialog"
              aria-modal
              aria-labelledby="checkout-title"
              className="mx-auto w-full max-w-md max-h-[min(90vh,100%)] shrink-0 overflow-y-auto bg-ritual-paper p-6"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
            <h2 id="checkout-title" className="font-display text-2xl">
              آخر خطوة — ونأكد طلبكِ
            </h2>
            <p className="mt-2 text-sm leading-7 text-ritual-ink-soft">
              اسمك ورقم جوالك. الدفع كاش لما يوصلكِ الطلب. بنتصل نأكد — عشان الشحنة تمشي صح.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.sku} className="flex justify-between gap-2">
                  <span>
                    {i.name} · {i.qty} {i.qty === 1 ? "حبة" : "حبات"}
                  </span>
                </li>
              ))}
              <li className="flex justify-between text-ritual-ink-soft">
                <span>الشحن</span>
                <span>مجاني</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>الإجمالي كاش ({totalQty} {totalQty === 1 ? "منتج" : "منتجات"})</span>
                <span dir="ltr">{formatSar(subtotal)}</span>
              </li>
            </ul>
            <label className="mt-4 block text-sm">
              الاسم
              <input
                ref={nameRef}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-ritual-sand bg-ritual-cream px-3 py-2"
              />
            </label>
            <label className="mt-3 block text-sm">
              الجوال
              <input
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-ltr-end mt-1 w-full border border-ritual-sand bg-ritual-cream px-3 py-2"
              />
            </label>
            <p className="mt-2 text-xs text-ritual-ink-soft">رقم الجوال للتوصيل والتأكيد فقط</p>
            {err ? <p className="mt-2 text-sm text-ritual-danger">{err}</p> : null}
            <button
              type="button"
              disabled={!phoneOk || !nameOk || busy || items.length === 0}
              onClick={submit}
              className="btn-primary mt-4 w-full disabled:opacity-40"
            >
              {busy ? "جاري الإضافة" : "أكّدي الطلب — الدفع عند الاستلام"}
            </button>
            <p className="mt-2 text-center text-[11px] text-ritual-ink-soft">خلّي جوالك قريب. مكالمة التأكيد قصيرة.</p>
            <button type="button" className="mt-3 w-full text-sm text-ritual-ink-soft" onClick={closeCheckout}>
              رجوع للسلة
            </button>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
