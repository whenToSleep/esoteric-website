import {
  Cormorant_SC,
  Cormorant_Garamond,
  Playfair_Display,
  Alegreya_SC,
  Forum,
  Prata,
  Oranienbaum,
  EB_Garamond,
  Spectral,
  Lora,
  Source_Serif_4,
  Cinzel,
} from "next/font/google";
import { setRequestLocale } from "next-intl/server";

const cormorantSC = Cormorant_SC({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const alegreyaSC = Alegreya_SC({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const forum = Forum({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  display: "swap",
});

const prata = Prata({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  display: "swap",
});

const oranienbaum = Oranienbaum({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spectral = Spectral({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzelCombo = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cormorantSCCombo = Cormorant_SC({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});

const texts = {
  latin: "MORI NORMAN",
  ru: "МОРИ НОРМАН — ПРОВОДНИК В МИР ЭЗОТЕРИКИ",
  uk: "МОРІ НОРМАН — ПРОВІДНИК У СВІТ ЕЗОТЕРИКИ",
};

type FontEntry = {
  name: string;
  className: string;
  weights: string;
  showWeights: { label: string; value: number }[];
  isCombo?: boolean;
  comboClassName?: string;
};

const fontEntries: FontEntry[] = [
  {
    name: "Cormorant SC",
    className: cormorantSC.className,
    weights: "300–700",
    showWeights: [
      { label: "400", value: 400 },
      { label: "700", value: 700 },
    ],
  },
  {
    name: "Cormorant Garamond",
    className: cormorantGaramond.className,
    weights: "300–700",
    showWeights: [
      { label: "400", value: 400 },
      { label: "700", value: 700 },
    ],
  },
  {
    name: "Playfair Display",
    className: playfairDisplay.className,
    weights: "400–900",
    showWeights: [
      { label: "400", value: 400 },
      { label: "900", value: 900 },
    ],
  },
  {
    name: "Alegreya SC",
    className: alegreyaSC.className,
    weights: "400–900",
    showWeights: [
      { label: "400", value: 400 },
      { label: "900", value: 900 },
    ],
  },
  {
    name: "Forum",
    className: forum.className,
    weights: "400",
    showWeights: [{ label: "400", value: 400 }],
  },
  {
    name: "Prata",
    className: prata.className,
    weights: "400",
    showWeights: [{ label: "400", value: 400 }],
  },
  {
    name: "Oranienbaum",
    className: oranienbaum.className,
    weights: "400",
    showWeights: [{ label: "400", value: 400 }],
  },
  {
    name: "EB Garamond",
    className: ebGaramond.className,
    weights: "400–800",
    showWeights: [
      { label: "400", value: 400 },
      { label: "800", value: 800 },
    ],
  },
  {
    name: "Spectral",
    className: spectral.className,
    weights: "300–700",
    showWeights: [
      { label: "400", value: 400 },
      { label: "700", value: 700 },
    ],
  },
  {
    name: "Lora",
    className: lora.className,
    weights: "400–700",
    showWeights: [
      { label: "400", value: 400 },
      { label: "700", value: 700 },
    ],
  },
  {
    name: "Source Serif 4",
    className: sourceSerif4.className,
    weights: "300–700",
    showWeights: [
      { label: "400", value: 400 },
      { label: "700", value: 700 },
    ],
  },
  {
    name: "COMBO: Cinzel (Latin) + Cormorant SC (Cyrillic)",
    className: cinzelCombo.className,
    weights: "Cinzel 400–900 / Cormorant SC 400–700",
    showWeights: [
      { label: "400", value: 400 },
      { label: "700", value: 700 },
    ],
    isCombo: true,
    comboClassName: cormorantSCCombo.className,
  },
];

function TextSamples({
  fontClass,
  weight,
  comboClass,
}: {
  fontClass: string;
  weight: number;
  comboClass?: string;
}) {
  const sizes = [
    { tag: "H1", px: 48 },
    { tag: "H2", px: 32 },
    { tag: "H3", px: 24 },
  ] as const;

  return (
    <div className="mb-8">
      {sizes.map(({ tag, px }) => (
        <div key={tag} className="mb-4">
          <span
            className="block text-xs uppercase tracking-widest mb-1"
            style={{ color: "#C0C0D0" }}
          >
            {tag} — {px}px — weight {weight}
          </span>

          {/* Latin — always uses the main font class */}
          <p
            className={fontClass}
            style={{ fontSize: px, fontWeight: weight, lineHeight: 1.2 }}
          >
            {texts.latin}
          </p>

          {/* Russian */}
          <p
            className={comboClass || fontClass}
            style={{ fontSize: px, fontWeight: weight, lineHeight: 1.2 }}
          >
            {texts.ru}
          </p>

          {/* Ukrainian */}
          <p
            className={comboClass || fontClass}
            style={{ fontSize: px, fontWeight: weight, lineHeight: 1.2 }}
          >
            {texts.uk}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function FontTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div
      className="min-h-screen px-6 py-12 lg:px-20"
      style={{ backgroundColor: "#0A0A0F", color: "#F0EAD6" }}
    >
      <header className="mb-12 font-sans">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#D4AF37" }}>
          Font Comparison — Cyrillic Support
        </h1>
        <p style={{ color: "#C0C0D0" }}>
          12 candidates to replace Cinzel for headings. Each font shows Latin,
          Russian, and Ukrainian text at H1 (48px), H2 (32px), H3 (24px).
        </p>
      </header>

      {fontEntries.map((entry, i) => (
        <section
          key={entry.name}
          className="py-12"
          style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}
        >
          <div className="mb-6 font-sans">
            <span
              className="text-lg font-mono"
              style={{ color: "#D4AF37" }}
            >
              #{i + 1}
            </span>
            <h2
              className="text-2xl font-bold"
              style={{ color: "#D4AF37" }}
            >
              {entry.name}
            </h2>
            <p className="text-sm" style={{ color: "#C0C0D0" }}>
              Weights: {entry.weights}
            </p>
          </div>

          {entry.showWeights.map((w) => (
            <TextSamples
              key={w.label}
              fontClass={entry.className}
              weight={w.value}
              comboClass={entry.isCombo ? entry.comboClassName : undefined}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
