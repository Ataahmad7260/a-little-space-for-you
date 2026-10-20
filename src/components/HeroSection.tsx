import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, Compass } from 'lucide-react';
import { content } from '../data/content';
import { triggerCelestialBurst } from '../utils/burstEffect';
import { sfx } from '../utils/soundEffects';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const { typewriterLines, buttonText, subtext } = content.hero;

  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let currentLine = 1;
    let charIdx = 0;
    const line1 = typewriterLines[0] || '';
    const line2 = typewriterLines[1] || '';

    setDisplayedLine1('');
    setDisplayedLine2('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (currentLine === 1) {
        if (charIdx < line1.length) {
          setDisplayedLine1(line1.slice(0, charIdx + 1));
          charIdx++;
        } else {
          currentLine = 2;
          charIdx = 0;
        }
      } else if (currentLine === 2) {
        if (charIdx < line2.length) {
          setDisplayedLine2(line2.slice(0, charIdx + 1));
          charIdx++;
        } else {
          setIsTypingComplete(true);
          clearInterval(timer);
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [typewriterLines]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerCelestialBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    sfx.playSoftTap();
    onExplore();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[105vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 pb-16 select-none overflow-hidden"
    >
      {/* CELESTIAL ORBITAL BACKGROUND ART */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] pointer-events-none">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FAD2E1]/40 via-[#FFE4EC]/50 to-[#FFF4D0]/30 rounded-full blur-[110px]" />

        {/* Outer Orbital Ring 1 */}
        <div className="absolute inset-16 rounded-full border border-[#E8A2B8]/25 animate-spin" style={{ animationDuration: '65s' }}>
          <div className="w-3 h-3 rounded-full bg-[#B37B24] shadow-[0_0_12px_#B37B24] -top-1.5 left-1/2 absolute" />
        </div>

        {/* Inner Orbital Ring 2 */}
        <div className="absolute inset-36 rounded-full border border-dashed border-[#C74A76]/20 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#C74A76] shadow-[0_0_10px_#C74A76] top-1/3 -left-1 absolute" />
        </div>
      </div>

      {/* DEDICATION BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2 }}
        className="relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel-gold text-xs sm:text-sm font-medium text-[#8F5E16] mb-8 sm:mb-12 shadow-[0_4px_25px_rgba(179,123,36,0.12)]"
      >
        <Sparkles className="w-4 h-4 text-[#B37B24] animate-pulse" />
        <span className="tracking-wide">A Gentle Space for <strong className="font-semibold text-[#341829]">{content.siteConfig.recipientName}</strong></span>
        <Heart className="w-3.5 h-3.5 text-[#C74A76] fill-[#C74A76]" />
      </motion.div>

      {/* MAIN TYPEWRITER POETRY DISPLAY */}
      <div className="relative z-10 max-w-4xl mx-auto min-h-[160px] sm:min-h-[200px] flex flex-col items-center justify-center">
        <h1 className="font-serif-poetry text-3xl sm:text-5xl md:text-7xl text-[#341829] leading-snug tracking-wide font-normal">
          <span className="block mb-3 sm:mb-4 drop-shadow-[0_2px_15px_rgba(199,74,118,0.15)]">
            {displayedLine1}
            {!isTypingComplete && displayedLine2.length === 0 && (
              <span className="inline-block w-1.5 h-8 sm:h-14 bg-[#C74A76] ml-2 animate-pulse align-middle" />
            )}
          </span>
          <span className="block shimmer-text italic font-light">
            {displayedLine2}
            {!isTypingComplete && displayedLine2.length > 0 && (
              <span className="inline-block w-1.5 h-8 sm:h-14 bg-[#B37B24] ml-2 animate-pulse align-middle" />
            )}
          </span>
        </h1>
      </div>

      {/* HANDWRITTEN CURSIVE ACCENT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isTypingComplete ? 1 : 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mt-4 text-[#C74A76] font-cursive text-2xl sm:text-3xl drop-shadow-[0_2px_10px_rgba(199,74,118,0.2)]"
      >
        ~ where silence is gentle and words feel safe ~
      </motion.div>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 mt-5 max-w-lg mx-auto text-sm sm:text-base text-[#664658] font-light leading-relaxed px-4"
      >
        {subtext}
      </motion.p>

      {/* CALL TO ACTION GLOWING BUTTON */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: isTypingComplete ? 1 : 0.8, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-10 sm:mt-12"
      >
        <button
          onClick={handleButtonClick}
          className="relative group px-9 py-4 sm:px-12 sm:py-4.5 rounded-full font-serif-poetry text-lg sm:text-2xl text-[#341829] tracking-wide transition-all duration-400 transform hover:-translate-y-1.5 active:translate-y-0 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 237, 243, 0.95) 100%)',
            border: '1.5px solid rgba(199, 74, 118, 0.45)',
            boxShadow: '0 12px 35px rgba(184, 82, 120, 0.16), 0 0 25px rgba(245, 184, 203, 0.35)',
          }}
        >
          {/* Shimmering Outer Border Aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F5B8CB] via-[#FFE4EC] to-[#F7E3B5] opacity-50 group-hover:opacity-90 blur-md transition duration-500" />

          <span className="relative flex items-center justify-center gap-3">
            <Heart className="w-5 h-5 text-[#C74A76] fill-[#C74A76]/30 group-hover:fill-[#C74A76] group-hover:scale-115 transition-all duration-300" />
            <span className="group-hover:text-[#9E2B54] transition-colors font-medium">{buttonText}</span>
            <Sparkles className="w-5 h-5 text-[#B37B24] animate-pulse" />
          </span>
        </button>
      </motion.div>

      {/* SCROLL DOWN HINT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
        className="relative z-10 mt-16 sm:mt-20 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={onExplore}
      >
        <span className="text-[11px] uppercase tracking-widest text-[#8F6A7E] font-medium flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-[#B37B24]" />
          Wander through the verses
        </span>
        <ChevronDown className="w-4 h-4 text-[#8F6A7E] animate-bounce" />
      </motion.div>
    </section>
  );
};
