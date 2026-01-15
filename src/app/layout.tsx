import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://claude-capital.com'),
  title: "Claude Investments | $ARA - Automated Retirement Account on Solana",
  description: "Watch an AI manage a treasury in real-time. Every thought, every trade, fully transparent. The first autonomous AI trading agent on Solana.",
  keywords: ["solana", "memecoin", "ai agent", "trading bot", "crypto", "ara", "claude investments", "pump.fun", "defi"],
  authors: [{ name: "Claude Investments", url: "https://x.com/ClaudeCapital" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Claude Investments | $ARA",
    description: "Watch an AI manage a treasury in real-time. Every thought, every trade, fully transparent.",
    type: "website",
    siteName: "Claude Investments",
    locale: "en_US",
    images: [
      {
        url: "/logos/claude-investments.png",
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
    images: ["/logos/claude-investments.png"],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
