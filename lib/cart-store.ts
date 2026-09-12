"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OFFERS, otherProducts, productBySku, promoTotalForQty, type OfferId, type Product } from "./catalog";

export type CartItem = {
  sku: string;
  slug: string;
  offerId: OfferId;
  qty: number;
  name: string;
  unitPreview: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  checkoutOpen: boolean;
  addOffer: (sku: string, offerId: OfferId) => void;
  setOffer: (sku: string, offerId: OfferId) => void;
  remove: (sku: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  clear: () => void;
};

function lineFrom(sku: string, offerId: OfferId): CartItem | null {
  const p = productBySku(sku);
  if (!p) return null;
  const offer = OFFERS[offerId];
  return {
    sku: p.sku,
    slug: p.slug,
    offerId,
    qty: offer.qty,
    name: p.nameAr,
    unitPreview: offer.sar,
  };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      checkoutOpen: false,
      addOffer: (sku, offerId) => {
        const next = lineFrom(sku, offerId);
        if (!next) return;
        const items = get().items.filter((i) => i.sku !== sku);
        set({ items: [...items, next] });
      },
      setOffer: (sku, offerId) => {
        const next = lineFrom(sku, offerId);
        if (!next) return;
        set({
          items: get().items.map((i) => (i.sku === sku ? next : i)),
        });
      },
      remove: (sku) => set({ items: get().items.filter((i) => i.sku !== sku) }),
      openDrawer: () => set({ open: true }),
      closeDrawer: () => set({ open: false }),
      openCheckout: () => set({ checkoutOpen: true, open: false }),
      closeCheckout: () => set({ checkoutOpen: false }),
      clear: () => set({ items: [], open: false, checkoutOpen: false }),
    }),
    { name: "mazajrituals_cart_v1", partialize: (s) => ({ items: s.items }) }
  )
);

export function cartTotalQty(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function projectedQtyAfterAdd(items: CartItem[], sku: string, offerId: OfferId): number {
  const offer = OFFERS[offerId];
  const otherQty = items.filter((i) => i.sku !== sku).reduce((n, i) => n + i.qty, 0);
  return otherQty + offer.qty;
}

export function cartSubtotal(items: CartItem[]): number {
  return promoTotalForQty(cartTotalQty(items));
}

export function crossSellProducts(items: CartItem[]): Product[] {
  const inCart = new Set(items.map((i) => i.sku));
  if (inCart.size === 0) return otherProducts("");
  return otherProducts(items[0]?.sku ?? "").filter((p) => !inCart.has(p.sku));
}
