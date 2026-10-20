import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Moon,
  Sun,
  Smile,
  Compass,
  Music,
  Flower2,
  X,
  Trophy,
} from 'lucide-react';
import { content, type StarMessage } from '../../data/content';
import { triggerCelestialBurst, triggerHeartShower } from '../../utils/burstEffect';
import { sfx } from '../../utils/soundEffects';

// Map icon string names to components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  Heart,
  Moon,
  Sun,
  Smile,
  Compass,
  Music,
  Flower2,
};

export const CatchAStar: React.FC = () => {
  const { title, subtitle, stars, completedRewardMessage } = content.surpriseSection.catchAStar;
  const [caughtIds, setCaughtIds] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<StarMessage | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Layout positions for 8 stars scattered across an atmospheric celestial sky
  const starPositions = [
    { top: '15%', left: '16%' },
    { top: '22%', left: '78%' },
    { top: '48%', left: '12%' },
    { top: '35%', left: '48%' },
    { top: '68%', left: '32%' },
    { top: '78%', left: '82%' },
    { top: '55%', left: '68%' },
    { top: '82%', left: '18%' },
  ];

  const handleStarClick = (star: StarMessage, _idx: number, e: React.MouseEvent) => {
    sfx.playStarChime();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerCelestialBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );

    setActiveMessage(star);

    if (!caughtIds.includes(star.id)) {
      const nextCaught = [...caughtIds, star.id];
      setCaughtIds(nextCaught);

      if (nextCaught.length === stars.length) {
        setTimeout(() => {
          setShowCelebration(true);
          triggerHeartShower();
        }, 1200);
      }
    }
  };

  const handleResetStars = () => {
    sfx.playSoftTap();
    setCaughtIds([]);
    setActiveMessage(null);
    setShowCelebration(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-8 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#B8A9CD]/80 font-mono mb-2 inline-block">
          Interactive Surprise 02
        </span>
        <h3 className="font-serif-poetry text-2xl sm:text-3xl md:text-4xl text-[#F5F0FF] mb-2 font-normal">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#B8A9CD]/80 font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Counter Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#FFE8A3]/30 text-xs text-[#FFE8A3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stars Caught: {caughtIds.length} / {stars.length}</span>
          {caughtIds.length > 0 && (
            <button
              onClick={handleResetStars}
              className="ml-2 text-[10px] text-[#B8A9CD] hover:text-[#F5F0FF] underline"
              title="Release stars to sky"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Interactive Celestial Skybox */}
      <div className="relative w-full h-[460px] sm:h-[500px] rounded-3xl glass-panel overflow-hidden border border-[#B8A9CD]/25 shadow-[inset_0_0_80px_rgba(11,11,20,0.8)]">
        {/* Skybox Nebula Glows */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#B8A9CD]/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#E8B4C8]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Constellation Guide Lines (subtle dashed svg) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="16%" y1="15%" x2="48%" y2="35%" stroke="#B8A9CD" strokeDasharray="4 6" />
          <line x1="48%" y1="35%" x2="78%" y2="22%" stroke="#B8A9CD" strokeDasharray="4 6" />
          <line x1="48%" y1="35%" x2="68%" y2="55%" stroke="#E8B4C8" strokeDasharray="4 6" />
          <line x1="68%" y1="55%" x2="82%" y2="78%" stroke="#FFE8A3" strokeDasharray="4 6" />
          <line x1="12%" y1="48%" x2="32%" y2="68%" stroke="#B8A9CD" strokeDasharray="4 6" />
        </svg>

        {/* 8 Floating Interactive Stars */}
        {stars.map((star, idx) => {
          const isCaught = caughtIds.includes(star.id);
          const pos = starPositions[idx] || { top: '50%', left: '50%' };
          const IconComp = iconMap[star.iconName] || Sparkles;

          return (
            <motion.div
              key={star.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                y: [0, -10, 0],
                scale: isCaught ? [1, 1.05, 1] : [0.95, 1.15, 0.95],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + (idx % 3),
                ease: 'easeInOut',
                delay: idx * 0.4,
              }}
            >
              <button
                onClick={(e) => handleStarClick(star, idx, e)}
                aria-label={`Catch star ${star.id}`}
                className={`relative group p-3 rounded-full transition-all duration-300 ${
                  isCaught
                    ? 'text-[#FFE8A3] shadow-[0_0_20px_#FFE8A3]'
                    : 'text-[#F5F0FF] hover:scale-125'
                }`}
              >
                {/* Outer Glow Halo */}
                <span
                  className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                    isCaught
                      ? 'bg-[#FFE8A3]/30 blur-md opacity-100'
                      : 'bg-gradient-to-tr from-[#B8A9CD]/20 to-[#E8B4C8]/30 blur-sm opacity-50 group-hover:opacity-100'
                  }`}
                />

                {/* Star Icon Body */}
                <div
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all ${
                    isCaught
                      ? 'bg-[#FFE8A3]/20 border-[#FFE8A3]'
                      : 'bg-[#19192E]/80 border-[#B8A9CD]/40 group-hover:border-[#FFE8A3]'
                  }`}
                >
                  <IconComp
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      isCaught ? 'text-[#FFE8A3]' : 'text-[#F5F0FF] group-hover:text-[#FFE8A3]'
                    }`}
                  />
                </div>

                {/* Caught Checkmark / Badge */}
                {isCaught && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFE8A3] text-[#0B0B14] rounded-full text-[9px] font-bold flex items-center justify-center shadow-md">
                    ✓
                  </span>
                )}
              </button>
            </motion.div>
          );
        })}

        {/* Center prompt if nothing caught yet */}
        {caughtIds.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-[#B8A9CD]/40 font-mono animate-pulse">
              Touch any floating star
            </span>
          </div>
        )}
      </div>

      {/* REVEALED MESSAGE MODAL / POPUP */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-panel-glow rounded-2xl p-6 sm:p-8 border border-[#FFE8A3]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sfx.playSoftTap();
                  setActiveMessage(null);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[#B8A9CD] hover:text-[#F5F0FF] transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pt-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#B8A9CD]/20 to-[#FFE8A3]/30 border border-[#FFE8A3]/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,232,163,0.3)]">
                  <Sparkles className="w-7 h-7 text-[#FFE8A3]" />
                </div>

                <span className="text-xs uppercase tracking-wider text-[#B8A9CD] font-mono">
                  Star #{activeMessage.id} • Quiet Affirmation
                </span>

                <p className="mt-4 font-serif-poetry text-xl sm:text-2xl text-[#F5F0FF] leading-relaxed italic">
                  "{activeMessage.message}"
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#E8B4C8] fill-[#E8B4C8]" />
                  <span className="text-xs text-[#B8A9CD]/80 font-light">
                    Held gently in starlight for you
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPLETED CELESTIAL WISH CELEBRATION MODAL */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-8 sm:p-10 border border-[#FFE8A3]/50 text-center shadow-[0_25px_60px_rgba(255,232,163,0.25)]"
            >
              <div className="w-16 h-16 rounded-full bg-[#FFE8A3]/20 border border-[#FFE8A3] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_#FFE8A3]">
                <Trophy className="w-8 h-8 text-[#FFE8A3]" />
              </div>

              <h4 className="font-serif-poetry text-2xl sm:text-3xl text-[#F5F0FF] mb-3">
                All 8 Stars Caught
              </h4>

              <p className="font-serif-poetry text-lg sm:text-xl text-[#FFE8A3] leading-relaxed mb-6 italic">
                "{completedRewardMessage}"
              </p>

              <button
                onClick={() => setShowCelebration(false)}
                className="px-6 py-2.5 rounded-full bg-[#FFE8A3] text-[#0B0B14] font-medium text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(255,232,163,0.5)]"
              >
                Keep this memory ♡
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
