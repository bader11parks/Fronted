import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EmailContactForm } from "@/components/EmailContactForm";
import { TrustPills } from "@/components/Guarantee";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata: Metadata = { title: "تواصلي" };

const wa = process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/9665XXXXXXXX";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-16 lg:py-20">
      <p className="text-[11px] tracking-[0.28em] text-ritual-bronze">قريبين</p>
      <h1 className="mt-3 font-display text-4xl">نحن قريبين</h1>
      <div className="hairline my-6" />
      <p className="leading-8 text-ritual-ink-soft">
        للطلبات أو تأخير الشحن أو سؤال عن التركيبة أو الضمان — اختاري الطريقة اللي تناسبكِ.
      </p>
      <p className="mt-2 text-sm text-ritual-ink-soft">الرياض، جدة، الدمام، وكل المملكة.</p>
      <TrustPills className="mt-6" />

      <section className="mt-12 border border-ritual-sand bg-ritual-paper p-6 md:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <WhatsAppIcon className="h-7 w-7 shrink-0 text-[#25D366]" />
          تواصلي عبر واتساب
        </h2>
        <p className="mt-3 text-sm leading-7 text-ritual-ink-soft">
          للطلبات أو تأخير الشحن أو سؤال عن التركيبة أو الضمان — واتساب أسرع. نرد خلال ٢٤ ساعة.
        </p>
        <a href={wa} className="btn-primary mt-6 inline-block">
          واتساب
        </a>
        <ContactForm />
      </section>

      <section className="mt-8 border border-ritual-sand bg-ritual-cream p-6 md:p-8">
        <h2 className="font-display text-2xl">✉️ نتواصل معكِ بالإيميل</h2>
        <p className="mt-3 text-sm leading-7 text-ritual-ink-soft">
          تفضلين الإيميل؟ اكتبي رسالتكِ ونرد عليكِ خلال ٢٤ ساعة.
        </p>
        <EmailContactForm />
      </section>
    </div>
  );
}
