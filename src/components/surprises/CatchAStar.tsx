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
    { top: '16%', left: '18%', color: '#B37B24' },
    { top: '22%', left: '76%', color: '#C74A76' },
    { top: '46%', left: '14%', color: '#8C638E' },
    { top: '36%', left: '50%', color: '#B37B24' },
    { top: '68%', left: '32%', color: '#C74A76' },
    { top: '78%', left: '80%', color: '#B37B24' },
    { top: '56%', left: '68%', color: '#8C638E' },
    { top: '82%', left: '18%', color: '#C74A76' },
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
        <span className="text-xs uppercase tracking-widest text-[#B37B24] font-mono mb-2 inline-block font-semibold">
          Interactive Surprise 02
        </span>
        <h3 className="font-serif-poetry text-3xl sm:text-4xl md:text-5xl text-[#341829] mb-2 font-normal">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#664658] font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Counter Badge */}
        <div className="mt-5 inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel-gold border border-[#E8B48A] text-xs sm:text-sm text-[#8F5E16] shadow-sm font-medium">
          <Sparkles className="w-4 h-4 text-[#B37B24] animate-pulse" />
          <span className="tracking-wide">Starlight Gathered: <strong className="text-[#341829]">{caughtIds.length}</strong> / {stars.length}</span>
          {caughtIds.length > 0 && (
            <button
              onClick={handleResetStars}
              className="ml-2 text-[11px] text-[#C74A76] hover:text-[#9E2B54] underline uppercase tracking-wider cursor-pointer font-semibold"
              title="Release stars back into the sky"
            >
              Release
            </button>
          )}
        </div>
      </div>

      {/* Interactive Skybox Container */}
      <div className="relative w-full h-[500px] sm:h-[550px] rounded-3xl glass-panel-glow overflow-hidden border border-[#F5B8CB] shadow-[0_20px_50px_rgba(184,82,120,0.12)]">
        {/* Skybox Nebula Orbs */}
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-[#FFE4EC]/70 rounded-full blur-[85px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-[#FFF4D0]/60 rounded-full blur-[90px] pointer-events-none" />

        {/* Constellation Guide Web */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <line x1="18%" y1="16%" x2="50%" y2="36%" stroke="#B37B24" strokeDasharray="4 6" />
          <line x1="50%" y1="36%" x2="76%" y2="22%" stroke="#C74A76" strokeDasharray="4 6" />
          <line x1="50%" y1="36%" x2="68%" y2="56%" stroke="#8C638E" strokeDasharray="4 6" />
          <line x1="68%" y1="56%" x2="80%" y2="78%" stroke="#B37B24" strokeDasharray="4 6" />
          <line x1="14%" y1="46%" x2="32%" y2="68%" stroke="#B37B24" strokeDasharray="4 6" />
          <line x1="32%" y1="68%" x2="18%" y2="82%" stroke="#C74A76" strokeDasharray="4 6" />
        </svg>

        {/* 8 Floating Interactive Stars */}
        {stars.map((star, idx) => {
          const isCaught = caughtIds.includes(star.id);
          const pos = starPositions[idx] || { top: '50%', left: '50%', color: '#B37B24' };
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
                    ? 'text-[#B37B24]'
                    : 'text-[#341829] hover:scale-125'
                }`}
              >
                {/* Outer Glow Halo */}
                <span
                  className={`absolute inset-0 rounded-full transition-opacity duration-400 ${
                    isCaught
                      ? 'bg-[#FFE4EC] blur-md opacity-100'
                      : 'bg-gradient-to-tr from-[#FFE4EC] to-[#FFF4D0] blur-sm opacity-60 group-hover:opacity-100'
                  }`}
                />

                {/* Star Icon Body */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-all ${
                    isCaught
                      ? 'bg-[#FFF9EC] border-[#B37B24] shadow-[0_0_20px_#B37B24]'
                      : 'bg-white/90 border-[#F5B8CB] group-hover:border-[#C74A76] group-hover:shadow-[0_4px_20px_rgba(199,74,118,0.3)]'
                  }`}
                >
                  <IconComp
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      isCaught ? 'text-[#B37B24]' : 'text-[#664658] group-hover:text-[#C74A76]'
                    }`}
                  />
                </div>

                {/* Caught Gold Star Badge */}
                {isCaught && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B37B24] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md">
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
            <span className="text-xs uppercase tracking-widest text-[#8F6A7E] font-mono animate-pulse bg-white/70 px-4 py-2 rounded-full border border-[#F5B8CB] font-medium shadow-sm">
              Touch any star to reveal a secret thought
            </span>
          </div>
        )}
      </div>

      {/* REVEALED MESSAGE MODAL */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-panel-gold rounded-3xl p-7 sm:p-9 border border-[#E8B48A] shadow-[0_25px_60px_rgba(184,82,120,0.22)]"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sfx.playSoftTap();
                  setActiveMessage(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FFE5EC] text-[#8F6A7E] hover:text-[#341829] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFE5EC] to-[#FFF4D0] border border-[#E8B48A] flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <Sparkles className="w-8 h-8 text-[#B37B24]" />
                </div>

                <span className="text-xs uppercase tracking-widest text-[#B37B24] font-mono font-semibold">
                  Star #{activeMessage.id} • Starlight Affirmation
                </span>

                <p className="mt-5 font-serif-poetry text-2xl sm:text-3xl text-[#341829] leading-relaxed italic">
                  "{activeMessage.message}"
                </p>

                <div className="mt-7 pt-4 border-t border-[#F5B8CB]/60 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-[#C74A76] fill-[#C74A76]" />
                  <span className="font-cursive text-2xl text-[#C74A76]">
                    remember this whenever darkness lingers
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPLETED CELEBRATION MODAL */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.82, opacity: 0 }}
              className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-8 sm:p-11 border border-[#B37B24] text-center shadow-[0_30px_70px_rgba(184,82,120,0.25)]"
            >
              <div className="w-18 h-18 rounded-full bg-[#FFF9EC] border border-[#B37B24] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Trophy className="w-9 h-9 text-[#B37B24]" />
              </div>

              <span className="font-cursive text-3xl text-[#C74A76]">
                All Stars Gathered
              </span>

              <h4 className="font-serif-poetry text-3xl sm:text-4xl text-[#341829] my-2">
                The Constellation is Complete
              </h4>

              <p className="font-serif-poetry text-xl sm:text-2xl text-[#8F5E16] leading-relaxed my-5 italic">
                "{completedRewardMessage}"
              </p>

              <button
                onClick={() => setShowCelebration(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFE5EC] via-[#F5B8CB] to-[#F7E3B5] text-[#341829] font-semibold text-sm hover:opacity-90 transition-all shadow-md cursor-pointer border border-[#E8B48A]"
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
