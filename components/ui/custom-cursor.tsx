"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const SPRING_CONFIG = { stiffness: 150, damping: 20, mass: 0.5 };

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  useEffect(() => {
    if (reducedMotion) return;

    // Only show on fine pointer devices (mouse)
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseout", handleMouseOut, { passive: true });

    // Handle pointer type changes (e.g. tablet docking)
    const handlePointerChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
      } else {
        setIsVisible(true);
        document.body.classList.add("custom-cursor-active");
      }
    };
    mq.addEventListener("change", handlePointerChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      mq.removeEventListener("change", handlePointerChange);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [reducedMotion, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot — follows immediately */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99990] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden="true"
      />
      {/* Ring — follows with spring lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99990] h-8 w-8 rounded-full border border-white mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.2, ease: [0.17, 0.55, 0.55, 1] }}
        aria-hidden="true"
      />
    </>
  );
}
