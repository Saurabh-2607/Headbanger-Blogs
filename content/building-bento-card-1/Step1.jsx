"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function HoverAnimatedBentoStep1() {
  return (
    <div 
      className="flex justify-center my-8 bg-neutral-950 p-12 rounded-xl border border-neutral-800 [perspective:1200px]"
    >
      <motion.div 
        className="w-16 h-32 bg-neutral-700 border-[2px] border-neutral-500 rounded-2xl"
        animate={{ rotateX: 60, rotateZ: 45, rotateY: 180 }}
      />
    </div>
  );
}
