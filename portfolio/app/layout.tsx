import type { Metadata } from "next";
import { Aleo, Instrument_Sans } from "next/font/google";
import Status from "./components/Status";
import "./globals.css";
import Cursor from "./components/Cursor";
import { CursorProvider } from "./components/CursorContext";
import FooterContent from "./components/FooterContent";
import Link from "next/link";

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
      <footer className="fixed bottom-0 left-0 right-0 z-0 h-120 bg-[#FFFCF9]">
        <FooterContent />
      </footer>
      <div className="relative z-10 pointer-events-none">
        <div className="bg-white shadow-[0_0_23.4px_rgba(81,68,51,0.25)] flex flex-col p-10 min-h-screen pointer-events-auto">
          <header className="flex items-center justify-between pb-8">
          <Status />
          <nav className="flex gap-8 font-sans text-[#71624D] text-lg">
            <Link href="/" className="cursor-none hover:text-[#514433] transition-colors">home</Link>
            <Link href="/about" className="cursor-none hover:text-[#514433] transition-colors">about</Link>
            <Link href="/play" className="cursor-none hover:text-[#514433] transition-colors">play</Link>
            <Link href="/resume" className="cursor-none hover:text-[#514433] transition-colors">resume</Link>
          </nav>
        </header>
        {children}
        </div>
        {/* scroll spacer to reveal fixed footer behind */}
        <div aria-hidden className="h-110" />
      </div>
    </CursorProvider>
  </body>
</html>
  );
}
