"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiPost, sendBeaconFinalize, type DraftResponse, type FinalizeResponse } from "@/lib/api";
import { useCart } from "@/lib/cart-store";
import { newEventId } from "@/lib/tracking/queue";
import { trackPurchaseWebOnly } from "@/lib/tracking/track";
import { CartDrawer } from "./CartDrawer";
import { CheckoutModal } from "./CheckoutModal";
import { UpsellModal } from "./UpsellModal";

export function FunnelHost() {
  const router = useRouter();
  const clear = useCart((s) => s.clear);
  const closeCheckout = useCart((s) => s.closeCheckout);
  const [draft, setDraft] = useState<DraftResponse | null>(null);
  const purchaseId = useRef("");
  const finishing = useRef(false);

  const skipOnce = useRef(false);
  const finalize = useCallback(
    async (accept: boolean) => {
      if (!draft || finishing.current) return;
      finishing.current = true;
      const event_id_purchase = purchaseId.current || newEventId();
      purchaseId.current = event_id_purchase;
      try {
        const res = await apiPost<FinalizeResponse>(`/orders/${draft.order_id}/finalize`, {
          accept_upsell: accept,
          event_id_purchase,
        });
        trackPurchaseWebOnly({
          event_id: event_id_purchase,
          value: res.total_sar,
          contents: res.items.map((i) => ({
            id: i.sku,
            quantity: i.qty,
            item_price: i.line_sar / Math.max(i.qty, 1),
          })),
          content_ids: res.items.map((i) => i.sku),
          num_items: res.items.reduce((n, i) => n + i.qty, 0),
          order_id: res.order_id,
        });
        clear();
        setDraft(null);
        router.push(res.thank_you_path);
      } catch {
        finishing.current = false;
        alert("طلبك انحفظ، لا تكررين الطلب. إذا ما تحولتي لصفحة التأكيد، تواصلي معنا.");
      }
    },
    [clear, draft, router]
  );

  const onSkip = useCallback(() => {
    if (skipOnce.current) return;
    skipOnce.current = true;
    void finalize(false);
  }, [finalize]);

  const onAccept = useCallback(() => {
    skipOnce.current = true;
    void finalize(true);
  }, [finalize]);

  useEffect(() => {
    if (!draft) return;
    const onHide = () => {
      if (finishing.current) return;
      sendBeaconFinalize(draft.order_id, purchaseId.current || newEventId());
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") onHide();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
    };
  }, [draft]);

  return (
    <>
      <CartDrawer />
      <CheckoutModal
        onDraft={(d) => {
          purchaseId.current = newEventId();
          finishing.current = false;
          skipOnce.current = false;
          closeCheckout();
          setDraft(d);
        }}
      />
      {draft ? <UpsellModal draft={draft} onAccept={onAccept} onSkip={onSkip} /> : null}
    </>
  );
}
