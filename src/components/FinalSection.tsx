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
    setTimeout(onRestart, 200);
  };

  return (
    <section
      id="final"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-[#B8A9CD]/10 via-[#E8B4C8]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Chapter 3 Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8A9CD]/10 text-xs tracking-wider uppercase text-[#B8A9CD] mb-8 border border-[#B8A9CD]/20"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FFE8A3]" />
        <span>Chapter III • The Final Bloom</span>
      </motion.div>

      {/* SINGLE GLOWING FLOWER (Interactive SVG with bioluminescent petals) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleFlowerClick}
        className="relative group cursor-pointer mb-12 sm:mb-14"
        title="Touch the glowing flower"
      >
        {/* Ambient bloom halo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#B8A9CD] via-[#E8B4C8] to-[#FFE8A3] blur-2xl pointer-events-none"
        />

        {/* Ethereal Animated Flower SVG */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(232,180,200,0.8)]">
            <defs>
              <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE8A3" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#E8B4C8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B8A9CD" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="petalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5F0FF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#E8B4C8" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#1B172E" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Glowing Stem */}
            <path
              d="M50 68 Q52 85 50 96"
              stroke="#B8A9CD"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* Small leaves */}
            <path
              d="M50 78 Q58 74 62 78 Q56 82 50 82"
              fill="url(#petalGrad1)"
              opacity="0.6"
            />
            <path
              d="M50 84 Q42 81 38 85 Q44 89 50 88"
              fill="url(#petalGrad1)"
              opacity="0.6"
            />

            {/* Outer Petals (arranged in a gentle circle) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 50 50)`}>
                <motion.ellipse
                  cx="50"
                  cy="32"
                  rx="7"
                  ry="18"
                  fill="url(#petalGrad1)"
                  animate={{
                    ry: flowerBloomed ? [18, 20, 18] : [17, 19, 17],
                    opacity: [0.75, 0.95, 0.75],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (i % 2),
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
                  cy="38"
                  rx="5.5"
                  ry="13"
                  fill="url(#petalGrad2)"
                  opacity="0.85"
                />
              </g>
            ))}

            {/* Flower Core Glowing Anther */}
            <circle cx="50" cy="50" r="7" fill="#FFE8A3" filter="drop-shadow(0 0 6px #FFE8A3)" />
            <circle cx="50" cy="50" r="3" fill="#FFF" />
          </svg>
        </div>

        <span className="block mt-3 text-[11px] font-mono text-[#B8A9CD]/60 uppercase tracking-widest group-hover:text-[#FFE8A3] transition-colors">
          A flower that never fades
        </span>
      </motion.div>

      {/* POEM REVEALED SLOWLY, ONE LINE AT A TIME */}
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 mb-12">
        {poemLines.map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.1,
              delay: 0.3 + idx * 0.8, // Slow, deliberate reveal
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif-poetry text-xl sm:text-3xl md:text-4xl text-[#F5F0FF] leading-relaxed tracking-wide font-normal glow-text-subtle"
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* SIGNOFF MESSAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + poemLines.length * 0.8 + 0.5, duration: 1 }}
        className="mb-12"
      >
        <p className="font-serif-poetry text-2xl sm:text-3xl text-[#E8B4C8] italic tracking-wide flex items-center justify-center gap-2">
          <span>{signoff}</span>
        </p>
      </motion.div>

      {/* FINAL BUTTON: READ IT AGAIN */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + poemLines.length * 0.8 + 0.9, duration: 0.8 }}
      >
        <button
          onClick={handleRestartClick}
          className="group relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full glass-panel hover:border-[#E8B4C8]/50 text-base sm:text-lg font-serif-poetry text-[#F5F0FF] tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <span className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#FFE8A3] group-hover:-rotate-180 transition-transform duration-500" />
            <span>{restartButtonText}</span>
            <Heart className="w-4 h-4 text-[#E8B4C8] fill-[#E8B4C8]/30 group-hover:fill-[#E8B4C8] transition-colors" />
          </span>
        </button>
      </motion.div>

      {/* Subtle Footer */}
      <footer className="mt-20 pt-8 border-t border-white/5 text-center text-xs text-[#B8A9CD]/50 font-light max-w-sm mx-auto">
        <p>A quiet digital universe created with love, poetry, and starlight.</p>
        <p className="mt-1 font-mono text-[10px] text-[#B8A9CD]/35">Always here whenever you need a safe place.</p>
      </footer>
    </section>
  );
};
