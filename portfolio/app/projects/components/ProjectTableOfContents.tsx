"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

const HEADING_SELECTOR = "h2, h3";
const CONTENT_SELECTOR = "[data-project-content]";
const SECTION_OFFSET = 15;

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
  const [activeId, setActiveId] = useState<string | null>(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollTargetRef = useRef<string | null>(null);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const autoScrollEndHandlerRef = useRef<(() => void) | null>(null);

  const clearAutoScrollTimeout = () => {
    if (autoScrollTimeoutRef.current !== null) {
      window.clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }
  };

  const clearAutoScrollEndHandler = () => {
    if (autoScrollEndHandlerRef.current) {
      window.removeEventListener("scrollend", autoScrollEndHandlerRef.current);
      autoScrollEndHandlerRef.current = null;
    }
  };

  useEffect(() => {
    const contentRoot = document.querySelector(CONTENT_SELECTOR);

    if (!contentRoot) {
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

          // Re-apply IDs deterministically on each pass so anchor links are stable.
          heading.id = id;
          heading.style.scrollMarginTop = `${SECTION_OFFSET}px`;

          const level = Number(heading.tagName.replace("H", ""));

          return {
            id,
            text,
            level,
          } satisfies TocItem;
        })
        .filter((item): item is TocItem => item !== null);

      setItems(nextItems);
      setActiveId((prev) => {
        if (!nextItems.length) return null;
        if (prev && nextItems.some((item) => item.id === prev)) return prev;
        return nextItems[0].id;
      });
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

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) return;

    const getHeadingOffsets = () =>
      headings.map((heading) => ({
        id: heading.id,
        top: heading.getBoundingClientRect().top + window.scrollY,
      }));

    let headingOffsets = getHeadingOffsets();

    let ticking = false;

    const updateActiveFromScroll = () => {
      if (isAutoScrollingRef.current) {
        ticking = false;
        return;
      }

      const marker = window.scrollY + SECTION_OFFSET;
      let nextActiveId = headingOffsets[0].id;

      for (const heading of headingOffsets) {
        if (heading.top <= marker) {
          nextActiveId = heading.id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === nextActiveId ? prev : nextActiveId));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      if (!isAutoScrollingRef.current) {
        headingOffsets = getHeadingOffsets();
      }
      ticking = true;
      window.requestAnimationFrame(updateActiveFromScroll);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.requestAnimationFrame(updateActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [items]);

  useEffect(() => {
    return () => {
      clearAutoScrollTimeout();
      clearAutoScrollEndHandler();
    };
  }, []);

  const handleTocClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    clearAutoScrollTimeout();
    clearAutoScrollEndHandler();
    isAutoScrollingRef.current = true;
    autoScrollTargetRef.current = id;

    const releaseAutoScroll = () => {
      isAutoScrollingRef.current = false;
      autoScrollTargetRef.current = null;
      clearAutoScrollTimeout();
      clearAutoScrollEndHandler();
      window.dispatchEvent(new Event("scroll"));
    };

    autoScrollEndHandlerRef.current = () => {
      releaseAutoScroll();
    };

    window.addEventListener("scrollend", autoScrollEndHandlerRef.current, { once: true });

    autoScrollTimeoutRef.current = window.setTimeout(() => {
      releaseAutoScroll();
    }, 1600);

    setActiveId(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const hasItems = useMemo(() => items.length > 0, [items]);

  return (
    <aside className="sticky top-28 hidden h-fit w-64 shrink-0 md:block">
      <Link href="/" className="text-md cursor-none uppercase text-[#A08A6E] hover:text-[#503e26] transition-colors">
        back
      </Link>
      {!hasItems ? (
        <> </>
      ) : (
        <nav className="mt-3" aria-label="Project table of contents">
          <ul className="space-y-2 text-md">
            {items.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => handleTocClick(event, item.id)}
                  aria-current={activeId === item.id ? "location" : undefined}
                  className="group flex items-center gap-2 transition-colors cursor-none"
                  style={{ color: activeId === item.id ? "#514433" : "#817B73" }}
                >
                  {item.text}

                  <span
                    className="inline-flex h-3.5 w-3.5 items-center justify-center"
                    style={{ opacity: activeId === item.id ? 1 : 0 }}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 6.92773L13.5 -0.000469208L13.5 13.8559L0 6.92773Z" fill="#514433"/>
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
