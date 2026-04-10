"use client"

import { useState } from "react"
import Link from "next/link"

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center">
      
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-8 font-sans text-[#71624D] text-lg">
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/play">play</Link>
        <Link href="/resume">resume</Link>
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
        <div className="absolute top-16 z-100 right-4 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 text-[#71624D] md:hidden">
          <Link href="/" onClick={() => setOpen(false)}>home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>about</Link>
          <Link href="/play" onClick={() => setOpen(false)}>play</Link>
          <Link href="/resume" onClick={() => setOpen(false)}>resume</Link>
        </div>
      )}
    </div>
  )
}