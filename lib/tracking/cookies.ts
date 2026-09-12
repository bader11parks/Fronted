const DAYS = 90;

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : "";
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${DAYS * 86400}; Path=/; SameSite=Lax`;
}

export type ClickContext = {
  fbp: string;
  fbc: string;
  ttclid: string;
  ttp: string;
  sccid: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
};

export function persistAttributionFromLocation() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid && !readCookie("_fbc")) {
    writeCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`);
    writeCookie("_mr_fbclid", fbclid);
  }
  const ttclid = params.get("ttclid");
  if (ttclid) writeCookie("ttclid", ttclid);
  const sccid = params.get("ScCid") || params.get("sccid") || params.get("ScCid");
  if (params.get("ScCid")) writeCookie("sccid", params.get("ScCid") || "");
  else if (params.get("sccid")) writeCookie("sccid", params.get("sccid") || "");
  const utmKeys = ["source", "medium", "campaign", "content", "term"] as const;
  for (const k of utmKeys) {
    const v = params.get(`utm_${k}`);
    if (v) writeCookie(`_mr_utm_${k}`, v);
  }
}

export function getClickContext(): ClickContext {
  persistAttributionFromLocation();
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    ttclid: readCookie("ttclid"),
    ttp: readCookie("_ttp"),
    sccid: readCookie("sccid"),
    utm: {
      source: readCookie("_mr_utm_source"),
      medium: readCookie("_mr_utm_medium"),
      campaign: readCookie("_mr_utm_campaign"),
      content: readCookie("_mr_utm_content"),
      term: readCookie("_mr_utm_term"),
    },
  };
}

export function hashedExternalIdFromPhone(e164Like: string): string {
  return e164Like;
}
