import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/language-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { themeScript } from "@/lib/theme-script";
import { getImagePath } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yoga-transformation.vercel.app'),
  title: "14-Day Yoga Transformation | Transform Your Mind & Body",
  description: "Join our comprehensive 14-day yoga journey designed to transform your mind and body. Suitable for all levels with expert guidance.",
  keywords: "yoga, transformation, mindfulness, fitness, wellness, meditation",
  authors: [{ name: "Yoga Transformation Team" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yoga Transform",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoga-transformation.vercel.app",
    siteName: "14-Day Yoga Transformation",
    title: "Transform Your Mind & Body in 14 Days",
    description: "Join thousands on a journey to transform your mind and body with our expert-guided yoga program.",
    images: [
      {
        url: getImagePath("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "14-Day Yoga Transformation Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "14-Day Yoga Transformation",
    description: "Transform your mind and body with expert-guided yoga sessions. Start your journey today!",
    images: [getImagePath("/og-image.png")],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 ease-in-out`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
