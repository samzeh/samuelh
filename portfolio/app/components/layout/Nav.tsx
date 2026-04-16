"use client"

import { useState } from "react"
import Link from "next/link"

const navLinkClass =
  "text-[#71624D] text-[17px] transition-colors duration-200 hover:text-black hover:underline"

const mobileLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/play", label: "play" },
  { href: "/resume", label: "resume" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center">
      
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-7 font-sans">
        <Link href="/" className={navLinkClass}>
          home
        </Link>
        <Link href="/about" className={navLinkClass}>
          about
        </Link>
        <Link href="/play" className={navLinkClass}>
          play
        </Link>
        <Link href="/resume" className={navLinkClass}>
          resume
        </Link>
      </nav>

      {/* MOBILE BUTTON */}
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className="relative h-10 w-10 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-[#71624D] transition-all duration-300 ease-out ${
            open ? "translate-y-0 rotate-45" : "-translate-y-2"
          }`}
        />
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-[#71624D] transition-all duration-300 ease-out ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-[#71624D] transition-all duration-300 ease-out ${
            open ? "translate-y-0 -rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      {/* MOBILE MENU */}
      <div
        aria-hidden={!open}
        className={`absolute right-4 top-16 z-100 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-lg origin-top-right transition-all duration-250 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {mobileLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            tabIndex={open ? 0 : -1}
            className={`${navLinkClass} transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${index * 45}ms` : "0ms" }}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}