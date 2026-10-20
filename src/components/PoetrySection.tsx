import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Copy, Check, Feather, RotateCcw, Compass, Moon, Flower2 } from 'lucide-react';
import { content, type Poem } from '../data/content';
import { triggerCelestialBurst } from '../utils/burstEffect';
import { sfx } from '../utils/soundEffects';

const emblemList = [Compass, Moon, Sparkles, Flower2];

export const PoetrySection: React.FC = () => {
  const { sectionTitle, sectionSubtitle, poems } = content.poetrySection;
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cherishedMap, setCherishedMap] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sfx.playSoftTap();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (poem: Poem, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSoftTap();
    const fullText = `"${poem.title}"\n\n${poem.lines.join('\n')}\n\n— A Little Space for You ♡`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(poem.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCherish = (poemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSoftTap();
    const isNow = !cherishedMap[poemId];
    setCherishedMap((prev) => ({ ...prev, [poemId]: isNow }));
    if (isNow) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      triggerCelestialBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    }
  };

  return (
    <section id="poetry" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-22">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5EC] text-xs tracking-widest uppercase text-[#9E2B54] mb-4 border border-[#F5B8CB] shadow-[0_2px_15px_rgba(199,74,118,0.12)] font-medium"
        >
          <Feather className="w-3.5 h-3.5 text-[#B37B24]" />
          <span>Chapter I • Whispers of the Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-poetry text-4xl sm:text-5xl md:text-6xl text-[#341829] mb-4 font-normal glow-text-subtle"
        >
          {sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#664658] font-light leading-relaxed"
        >
          {sectionSubtitle}
        </motion.p>
      </div>

      {/* 4 LUXURY INTERACTIVE POETRY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {poems.map((poem, index) => {
          const isFlipped = !!flippedCards[poem.id];
          const isCherished = !!cherishedMap[poem.id];
          const EmblemIcon = emblemList[index % emblemList.length] || Sparkles;

          return (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative perspective-1000 group min-h-[420px] sm:min-h-[460px]"
            >
              {/* Outer Card Wrapper with 3D Flip */}
              <div
                onClick={() => toggleFlip(poem.id)}
                className={`w-full h-full cursor-pointer relative transition-transform duration-700 [transform-style:preserve-3d] rounded-3xl ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRONT FACE (LUXURY ROSE PEARL CARD) */}
                <div className="absolute inset-0 [backface-visibility:hidden] glass-panel-gold rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-[#E8B48A]/45 hover:border-[#C74A76]/60 transition-all duration-400 hover:shadow-[0_20px_50px_rgba(184,82,120,0.18)]">
                  {/* Subtle Inner Corner Accents */}
                  <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t border-l border-[#B37B24]/40" />
                  <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t border-r border-[#B37B24]/40" />
                  <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b border-l border-[#B37B24]/40" />
                  <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b border-r border-[#B37B24]/40" />

                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#FFE5EC] border border-[#F5B8CB] text-[#9E2B54]">
                      {poem.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8F6A7E] font-mono tracking-widest">NO. 0{index + 1}</span>
                      <Sparkles className="w-4 h-4 text-[#B37B24] group-hover:scale-125 transition-transform" />
                    </div>
                  </div>

                  {/* Middle: Emblem & Title */}
                  <div className="my-auto py-6 text-center">
                    {/* Glowing Celestial Emblem */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FFE5EC] to-[#FFF4D0] border border-[#E8A2B8] flex items-center justify-center mx-auto mb-5 shadow-[0_4px_18px_rgba(199,74,118,0.15)] group-hover:border-[#C74A76] group-hover:shadow-[0_4px_25px_rgba(199,74,118,0.25)] transition-all">
                      <EmblemIcon className="w-6 h-6 text-[#B37B24] group-hover:text-[#C74A76] transition-colors" />
                    </div>

                    <h3 className="font-serif-poetry text-3xl sm:text-4xl text-[#341829] mb-2 font-normal group-hover:text-[#C74A76] transition-colors">
                      {poem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#664658] italic font-light mb-6 tracking-wide">
                      {poem.subtitle}
                    </p>

                    <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C74A76]/50 to-transparent mx-auto mb-6" />

                    <p className="font-cursive text-2xl sm:text-3xl text-[#B37B24]">
                      "{poem.lines[0]}"
                    </p>
                  </div>

                  {/* Bottom: Unfold Prompt */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F5B8CB]/50 text-xs text-[#8F6A7E]">
                    <span className="inline-flex items-center gap-2 group-hover:text-[#C74A76] transition-colors font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#C74A76]" />
                      Touch card to unfold poetry
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#B37B24] flex items-center gap-1 font-mono font-semibold">
                      Reveal ↻
                    </span>
                  </div>
                </div>

                {/* BACK FACE (REVEALED POETRY ON FROSTED ROSE QUARTZ) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel-glow rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-[#C74A76]/40 shadow-[0_20px_50px_rgba(184,82,120,0.18)]">
                  {/* Top Bar on revealed side */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif-poetry text-xl text-[#B37B24] tracking-wide font-medium">
                      {poem.title}
                    </span>
                    <button
                      onClick={(e) => toggleFlip(poem.id, e)}
                      className="p-1.5 rounded-full hover:bg-[#FFE5EC] text-[#8F6A7E] hover:text-[#341829] transition-colors cursor-pointer"
                      title="Flip back"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Complete Poem Stanzas */}
                  <div className="my-auto py-4 text-center">
                    <div className="space-y-3 sm:space-y-3.5 font-serif-poetry text-xl sm:text-2xl text-[#341829] leading-relaxed tracking-wide">
                      {poem.lines.map((line, lIdx) => (
                        <p key={lIdx} className="hover:text-[#C74A76] transition-colors">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Meaning Note */}
                    <div className="mt-6 pt-4 border-t border-[#F5B8CB]/50 max-w-sm mx-auto">
                      <p className="text-xs text-[#664658] font-light italic leading-relaxed">
                        {poem.meaning}
                      </p>
                    </div>
                  </div>

                  {/* Action Bar: Copy & Cherish */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F5B8CB]/50">
                    <button
                      onClick={(e) => handleCopy(poem, e)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs text-[#664658] hover:text-[#341829] transition-all border border-[#F5B8CB] shadow-sm cursor-pointer"
                      title="Copy poem to clipboard"
                    >
                      {copiedId === poem.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Saved to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Verse</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => handleCherish(poem.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all text-xs cursor-pointer ${
                        isCherished
                          ? 'bg-[#FFE5EC] text-[#9E2B54] border border-[#C74A76] shadow-sm font-medium'
                          : 'bg-white/90 hover:bg-white text-[#664658] hover:text-[#C74A76] border border-[#F5B8CB]'
                      }`}
                      title="Cherish this poem"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isCherished ? 'fill-[#C74A76] text-[#C74A76]' : ''
                        }`}
                      />
                      <span>{isCherished ? 'Cherished ♡' : 'Cherish'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
