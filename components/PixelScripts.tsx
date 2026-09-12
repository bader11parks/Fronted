"use client";

import Script from "next/script";
import { useEffect } from "react";
import { persistAttributionFromLocation } from "@/lib/tracking/cookies";
import { markPixelsReady, newEventId } from "@/lib/tracking/queue";
import { trackPageView } from "@/lib/tracking/track";

const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "";
const SNAP_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID || "";

let booted = false;
function bootPixels() {
  markPixelsReady();
  if (booted) return;
  booted = true;
  trackPageView(newEventId());
}

export function PixelScripts() {
  useEffect(() => {
    persistAttributionFromLocation();
    const t = window.setTimeout(bootPixels, 600);
    return () => window.clearTimeout(t);
  }, []);

  const onReady = () => {
    bootPixels();
  };

  return (
    <>
      {META_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive" onLoad={onReady}>
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_ID}', { country: 'sa' });
          `}
        </Script>
      ) : null}
      {TIKTOK_ID ? (
        <Script id="tiktok-pixel" strategy="afterInteractive" onLoad={onReady}>
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${TIKTOK_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      ) : null}
      {SNAP_ID ? (
        <Script id="snap-pixel" strategy="afterInteractive" onLoad={onReady}>
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
              a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
              r.src='https://sc-static.net/scevent.min.js';
              var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);
            })(window,document);
            snaptr('init', '${SNAP_ID}', {});
          `}
        </Script>
      ) : null}
    </>
  );
}
