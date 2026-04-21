"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HoverAnimatedBentoStep5() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex justify-center my-8 bg-neutral-950 p-12 rounded-xl border border-neutral-800 [perspective:1200px] hover:bg-neutral-900 transition-colors group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Hover to flip"
    >
      <motion.div 
        className="relative w-16 h-32 [transform-style:preserve-3d]"
        initial={false}
        animate={isHovered ? { rotateX: 0, rotateZ: 0, rotateY: 0 } : { rotateX: 60, rotateZ: 45, rotateY: 180 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        {/* Thickness */}
        <div className="absolute inset-0 bg-neutral-700 border-[2px] border-neutral-600 rounded-2xl [transform:translateZ(0px)]" />
        <div className="absolute inset-0 bg-neutral-700 border-neutral-600 rounded-2xl [transform:translateZ(-1px)]" />
        <div className="absolute inset-0 bg-neutral-700 border-neutral-600 rounded-2xl [transform:translateZ(-2px)]" />
        <div className="absolute inset-0 bg-neutral-800 border-neutral-700 rounded-2xl [transform:translateZ(-3px)]" />
        <div className="absolute inset-0 bg-neutral-800 border-neutral-700 rounded-2xl [transform:translateZ(-4px)]" />
        <div className="absolute inset-0 bg-neutral-800 border-[2px] border-neutral-700 rounded-2xl [transform:translateZ(-5px)]" />

        {/* Front Screen */}
        <div className="absolute inset-0 bg-neutral-950 border-[2px] border-neutral-700 rounded-2xl [backface-visibility:hidden] [transform:translateZ(1px)] flex flex-col overflow-hidden shadow-2xl">
          <div className="w-6 h-2 bg-neutral-900 mx-auto rounded-b-md mt-0.5 z-10" />
          <div className="flex-1 m-1 p-1 flex flex-col gap-1 justify-end">
             <div className="w-2/3 h-3 bg-neutral-800 rounded-md rounded-tl-sm self-start opacity-50" />
             <div className="w-3/4 h-3.5 bg-neutral-700 rounded-md rounded-tr-sm self-end" />
             <div className="w-1/2 h-3 bg-neutral-800 rounded-md rounded-tl-sm self-start opacity-70" />
             <div className="w-4/5 h-4 bg-neutral-700 rounded-md rounded-tr-sm self-end" />
          </div>
          <div className="h-5 mx-1 mb-1.5 bg-neutral-800 rounded-full flex items-center px-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-600" />
          </div>
        </div>

        {/* Detailed Back Panel */}
        <div className="absolute inset-0 bg-neutral-800 border-[2px] border-neutral-700 rounded-2xl [backface-visibility:hidden] [transform:translateZ(-6px)_rotateY(180deg)] p-1.5 shadow-xl">
           <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-neutral-700/80 rounded-[6px] border border-neutral-600/50 shadow-sm">
             {/* Twin Lens */}
             <div className="absolute top-[2px] left-[2px] w-[9px] h-[9px] rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner">
                 <div className="w-1 h-1 rounded-full bg-purple-900/40" />
             </div>
             <div className="absolute bottom-[2px] left-[2px] w-[9px] h-[9px] rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner">
                 <div className="w-1 h-1 rounded-full bg-purple-900/40" />
             </div>
             {/* LED Flash */}
             <div className="absolute top-1/2 -translate-y-1/2 right-[3px] w-1.5 h-1.5 rounded-full bg-neutral-200/50 shadow-[0_0_2px_rgba(255,255,255,0.6)]" />
             {/* LiDAR */}
             <div className="absolute top-1 right-[5px] w-0.5 h-0.5 rounded-full bg-neutral-950" />
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-neutral-600/30 flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-neutral-700/50" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
