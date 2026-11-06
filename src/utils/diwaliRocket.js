import confetti from 'canvas-confetti';

/**
 * Procedural Web Audio API sound synthesis for Diwali Rocket:
 * 1. Rocket ascending whistle / whoosh (Frequency ramp 180Hz -> 850Hz)
 * 2. High-altitude festive firecracker explosion blast (Filtered noise burst + low-frequency punch)
 */
export const playRocketSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const startTime = ctx.currentTime;

    // 1. Ascending Rocket Whoosh / Whistle
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, startTime);
    osc.frequency.exponentialRampToValueAtTime(850, startTime + 0.42);

    oscGain.gain.setValueAtTime(0.08, startTime);
    oscGain.gain.linearRampToValueAtTime(0.15, startTime + 0.35);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.45);

    // 2. Sky-Shot Cracker Explosion Blast at 0.42s
    setTimeout(() => {
      try {
        const boomTime = ctx.currentTime;
        const bufferSize = Math.floor(ctx.sampleRate * 0.55);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, boomTime);
        filter.frequency.exponentialRampToValueAtTime(100, boomTime + 0.5);

        const boomGain = ctx.createGain();
        boomGain.gain.setValueAtTime(0.22, boomTime);
        boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.5);

        noise.connect(filter);
        filter.connect(boomGain);
        boomGain.connect(ctx.destination);
        noise.start(boomTime);
      } catch {}
    }, 420);
  } catch {}
};

/**
 * Multi-Stage Diwali Rocket Fireworks Launch Engine:
 * - Stage 1: Ascending fiery tail rocket shooting upwards from bottom (t = 0 to 350ms)
 * - Stage 2: Mega High-Altitude Sky-Shot Explosion (t = 450ms)
 * - Stage 3: Twin Secondary Colorful Flak Bursts (t = 700ms, 950ms)
 * - Stage 4: Golden Zari Shower / Phooljhadi Cascade (t = 1200ms)
 */
export const launchDiwaliRocket = (options = {}) => {
  const launchX = typeof options.originX === 'number' ? options.originX : 0.5;

  // Trigger optional audio effects
  playRocketSound();

  // Show floating festive Diwali toast notification
  showDiwaliToast();

  // ==========================================
  // STAGE 1: ROCKET ASCENT (Fiery Tail Rising)
  // ==========================================
  const fieryColors = ['#ff3300', '#ff6600', '#ffaa00', '#ffd700', '#ffffff'];

  // Initial ignition from bottom
  confetti({
    particleCount: 20,
    startVelocity: 65,
    spread: 15,
    angle: 90,
    origin: { x: launchX, y: 0.95 },
    colors: fieryColors,
    gravity: 0.8,
    ticks: 60,
    scalar: 0.8,
  });

  // Mid-flight tail sparks (150ms)
  setTimeout(() => {
    confetti({
      particleCount: 25,
      startVelocity: 55,
      spread: 20,
      angle: 90,
      origin: { x: launchX, y: 0.65 },
      colors: fieryColors,
      gravity: 0.9,
      ticks: 70,
      scalar: 0.9,
    });
  }, 150);

  // Peak apex sparks (300ms)
  setTimeout(() => {
    confetti({
      particleCount: 30,
      startVelocity: 40,
      spread: 25,
      angle: 90,
      origin: { x: launchX, y: 0.42 },
      colors: ['#ffe600', '#ffa500', '#ffffff'],
      ticks: 60,
    });
  }, 300);

  // ===================================================
  // STAGE 2: MEGA SKY-SHOT EXPLOSION (At Apex: 450ms)
  // ===================================================
  setTimeout(() => {
    // 360-degree radial festive explosion
    confetti({
      particleCount: 140,
      spread: 360,
      startVelocity: 50,
      origin: { x: launchX, y: 0.32 },
      colors: [
        '#ff0055', // festive crimson
        '#ff7700', // saffron orange
        '#ffd700', // diya gold
        '#00ff99', // emerald green
        '#00d0ff', // celestial cyan
        '#d946ef', // cosmic purple
        '#ffffff', // bright spark
      ],
      ticks: 220,
      gravity: 0.75,
      decay: 0.92,
      scalar: 1.15,
    });

    // Glitter crackle burst
    confetti({
      particleCount: 60,
      spread: 200,
      startVelocity: 35,
      origin: { x: launchX, y: 0.32 },
      colors: ['#ffd700', '#fff3b0', '#ffb703'],
      ticks: 180,
      gravity: 0.65,
      decay: 0.94,
      scalar: 0.8,
    });
  }, 450);

  // ===================================================
  // STAGE 3: TWIN SECONDARY ROCKETS (Left & Right)
  // ===================================================
  setTimeout(() => {
    // Left Emerald & Gold Burst
    confetti({
      particleCount: 70,
      spread: 120,
      startVelocity: 42,
      origin: { x: Math.max(0.2, launchX - 0.25), y: 0.38 },
      colors: ['#10b981', '#34d399', '#ffd700', '#fbbf24', '#ffffff'],
      ticks: 180,
    });
  }, 750);

  setTimeout(() => {
    // Right Ruby & Violet Burst
    confetti({
      particleCount: 70,
      spread: 120,
      startVelocity: 42,
      origin: { x: Math.min(0.8, launchX + 0.25), y: 0.38 },
      colors: ['#f43f5e', '#fb7185', '#c084fc', '#e879f9', '#ffd700'],
      ticks: 180,
    });
  }, 1000);

  // ===================================================
  // STAGE 4: GOLDEN ZARI CASCADE / FOUNTAIN (1250ms)
  // ===================================================
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 80,
      startVelocity: 25,
      origin: { x: launchX, y: 0.28 },
      colors: ['#ffd700', '#fef08a', '#f59e0b'],
      ticks: 260,
      gravity: 0.45,
      decay: 0.96,
      scalar: 1.25,
    });
  }, 1250);
};

/**
 * Temporary floating Diwali celebratory banner toast
 */
const showDiwaliToast = () => {
  const existing = document.getElementById('diwali-toast');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'diwali-toast';
  toast.className =
    'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0e0919]/95 text-white border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.4)] backdrop-blur-xl animate-bounce text-xs sm:text-sm font-mono pointer-events-none transition-opacity duration-500';
  toast.innerHTML = `
    <span class="text-xl">🪔</span>
    <div>
      <p class="font-bold text-amber-300">Shubh Deepavali! 🎆</p>
      <p class="text-[11px] text-zinc-300">Diwali Rocket Fired &bull; Resume Downloaded!</p>
    </div>
    <span class="text-xl">🚀</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 600);
  }, 4200);
};
