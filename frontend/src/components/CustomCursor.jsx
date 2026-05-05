import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(true);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);
    const onChange = (e) => setEnabled(e.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  // Memoize event handlers
  const handleMove = useCallback((e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    }
  }, []);

  const handleEnter = useCallback((e) => {
    const el = e.target;
    if (el.closest && el.closest('a, button, [role="button"], input, textarea, select, label, [data-magnet]')) {
      setHover(true);
    }
  }, []);

  const handleLeave = useCallback((e) => {
    const el = e.target;
    if (el.closest && el.closest('a, button, [role="button"], input, textarea, select, label, [data-magnet]')) {
      setHover(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      // Use easing for smoother animation with less CPU
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12; // Reduced from 0.16
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x - 18}px, ${pos.current.y - 18}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleEnter, { passive: true });
    window.addEventListener("mouseout", handleLeave, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("mouseout", handleLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, handleMove, handleEnter, handleLeave]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-400 will-change-transform"
        style={{ boxShadow: "0 0 16px 4px rgba(0,240,255,0.6)" }}
      />
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-cyan-400/50 will-change-transform"
        animate={{ scale: hover ? 1.6 : 1, borderColor: hover ? "rgba(0,240,255,0.9)" : "rgba(0,240,255,0.5)" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }} // Adjusted for smoother animation
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
};

export default React.memo(CustomCursor);
