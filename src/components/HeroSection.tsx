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
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9B86BD]/15 via-[#F2B8CD]/12 to-[#FFE3A8]/10 rounded-full blur-[130px]" />

        {/* Outer Orbital Ring 1 */}
        <div className="absolute inset-16 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '65s' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFE3A8] shadow-[0_0_12px_#FFE3A8] -top-1.5 left-1/2 absolute" />
        </div>

        {/* Inner Orbital Ring 2 */}
        <div className="absolute inset-36 rounded-full border border-dashed border-[#C8B6E2]/15 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
          <div className="w-2 h-2 rounded-full bg-[#F2B8CD] shadow-[0_0_10px_#F2B8CD] top-1/3 -left-1 absolute" />
        </div>
      </div>

      {/* DEDICATION BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2 }}
        className="relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel-gold text-xs sm:text-sm font-medium text-[#FFE3A8] mb-8 sm:mb-12 shadow-[0_0_30px_rgba(255,227,168,0.18)]"
      >
        <Sparkles className="w-4 h-4 text-[#FFE3A8] animate-pulse" />
        <span className="tracking-wide">A Private Universe for <strong className="font-semibold text-white">{content.siteConfig.recipientName}</strong></span>
        <Heart className="w-3.5 h-3.5 text-[#F2B8CD] fill-[#F2B8CD]" />
      </motion.div>

      {/* MAIN TYPEWRITER POETRY DISPLAY */}
      <div className="relative z-10 max-w-4xl mx-auto min-h-[160px] sm:min-h-[200px] flex flex-col items-center justify-center">
        <h1 className="font-serif-poetry text-3xl sm:text-5xl md:text-7xl text-[#FAF8FF] leading-snug tracking-wide font-normal">
          <span className="block mb-3 sm:mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {displayedLine1}
            {!isTypingComplete && displayedLine2.length === 0 && (
              <span className="inline-block w-1.5 h-8 sm:h-14 bg-[#FFE3A8] ml-2 animate-pulse align-middle" />
            )}
          </span>
          <span className="block shimmer-text italic font-light">
            {displayedLine2}
            {!isTypingComplete && displayedLine2.length > 0 && (
              <span className="inline-block w-1.5 h-8 sm:h-14 bg-[#F2B8CD] ml-2 animate-pulse align-middle" />
            )}
          </span>
        </h1>
      </div>

      {/* HANDWRITTEN CURSIVE ACCENT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isTypingComplete ? 1 : 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mt-4 text-[#F2B8CD] font-cursive text-2xl sm:text-3xl"
      >
        ~ where silence is gentle and words feel safe ~
      </motion.div>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 mt-5 max-w-lg mx-auto text-sm sm:text-base text-[#C8B6E2]/85 font-light leading-relaxed px-4"
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
          className="relative group px-9 py-4 sm:px-12 sm:py-4.5 rounded-full font-serif-poetry text-lg sm:text-2xl text-[#FAF8FF] tracking-wide transition-all duration-400 transform hover:-translate-y-1.5 active:translate-y-0 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(35, 29, 58, 0.9) 0%, rgba(55, 38, 68, 0.9) 100%)',
            border: '1.5px solid rgba(255, 227, 168, 0.55)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 35px rgba(242, 184, 205, 0.25), inset 0 0 20px rgba(255, 227, 168, 0.2)',
          }}
        >
          {/* Shimmering Outer Border Aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C8B6E2] via-[#F2B8CD] to-[#FFE3A8] opacity-40 group-hover:opacity-90 blur-lg transition duration-500" />

          <span className="relative flex items-center justify-center gap-3">
            <Heart className="w-5 h-5 text-[#F2B8CD] fill-[#F2B8CD]/40 group-hover:fill-[#F2B8CD] group-hover:scale-110 transition-all duration-300" />
            <span className="group-hover:text-[#FFE3A8] transition-colors">{buttonText}</span>
            <Sparkles className="w-5 h-5 text-[#FFE3A8] animate-pulse" />
          </span>
        </button>
      </motion.div>

      {/* SCROLL DOWN HINT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.85, 0.3] }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
        className="relative z-10 mt-16 sm:mt-20 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={onExplore}
      >
        <span className="text-[11px] uppercase tracking-widest text-[#C8B6E2]/70 font-light flex items-center gap-1">
          <Compass className="w-3 h-3 text-[#FFE3A8]" />
          Wander through the verses
        </span>
        <ChevronDown className="w-4 h-4 text-[#C8B6E2]/70 animate-bounce" />
      </motion.div>
    </section>
  );
};
