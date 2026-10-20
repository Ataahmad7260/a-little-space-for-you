import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaTarget: number;
  twinkleSpeed: number;
  vy: number;
  vx: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const starCount = isMobile ? 55 : 140;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors = [
      '#F5F0FF', // Soft White
      '#B8A9CD', // Lavender
      '#E8B4C8', // Muted Pink
      '#FFE8A3', // Starlight Gold
    ];

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      alphaTarget: Math.random() * 0.8 + 0.2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (prefersReducedMotion ? 0.3 : 1),
      vy: prefersReducedMotion ? 0 : (Math.random() * -0.15 - 0.03),
      vx: prefersReducedMotion ? 0 : (Math.random() * 0.06 - 0.03),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + 5000 + Math.random() * 8000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const spawnShootingStar = () => {
      if (prefersReducedMotion) return;
      shootingStars.push({
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 5 + 6,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 1,
        life: 0,
        maxLife: 45,
      });
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render subtle celestial gradient / nebula dust
      const nebula = ctx.createRadialGradient(
        width * 0.7,
        height * 0.3,
        50,
        width * 0.7,
        height * 0.3,
        width * 0.6
      );
      nebula.addColorStop(0, 'rgba(184, 169, 205, 0.04)');
      nebula.addColorStop(0.5, 'rgba(232, 180, 200, 0.025)');
      nebula.addColorStop(1, 'rgba(11, 11, 20, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle logic
        if (Math.abs(s.alpha - s.alphaTarget) < 0.05) {
          s.alphaTarget = Math.random() * 0.8 + 0.2;
        } else {
          s.alpha += (s.alphaTarget - s.alpha) * s.twinkleSpeed;
        }

        // Slow upward drift
        s.y += s.vy * 60 * delta;
        s.x += s.vx * 60 * delta;

        // Wrap around edges
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size > 1.4 ? 6 : 2;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Shooting stars
      if (!prefersReducedMotion && Date.now() > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = Date.now() + 12000 + Math.random() * 14000;
      }

      for (let j = shootingStars.length - 1; j >= 0; j--) {
        const ss = shootingStars[j];
        ss.life += 1;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity = 1 - ss.life / ss.maxLife;

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(j, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 232, 163, ${ss.opacity * 0.9})`);
        grad.addColorStop(0.3, `rgba(232, 180, 200, ${ss.opacity * 0.6})`);
        grad.addColorStop(1, 'rgba(184, 169, 205, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright tip
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};
