import type { Metadata } from "next";
import { Aleo, Instrument_Sans } from "next/font/google";
import Status from "./components/Status";
import "./globals.css";

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
      className={`${aleo.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col p-8">
        <header className="flex items-center justify-between pb-8">
          <Status />
          <nav className="flex gap-8 font-sans text-[#71624D] text-lg">
            <div>
              home
            </div>
            <div>
              about
            </div>
            <div>
              play
            </div>
            <div>
              resume
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
