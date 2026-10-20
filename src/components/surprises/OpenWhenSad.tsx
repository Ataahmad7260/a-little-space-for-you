import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Sparkles, Wind, RotateCcw } from 'lucide-react';
import { content } from '../../data/content';
import { triggerCelestialBurst } from '../../utils/burstEffect';
import { sfx } from '../../utils/soundEffects';

export const OpenWhenSad: React.FC = () => {
  const { envelopeLabel, title, letter, note } = content.surpriseSection.openWhenSad;
  const [isOpen, setIsOpen] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    if (!isOpen) {
      sfx.playEnvelopeOpen();
      const rect = e.currentTarget.getBoundingClientRect();
      triggerCelestialBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
      setIsOpen(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSoftTap();
    setIsOpen(false);
    setShowBreathing(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto py-8">
      {/* Title & prompt */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-[#B37B24] font-mono mb-2 inline-block font-semibold">
          Interactive Surprise 01
        </span>
        <h3 className="font-serif-poetry text-3xl sm:text-4xl text-[#341829] mb-2 font-normal">
          {title}
        </h3>
        <p className="font-cursive text-2xl sm:text-3xl text-[#C74A76]">
          {envelopeLabel}
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED 3D LUXURY ENVELOPE */
            <motion.div
              key="closed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpen}
              className="group relative cursor-pointer w-full max-w-md aspect-[16/11] rounded-3xl glass-panel-glow p-6 flex flex-col items-center justify-center border border-[#F5B8CB] hover:border-[#C74A76] transition-all duration-400 shadow-[0_20px_50px_rgba(184,82,120,0.18)] hover:shadow-[0_25px_60px_rgba(199,74,118,0.28)]"
            >
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#FAD2E1] via-[#FFE4EC] to-[#F7E3B5] opacity-0 group-hover:opacity-75 blur-xl transition duration-500 pointer-events-none" />

              {/* Envelope Triangular Flap Contour */}
              <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none rounded-t-3xl">
                <div className="w-full h-full border-b border-[#F5B8CB] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] bg-gradient-to-b from-[#FFF5F8] to-transparent" />
              </div>

              {/* Silk Ribbon Accent */}
              <div className="absolute top-1/2 left-0 right-0 h-6 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#F5B8CB]/50 to-transparent pointer-events-none" />

              {/* Glowing Crimson Wax Seal with Heart Stamp */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="relative z-10 w-18 h-18 rounded-full bg-gradient-to-tr from-[#A03159] via-[#C74A76] to-[#E8A2B8] p-[2px] shadow-[0_4px_25px_rgba(199,74,118,0.4)] group-hover:shadow-[0_4px_35px_rgba(199,74,118,0.6)] transition-all"
              >
                <div className="w-full h-full rounded-full bg-[#FFF0F4] flex items-center justify-center border border-white/80">
                  <Heart className="w-8 h-8 text-[#C74A76] fill-[#C74A76] group-hover:scale-115 transition-transform duration-300" />
                </div>
              </motion.div>

              <p className="relative z-10 mt-6 font-serif-poetry text-2xl text-[#341829] group-hover:text-[#9E2B54] transition-colors">
                Touch to break seal
              </p>

              <span className="relative z-10 mt-1 font-cursive text-xl text-[#C74A76] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B37B24]" />
                written for when quiet afternoons feel heavy
              </span>
            </motion.div>
          ) : (
            /* OPENED LETTER ON ILLUMINATED PEARL PARCHMENT */
            <motion.div
              key="opened"
              initial={{ y: 35, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 25, opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl glass-panel-glow rounded-3xl p-7 sm:p-11 border border-[#C74A76]/50 shadow-[0_25px_60px_rgba(184,82,120,0.2)]"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F5B8CB]/60 mb-6">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-[#B37B24]" />
                  <span className="text-xs uppercase tracking-widest text-[#B37B24] font-mono font-semibold">
                    A reassuring whisper
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-[#FFE5EC] text-[#8F6A7E] hover:text-[#341829] transition-colors cursor-pointer"
                  title="Fold letter back into envelope"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Poetic Stanzas */}
              <div className="space-y-4 font-serif-poetry text-2xl sm:text-3xl text-[#341829] text-center leading-relaxed tracking-wide py-3">
                {letter.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.15 }}
                    className="hover:text-[#C74A76] transition-colors"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Warm Note */}
              <div className="mt-8 pt-5 border-t border-[#F5B8CB]/60 text-center">
                <p className="font-cursive text-2xl sm:text-3xl text-[#C74A76] leading-relaxed max-w-md mx-auto">
                  "{note}"
                </p>

                {/* Breathing Exercise Accordion */}
                <div className="mt-7 flex flex-col items-center">
                  {!showBreathing ? (
                    <button
                      onClick={() => {
                        sfx.playSoftTap();
                        setShowBreathing(true);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#FFE5EC] hover:bg-[#FCD3E1] border border-[#F5B8CB] text-[#9E2B54] transition-all shadow-sm cursor-pointer"
                    >
                      <Wind className="w-4 h-4" />
                      Take a soothing breath with the Moon
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-4"
                    >
                      {/* Rhythmic Breathing Moon Orb */}
                      <motion.div
                        animate={{
                          scale: [1, 1.45, 1.45, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 8,
                          times: [0, 0.45, 0.55, 1],
                          ease: 'easeInOut',
                        }}
                        className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFE5EC] via-[#FAD2E1] to-[#FFF4D0] border border-[#F5B8CB] flex items-center justify-center shadow-[0_4px_30px_rgba(199,74,118,0.25)] mb-3"
                      >
                        <Moon className="w-10 h-10 text-[#C74A76] fill-[#C74A76]/20" />
                      </motion.div>
                      <motion.span
                        animate={{
                          opacity: [0.7, 1, 1, 0.7],
                        }}
                        transition={{ repeat: Infinity, duration: 8 }}
                        className="text-xs font-mono text-[#8F5E16] tracking-wider font-semibold"
                      >
                        Breathe in peace... hold gently... exhale the storm.
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
