import { Bowlby_One_SC, DM_Mono } from "next/font/google";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  variable: "--font-bowlby-sc",
  display: "swap",
  weight: "400",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const fontVariables = `${bowlby.variable} ${dmMono.variable}`;
