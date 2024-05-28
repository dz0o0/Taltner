import "./globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taltner",
  description: "初対面の会話時に話題を提供するコミュニケーションの補助ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen bg-slate-200">{children}</body>
    </html>
  );
}
