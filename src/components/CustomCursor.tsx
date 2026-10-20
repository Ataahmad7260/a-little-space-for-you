import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring for trailing outer starlight halo
  const springConfig = { damping: 25, stiffness: 320, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with mouse pointer and without reduced motion preference
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasPointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.tagName.toLowerCase() === 'input' ||
          target.tagName.toLowerCase() === 'textarea')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Outer ambient starlight glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 52 : isClicking ? 26 : 36,
          height: isHovered ? 52 : isClicking ? 26 : 36,
          border: isHovered ? '1.5px solid rgba(199, 74, 118, 0.85)' : '1px solid rgba(199, 74, 118, 0.4)',
          backgroundColor: isHovered ? 'rgba(255, 229, 236, 0.45)' : 'rgba(255, 240, 245, 0.25)',
          boxShadow: isHovered ? '0 0 20px rgba(199, 74, 118, 0.35)' : '0 0 10px rgba(199, 74, 118, 0.15)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border 0.2s, background-color 0.2s',
        }}
      />

      {/* Pinpoint Starlight center */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 8 : isClicking ? 10 : 5,
          height: isHovered ? 8 : isClicking ? 10 : 5,
          backgroundColor: isHovered ? '#B37B24' : '#C74A76',
          boxShadow: '0 0 8px #C74A76, 0 0 12px #B37B24',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.2s',
        }}
      />
    </>
  );
};
