/** Illustrative copy for layout — replace with real UGC when available. */
export const REVIEWS_ARE_ILLUSTRATIVE = true;

export type Review = {
  name: string;
  city: string;
  ritual: string;
  stars: 4 | 5;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "نورة",
    city: "الرياض",
    ritual: "matcha-theanine",
    stars: 5,
    text: "القهوة كانت تعصبني الصباح. الماتشا هذي شيء ثاني — صاحية وهادية في نفس الوقت.",
  },
  {
    name: "لمى",
    city: "جدة",
    ritual: "cacao-ashwagandha",
    stars: 5,
    text: "الكاكاو بعد الشغل صار طقس. أحس إني أرجع بنفسي قبل ما أدخل البيت.",
  },
  {
    name: "سارة",
    city: "الخبر",
    ritual: "magnesium-night",
    stars: 5,
    text: "المغنيسيوم ما هو سحر، بس روتين الليل صار أسهل. أطفّي المطبخ وأعمل فنجان.",
  },
  {
    name: "هند",
    city: "الدمام",
    ritual: "matcha-theanine",
    stars: 5,
    text: "أخذتها لأن شكل الموقع فخم. الطعم أخضر نظيف، وما صرت أزيد قهوة ثانية.",
  },
  {
    name: "مها",
    city: "الرياض",
    ritual: "cacao-ashwagandha",
    stars: 4,
    text: "غالي بس الشكل والفنجان يستاهل لو تبين شيء فخم مو كيس.",
  },
  {
    name: "جواهر",
    city: "مكة",
    ritual: "magnesium-night",
    stars: 5,
    text: "قبل النوم كنت ألف السرير. الحين أسوي فنجان وأ Scroll أقل. مو حبة، طقس.",
  },
  {
    name: "ريم",
    city: "جدة",
    ritual: "matcha-theanine",
    stars: 5,
    text: "اجتماعات الصباح صارت أهدى. إل-ثيانين مو كلام إعلان عندي، أحس فرق العصبية.",
  },
  {
    name: "العنود",
    city: "الخبر",
    ritual: "cacao-ashwagandha",
    stars: 5,
    text: "وسط اليوم كنت أنفجر على الفاضي. الكاكاو دقيقة، وبعدها صوتي ينزل.",
  },
  {
    name: "لينا",
    city: "الرياض",
    ritual: "magnesium-night",
    stars: 4,
    text: "الطعم لطيف مو مر. كنت أتوقع سحر نوم فوري — هو روتين أكثر، وهذا صدق.",
  },
  {
    name: "شهد",
    city: "أبها",
    ritual: "matcha-theanine",
    stars: 5,
    text: "طلبت حبتين عشان الشهر. الدفع عند الاستلام ريّحني، والمندوبة كانت واضحة.",
  },
  {
    name: "دانة",
    city: "جدة",
    ritual: "cacao-ashwagandha",
    stars: 5,
    text: "حطيته جنب العود في المطبخ. البنات يسألون عنه. هذا اللي أبي — مو علبة صيدلية.",
  },
  {
    name: "أروى",
    city: "المدينة",
    ritual: "magnesium-night",
    stars: 5,
    text: "أخذت الثلاثة. الصباح للماتشا، الظهر كاكاو، الليل يقفل. يوم مرتب أخيراً.",
  },
];
