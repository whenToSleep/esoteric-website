"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "preloader-shown";
const DRAW_DURATION = 2;
const HOLD_DURATION = 400;
const ease = [0.17, 0.55, 0.55, 1] as const;

// Pentagram star path (5-pointed, inscribed in ~200×200 viewBox)
const STAR_PATH =
  "M 100 10 L 123.5 72.6 L 190.2 72.6 L 135.3 112.1 L 153.9 174.7 L 100 136 L 46.1 174.7 L 64.7 112.1 L 9.8 72.6 L 76.5 72.6 Z";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        document.body.style.overflow = "hidden";
        setShow(true);
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing in some browsers)
    }
  }, [reducedMotion]);

  const handleDrawComplete = useCallback(() => {
    setTimeout(() => setShow(false), HOLD_DURATION);
  }, []);

  const handleExitComplete = useCallback(() => {
    setExited(true);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  if (reducedMotion || exited) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-void"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease }}
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.path
              d={STAR_PATH}
              stroke="#C9A84C"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: DRAW_DURATION, ease },
                opacity: { duration: 0.4 },
              }}
              onAnimationComplete={handleDrawComplete}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
