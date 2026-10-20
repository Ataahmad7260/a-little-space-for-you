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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08070F] text-[#FAF8FF] p-6 select-none"
        >
          {/* Subtle cosmic backdrop glow */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#9B86BD]/20 to-[#FFE3A8]/15 blur-[100px] pointer-events-none" />

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
            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#9B86BD]/30 via-[#F2B8CD]/30 to-[#FFE3A8]/40 flex items-center justify-center border border-[#FFE3A8]/40 shadow-[0_0_35px_rgba(255,227,168,0.3)]">
              <Moon className="w-8 h-8 text-[#FFE3A8]" />
            </div>
            {/* Starlight ring */}
            <div className="absolute inset-0 rounded-full border border-[#FFE3A8]/30 animate-ping" style={{ animationDuration: '2.5s' }} />
          </motion.div>

          {/* Poetic quote during loading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif-poetry text-3xl md:text-4xl text-[#FAF8FF] tracking-wide text-center mb-1"
          >
            A Little Space for You
          </motion.h2>

          <p className="font-cursive text-xl md:text-2xl text-[#F2B8CD] mb-8 font-light">
            weaving starlight and quiet warmth...
          </p>

          {/* Glowing slim progress bar */}
          <div className="w-52 md:w-72 h-[3px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(255,227,168,0.2)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#9B86BD] via-[#F2B8CD] to-[#FFE3A8] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          <span className="mt-3 text-xs font-mono text-[#FFE3A8]/70 tracking-widest">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
