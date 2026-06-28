import { Lexend, Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const fontVariables = `${sora.variable} ${lexend.variable}`;
