import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { content } from '../data/content';
import { triggerCelestialBurst, triggerHeartShower } from '../utils/burstEffect';
import { sfx } from '../utils/soundEffects';

interface FinalSectionProps {
  onRestart: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onRestart }) => {
  const { poemLines, signoff, restartButtonText } = content.finalPage;
  const [flowerBloomed, setFlowerBloomed] = useState(false);

  const handleFlowerClick = (e: React.MouseEvent) => {
    sfx.playStarChime();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerCelestialBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    setFlowerBloomed(true);
  };

  const handleRestartClick = () => {
    sfx.playSoftTap();
    triggerHeartShower();
    setTimeout(onRestart, 250);
  };

  return (
    <section
      id="final"
      className="relative min-h-[110vh] py-28 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Cosmic Nebula Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-tr from-[#9B86BD]/15 via-[#F2B8CD]/18 to-[#FFE3A8]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Chapter 3 Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold text-xs tracking-widest uppercase text-[#FFE3A8] mb-10 border border-[#FFE3A8]/30 shadow-[0_0_20px_rgba(255,227,168,0.15)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FFE3A8]" />
        <span>Chapter III • The Celestial Bloom</span>
      </motion.div>

      {/* SINGLE GLOWING FLOWER (Interactive SVG with bioluminescent breathing petals) */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleFlowerClick}
        className="relative group cursor-pointer mb-14 sm:mb-16"
        title="Touch the glowing flower"
      >
        {/* Ambient bloom halo */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.75, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#9B86BD] via-[#F2B8CD] to-[#FFE3A8] blur-3xl pointer-events-none"
        />

        {/* Ethereal Animated Flower SVG */}
        <div className="relative w-32 h-32 sm:w-44 sm:h-44">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_35px_rgba(242,184,205,0.85)]">
            <defs>
              <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE3A8" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#F2B8CD" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#C8B6E2" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="petalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FAF8FF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#F2B8CD" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1E1935" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Glowing Stem */}
            <path
              d="M50 68 Q52 85 50 96"
              stroke="#FFE3A8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
              filter="drop-shadow(0 0 6px #FFE3A8)"
            />
            {/* Small leaves */}
            <path
              d="M50 78 Q58 74 63 78 Q57 82 50 82"
              fill="url(#petalGrad1)"
              opacity="0.7"
            />
            <path
              d="M50 84 Q42 81 37 85 Q43 89 50 88"
              fill="url(#petalGrad1)"
              opacity="0.7"
            />

            {/* Outer Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 50 50)`}>
                <motion.ellipse
                  cx="50"
                  cy="30"
                  rx="7.5"
                  ry="19"
                  fill="url(#petalGrad1)"
                  animate={{
                    ry: flowerBloomed ? [19, 22, 19] : [18, 20.5, 18],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5 + (i % 2),
                    delay: i * 0.2,
                  }}
                />
              </g>
            ))}

            {/* Inner layered petals */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <g key={`inner-${i}`} transform={`rotate(${angle} 50 50)`}>
                <ellipse
                  cx="50"
                  cy="36"
                  rx="6"
                  ry="14"
                  fill="url(#petalGrad2)"
                  opacity="0.9"
                />
              </g>
            ))}

            {/* Flower Core Glowing Starlight Anther */}
            <circle cx="50" cy="50" r="8" fill="#FFE3A8" filter="drop-shadow(0 0 10px #FFE3A8)" />
            <circle cx="50" cy="50" r="3.5" fill="#FAF8FF" />
          </svg>
        </div>

        <span className="block mt-4 text-xs font-mono text-[#FFE3A8]/70 uppercase tracking-widest group-hover:text-[#FAF8FF] transition-colors">
          A flower that blooms only for you
        </span>
      </motion.div>

      {/* POEM REVEALED SLOWLY, ONE LINE AT A TIME */}
      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-7 mb-14">
        {poemLines.map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.3 + idx * 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif-poetry text-2xl sm:text-4xl md:text-5xl text-[#FAF8FF] leading-relaxed tracking-wide font-normal glow-text-subtle"
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* SIGNOFF MESSAGE WITH LUXURY HANDWRITING */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + poemLines.length * 0.9 + 0.6, duration: 1.1 }}
        className="mb-14"
      >
        <p className="font-cursive text-3xl sm:text-5xl text-[#F2B8CD] tracking-wide flex items-center justify-center gap-2 drop-shadow-[0_0_20px_rgba(242,184,205,0.4)]">
          <span>{signoff}</span>
        </p>
      </motion.div>

      {/* FINAL BUTTON: READ IT AGAIN */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + poemLines.length * 0.9 + 1.1, duration: 0.9 }}
      >
        <button
          onClick={handleRestartClick}
          className="group relative px-9 py-4 sm:px-12 sm:py-4.5 rounded-full glass-panel-gold hover:border-[#F2B8CD]/70 text-base sm:text-xl font-serif-poetry text-[#FAF8FF] tracking-wide transition-all duration-400 transform hover:-translate-y-1.5 active:translate-y-0 shadow-[0_15px_40px_rgba(0,0,0,0.7)] cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-[#FFE3A8] group-hover:-rotate-180 transition-transform duration-600" />
            <span className="group-hover:text-[#FFE3A8] transition-colors">{restartButtonText}</span>
            <Heart className="w-4 h-4 text-[#F2B8CD] fill-[#F2B8CD]/40 group-hover:fill-[#F2B8CD] transition-colors" />
          </span>
        </button>
      </motion.div>

      {/* SUBTLE CELESTIAL FOOTER */}
      <footer className="mt-24 pt-8 border-t border-white/10 text-center text-xs text-[#C8B6E2]/60 font-light max-w-sm mx-auto">
        <p>A quiet digital sanctuary created with love, poetry, and starlight.</p>
        <p className="mt-1 font-mono text-[11px] text-[#FFE3A8]/50">Always here whenever you need a safe place.</p>
      </footer>
    </section>
  );
};
