import React from 'react'
import ImageFrame from './components/ImageFrame'
import { AnimatedName } from './components/AnimatedName'
import { FaBriefcase } from "react-icons/fa";
import Image from 'next/image';


const Home = () => {
  return (
    <main className="flex flex-col mt-7 mx-2">
      <div className="flex flex-row items-center gap-3">
        <ImageFrame src="/me.png" alt="profile picture" size="70px" rotation="-7.1deg"/>
        <h1 className="text-5xl mt-5 ml-1">i'm</h1>
        <div className="mb-3.5 ml-1 flex items-start gap-1 relative">
          <AnimatedName />
          <span className="text-lg text-[#FF9500] font-medium absolute top-0 -right-6" style={{ animation: 'fadeIn 0.2s ease-in-out 1.3s forwards', opacity: 0 }}>
            [1]
          </span>
          <style>{`
            @keyframes fadeIn {
              to { opacity: 1; }
            }
          `}</style>
        </div>
      </div>
      
      <div className="text-3xl flex gap-1">
        a <span className="font-[550] text-[#0CAEFF]">builder</span><span className="text-lg text-[#0CAEFF] font-medium -mt-1.5">[2]</span> who loves to create at the
      </div>

      <div className="text-3xl flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <span className="-mt-1">intersection of </span>
          <div className="flex -space-x-4 -mt-[2.5px]">
            <ImageFrame src="/lelamp.png" alt="lelamp" size="45px" rotation="-8.54deg" delay="0.08s"/>
            <ImageFrame src="/socratica.png" alt="socratica" size="45px" rotation="5.14deg" className="relative z-10" delay="0.16s"/>
            <ImageFrame src="/painting.png" alt="painting" size="45px" rotation="-1.39deg" delay="0.24s"/>
          </div>
          
          <span className="font-[550] text-[#1BAD0B] -mt-1">design + tech</span>
          <span className="text-lg text-[#1BAD0B] font-medium align-top -mt-5">[3]</span>
        </div>
        <hr className="border-t border-[#C0BDB9] -mt-2 w-45" />
      </div>

      <div className="flex items-center gap-1.5 text-[18px] text-detail mt-1.5">
        <FaBriefcase className="text-detail" />
        <span className="text-detail">curr. tpm</span>
        <Image src="/needlist.png" alt="needlist logo" width={20} height={20} className="rounded"/>
        <span className="text-detail">needlist.org, swe</span>
        <Image src="/watai.png" alt="watai logo" width={20} height={20} className="rounded"/>
        <span className="text-detail">wat.ai</span>
      </div>
    </main>
  )
}

export default Home