"use client";
import { motion } from "framer-motion";
import { scaleStamp, viewport } from "../lib/motion";

/**
 * Green pill leaf used as a section heading accent.
 * Self-contained whileInView scale-stamp animation.
 */
export function SectionLeaf() {
  return (
    <motion.div
      className="w-[117px] h-[72px] rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px] bg-[#2dba5d] shrink-0"
      variants={scaleStamp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    />
  );
}
