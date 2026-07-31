import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexSpace 租客員工行動工作台",
  description: "預約空間、參加活動、提出服務申請，一站完成。",
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
