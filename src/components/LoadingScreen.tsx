import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
            setTimeout(onComplete, 700);
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + increment, 100);
      });
    }, 140);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B14] text-[#F5F0FF] p-6 select-none"
        >
          {/* Subtle celestial backdrop glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#B8A9CD]/10 blur-[90px] pointer-events-none" />

          {/* Central glowing icon */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
            className="relative mb-6 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B8A9CD]/20 to-[#E8B4C8]/30 flex items-center justify-center border border-[#B8A9CD]/30 shadow-[0_0_30px_rgba(184,169,205,0.25)]">
              <Sparkles className="w-8 h-8 text-[#FFE8A3] animate-pulse" />
            </div>
            {/* Starlight ring */}
            <div className="absolute inset-0 rounded-full border border-[#FFE8A3]/20 animate-ping" style={{ animationDuration: '2.5s' }} />
          </motion.div>

          {/* Poetic quote during loading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif-poetry text-2xl md:text-3xl text-[#F5F0FF] tracking-wide text-center mb-2"
          >
            A Little Space for You
          </motion.h2>

          <p className="text-xs md:text-sm tracking-widest uppercase text-[#B8A9CD]/80 mb-8 font-light">
            Gathering quiet starlight...
          </p>

          {/* Glowing slim progress bar */}
          <div className="w-48 md:w-64 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B8A9CD] via-[#E8B4C8] to-[#FFE8A3] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          <span className="mt-3 text-[11px] font-mono text-[#B8A9CD]/60">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
