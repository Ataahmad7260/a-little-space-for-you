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
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8B6E2]/10 text-xs tracking-widest uppercase text-[#FFE3A8] mb-4 border border-[#FFE3A8]/25 shadow-[0_0_15px_rgba(255,227,168,0.12)]"
        >
          <Feather className="w-3.5 h-3.5 text-[#FFE3A8]" />
          <span>Chapter I • Whispers of the Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-poetry text-4xl sm:text-5xl md:text-6xl text-[#FAF8FF] mb-4 font-normal glow-text-subtle"
        >
          {sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#C8B6E2]/85 font-light leading-relaxed"
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
                {/* FRONT FACE (LUXURY CELESTIAL CARD) */}
                <div className="absolute inset-0 [backface-visibility:hidden] glass-panel-gold rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-[#FFE3A8]/25 hover:border-[#F2B8CD]/50 transition-all duration-400 hover:shadow-[0_20px_50px_rgba(242,184,205,0.22)]">
                  {/* Subtle Inner Corner Accents */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#FFE3A8]/40" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#FFE3A8]/40" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#FFE3A8]/40" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#FFE3A8]/40" />

                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-[#FFE3A8]">
                      {poem.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#C8B6E2]/70 font-mono tracking-widest">NO. 0{index + 1}</span>
                      <Sparkles className="w-4 h-4 text-[#FFE3A8] group-hover:scale-125 transition-transform" />
                    </div>
                  </div>

                  {/* Middle: Emblem & Title */}
                  <div className="my-auto py-6 text-center">
                    {/* Glowing Celestial Emblem */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#9B86BD]/20 to-[#FFE3A8]/20 border border-[#FFE3A8]/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(255,227,168,0.18)] group-hover:border-[#F2B8CD] group-hover:shadow-[0_0_25px_rgba(242,184,205,0.35)] transition-all">
                      <EmblemIcon className="w-6 h-6 text-[#FFE3A8] group-hover:text-[#F2B8CD] transition-colors" />
                    </div>

                    <h3 className="font-serif-poetry text-3xl sm:text-4xl text-[#FAF8FF] mb-2 font-normal group-hover:text-[#F2B8CD] transition-colors">
                      {poem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C8B6E2]/80 italic font-light mb-6 tracking-wide">
                      {poem.subtitle}
                    </p>

                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFE3A8]/60 to-transparent mx-auto mb-6" />

                    <p className="font-cursive text-2xl sm:text-3xl text-[#FFE3A8]/90">
                      "{poem.lines[0]}"
                    </p>
                  </div>

                  {/* Bottom: Unfold Prompt */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[#C8B6E2]/80">
                    <span className="inline-flex items-center gap-2 group-hover:text-[#FFE3A8] transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-[#F2B8CD]" />
                      Touch card to unfold poetry
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#FFE3A8]/70 flex items-center gap-1 font-mono">
                      Reveal ↻
                    </span>
                  </div>
                </div>

                {/* BACK FACE (REVEALED POETRY ON PARCHMENT-STYLE GLASS) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel-glow rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-[#F2B8CD]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
                  {/* Top Bar on revealed side */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif-poetry text-xl text-[#FFE3A8] tracking-wide">
                      {poem.title}
                    </span>
                    <button
                      onClick={(e) => toggleFlip(poem.id, e)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-[#C8B6E2] hover:text-[#FAF8FF] transition-colors"
                      title="Flip back"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Complete Poem Stanzas */}
                  <div className="my-auto py-4 text-center">
                    <div className="space-y-3 sm:space-y-3.5 font-serif-poetry text-xl sm:text-2xl text-[#FAF8FF] leading-relaxed tracking-wide">
                      {poem.lines.map((line, lIdx) => (
                        <p key={lIdx} className="hover:text-[#FFE3A8] transition-colors">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Meaning Note */}
                    <div className="mt-6 pt-4 border-t border-white/10 max-w-sm mx-auto">
                      <p className="text-xs text-[#C8B6E2]/85 font-light italic leading-relaxed">
                        {poem.meaning}
                      </p>
                    </div>
                  </div>

                  {/* Action Bar: Copy & Cherish */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={(e) => handleCopy(poem, e)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#C8B6E2] hover:text-[#FAF8FF] transition-all border border-white/10"
                      title="Copy poem to clipboard"
                    >
                      {copiedId === poem.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Saved to clipboard</span>
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
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all text-xs ${
                        isCherished
                          ? 'bg-[#F2B8CD]/30 text-[#F2B8CD] border border-[#F2B8CD]/50 shadow-[0_0_15px_rgba(242,184,205,0.4)]'
                          : 'bg-white/5 hover:bg-white/10 text-[#C8B6E2] hover:text-[#F2B8CD] border border-white/10'
                      }`}
                      title="Cherish this poem"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isCherished ? 'fill-[#F2B8CD] text-[#F2B8CD]' : ''
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
