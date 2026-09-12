"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart, cartSubtotal, cartTotalQty, crossSellProducts, projectedQtyAfterAdd } from "@/lib/cart-store";
import { OFFERS, promoTotalForQty, type OfferId } from "@/lib/catalog";
import { formatSar } from "@/lib/money";
import { SampleImage } from "./SampleImage";
import { newEventId } from "@/lib/tracking/queue";
import { trackAddToCart, trackInitiateCheckout } from "@/lib/tracking/track";

export function CartDrawer() {
  const { items, open, closeDrawer, openCheckout, addOffer, setOffer, remove } = useCart();
  const crosses = crossSellProducts(items);
  const subtotal = cartSubtotal(items);
  const totalQty = cartTotalQty(items);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="إغلاق"
            className="fixed inset-0 z-50 bg-ritual-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed inset-y-0 end-0 z-50 flex w-full max-w-[420px] flex-col bg-ritual-paper shadow-xl"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-label="السلة"
          >
            <div className="flex items-center justify-between border-b border-ritual-sand px-4 py-4">
              <div>
                <h2 className="text-lg">السلة</h2>
                <p className="text-[11px] text-ritual-ink-soft">شحن مجاني · ضمان ٣٠ يوم</p>
              </div>
              <button type="button" onClick={closeDrawer} aria-label="إغلاق">
                <X strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {items.length === 0 ? (
                <p className="text-ritual-ink-soft">سلتك فاضيّة. اختاري طقس اليوم.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.sku} className="flex gap-3 border-b border-ritual-sand pb-4">
                      <div className="w-20">
                        <SampleImage title={item.name} ratio="1/1" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{item.name}</p>
                        <p className="mt-1 text-xs text-ritual-ink-soft">
                          {item.qty} {item.qty === 1 ? "حبة" : "حبات"} · ضمن عرض السلة
                        </p>
                        <select
                          className="mt-2 border border-ritual-sand bg-ritual-cream px-2 py-1 text-sm"
                          value={item.offerId}
                          onChange={(e) => setOffer(item.sku, e.target.value as OfferId)}
                        >
                          {(Object.keys(OFFERS) as OfferId[]).map((id) => (
                            <option key={id} value={id}>
                              {OFFERS[id].qty} · {formatSar(OFFERS[id].sar)}
                            </option>
                          ))}
                        </select>
                        <button type="button" className="mt-2 block text-xs text-ritual-ink-soft" onClick={() => remove(item.sku)}>
                          إزالة
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {totalQty > 0 ? (
                <p className="mt-4 border border-ritual-sand bg-ritual-cream px-3 py-2 text-xs leading-6 text-ritual-ink-soft">
                  امزجي المنتجات كيف ما تبغين — {totalQty} {totalQty === 1 ? "منتج" : "منتجات"} ={" "}
                  <span dir="ltr" className="font-medium text-ritual-cacao">
                    {formatSar(subtotal)}
                  </span>
                </p>
              ) : null}
              <div className="mt-6">
                <h3 className="mb-3 font-display text-xl">أكملي طقوس يومك</h3>
                <p className="mb-3 text-sm text-ritual-ink-soft">تقدرين تطلبين الطقم كامل لطقوس اليوم.</p>
                <div className="space-y-3">
                  {crosses.map((p) => {
                    const line =
                      p.sku === "MR-MATCHA"
                        ? "الصباح ناقصكِ — طاقة هادئة"
                        : p.sku === "MR-NIGHT"
                          ? "الليل يستاهل فنجان يقفله"
                          : "الظهر يحتاج نزول دافئ";
                    return (
                      <div key={p.sku} className="flex items-center justify-between gap-2 border border-ritual-sand p-3">
                        <div>
                          <p className="text-sm">{line}</p>
                          <p className="text-xs text-ritual-ink-soft">تقدرين تضيفينها لسلتك</p>
                        </div>
                        <button
                          type="button"
                          className="border border-ritual-bronze px-3 py-2 text-sm"
                          onClick={() => {
                            const nextQty = projectedQtyAfterAdd(items, p.sku, "one");
                            addOffer(p.sku, "one");
                            const event_id = newEventId();
                            trackAddToCart({
                              event_id,
                              value: promoTotalForQty(nextQty),
                              contents: [{ id: p.sku, quantity: 1, item_price: promoTotalForQty(nextQty) / nextQty }],
                              content_ids: [p.sku],
                              num_items: nextQty,
                            });
                          }}
                        >
                          أضيفي للسلة
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="border-t border-ritual-sand p-4">
              <div className="mb-2 flex justify-between">
                <span>المجموع</span>
                <span dir="ltr">{formatSar(subtotal)}</span>
              </div>
              <p className="mb-3 text-xs leading-5 text-ritual-ink-soft">
                شحن مجاني · الدفع عند الاستلام — بدون رسوم خفية. بنتصل نأكد الطلب قبل الشحن.
              </p>
              <button
                type="button"
                disabled={items.length === 0}
                className="btn-primary w-full disabled:opacity-40"
                onClick={() => {
                  const event_id = newEventId();
                  trackInitiateCheckout({
                    event_id,
                    value: subtotal,
                    contents: items.map((i) => ({
                      id: i.sku,
                      quantity: i.qty,
                      item_price: subtotal / totalQty,
                    })),
                    content_ids: items.map((i) => i.sku),
                    num_items: totalQty,
                  });
                  openCheckout();
                }}
              >
                إتمام الطلب
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
