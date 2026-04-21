"use client";
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function HoverAnimatedBentoStep4() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);

  // Apply spring physics to raw mouse motion
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });

  // Map the container's width (assuming ~300px roughly) to back and forth rotation
  // Since this is a demo, let's just make it auto-rotate on hover instead of tracking mouse since mouse tracking requires inner complexity
  // The user states: "make the animation to run on hovering the group only".
  // The previous implementation was: `whileHover={{ rotateX: 0, rotateZ: 0, rotateY: 180, y: -20, scale: 1.2 }}`
  // Let's just fix it exactly like Step 3.

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
        <div className="absolute inset-0 bg-neutral-700 border-[2px] border-neutral-600 rounded-2xl [transform:translateZ(0px)]" />
        <div className="absolute inset-0 bg-neutral-800 border-[2px] border-neutral-700 rounded-2xl [transform:translateZ(-5px)]" />

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

      </motion.div>
    </div>
  );
}
