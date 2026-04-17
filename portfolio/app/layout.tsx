import type { Metadata } from "next";
import { Aleo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Cursor from "./components/layout/Cursor";
import { CursorProvider } from "./components/layout/CursorContext";
import { Analytics } from '@vercel/analytics/react';

const aleo = Aleo({
  variable: "--font-aleo",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samuelh.vercel.app/"),
  title: "Samuel Huang",
  description: "a systems design engineering student @ uwaterloo who loves to create at the intersection of design + tech",
  openGraph: {
    title: "Samuel Huang",
    description: "a systems design engineering student @ uwaterloo who loves to create at the intersection of design + tech",
    images: ["/embed.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Huang",
    description: "a systems design engineering student @ uwaterloo who loves to create at the intersection of design + tech",
    images: ["/embed.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${aleo.variable} ${instrumentSans.variable} antialiased`}
    >
      <body>
        <CursorProvider>
          <Cursor />
          {children}
          <Analytics />
        </CursorProvider>
      </body>
    </html>
  );
}
