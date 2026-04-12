"use client"

import { useState } from "react"
import Link from "next/link"

const navLinkClass =
  "text-[#71624D] text-lg transition-colors duration-200 hover:text-black hover:underline"

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center">
      
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-8 font-sans">
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
        className="md:hidden text-[#71624D] text-lg"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-16 z-100 right-4 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 md:hidden">
          <Link href="/" className={navLinkClass} onClick={() => setOpen(false)}>
            home
          </Link>
          <Link href="/about" className={navLinkClass} onClick={() => setOpen(false)}>
            about
          </Link>
          <Link href="/play" className={navLinkClass} onClick={() => setOpen(false)}>
            play
          </Link>
          <Link href="/resume" className={navLinkClass} onClick={() => setOpen(false)}>
            resume
          </Link>
        </div>
      )}
    </div>
  )
}