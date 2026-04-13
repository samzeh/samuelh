import type { Metadata } from "next";
import { Aleo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import { CursorProvider } from "./components/CursorContext";

const aleo = Aleo({
  variable: "--font-aleo",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samuel Huang",
  description: "my portfolio",
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
        </CursorProvider>
      </body>
    </html>
  );
}
