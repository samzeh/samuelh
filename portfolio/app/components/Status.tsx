import React from 'react'

const Status = () => {
  return (
    <div className="p-px rounded-full bg-gradient-to-tr from-[#FFFFFF] to-[#EAE8E2] inline-block">
      <div className="flex items-center gap-2 bg-gradient-to-tr from-[#F4F3EF] via-[#FFFFFF] to-[#F4F3EF] px-3 py-2 rounded-full shadow-[0_0_4px_0_rgba(204,202,193,0.5)]">
        <div className="relative w-2.5 h-2.5 flex items-center justify-center">
          <span className="absolute w-3.5 h-3.5 bg-[#B6EEAA] rounded-full opacity-100 animate-slow-ping" />
          <div className="relative w-2.5 h-2.5 rounded-full bg-[#58C83F] opacity-100" />
        </div>
        <div className="text-base font-sans text-[#71624D] font-normal tracking-[-0.08em]">
          seeking fall 2026 internships
        </div>
      </div>
    </div>
  )
}

export default Status