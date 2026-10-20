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

  // Artistic Constellation Positions
  const starPositions = [
    { top: '16%', left: '18%', color: '#FFE3A8' },
    { top: '22%', left: '76%', color: '#F2B8CD' },
    { top: '46%', left: '14%', color: '#C8B6E2' },
    { top: '36%', left: '50%', color: '#FFE3A8' },
    { top: '68%', left: '32%', color: '#F2B8CD' },
    { top: '78%', left: '80%', color: '#FFE3A8' },
    { top: '56%', left: '68%', color: '#C8B6E2' },
    { top: '82%', left: '18%', color: '#F2B8CD' },
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
        }, 1100);
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
    <div className="relative w-full max-w-5xl mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#FFE3A8] font-mono mb-2 inline-block">
          Interactive Surprise 02
        </span>
        <h3 className="font-serif-poetry text-3xl sm:text-4xl md:text-5xl text-[#FAF8FF] mb-2 font-normal">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#C8B6E2]/85 font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Counter Badge */}
        <div className="mt-5 inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel-gold border border-[#FFE3A8]/40 text-xs sm:text-sm text-[#FFE3A8] shadow-[0_0_20px_rgba(255,227,168,0.2)]">
          <Sparkles className="w-4 h-4 text-[#FFE3A8] animate-pulse" />
          <span className="tracking-wide">Starlight Gathered: <strong>{caughtIds.length}</strong> / {stars.length}</span>
          {caughtIds.length > 0 && (
            <button
              onClick={handleResetStars}
              className="ml-2 text-[11px] text-[#F2B8CD] hover:text-[#FAF8FF] underline uppercase tracking-wider cursor-pointer"
              title="Release stars back into the galaxy"
            >
              Release
            </button>
          )}
        </div>
      </div>

      {/* Interactive Celestial Skybox Container */}
      <div className="relative w-full h-[500px] sm:h-[550px] rounded-3xl glass-panel overflow-hidden border border-[#FFE3A8]/30 shadow-[inset_0_0_90px_rgba(8,7,15,0.9),0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Skybox Nebula Orbs */}
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-[#9B86BD]/18 rounded-full blur-[95px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-[#F2B8CD]/18 rounded-full blur-[105px] pointer-events-none" />

        {/* Constellation Golden Guide Web */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          <line x1="18%" y1="16%" x2="50%" y2="36%" stroke="#FFE3A8" strokeDasharray="4 6" />
          <line x1="50%" y1="36%" x2="76%" y2="22%" stroke="#F2B8CD" strokeDasharray="4 6" />
          <line x1="50%" y1="36%" x2="68%" y2="56%" stroke="#C8B6E2" strokeDasharray="4 6" />
          <line x1="68%" y1="56%" x2="80%" y2="78%" stroke="#FFE3A8" strokeDasharray="4 6" />
          <line x1="14%" y1="46%" x2="32%" y2="68%" stroke="#FFE3A8" strokeDasharray="4 6" />
          <line x1="32%" y1="68%" x2="18%" y2="82%" stroke="#F2B8CD" strokeDasharray="4 6" />
        </svg>

        {/* 8 Floating Interactive Stars */}
        {stars.map((star, idx) => {
          const isCaught = caughtIds.includes(star.id);
          const pos = starPositions[idx] || { top: '50%', left: '50%', color: '#FFE3A8' };
          const IconComp = iconMap[star.iconName] || Sparkles;

          return (
            <motion.div
              key={star.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                y: [0, -12, 0],
                scale: isCaught ? [1, 1.06, 1] : [0.95, 1.15, 0.95],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.2 + (idx % 3),
                ease: 'easeInOut',
                delay: idx * 0.35,
              }}
            >
              <button
                onClick={(e) => handleStarClick(star, idx, e)}
                aria-label={`Catch star ${star.id}`}
                className={`relative group p-3.5 rounded-full transition-all duration-400 cursor-pointer ${
                  isCaught
                    ? 'text-[#FFE3A8]'
                    : 'text-[#FAF8FF] hover:scale-125'
                }`}
              >
                {/* Outer Glow Halo */}
                <span
                  className={`absolute inset-0 rounded-full transition-opacity duration-400 ${
                    isCaught
                      ? 'bg-[#FFE3A8]/35 blur-md opacity-100'
                      : 'bg-gradient-to-tr from-[#C8B6E2]/25 to-[#F2B8CD]/35 blur-sm opacity-60 group-hover:opacity-100'
                  }`}
                />

                {/* Star Icon Body */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-all ${
                    isCaught
                      ? 'bg-[#FFE3A8]/20 border-[#FFE3A8] shadow-[0_0_25px_#FFE3A8]'
                      : 'bg-[#151227]/90 border-[#FFE3A8]/35 group-hover:border-[#FFE3A8] group-hover:shadow-[0_0_20px_rgba(255,227,168,0.5)]'
                  }`}
                >
                  <IconComp
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      isCaught ? 'text-[#FFE3A8]' : 'text-[#FAF8FF] group-hover:text-[#FFE3A8]'
                    }`}
                  />
                </div>

                {/* Caught Gold Star Badge */}
                {isCaught && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFE3A8] text-[#08070F] rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg">
                    ★
                  </span>
                )}
              </button>
            </motion.div>
          );
        })}

        {/* Center prompt if nothing caught yet */}
        {caughtIds.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-[#FFE3A8]/60 font-mono animate-pulse bg-black/40 px-4 py-2 rounded-full border border-white/10">
              Touch any star to reveal a secret thought
            </span>
          </div>
        )}
      </div>

      {/* REVEALED MESSAGE MODAL */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-panel-gold rounded-3xl p-7 sm:p-9 border border-[#FFE3A8]/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sfx.playSoftTap();
                  setActiveMessage(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-[#C8B6E2] hover:text-[#FAF8FF] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B86BD]/20 to-[#FFE3A8]/30 border border-[#FFE3A8]/50 flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(255,227,168,0.4)]">
                  <Sparkles className="w-8 h-8 text-[#FFE3A8]" />
                </div>

                <span className="text-xs uppercase tracking-widest text-[#FFE3A8] font-mono">
                  Star #{activeMessage.id} • Starlight Affirmation
                </span>

                <p className="mt-5 font-serif-poetry text-2xl sm:text-3xl text-[#FAF8FF] leading-relaxed italic">
                  "{activeMessage.message}"
                </p>

                <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-[#F2B8CD] fill-[#F2B8CD]" />
                  <span className="font-cursive text-xl text-[#F2B8CD]">
                    remember this whenever darkness lingers
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPLETED CELESTIAL CELEBRATION MODAL */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.82, opacity: 0 }}
              className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-8 sm:p-11 border border-[#FFE3A8]/60 text-center shadow-[0_30px_70px_rgba(255,227,168,0.3)]"
            >
              <div className="w-18 h-18 rounded-full bg-[#FFE3A8]/20 border border-[#FFE3A8] flex items-center justify-center mx-auto mb-5 shadow-[0_0_35px_#FFE3A8]">
                <Trophy className="w-9 h-9 text-[#FFE3A8]" />
              </div>

              <span className="font-cursive text-2xl text-[#F2B8CD]">
                All Stars Gathered
              </span>

              <h4 className="font-serif-poetry text-3xl sm:text-4xl text-[#FAF8FF] my-2">
                The Constellation is Complete
              </h4>

              <p className="font-serif-poetry text-xl sm:text-2xl text-[#FFE3A8] leading-relaxed my-5 italic">
                "{completedRewardMessage}"
              </p>

              <button
                onClick={() => setShowCelebration(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFE3A8] to-[#F2B8CD] text-[#08070F] font-semibold text-sm hover:opacity-90 transition-all shadow-[0_0_25px_rgba(255,227,168,0.5)] cursor-pointer"
              >
                Cherish this moment ♡
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
