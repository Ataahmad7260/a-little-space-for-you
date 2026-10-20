import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Image as ImageIcon, Heart } from 'lucide-react';
import { OpenWhenSad } from './surprises/OpenWhenSad';
import { CatchAStar } from './surprises/CatchAStar';
import { MemoryWall } from './surprises/MemoryWall';
import { sfx } from '../utils/soundEffects';

type SurpriseTab = 'envelope' | 'stars' | 'memories';

export const SurpriseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SurpriseTab>('envelope');

  const tabs = [
    {
      id: 'envelope' as SurpriseTab,
      label: "Open When You're Sad",
      icon: Mail,
      accent: '#C74A76',
    },
    {
      id: 'stars' as SurpriseTab,
      label: 'Catch a Star',
      icon: Sparkles,
      accent: '#B37B24',
    },
    {
      id: 'memories' as SurpriseTab,
      label: 'Memory Wall',
      icon: ImageIcon,
      accent: '#9E2B54',
    },
  ];

  const handleTabChange = (tabId: SurpriseTab) => {
    sfx.playSoftTap();
    setActiveTab(tabId);
  };

  return (
    <section id="surprises" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Chapter 2 Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5EC] text-xs tracking-widest uppercase text-[#9E2B54] mb-4 border border-[#F5B8CB] shadow-[0_2px_15px_rgba(199,74,118,0.12)] font-medium">
          <Heart className="w-3.5 h-3.5 fill-[#C74A76] text-[#C74A76]" />
          <span>Chapter II • Celestial Surprises</span>
        </div>

        <h2 className="font-serif-poetry text-4xl sm:text-5xl md:text-6xl text-[#341829] mb-3 font-normal glow-text-subtle">
          A Sanctuary of Surprises
        </h2>

        <p className="text-sm sm:text-base text-[#664658] font-light leading-relaxed">
          Quiet interactive gifts tucked away in the constellation, waiting for your touch.
        </p>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-14">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComp = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer shadow-sm ${
                isActive
                  ? 'glass-panel-glow border-[#C74A76] text-[#9E2B54] shadow-[0_4px_25px_rgba(199,74,118,0.22)]'
                  : 'glass-panel text-[#664658] hover:text-[#341829] hover:border-[#C74A76]/40'
              }`}
            >
              <IconComp
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#C74A76]' : 'text-[#8F6A7E]'
                }`}
              />
              <span className={isActive ? 'text-[#9E2B54] font-semibold' : ''}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'envelope' && <OpenWhenSad />}
        {activeTab === 'stars' && <CatchAStar />}
        {activeTab === 'memories' && <MemoryWall />}
      </motion.div>
    </section>
  );
};
