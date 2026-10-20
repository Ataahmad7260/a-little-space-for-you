import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientMusic } from '../utils/ambientMusic';
import { content } from '../data/content';
import { sfx } from '../utils/soundEffects';

interface HeaderNavProps {
  onRestart: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onRestart }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'poetry', 'surprises', 'memories', 'final'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    sfx.playSoftTap();
    const newState = ambientMusic.toggle(content.siteConfig.customAudioUrl);
    setIsPlayingMusic(newState);
  };

  const scrollTo = (id: string) => {
    sfx.playSoftTap();
    if (id === 'hero') {
      onRestart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:py-5 pointer-events-none transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Title */}
        <button
          onClick={() => scrollTo('hero')}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-gold hover:border-[#F2B8CD]/60 transition-all text-left shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          title="Return to beginning"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE3A8] shadow-[0_0_10px_#FFE3A8] animate-pulse" />
          <span className="font-serif-poetry text-base sm:text-xl text-[#FAF8FF] group-hover:text-[#FFE3A8] transition-colors">
            {content.siteConfig.title}
          </span>
        </button>

        {/* Navigation links & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick jump menu for larger screens */}
          <nav
            aria-label="Section navigation"
            className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel transition-all ${
              scrolled ? 'opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.6)]' : 'opacity-85 hover:opacity-100'
            }`}
          >
            {[
              { id: 'hero', label: 'The Beginning' },
              { id: 'poetry', label: 'Poetry' },
              { id: 'surprises', label: 'Surprises' },
              { id: 'memories', label: 'Memories' },
              { id: 'final', label: 'Before You Leave' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#FFE3A8]/20 text-[#FFE3A8] border border-[#FFE3A8]/40 shadow-[0_0_15px_rgba(255,227,168,0.25)]'
                    : 'text-[#C8B6E2]/80 hover:text-[#FAF8FF] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Ambient Music Toggle Button */}
          <button
            onClick={handleToggleMusic}
            aria-label={isPlayingMusic ? 'Mute ambient piano music' : 'Play ambient piano music'}
            aria-pressed={isPlayingMusic}
            className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full glass-panel-gold transition-all duration-300 cursor-pointer ${
              isPlayingMusic
                ? 'border-[#FFE3A8]/60 shadow-[0_0_25px_rgba(255,227,168,0.35)] text-[#FFE3A8]'
                : 'text-[#C8B6E2] hover:text-[#FAF8FF] hover:border-[#FFE3A8]/40'
            }`}
            title={isPlayingMusic ? 'Pause ambient piano music' : 'Play relaxing ambient piano music (Gentle & Calming)'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse text-[#FFE3A8]" />
                {/* Visual soundwave bars */}
                <div className="flex items-end gap-[2px] h-3.5">
                  <span className="w-[2px] h-2 bg-[#FFE3A8] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-[2px] h-3.5 bg-[#FFE3A8] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-[2px] h-2 bg-[#FFE3A8] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="hidden sm:inline text-xs font-medium tracking-wide">Piano On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 opacity-75" />
                <span className="hidden sm:inline text-xs font-medium tracking-wide">Piano Off</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
