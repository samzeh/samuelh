/**
 * Full-viewport layer above the marketing shell (no white card / footer here).
 * z-30: above footer (z-0); custom cursor stays at z-50.
 *
 * Inner `min-h-0 flex-1` avoids flex min-height:auto collapsing the pan/zoom viewport
 * when the child uses percentage height instead of vh.
 */
export default function PlayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="fixed inset-0 z-30 flex h-dvh w-full flex-col bg-gray-50">
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
