"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hyperlink(props: {
  href: string;
  text: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setCanHoverPreview(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <span className="relative inline-flex">
      {props.imageSrc && canHoverPreview && (
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-[calc(100%+10px)] transition-opacity duration-200"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <Image
            src={props.imageSrc}
            alt={props.imageAlt ?? ""}
            width={200}
            height={100}
            className="w-50 h-auto max-w-none rounded-md object-cover shadow-xl border"
          />
        </div>
      )}

      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => canHoverPreview && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="underline underline-offset-2 decoration-2 decoration-dashed decoration-orange-400 hover:text-[#3a2a25] hover:decoration-orange-600 transition-colors duration-200">
        {props.text}
      </a>
    </span>
  );
}