import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates for subtle 3D parallax
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e) => {
      // Normalize coordinates between -1 and 1
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Star & celestial layers
    let distantStars = [];
    let midStars = [];
    let brightStars = [];
    let nebulae = [];
    const meteors = [];

    const starPalette = [
      '#ffffff',
      '#ffffff',
      '#f5f3ff', // stellar white
      '#e9d5ff', // pale purple
      '#d8b4fe', // light violet
      '#c084fc', // cosmic purple
      '#818cf8', // celestial indigo
      '#38bdf8', // cyan starlight
      '#f472b6', // nebula pink
    ];

    const initScene = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before re-scaling
      ctx.scale(dpr, dpr);

      // Star counts scaled dynamically by viewport area
      const area = width * height;
      const countDistant = Math.min(Math.max(Math.floor(area / 5500), 120), 260);
      const countMid = Math.min(Math.max(Math.floor(area / 9500), 70), 160);
      const countBright = Math.min(Math.max(Math.floor(area / 32000), 20), 40);

      // Layer 0: Distant micro-stars (slow drift, high density)
      distantStars = Array.from({ length: countDistant }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.7 + 0.35,
        alpha: Math.random() * 0.5 + 0.25,
        baseAlpha: Math.random() * 0.45 + 0.2,
        twinkleSpeed: Math.random() * 0.018 + 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starPalette[Math.floor(Math.random() * 4)],
        driftY: Math.random() * 0.06 + 0.02,
      }));

      // Layer 1: Mid-ground twinkling stars (vibrant colors)
      midStars = Array.from({ length: countMid }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.95 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        driftY: Math.random() * 0.14 + 0.04,
      }));

      // Layer 2: Major bright foreground stars (diffraction cross & halo)
      brightStars = Array.from({ length: countBright }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 1.6,
        alpha: Math.random() * 0.5 + 0.5,
        baseAlpha: Math.random() * 0.4 + 0.6,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        driftY: Math.random() * 0.2 + 0.06,
        spikeLength: Math.random() * 6 + 5,
      }));

      // Floating nebulae gas clouds
      nebulae = [
        {
          x: width * 0.25,
          y: height * 0.3,
          radius: Math.min(width, height) * 0.45,
          color: 'rgba(147, 51, 234, 0.06)', // deep violet
          driftX: 0.025,
          driftY: 0.015,
        },
        {
          x: width * 0.78,
          y: height * 0.6,
          radius: Math.min(width, height) * 0.42,
          color: 'rgba(99, 102, 241, 0.045)', // celestial indigo
          driftX: -0.02,
          driftY: 0.02,
        },
        {
          x: width * 0.5,
          y: height * 0.88,
          radius: Math.min(width, height) * 0.38,
          color: 'rgba(56, 189, 248, 0.03)', // starlight cyan
          driftX: 0.015,
          driftY: -0.018,
        },
      ];
    };

    initScene();

    const handleResize = () => {
      initScene();
    };

    window.addEventListener('resize', handleResize);

    // Meteors spawning system
    let lastMeteorTime = Date.now();
    const maybeSpawnMeteor = () => {
      const now = Date.now();
      // Spawn meteor every 1.5 - 3.5 seconds
      if (now - lastMeteorTime > 1600 && Math.random() < 0.04 && meteors.length < 3) {
        lastMeteorTime = now;
        const startX = Math.random() * (width * 1.1) - width * 0.05;
        const startY = Math.random() * (height * 0.45);
        const angle = Math.PI / 4 + (Math.random() * 0.26 - 0.13); // ~45 degrees downward
        const speed = Math.random() * 11 + 9;
        const isFireball = Math.random() < 0.3;

        meteors.push({
          x: startX,
          y: startY,
          length: isFireball ? Math.random() * 130 + 90 : Math.random() * 85 + 50,
          speed: speed,
          angle: angle,
          alpha: 1,
          decay: isFireball ? 0.013 : 0.018,
          lineWidth: isFireball ? 2.4 : 1.7,
          color: isFireball ? '#38bdf8' : '#c084fc',
        });
      }
    };

    const render = () => {
      // Smooth lerp mouse parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Floating Nebulae
      for (let i = 0; i < nebulae.length; i++) {
        const neb = nebulae[i];
        neb.x += neb.driftX;
        neb.y += neb.driftY;
        if (neb.x < -neb.radius) neb.x = width + neb.radius;
        if (neb.x > width + neb.radius) neb.x = -neb.radius;
        if (neb.y < -neb.radius) neb.y = height + neb.radius;
        if (neb.y > height + neb.radius) neb.y = -neb.radius;

        const grad = ctx.createRadialGradient(
          neb.x + mouse.x * 12,
          neb.y + mouse.y * 12,
          0,
          neb.x + mouse.x * 12,
          neb.y + mouse.y * 12,
          neb.radius
        );
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x + mouse.x * 12, neb.y + mouse.y * 12, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Layer 0: Distant Stars (Slowest Parallax)
      const p0X = mouse.x * 7;
      const p0Y = mouse.y * 7;
      for (let i = 0; i < distantStars.length; i++) {
        const star = distantStars[i];
        star.y += star.driftY;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.12, star.baseAlpha + Math.sin(star.twinklePhase) * 0.22);

        ctx.beginPath();
        ctx.arc(star.x + p0X, star.y + p0Y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }

      // 3. Render Layer 1: Mid Stars
      const p1X = mouse.x * 16;
      const p1Y = mouse.y * 16;
      for (let i = 0; i < midStars.length; i++) {
        const star = midStars[i];
        star.y += star.driftY;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.18, Math.min(1, star.baseAlpha + Math.sin(star.twinklePhase) * 0.38));

        ctx.beginPath();
        ctx.arc(star.x + p1X, star.y + p1Y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Soft starlight halo
        ctx.beginPath();
        ctx.arc(star.x + p1X, star.y + p1Y, star.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha * 0.22;
        ctx.fill();
      }

      // 4. Render Layer 2: Bright Foreground Stars (Diffraction Cross + Atmospheric Halo)
      const p2X = mouse.x * 28;
      const p2Y = mouse.y * 28;
      for (let i = 0; i < brightStars.length; i++) {
        const star = brightStars[i];
        star.y += star.driftY;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        star.twinklePhase += star.twinkleSpeed;
        const sinVal = Math.sin(star.twinklePhase);
        const currentAlpha = Math.max(0.35, Math.min(1, star.baseAlpha + sinVal * 0.42));
        const currentRadius = star.radius * (1 + sinVal * 0.12);

        const sx = star.x + p2X;
        const sy = star.y + p2Y;

        // Core star
        ctx.beginPath();
        ctx.arc(sx, sy, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Atmospheric halo
        const haloGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, currentRadius * 3.8);
        haloGrad.addColorStop(0, star.color);
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.globalAlpha = currentAlpha * 0.45;
        ctx.beginPath();
        ctx.arc(sx, sy, currentRadius * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // 4-point telescope diffraction cross
        const spike = star.spikeLength * (1 + sinVal * 0.22);
        ctx.strokeStyle = star.color;
        ctx.lineWidth = 0.85;
        ctx.globalAlpha = currentAlpha * 0.65;
        ctx.beginPath();
        // Horizontal spike
        ctx.moveTo(sx - spike, sy);
        ctx.lineTo(sx + spike, sy);
        // Vertical spike
        ctx.moveTo(sx, sy - spike);
        ctx.lineTo(sx, sy + spike);
        ctx.stroke();
      }

      // 5. Render & Update Meteors (Shooting Stars)
      maybeSpawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const endX = m.x - Math.cos(m.angle) * m.length;
        const endY = m.y - Math.sin(m.angle) * m.length;

        // Radiant comet tail gradient
        const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.2, m.color === '#38bdf8' ? `rgba(56, 189, 248, ${m.alpha * 0.95})` : `rgba(192, 132, 252, ${m.alpha * 0.95})`);
        grad.addColorStop(0.6, `rgba(147, 51, 234, ${m.alpha * 0.4})`);
        grad.addColorStop(1, 'transparent');

        // Draw meteor streak
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.lineWidth;
        ctx.lineCap = 'round';
        ctx.globalAlpha = m.alpha;
        ctx.stroke();

        // Meteor glowing nucleus
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.lineWidth * 1.35, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = m.alpha;
        ctx.fill();

        // Advance meteor
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x > width + 150 || m.y > height + 150) {
          meteors.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-95"
      aria-hidden="true"
    />
  );
}
