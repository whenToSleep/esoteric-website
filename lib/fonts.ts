import { Cormorant_SC, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const heading = Cormorant_SC({
  subsets: ["cyrillic", "latin"],
  weight: "700",
  variable: "--font-heading",
  display: "swap",
});
