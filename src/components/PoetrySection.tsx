import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Copy, Check, Bookmark, Feather, RotateCcw } from 'lucide-react';
import { content, type Poem } from '../data/content';
import { triggerCelestialBurst } from '../utils/burstEffect';
import { sfx } from '../utils/soundEffects';

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
    <section id="poetry" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8A9CD]/10 text-xs tracking-wider uppercase text-[#B8A9CD] mb-4 border border-[#B8A9CD]/20"
        >
          <Feather className="w-3.5 h-3.5 text-[#FFE8A3]" />
          <span>Chapter I • Poetry</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-poetry text-3xl sm:text-4xl md:text-5xl text-[#F5F0FF] mb-4 font-normal glow-text-subtle"
        >
          {sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#B8A9CD]/80 font-light leading-relaxed"
        >
          {sectionSubtitle}
        </motion.p>
      </div>

      {/* 4 Interactive Poetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {poems.map((poem, index) => {
          const isFlipped = !!flippedCards[poem.id];
          const isCherished = !!cherishedMap[poem.id];

          return (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative perspective-1000 group min-h-[380px] sm:min-h-[420px]"
            >
              {/* Outer Card Wrapper with 3D Flip */}
              <div
                onClick={() => toggleFlip(poem.id)}
                className={`w-full h-full cursor-pointer relative transition-transform duration-700 [transform-style:preserve-3d] rounded-2xl ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 [backface-visibility:hidden] glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#B8A9CD]/20 hover:border-[#E8B4C8]/40 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(184,169,205,0.18)]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-white/5 border border-white/10 text-[#FFE8A3]">
                      {poem.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#B8A9CD]/60 font-mono">0{index + 1}</span>
                      <Sparkles className="w-4 h-4 text-[#B8A9CD]/60 group-hover:text-[#FFE8A3] transition-colors" />
                    </div>
                  </div>

                  {/* Middle: Title & Subtle Preview */}
                  <div className="my-auto py-6 text-center">
                    <h3 className="font-serif-poetry text-2xl sm:text-3xl text-[#F5F0FF] mb-2 font-normal group-hover:text-[#E8B4C8] transition-colors">
                      {poem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B8A9CD]/70 italic font-light mb-6">
                      {poem.subtitle}
                    </p>

                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#E8B4C8]/50 to-transparent mx-auto mb-6" />

                    <p className="text-sm font-serif-poetry text-[#F5F0FF]/60 italic">
                      "{poem.lines[0]}"
                    </p>
                  </div>

                  {/* Bottom: Unfold Prompt */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-[#B8A9CD]/80">
                    <span className="inline-flex items-center gap-1.5 group-hover:text-[#FFE8A3] transition-colors">
                      <Bookmark className="w-3.5 h-3.5 text-[#E8B4C8]" />
                      Click card to unfold poem
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#B8A9CD]/50">
                      Turn over ↻
                    </span>
                  </div>
                </div>

                {/* BACK FACE (REVEALED POETRY) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel-glow rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#E8B4C8]/30">
                  {/* Top Bar on revealed side */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif-poetry text-lg text-[#FFE8A3] tracking-wide">
                      {poem.title}
                    </span>
                    <button
                      onClick={(e) => toggleFlip(poem.id, e)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-[#B8A9CD] hover:text-[#F5F0FF] transition-colors"
                      title="Flip back"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Complete Poem Stanzas */}
                  <div className="my-auto py-4 text-center">
                    <div className="space-y-2.5 sm:space-y-3 font-serif-poetry text-lg sm:text-xl text-[#F5F0FF] leading-relaxed tracking-wide">
                      {poem.lines.map((line, lIdx) => (
                        <p key={lIdx} className="hover:text-[#FFE8A3] transition-colors">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Meaning Note */}
                    <p className="mt-5 text-xs text-[#B8A9CD]/75 font-light italic max-w-sm mx-auto leading-relaxed border-t border-white/10 pt-3">
                      {poem.meaning}
                    </p>
                  </div>

                  {/* Action Bar: Copy & Cherish */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      onClick={(e) => handleCopy(poem, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#B8A9CD] hover:text-[#F5F0FF] transition-all"
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
                          <span>Copy Stanza</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => handleCherish(poem.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs ${
                        isCherished
                          ? 'bg-[#E8B4C8]/25 text-[#E8B4C8] border border-[#E8B4C8]/40 shadow-[0_0_12px_rgba(232,180,200,0.3)]'
                          : 'bg-white/5 hover:bg-white/10 text-[#B8A9CD] hover:text-[#E8B4C8]'
                      }`}
                      title="Cherish this poem"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isCherished ? 'fill-[#E8B4C8] text-[#E8B4C8]' : ''
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
