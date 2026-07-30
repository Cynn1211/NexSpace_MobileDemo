import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexSpace 租客員工",
  description: "NexSpace 租客員工行動原型",
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
