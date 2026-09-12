"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { isValidKsaPhone, isValidName } from "@/lib/phone";
import { newEventId } from "@/lib/tracking/queue";
import { trackLead } from "@/lib/tracking/track";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr("");
    if (!isValidName(name) || !isValidKsaPhone(phone) || message.trim().length < 3) {
      setErr("كمّلي الاسم ورقم سعودي والرسالة.");
      return;
    }
    setBusy(true);
    try {
      await apiPost("/leads", { name, phone, message });
      trackLead({ event_id: newEventId(), name, phone });
      setOk(true);
    } catch {
      setErr("ما وصلنا الرسالة. جرّبي واتساب.");
    } finally {
      setBusy(false);
    }
  }

  if (ok) return <p className="mt-6 text-ritual-success">وصلنا رسالتكِ. نرد خلال ٢٤ ساعة.</p>;

  return (
    <div className="mt-8 max-w-md space-y-3">
      <label className="block text-sm">
        الاسم
        <input autoComplete="name" className="mt-1 w-full border border-ritual-sand bg-ritual-paper px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block text-sm">
        الجوال
        <input dir="ltr" inputMode="tel" autoComplete="tel" placeholder="05xxxxxxxx" className="input-ltr-end mt-1 w-full border border-ritual-sand bg-ritual-paper px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label className="block text-sm">
        الرسالة
        <textarea className="mt-1 w-full border border-ritual-sand bg-ritual-paper px-3 py-2" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      {err ? <p className="text-sm text-ritual-danger">{err}</p> : null}
      <button type="button" disabled={busy} onClick={() => void submit()} className="btn-primary">
        أرسلي
      </button>
    </div>
  );
}
