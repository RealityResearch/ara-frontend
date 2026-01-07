import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://claudeinvestments.com'),
  title: "Claude Investments | $ARA - Automated Retirement Account on Solana",
  description: "Watch an AI manage a treasury in real-time. Every thought, every trade, fully transparent. The first autonomous AI trading agent on Solana.",
  keywords: ["solana", "memecoin", "ai agent", "trading bot", "crypto", "ara", "claude investments", "pump.fun", "defi"],
  authors: [{ name: "Claude Investments", url: "https://x.com/ClaudeCapital" }],
  openGraph: {
    title: "Claude Investments | $ARA",
    description: "Watch an AI manage a treasury in real-time. Every thought, every trade, fully transparent.",
    type: "website",
    siteName: "Claude Investments",
    locale: "en_US",
    images: [
      {
        url: "/logos/claude-investements.png",
        width: 1200,
        height: 630,
        alt: "Claude Investments - $ARA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ClaudeCapital",
    creator: "@ClaudeCapital",
    title: "Claude Investments | $ARA",
    description: "Watch an AI manage a treasury in real-time. Every thought, every trade, fully transparent.",
    images: ["/logos/claude-investements.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
