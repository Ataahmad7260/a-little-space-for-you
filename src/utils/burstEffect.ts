import confetti from 'canvas-confetti';

// Celestial star & heart burst using canvas-confetti
export const triggerCelestialBurst = (x: number = 0.5, y: number = 0.5) => {
  // Check reduced motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Soft romantic colors: Lavender, Muted Pink, Starlight Gold, Soft White
  const colors = ['#B8A9CD', '#E8B4C8', '#FFE8A3', '#F5F0FF', '#D8C5E8'];

  // Gentle star burst
  confetti({
    particleCount: 28,
    angle: 90,
    spread: 60,
    origin: { x, y },
    colors: colors,
    shapes: ['star', 'circle'],
    scalar: 0.9,
    ticks: 120,
    gravity: 0.6,
    drift: 0,
    startVelocity: 18,
  });
};

// Romantic heart celebration
export const triggerHeartShower = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const duration = 2.2 * 1000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#E8B4C8', '#B8A9CD', '#FFE8A3'],
      shapes: ['circle'],
      scalar: 1.1,
      gravity: 0.5,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#E8B4C8', '#B8A9CD', '#F5F0FF'],
      shapes: ['circle'],
      scalar: 1.1,
      gravity: 0.5,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
