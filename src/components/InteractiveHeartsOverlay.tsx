import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

export const InteractiveHeartsOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Check if target is a button, star, or memory card
    const target = e.target as HTMLElement;
    if (target.closest('[data-no-heart="true"]')) return;

    // Small chance or on special clicks
    const id = Date.now() + Math.random();
    const colors = ['#E8B4C8', '#B8A9CD', '#FFE8A3', '#F5F0FF'];
    const newHeart: FloatingHeart = {
      id,
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 12 + 16,
      rotation: (Math.random() - 0.5) * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setHearts((prev) => [...prev.slice(-15), newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1800);
  };

  return (
    <div className="relative min-h-screen w-full" onPointerDown={handlePointerDown}>
      {children}

      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{
                opacity: 0.9,
                scale: 0.4,
                x: h.x,
                y: h.y,
                rotate: h.rotation,
              }}
              animate={{
                opacity: 0,
                scale: 1.25,
                y: h.y - 90,
                x: h.x + (Math.random() - 0.5) * 40,
                rotate: h.rotation + (Math.random() - 0.5) * 30,
              }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute select-none pointer-events-none"
              style={{
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg
                width={h.size}
                height={h.size}
                viewBox="0 0 24 24"
                fill={h.color}
                stroke="none"
                style={{
                  filter: `drop-shadow(0 0 8px ${h.color}88)`,
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
