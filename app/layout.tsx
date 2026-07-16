import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const baseUrl = protocol + "://" + host;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "VOXFIELD | Speak with Clarity and Impact",
      template: "%s | VOXFIELD",
    },
    description:
      "A practical speaking academy for workplace communication, public presentations, and business pitches.",
    keywords: ["public speaking training", "workplace communication", "presentation skills", "business pitching"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: "VOXFIELD",
      title: "Make Every Word Land With Clarity",
      description: "Training in message structure, vocal control, and confident presence.",
      images: [
        {
          url: baseUrl + "/og.png",
          width: 1660,
          height: 948,
          alt: "VOXFIELD speaking academy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "VOXFIELD",
      description: "Make every word land with clarity.",
      images: [baseUrl + "/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
