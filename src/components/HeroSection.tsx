import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
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
    }, 55);

    return () => clearInterval(timer);
  }, [typewriterLines]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerCelestialBurst((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
    sfx.playSoftTap();
    onExplore();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-12 select-none overflow-hidden"
    >
      {/* Background ethereal light orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-gradient-to-tr from-[#B8A9CD]/10 via-[#E8B4C8]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* Dedication Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs sm:text-sm font-medium text-[#B8A9CD] mb-8 sm:mb-12 border border-[#B8A9CD]/20 shadow-[0_0_20px_rgba(184,169,205,0.15)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FFE8A3]" />
        <span>Dedicated to {content.siteConfig.recipientName}</span>
        <Heart className="w-3 h-3 text-[#E8B4C8] fill-[#E8B4C8]" />
      </motion.div>

      {/* Main Typewriter Heading */}
      <div className="max-w-3xl mx-auto min-h-[140px] sm:min-h-[180px] flex flex-col items-center justify-center">
        <h1 className="font-serif-poetry text-3xl sm:text-5xl md:text-6xl text-[#F5F0FF] leading-snug tracking-wide glow-text-subtle font-normal">
          <span className="block mb-2 sm:mb-3">
            {displayedLine1}
            {!isTypingComplete && displayedLine2.length === 0 && (
              <span className="inline-block w-1.5 h-7 sm:h-11 bg-[#FFE8A3] ml-1.5 animate-pulse align-middle" />
            )}
          </span>
          <span className="block text-[#E8B4C8] italic font-light">
            {displayedLine2}
            {!isTypingComplete && displayedLine2.length > 0 && (
              <span className="inline-block w-1.5 h-7 sm:h-11 bg-[#E8B4C8] ml-1.5 animate-pulse align-middle" />
            )}
          </span>
        </h1>
      </div>

      {/* Gentle Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="mt-6 max-w-md mx-auto text-sm sm:text-base text-[#B8A9CD]/80 font-light leading-relaxed"
      >
        {subtext}
      </motion.p>

      {/* Call to Action Glowing Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isTypingComplete ? 1 : 0.8, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 sm:mt-12"
      >
        <button
          onClick={handleButtonClick}
          className="relative group px-8 py-4 sm:px-10 sm:py-4 rounded-full font-serif-poetry text-lg sm:text-xl text-[#F5F0FF] tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, rgba(184, 169, 205, 0.25) 0%, rgba(232, 180, 200, 0.35) 100%)',
            border: '1px solid rgba(232, 180, 200, 0.5)',
            boxShadow: '0 8px 32px 0 rgba(232, 180, 200, 0.2), inset 0 0 16px rgba(255, 232, 163, 0.2)',
          }}
        >
          {/* Subtle outer breathing glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#B8A9CD] via-[#E8B4C8] to-[#FFE8A3] opacity-30 group-hover:opacity-70 blur-md transition duration-500" />

          <span className="relative flex items-center justify-center gap-2.5">
            <Heart className="w-5 h-5 text-[#E8B4C8] fill-[#E8B4C8]/40 group-hover:fill-[#E8B4C8] transition-colors" />
            <span>{buttonText}</span>
            <Sparkles className="w-4 h-4 text-[#FFE8A3] animate-pulse" />
          </span>
        </button>
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={onExplore}
      >
        <span className="text-[11px] uppercase tracking-widest text-[#B8A9CD]/60 font-light">Scroll softly</span>
        <ChevronDown className="w-4 h-4 text-[#B8A9CD]/60" />
      </motion.div>
    </section>
  );
};
