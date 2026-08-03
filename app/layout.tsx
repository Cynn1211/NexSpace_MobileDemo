import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://nexspace-tenant-prototype.clovidiel.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NexSpace 租客員工行動工作台",
  description: "預約空間、參加活動、提出服務申請，一站完成。",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "NexSpace",
    title: "NexSpace 租客員工行動工作台",
    description: "預約空間、參加活動、提出服務申請，一站完成。",
    images: [
      {
        url: "/nexspace-v11-social-card.png",
        width: 1200,
        height: 630,
        alt: "NexSpace 租客員工行動工作台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexSpace 租客員工行動工作台",
    description: "預約空間、參加活動、提出服務申請，一站完成。",
    images: ["/nexspace-v11-social-card.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
