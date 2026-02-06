import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from '../components/AuthProvider';
import Header from '../components/Header';
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import GoogleAnalytics from "../components/GoogleAnalytics";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
  organizationJsonLd,
  webApplicationJsonLd,
  websiteJsonLd,
} from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },
  formatDetection: { telephone: false, address: false, email: false },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  robots:
    process.env.VERCEL_ENV === "production"
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [websiteJsonLd(), organizationJsonLd(), webApplicationJsonLd()];

  return (
    <html lang="en">
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body
        className="antialiased bg-blue-50 min-h-screen"
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
