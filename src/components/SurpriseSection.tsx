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
      accent: '#E8B4C8',
    },
    {
      id: 'stars' as SurpriseTab,
      label: 'Catch a Star',
      icon: Sparkles,
      accent: '#FFE8A3',
    },
    {
      id: 'memories' as SurpriseTab,
      label: 'Memory Wall',
      icon: ImageIcon,
      accent: '#B8A9CD',
    },
  ];

  const handleTabChange = (tabId: SurpriseTab) => {
    sfx.playSoftTap();
    setActiveTab(tabId);
  };

  return (
    <section id="surprises" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Chapter 2 Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B4C8]/10 text-xs tracking-wider uppercase text-[#E8B4C8] mb-4 border border-[#E8B4C8]/20">
          <Heart className="w-3.5 h-3.5 fill-[#E8B4C8]/30" />
          <span>Chapter II • Surprises</span>
        </div>

        <h2 className="font-serif-poetry text-3xl sm:text-4xl md:text-5xl text-[#F5F0FF] mb-3 font-normal glow-text-subtle">
          A Little Corner of Surprises
        </h2>

        <p className="text-sm sm:text-base text-[#B8A9CD]/80 font-light leading-relaxed">
          Quiet interactive gifts tucked away in the constellation, waiting for your touch.
        </p>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComp = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'glass-panel-glow border-[#E8B4C8]/50 text-[#F5F0FF] shadow-[0_0_20px_rgba(232,180,200,0.25)]'
                  : 'glass-panel text-[#B8A9CD]/70 hover:text-[#F5F0FF] hover:border-[#B8A9CD]/30'
              }`}
            >
              <IconComp
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#FFE8A3]' : 'text-[#B8A9CD]'
                }`}
              />
              <span>{tab.label}</span>
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
