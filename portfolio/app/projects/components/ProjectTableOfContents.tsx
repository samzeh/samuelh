"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

const HEADING_SELECTOR = "h2, h3";
const CONTENT_SELECTOR = "[data-project-content]";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProjectTableOfContents() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const contentRoot = document.querySelector(CONTENT_SELECTOR);

    if (!contentRoot) {
      setItems([]);
      return;
    }

    const collectHeadings = () => {
      const headings = Array.from(contentRoot.querySelectorAll<HTMLElement>(HEADING_SELECTOR));
      const slugCounts = new Map<string, number>();

      const nextItems = headings
        .map((heading) => {
          const text = heading.textContent?.trim() ?? "";

          if (!text) {
            return null;
          }

          const baseId = slugify(text) || "section";
          const seen = slugCounts.get(baseId) ?? 0;
          slugCounts.set(baseId, seen + 1);
          const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

          if (!heading.id) {
            heading.id = id;
          }

          const level = Number(heading.tagName.replace("H", ""));

          return {
            id: heading.id,
            text,
            level,
          } satisfies TocItem;
        })
        .filter((item): item is TocItem => item !== null);

      setItems(nextItems);
    };

    collectHeadings();

    const observer = new MutationObserver(collectHeadings);
    observer.observe(contentRoot, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [pathname]);

  const hasItems = useMemo(() => items.length > 0, [items]);

  return (
    <aside className="sticky top-28 hidden h-fit w-64 shrink-0 md:block">
      <p className="text-xs uppercase tracking-[0.2em] text-[#A08A6E]">On this page</p>
      {!hasItems ? (
        <p className="mt-3 text-sm text-detail-color">Add h2/h3 headings to populate this table of contents.</p>
      ) : (
        <nav className="mt-3" aria-label="Project table of contents">
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  className="text-[#71624D] transition-colors hover:text-[#514433]"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
