"use client";

import { IoArrowForward } from "react-icons/io5";
import { useCursorContext } from "@/app/components/layout/CursorContext";

const CURSOR_LABEL = "view substack";

type Props = {
  href: string;
};

export default function SubstackCircleLink({ href }: Props) {
  const { setCursorLabel } = useCursorContext();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center flex-shrink-0 self-start mt-[calc(219px/2-1rem)] -ml-2"
      onMouseEnter={() => setCursorLabel(CURSOR_LABEL)}
      onMouseLeave={() => setCursorLabel(null)}
    >
      <div className="w-12 h-12 rounded-full bg-[#F5900B] flex items-center justify-center hover:scale-105 transition-transform">
        <IoArrowForward className="text-white text-2xl" />
      </div>
    </a>
  );
}
