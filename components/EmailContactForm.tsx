"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { isValidEmail } from "@/lib/email";
import { isValidName } from "@/lib/phone";

export function EmailContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr("");
    if (!isValidName(name) || !isValidEmail(email) || message.trim().length < 3) {
      setErr("كمّلي الاسم والإيميل والرسالة.");
      return;
    }
    setBusy(true);
    try {
      await apiPost("/leads/email", { name, email, message });
      setOk(true);
    } catch {
      setErr("ما وصلنا الطلب. جرّبي مرة ثانية أو واتساب.");
    } finally {
      setBusy(false);
    }
  }

  if (ok) return <p className="mt-6 text-ritual-success">وصلنا طلبكِ. نتواصل معكِ بالإيميل خلال ٢٤ ساعة.</p>;

  return (
    <div className="mt-6 max-w-md space-y-3">
      <label className="block text-sm">
        الاسم
        <input
          autoComplete="name"
          className="mt-1 w-full border border-ritual-sand bg-ritual-paper px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        الإيميل
        <input
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="name@example.com"
          className="input-ltr-end mt-1 w-full border border-ritual-sand bg-ritual-paper px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        الرسالة
        <textarea
          className="mt-1 w-full border border-ritual-sand bg-ritual-paper px-3 py-2"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      {err ? <p className="text-sm text-ritual-danger">{err}</p> : null}
      <button type="button" disabled={busy} onClick={() => void submit()} className="btn-primary">
        أرسلي الطلب
      </button>
    </div>
  );
}
