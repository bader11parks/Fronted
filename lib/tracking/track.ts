"use client";

import { postTrackFireAndForget } from "@/lib/api";
import { getClickContext } from "@/lib/tracking/cookies";
import { META_WEB, SNAP_WEB, TIKTOK_WEB } from "@/lib/tracking/names";
import { whenPixelsReady } from "@/lib/tracking/queue";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; page: () => void; identify: (o: unknown) => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

export type CommercePayload = {
  event_id: string;
  value?: number;
  currency?: string;
  contents?: Array<{ id: string; quantity: number; item_price: number }>;
  content_ids?: string[];
  num_items?: number;
  order_id?: string;
  phone?: string;
  name?: string;
  event_source_url?: string;
};

function commonPixelData(p: CommercePayload) {
  return {
    value: p.value,
    currency: p.currency || "SAR",
    contents: p.contents,
    content_ids: p.content_ids,
    content_type: "product",
    num_items: p.num_items,
    order_id: p.order_id,
  };
}

function fireWeb(kind: keyof typeof META_WEB, p: CommercePayload) {
  whenPixelsReady(() => {
    const data = commonPixelData(p);
    window.fbq?.("track", META_WEB[kind], data, { eventID: p.event_id });
    window.ttq?.track(TIKTOK_WEB[kind], { ...data, event_id: p.event_id }, { event_id: p.event_id });
    window.snaptr?.("track", SNAP_WEB[kind], {
      ...data,
      client_dedup_id: p.event_id,
      transaction_id: p.order_id || p.event_id,
      price: p.value,
      currency: "SAR",
    });
  });
}

function capi(eventName: string, p: CommercePayload) {
  const ctx = getClickContext();
  postTrackFireAndForget({
    event_name: eventName,
    event_id: p.event_id,
    event_source_url: p.event_source_url || (typeof window !== "undefined" ? window.location.href : ""),
    value: p.value,
    currency: "SAR",
    contents: p.contents || [],
    user: {
      fbp: ctx.fbp,
      fbc: ctx.fbc,
      ttclid: ctx.ttclid,
      ttp: ctx.ttp,
      sccid: ctx.sccid,
      phone: p.phone || "",
      name: p.name || "",
    },
  });
}

export function trackViewContent(p: CommercePayload) {
  fireWeb("view", p);
  capi("ViewContent", p);
}

export function trackAddToCart(p: CommercePayload) {
  fireWeb("cart", p);
  capi("AddToCart", p);
}

export function trackInitiateCheckout(p: CommercePayload) {
  fireWeb("checkout", p);
  capi("InitiateCheckout", p);
}

export function trackPurchaseWebOnly(p: CommercePayload) {
  fireWeb("purchase", p);
}

export function trackLead(p: CommercePayload) {
  fireWeb("lead", p);
  capi("Lead", p);
}

export function trackPageView(eventId: string) {
  whenPixelsReady(() => {
    window.fbq?.("track", "PageView", {}, { eventID: eventId });
    window.ttq?.page();
    window.snaptr?.("track", "PAGE_VIEW", { client_dedup_id: eventId });
  });
}
