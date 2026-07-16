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
      default: "声场 VOXFIELD｜让表达成为你的影响力",
      template: "%s｜声场 VOXFIELD",
    },
    description:
      "面向职场表达、公开演讲与商业路演的中文训练平台，用结构、声音与现场感，让每一次表达更清晰、更有力量。",
    keywords: ["演讲训练", "职场表达", "公开演讲", "商业路演", "沟通课程"],
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: baseUrl,
      siteName: "声场 VOXFIELD",
      title: "让每一次表达，都有清晰的力量",
      description: "结构化表达、声音控制与现场影响力训练。",
      images: [
        {
          url: baseUrl + "/og.png",
          width: 1659,
          height: 948,
          alt: "声场 VOXFIELD 演讲训练平台",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "声场 VOXFIELD",
      description: "让每一次表达，都有清晰的力量。",
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
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
