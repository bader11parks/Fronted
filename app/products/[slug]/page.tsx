import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/ProductLanding";
import { PRODUCTS, productBySlug } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return { title: "طقس" };
  return {
    title: p.pdpH1,
    description: p.pdpSub,
    alternates: { canonical: `/products/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  return (
    <div id="top">
      <ProductLanding product={product} />
    </div>
  );
}
