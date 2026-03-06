import { Cinzel, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
