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
  originalVx: number;
  originalVy: number;
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
  color: string;
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
    const starCount = isMobile ? 60 : 140;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Palette tailored for Aesthetic Light Pink Background
    const colors = [
      '#D87D9C', // Rose Quartz Shimmer
      '#C98E3A', // Warm Amber Champagne
      '#9E4B6C', // Deep Rose Stardust
      '#E89BB2', // Pastel Blush
      '#8C638E', // Lavender Plum
    ];

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const stars: Star[] = Array.from({ length: starCount }, () => {
      const vx = prefersReducedMotion ? 0 : (Math.random() * 0.08 - 0.04);
      const vy = prefersReducedMotion ? 0 : (Math.random() * -0.16 - 0.04);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.7,
        alpha: Math.random() * 0.65 + 0.35,
        alphaTarget: Math.random() * 0.8 + 0.3,
        twinkleSpeed: (Math.random() * 0.025 + 0.008) * (prefersReducedMotion ? 0.3 : 1),
        vy,
        vx,
        originalVx: vx,
        originalVy: vy,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    let shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + 4000 + Math.random() * 7000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const spawnShootingStar = () => {
      if (prefersReducedMotion) return;
      shootingStars.push({
        x: Math.random() * width * 0.85 + width * 0.05,
        y: Math.random() * (height * 0.35),
        length: Math.random() * 110 + 60,
        speed: Math.random() * 6 + 7,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 0.9,
        life: 0,
        maxLife: 42,
        color: Math.random() > 0.5 ? '#C98E3A' : '#D87D9C',
      });
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render aesthetic pastel rose nebulae
      const aurora1 = ctx.createRadialGradient(
        width * 0.65,
        height * 0.25,
        40,
        width * 0.65,
        height * 0.25,
        width * 0.55
      );
      aurora1.addColorStop(0, 'rgba(255, 209, 222, 0.45)');
      aurora1.addColorStop(0.5, 'rgba(255, 230, 238, 0.25)');
      aurora1.addColorStop(1, 'rgba(253, 242, 244, 0)');
      ctx.fillStyle = aurora1;
      ctx.fillRect(0, 0, width, height);

      const aurora2 = ctx.createRadialGradient(
        width * 0.25,
        height * 0.7,
        30,
        width * 0.25,
        height * 0.7,
        width * 0.5
      );
      aurora2.addColorStop(0, 'rgba(254, 233, 200, 0.4)');
      aurora2.addColorStop(0.6, 'rgba(242, 218, 235, 0.25)');
      aurora2.addColorStop(1, 'rgba(253, 242, 244, 0)');
      ctx.fillStyle = aurora2;
      ctx.fillRect(0, 0, width, height);

      // Draw constellation connections between close stars
      if (!isMobile) {
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 75) {
              const lineAlpha = (1 - dist / 75) * 0.18 * Math.min(stars[i].alpha, stars[j].alpha);
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.strokeStyle = `rgba(207, 134, 160, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle logic
        if (Math.abs(s.alpha - s.alphaTarget) < 0.05) {
          s.alphaTarget = Math.random() * 0.8 + 0.3;
        } else {
          s.alpha += (s.alphaTarget - s.alpha) * s.twinkleSpeed;
        }

        // Mouse gentle gravitational swirl
        if (!isMobile && mouse.x > 0) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 0.6;
            s.vx += (dx / dist) * force * 0.35;
            s.vy += (dy / dist) * force * 0.35;
          } else {
            s.vx += (s.originalVx - s.vx) * 0.03;
            s.vy += (s.originalVy - s.vy) * 0.03;
          }
        }

        // Drift
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
        ctx.shadowBlur = s.size > 1.3 ? 5 : 2;
        ctx.fill();

        // 4-point shimmer cross for bright stars
        if (s.size > 1.6 && s.alpha > 0.6) {
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 2, s.y);
          ctx.lineTo(s.x + s.size * 2, s.y);
          ctx.moveTo(s.x, s.y - s.size * 2);
          ctx.lineTo(s.x, s.y + s.size * 2);
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = s.alpha * 0.6;
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;

      // Shooting stars
      if (!prefersReducedMotion && Date.now() > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = Date.now() + 9000 + Math.random() * 12000;
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
        grad.addColorStop(0, `${ss.color}`);
        grad.addColorStop(0.4, `rgba(235, 140, 168, ${ss.opacity * 0.6})`);
        grad.addColorStop(1, 'rgba(253, 242, 244, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.globalAlpha = ss.opacity;
        ctx.stroke();

        // Tip
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = ss.color;
        ctx.shadowColor = ss.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
