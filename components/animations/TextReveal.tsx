"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  type?: "blur" | "words" | "lines";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

const ease = [0.17, 0.55, 0.55, 1] as const;

// --- Lines variant (original behavior) ---

function LinesReveal({ text, Tag, className, delay }: {
  text: string; Tag: keyof React.JSX.IntrinsicElements; className?: string; delay: number;
}) {
  const lines = text.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.075,
              ease,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// --- Words variant ---

const wordsContainerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

function WordsReveal({ text, Tag, className, delay }: {
  text: string; Tag: keyof React.JSX.IntrinsicElements; className?: string; delay: number;
}) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      variants={wordsContainerVariants}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={wordVariants}
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

// --- Blur variant ---

const blurContainerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.02, delayChildren: delay },
  }),
};

const charVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease },
  },
};

function BlurReveal({ text, Tag, className, delay }: {
  text: string; Tag: keyof React.JSX.IntrinsicElements; className?: string; delay: number;
}) {
  const chars = text.split("").map((ch) => (ch === " " ? "\u00A0" : ch));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      variants={blurContainerVariants}
    >
      <Tag className={className}>
        {chars.map((char, i) => (
          <motion.span key={i} className="inline-block" variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

// --- Main component ---

export function TextReveal({
  text,
  type = "lines",
  as: Tag = "h1",
  className,
  delay = 0,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  switch (type) {
    case "blur":
      return <BlurReveal text={text} Tag={Tag} className={className} delay={delay} />;
    case "words":
      return <WordsReveal text={text} Tag={Tag} className={className} delay={delay} />;
    case "lines":
    default:
      return <LinesReveal text={text} Tag={Tag} className={className} delay={delay} />;
  }
}
