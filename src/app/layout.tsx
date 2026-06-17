import type { Metadata } from "next";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";



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
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
