"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface SparklesProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  phase: number;
}

export function Sparkles({
  className,
  particleCount = 50,
  particleColor = "#C9A84C",
  minSize = 1,
  maxSize = 3,
}: SparklesProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: minSize + Math.random() * (maxSize - minSize),
        opacity: Math.random(),
        speed: 0.2 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      }));
    },
    [particleCount, minSize, maxSize]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      for (const p of particlesRef.current) {
        const twinkle = Math.sin(time * p.speed * 2 + p.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = twinkle * p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion, particleColor, initParticles]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}
