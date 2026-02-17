import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayerData Support Hub | Powered by HummingAgent",
  description: "AI-powered support intelligence for PlayerData",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
