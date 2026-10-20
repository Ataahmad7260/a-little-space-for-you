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
    <div className="relative w-full max-w-xl mx-auto py-8">
      {/* Title & prompt */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-[#B8A9CD]/80 font-mono mb-2 inline-block">
          Interactive Surprise 01
        </span>
        <h3 className="font-serif-poetry text-2xl sm:text-3xl text-[#F5F0FF] mb-2 font-normal">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#B8A9CD]/70 italic">
          {envelopeLabel}
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE */
            <motion.div
              key="closed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpen}
              className="group relative cursor-pointer w-full max-w-md aspect-[16/11] rounded-2xl glass-panel p-6 flex flex-col items-center justify-center border border-[#B8A9CD]/30 hover:border-[#E8B4C8]/60 transition-all duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(232,180,200,0.25)]"
            >
              {/* Ethereal Glow behind envelope */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#B8A9CD]/20 via-[#E8B4C8]/25 to-[#FFE8A3]/20 opacity-0 group-hover:opacity-100 blur-lg transition duration-500 pointer-events-none" />

              {/* Envelope Flap Lines (Stylized origami/crease) */}
              <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none rounded-t-2xl">
                <div className="w-full h-full border-b border-[#B8A9CD]/20 [clip-path:polygon(0%_0%,100%_0%,50%_100%)] bg-gradient-to-b from-white/5 to-white/0" />
              </div>

              {/* Glowing Wax Seal */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#E8B4C8] to-[#B8A9CD] p-[1.5px] shadow-[0_0_25px_rgba(232,180,200,0.5)] group-hover:shadow-[0_0_35px_rgba(232,180,200,0.8)] transition-all"
              >
                <div className="w-full h-full rounded-full bg-[#1A1829] flex items-center justify-center">
                  <Heart className="w-7 h-7 text-[#E8B4C8] fill-[#E8B4C8] group-hover:scale-110 transition-transform" />
                </div>
              </motion.div>

              <p className="relative z-10 mt-6 font-serif-poetry text-lg sm:text-xl text-[#F5F0FF] group-hover:text-[#FFE8A3] transition-colors">
                Touch to open letter
              </p>

              <span className="relative z-10 mt-1 text-xs text-[#B8A9CD]/60 font-light flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFE8A3]" />
                Reserved for a tender moment
              </span>
            </motion.div>
          ) : (
            /* OPENED LETTER (SLID OUT OF ENVELOPE) */
            <motion.div
              key="opened"
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg glass-panel-glow rounded-2xl p-6 sm:p-10 border border-[#E8B4C8]/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-[#FFE8A3]" />
                  <span className="text-xs uppercase tracking-wider text-[#FFE8A3] font-medium">
                    A letter to keep in your heart
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#B8A9CD] hover:text-[#F5F0FF] transition-colors"
                  title="Close envelope"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Poetic Lines */}
              <div className="space-y-4 font-serif-poetry text-xl sm:text-2xl text-[#F5F0FF] text-center leading-relaxed tracking-wide py-2">
                {letter.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.15 }}
                    className="hover:text-[#E8B4C8] transition-colors"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Warm Note */}
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <p className="text-xs sm:text-sm text-[#B8A9CD]/80 font-light italic leading-relaxed max-w-sm mx-auto">
                  {note}
                </p>

                {/* Breathing Exercise Accordion */}
                <div className="mt-6 flex flex-col items-center">
                  {!showBreathing ? (
                    <button
                      onClick={() => {
                        sfx.playSoftTap();
                        setShowBreathing(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-[#FFE8A3] transition-all"
                    >
                      <Wind className="w-3.5 h-3.5" />
                      Take a 10-second breath with me
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-4"
                    >
                      {/* Expanding / Contracting breathing orb */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1.5, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 8,
                          times: [0, 0.45, 0.55, 1],
                          ease: 'easeInOut',
                        }}
                        className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#B8A9CD]/30 to-[#E8B4C8]/40 border border-[#E8B4C8]/50 flex items-center justify-center shadow-[0_0_30px_rgba(232,180,200,0.3)] mb-3"
                      >
                        <Heart className="w-7 h-7 text-[#F5F0FF]/80 fill-[#E8B4C8]/30" />
                      </motion.div>
                      <motion.span
                        animate={{
                          opacity: [0.7, 1, 1, 0.7],
                        }}
                        transition={{ repeat: Infinity, duration: 8 }}
                        className="text-xs font-mono text-[#FFE8A3]"
                      >
                        Breathe in softly... then let it out gently.
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
