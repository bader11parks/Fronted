import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FAQS } from "@/lib/copy";

export const metadata: Metadata = { title: "أسئلة" };

export default function FaqPage() {
  return (
    <div className="pb-12">
      <div className="mx-auto max-w-[760px] px-4 pt-16">
        <h1 className="font-display text-4xl">أسئلة</h1>
        <p className="mt-3 text-ritual-ink-soft">الدفع، التأكيد، الضمان، والتركيبة — بهدوء ومن دون مبالغة طبية.</p>
      </div>
      <FaqList items={FAQS} />
      <div className="px-4 pb-16 text-center">
        <Link href="/collections" className="btn-primary inline-block">
          ارجعي للطقوس
        </Link>
      </div>
    </div>
  );
}
