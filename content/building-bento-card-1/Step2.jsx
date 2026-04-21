"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function HoverAnimatedBentoStep2() {
  return (
    <div 
      className="flex justify-center my-8 bg-neutral-950 p-12 rounded-xl border border-neutral-800 [perspective:1200px]"
    >
      <motion.div 
        className="relative w-16 h-32 [transform-style:preserve-3d]"
        animate={{ rotateX: 60, rotateZ: 45, rotateY: 180 }}
      >
        <div className="absolute inset-0 bg-neutral-700 border-[2px] border-neutral-600 rounded-2xl [transform:translateZ(0px)]" />
        <div className="absolute inset-0 bg-neutral-700 border border-neutral-600 rounded-2xl [transform:translateZ(-1px)]" />
        <div className="absolute inset-0 bg-neutral-700 border border-neutral-600 rounded-2xl [transform:translateZ(-2px)]" />
        <div className="absolute inset-0 bg-neutral-800 border border-neutral-700 rounded-2xl [transform:translateZ(-3px)]" />
        <div className="absolute inset-0 bg-neutral-800 border border-neutral-700 rounded-2xl [transform:translateZ(-4px)]" />
        <div className="absolute inset-0 bg-neutral-800 border-[2px] border-neutral-700 rounded-2xl [transform:translateZ(-5px)]" />
      </motion.div>
    </div>
  );
}
