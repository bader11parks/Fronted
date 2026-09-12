export type OfferId = "one" | "two" | "three";

export const CATALOG_VERSION = 1;

export const OFFERS: Record<OfferId, { qty: number; halalas: number; sar: number }> = {
  one: { qty: 1, halalas: 17900, sar: 179 },
  two: { qty: 2, halalas: 27900, sar: 279 },
  three: { qty: 3, halalas: 37900, sar: 379 },
};

export const UPSELL_SAR = 109;
export const DEFAULT_OFFER: OfferId = "two";

const CART_PROMO_TIERS: Record<1 | 2 | 3, number> = { 1: 179, 2: 279, 3: 379 };

export function promoTotalForQty(qty: number): number {
  if (qty <= 0) return 0;
  const groups = Math.floor(qty / 3);
  const remainder = qty % 3;
  return groups * CART_PROMO_TIERS[3] + (remainder > 0 ? CART_PROMO_TIERS[remainder as 1 | 2] : 0);
}

export type ProductSlug = "matcha-theanine" | "cacao-ashwagandha" | "magnesium-night";

export type Product = {
  sku: string;
  slug: ProductSlug;
  nameAr: string;
  houseName: string;
  ritualSlot: string;
  kicker: string;
  heading: string;
  sub: string;
  microProof: string;
  pdpH1: string;
  pdpSub: string;
  pdpCta: string;
};

export const PRODUCTS: Product[] = [
  {
    sku: "MR-MATCHA",
    slug: "matcha-theanine",
    nameAr: "ماتشا مع إل-ثيانين لطاقة هادئة ومتوازنة",
    houseName: "طقس الصباح",
    ritualSlot: "صباح",
    kicker: "طقس الصباح",
    heading: "طاقة هادئة من أول فنجان",
    sub: "ماتشا مع إل-ثيانين — صحو بدون عصبية القهوة.",
    microProof: "تركيبة للتركيز الهادئ",
    pdpH1: "طاقة هادئة… تمشي معكِ طول الصباح",
    pdpSub: "ماتشا مع إل-ثيانين. صحو صافي، بدون دراما القهوة.",
    pdpCta: "أضيفي طقس الصباح للسلة",
  },
  {
    sku: "MR-CACAO",
    slug: "cacao-ashwagandha",
    nameAr: "كاكاو مع أشواغاندا للحظات من الهدوء وسط يومك",
    houseName: "طقس الظهر",
    ritualSlot: "وسط اليوم",
    kicker: "طقس وسط اليوم",
    heading: "هدوء له طعم دافئ",
    sub: "كاكاو مع أشواغاندا — لحظة تنزل فيها درجة اليوم.",
    microProof: "للتوتر اللي يتراكم بعد الظهر",
    pdpH1: "دقيقة هدوء في نص الزحمة",
    pdpSub: "كاكاو دافئ مع أشواغاندا. للنزول الخفيف وسط اليوم.",
    pdpCta: "أضيفي طقس الظهر للسلة",
  },
  {
    sku: "MR-NIGHT",
    slug: "magnesium-night",
    nameAr: "مشروب المغنيسيوم لروتين هادئ قبل النوم",
    houseName: "طقس الليل",
    ritualSlot: "قبل النوم",
    kicker: "طقس الليل",
    heading: "هبوط ناعم قبل النوم",
    sub: "مشروب مغنيسيوم — روتين يقفل اليوم برفق.",
    microProof: "للعقل اللي يرفض ينطفي",
    pdpH1: "قفلي اليوم قبل ما الجوال يفتحه من جديد",
    pdpSub: "مشروب مغنيسيوم لروتين الليل. هبوط ناعم، مو ضربة نوم.",
    pdpCta: "أضيفي طقس الليل للسلة",
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function otherProducts(sku: string): Product[] {
  return PRODUCTS.filter((p) => p.sku !== sku);
}
