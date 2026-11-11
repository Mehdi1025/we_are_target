"use client";

import { motion } from "motion/react";
import { pageEnter } from "@/lib/motion";

/** Entrée de chaque page, jouée pendant que le rideau se lève */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageEnter} initial="initial" animate="enter">
      {children}
    </motion.div>
  );
}
