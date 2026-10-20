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
      accent: '#F2B8CD',
    },
    {
      id: 'stars' as SurpriseTab,
      label: 'Catch a Star',
      icon: Sparkles,
      accent: '#FFE3A8',
    },
    {
      id: 'memories' as SurpriseTab,
      label: 'Memory Wall',
      icon: ImageIcon,
      accent: '#C8B6E2',
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2B8CD]/10 text-xs tracking-widest uppercase text-[#FFE3A8] mb-4 border border-[#FFE3A8]/25 shadow-[0_0_15px_rgba(255,227,168,0.12)]">
          <Heart className="w-3.5 h-3.5 fill-[#F2B8CD]/30 text-[#F2B8CD]" />
          <span>Chapter II • Celestial Surprises</span>
        </div>

        <h2 className="font-serif-poetry text-4xl sm:text-5xl md:text-6xl text-[#FAF8FF] mb-3 font-normal glow-text-subtle">
          A Sanctuary of Surprises
        </h2>

        <p className="text-sm sm:text-base text-[#C8B6E2]/85 font-light leading-relaxed">
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
              className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'glass-panel-gold border-[#FFE3A8]/60 text-[#FAF8FF] shadow-[0_0_25px_rgba(255,227,168,0.3)]'
                  : 'glass-panel text-[#C8B6E2]/70 hover:text-[#FAF8FF] hover:border-[#FFE3A8]/30'
              }`}
            >
              <IconComp
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#FFE3A8]' : 'text-[#C8B6E2]'
                }`}
              />
              <span className={isActive ? 'text-[#FFE3A8] font-semibold' : ''}>{tab.label}</span>
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
