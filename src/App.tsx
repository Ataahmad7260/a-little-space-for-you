import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { CustomCursor } from './components/CustomCursor';
import { InteractiveHeartsOverlay } from './components/InteractiveHeartsOverlay';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { PoetrySection } from './components/PoetrySection';
import { SurpriseSection } from './components/SurpriseSection';
import { FinalSection } from './components/FinalSection';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const handleExplore = () => {
    const el = document.getElementById('poetry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRestartKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Cinematic Starry Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Main Experience */}
      <InteractiveHeartsOverlay>
        {/* Canvas Starfield with Stars and Shooting Stars */}
        <StarfieldCanvas />

        {/* Custom Desktop Starlight Cursor */}
        <CustomCursor />

        {/* Floating Glass Navigation & Ambient Music Controller */}
        <HeaderNav onRestart={handleRestart} />

        {/* Main Content Flow */}
        <main className="relative z-10 w-full min-h-screen">
          <HeroSection key={`hero-${restartKey}`} onExplore={handleExplore} />
          <PoetrySection />
          <SurpriseSection />
          <FinalSection onRestart={handleRestart} />
        </main>
      </InteractiveHeartsOverlay>
    </>
  );
};

export default App;
