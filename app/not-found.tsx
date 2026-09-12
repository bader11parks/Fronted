import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[600px] px-4 py-24 text-center">
      <h1 className="font-display text-4xl">هالصفحة مو هنا</h1>
      <p className="mt-4 text-ritual-ink-soft">ارجعي للبيت، الطقوس موجودة.</p>
      <Link href="/" className="btn-primary mt-8 inline-block">
        الرئيسية
      </Link>
    </div>
  );
}
