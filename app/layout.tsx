import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Inter - Clean, versatile font for both display and body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// JetBrains Mono - For code/technical elements
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Autorise | Your Web Partner for the AI Era",
  description:
    "We build high-performance websites and optimize your digital presence so customers find you—whether they're searching on Google or asking AI.",
  keywords: [
    "web development",
    "SEO",
    "AI visibility",
    "GEO",
    "AEO",
    "website design",
    "digital marketing",
  ],
  authors: [{ name: "Autorise" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Autorise | Your Web Partner for the AI Era",
    description:
      "Get found by Google, ChatGPT, and beyond. High-performance websites and AI-era visibility strategies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autorise | Your Web Partner for the AI Era",
    description:
      "Get found by Google, ChatGPT, and beyond. High-performance websites and AI-era visibility strategies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
