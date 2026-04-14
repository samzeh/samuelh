import FooterContent from "@/app/components/FooterContent";
import Nav from "@/app/components/Nav";
import Status from "@/app/components/Status";

const FOOTER_REVEAL_HEIGHT = "30rem";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <footer
        className="fixed bottom-0 left-0 right-0 z-0 bg-[#FFFCF9]"
        style={{ height: FOOTER_REVEAL_HEIGHT }}
      >
        <FooterContent />
      </footer>
      <div className="relative z-10 pointer-events-none">
        <div className="flex min-h-screen flex-col bg-white p-4 shadow-[0_0_23.4px_rgba(81,68,51,0.25)] pointer-events-auto md:p-10">
          <header className="flex shrink-0 items-center justify-between pb-0.5 md:pb-8">
            <Status />
            <Nav />
          </header>
          <main className="flex min-h-0 w-full flex-1 flex-col">{children}</main>
        </div>
        <div aria-hidden style={{ height: FOOTER_REVEAL_HEIGHT }} />
      </div>
    </>
  );
}
