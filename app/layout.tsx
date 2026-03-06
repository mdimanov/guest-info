import { Suspense } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "./context/LangContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dimanov Apartments",
  description: "Guest Information Portal",
  openGraph: {
    title: "Dimanov Apartments",
    description: "Guest Information Portal",
    url: "https://guest-info-nu.vercel.app/",
    images: [
      {
        url: "https://guest-info-nu.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <LangProvider>{children}</LangProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
