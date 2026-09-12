"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/catalog";
import { OFFERS } from "@/lib/catalog";
import { newEventId } from "@/lib/tracking/queue";
import { trackViewContent } from "@/lib/tracking/track";

export function ViewContentOnMount({ product }: { product: Product }) {
  useEffect(() => {
    trackViewContent({
      event_id: newEventId(),
      value: OFFERS.two.sar,
      contents: [{ id: product.sku, quantity: 1, item_price: 179 }],
      content_ids: [product.sku],
      num_items: 1,
    });
  }, [product.sku]);
  return null;
}
