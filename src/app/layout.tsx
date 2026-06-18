
import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Navbar from "@/components/Navbar";

// Configure Bebas Neue (Note: it only comes in a 400 weight)
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

// Configure JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  // Optional: specify weights if you don't want to load all 100-800 weights
  weight: ['400', '700'], 
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A portfolio website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
