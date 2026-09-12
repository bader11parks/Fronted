const API = process.env.NEXT_PUBLIC_API_URL || "https://api.mazajrituals.shop";

export type DraftItem = { sku: string; offer_id: string };

export type TrackingUser = {
  fbp?: string;
  fbc?: string;
  ttclid?: string;
  ttp?: string;
  sccid?: string;
  phone?: string;
  name?: string;
};

export type Utm = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
};

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(`api_${status}`);
    this.status = status;
    this.detail = detail;
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = `api_${res.status}`;
    try {
      const payload = (await res.json()) as { detail?: string | Array<{ msg?: string }> };
      if (typeof payload.detail === "string") {
        detail = payload.detail;
      }
    } catch {
      // keep default detail
    }
    throw new ApiError(res.status, detail);
  }
  return (await res.json()) as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`api_${res.status}`);
  return (await res.json()) as T;
}

export type DraftResponse = {
  order_id: string;
  status: string;
  total_sar: number;
  upsell: { sku: string; name_ar: string; price_sar: number };
  expires_in: number;
};

export type FinalizeResponse = {
  order_id: string;
  status: string;
  total_sar: number;
  customer_name: string;
  phone_masked: string;
  items: Array<{ sku: string; offer_id: string; qty: number; name_ar: string; line_sar: number }>;
  thank_you_path: string;
  upsell_accepted: boolean;
};

export function postTrackFireAndForget(payload: unknown) {
  fetch(`${API}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}

export function sendBeaconFinalize(orderId: string, eventId: string) {
  const url = `${API}/orders/${orderId}/finalize`;
  const body = JSON.stringify({ accept_upsell: false, event_id_purchase: eventId });
  const blob = new Blob([body], { type: "application/json" });
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(url, blob);
    return;
  }
  fetch(url, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(
    () => undefined
  );
}
