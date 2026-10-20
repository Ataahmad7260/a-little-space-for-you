import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 750);
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 20) + 14;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF2F4] text-[#341829] p-6 select-none"
        >
          {/* Subtle cosmic backdrop glow */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#FFE4EC] to-[#FFF4D0] blur-[90px] pointer-events-none" />

          {/* Central glowing icon */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut',
            }}
            className="relative mb-6 flex items-center justify-center"
          >
            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#FFE5EC] via-[#FAD2E1] to-[#FFF4D0] flex items-center justify-center border border-[#F5B8CB] shadow-[0_4px_30px_rgba(199,74,118,0.2)]">
              <Moon className="w-8 h-8 text-[#C74A76]" />
            </div>
            {/* Starlight ring */}
            <div className="absolute inset-0 rounded-full border border-[#C74A76]/30 animate-ping" style={{ animationDuration: '2.5s' }} />
          </motion.div>

          {/* Poetic quote during loading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif-poetry text-3xl md:text-4xl text-[#341829] tracking-wide text-center mb-1"
          >
            A Little Space for You
          </motion.h2>

          <p className="font-cursive text-2xl md:text-3xl text-[#C74A76] mb-8 font-light">
            weaving starlight and quiet warmth...
          </p>

          {/* Glowing slim progress bar */}
          <div className="w-52 md:w-72 h-[3.5px] bg-[#FFE5EC] rounded-full overflow-hidden relative shadow-sm border border-[#F5B8CB]/50">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F5B8CB] via-[#C74A76] to-[#B37B24] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          <span className="mt-3 text-xs font-mono text-[#8F5E16] tracking-widest font-semibold">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
