"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first render (initial page load)
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback if Lenis not ready
      window.scrollTo({ top: 0 });
    }
  }, [pathname, lenis]);

  return null;
}
