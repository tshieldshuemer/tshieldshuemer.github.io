---
layout: ../layouts/AboutLayout.astro
title: "About Me"
---
I'm an Engineering student from Galway, currently studying in Dublin. I'm interested in Environmental Engineering and Renewable Energy Development amongst other things.
<div class="not-prose">
  <img src="/Selfie.jpg" alt="Me" class="border-4 border-black" />
</div>
## What I do
On this page you might find content relating to 
- [Engineering](/tags/engineering/)
- [CAD](/tags/cad/) & [3D Printing](/tags/3d-printing/)
- [Running](/tags/running/)
- [Diving](/tags/scuba/)
- [Music](/tags/music/)
- [Photography](/tags/photography/)
  
<a href="mailto:galwaywest3d@gmail.com" class="inline-block mt-4 px-4 py-2 rounded border border-accent text-accent hover:bg-accent hover:text-background transition">
  Get in touch ✉️
</a><span id="anteater-trigger" class="inline-block w-2 h-2 ml-2 align-middle rounded-full bg-skin-line opacity-30 hover:opacity-100 cursor-pointer transition" title="..." aria-label="Secret"></span>

<div id="anteater-modal" class="not-prose fixed inset-0 z-50 hidden items-center justify-center bg-background/95 backdrop-blur-sm p-4">
  <div class="w-full max-w-2xl">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-semibold m-0">🐜 You found it</h3>
      <button id="anteater-close" class="px-3 py-1 rounded border border-accent text-accent hover:bg-accent hover:text-background transition text-sm">
        Close (Esc)
      </button>
    </div>
    <div class="border-2 border-skin-line rounded p-3 bg-background">
      <canvas id="anteater-canvas" width="600" height="170" class="block w-full" style="image-rendering: pixelated; touch-action: none;"></canvas>
      <div class="flex justify-between text-sm mt-2 opacity-75">
        <span>Space / tap = jump · ↓ = duck</span>
        <span>Score: <strong id="anteater-score">0</strong> · Best: <strong id="anteater-best">0</strong></span>
      </div>
    </div>
  </div>
</div>

<script is:inline>
(function () {
  const trigger = document.getElementById('anteater-trigger');
  const modal = document.getElementById('anteater-modal');
  const closeBtn = document.getElementById('anteater-close');
  const canvas = document.getElementById('anteater-canvas');
  if (!trigger || !modal || !canvas) return;

  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('anteater-score');
  const bestEl = document.getElementById('anteater-best');
  const W = canvas.width, H = canvas.height;
  const GROUND_Y = 140;

  let best = parseInt(localStorage.getItem('anteaterBest') || '0', 10);
  bestEl.textContent = best;

  let state;
  function reset() {
    state = {
      running: true, gameOver: false, score: 0, speed: 6,
      anteater: { x: 40, y: GROUND_Y, vy: 0, w: 52, h: 32, ducking: false, onGround: true },
      obstacles: [], clouds: [{ x: 300, y: 30 }, { x: 500, y: 50 }],
      groundOffset: 0, spawnTimer: 60, frame: 0
    };
  }
  reset();
  state.running = false;

  function jump() {
    if (state.gameOver) { reset(); return; }
    if (state.anteater.onGround) { state.anteater.vy = -12; state.anteater.onGround = false; }
  }
  function duck(on) { state.anteater.ducking = on && state.anteater.onGround; }

  function spawnObstacle() {
    if (Math.random() < 0.75) {
      const v = Math.floor(Math.random() * 3);
      const widths = [22, 30, 40], heights = [22, 28, 24];
      state.obstacles.push({ type: 'mound', x: W, y: GROUND_Y + 40 - heights[v], w: widths[v], h: heights[v] });
    } else {
      const ys = [GROUND_Y - 5, GROUND_Y + 15, GROUND_Y + 30];
      state.obstacles.push({ type: 'bird', x: W, y: ys[Math.floor(Math.random() * 3)], w: 30, h: 20, flap: 0 });
    }
  }

  function update() {
    if (!state.running) return;
    state.frame++;
    state.anteater.vy += 0.6;
    state.anteater.y += state.anteater.vy;
    if (state.anteater.y >= GROUND_Y) {
      state.anteater.y = GROUND_Y; state.anteater.vy = 0; state.anteater.onGround = true;
    }
    state.groundOffset = (state.groundOffset - state.speed) % 20;
    state.clouds.forEach(c => {
      c.x -= state.speed * 0.3;
      if (c.x < -30) { c.x = W + Math.random() * 100; c.y = 20 + Math.random() * 40; }
    });
    state.spawnTimer--;
    if (state.spawnTimer <= 0) {
      spawnObstacle();
      state.spawnTimer = 60 + Math.random() * 60 - Math.min(30, state.speed * 2);
    }
    state.obstacles.forEach(o => {
      o.x -= state.speed;
      if (o.type === 'bird') o.flap = Math.floor(state.frame / 8) % 2;
    });
    state.obstacles = state.obstacles.filter(o => o.x + o.w > 0);

    const ax = state.anteater.x + 14;
    const aw = state.anteater.ducking ? 30 : 26;
    const ah = state.anteater.ducking ? 18 : 24;
    const ay = state.anteater.ducking ? state.anteater.y + 22 : state.anteater.y + 16;
    state.obstacles.forEach(o => {
      if (ax + 4 < o.x + o.w - 4 && ax + aw - 4 > o.x + 4 &&
          ay + 4 < o.y + o.h - 2 && ay + ah > o.y + 4) {
        state.gameOver = true; state.running = false;
        const s = Math.floor(state.score);
        if (s > best) { best = s; localStorage.setItem('anteaterBest', best); bestEl.textContent = best; }
      }
    });

    state.score += 0.25;
    scoreEl.textContent = Math.floor(state.score);
    if (state.frame % 200 === 0) state.speed = Math.min(13, state.speed + 0.5);
  }

  function getThemeColors() {
    const cs = getComputedStyle(document.documentElement);
    const txt = cs.getPropertyValue('--color-text-base').trim();
    const fill = cs.getPropertyValue('--color-fill').trim();
    return {
      fg: txt ? `rgb(${txt})` : '#222',
      bg: fill ? `rgb(${fill})` : '#fff'
    };
  }

  function drawAnteater(dx, dy) {
    const { fg, bg } = getThemeColors();
    ctx.fillStyle = fg;

    if (state.anteater.ducking) {
      ctx.fillRect(dx - 4, dy + 22, 10, 14);
      ctx.fillRect(dx - 6, dy + 26, 4, 8);
      ctx.fillRect(dx + 2, dy + 20, 6, 4);
      ctx.fillRect(dx + 4, dy + 24, 32, 14);
      ctx.fillRect(dx + 30, dy + 22, 8, 6);
      ctx.fillRect(dx + 36, dy + 22, 8, 8);
      ctx.fillRect(dx + 42, dy + 26, 12, 3);
      ctx.fillRect(dx + 50, dy + 27, 4, 2);
      ctx.fillStyle = bg; ctx.fillRect(dx + 38, dy + 24, 2, 2); ctx.fillStyle = fg;
      const legPhase = Math.floor(state.frame / 4) % 2;
      ctx.fillRect(dx + 8 + legPhase * 2, dy + 38, 3, 4);
      ctx.fillRect(dx + 28 - legPhase * 2, dy + 38, 3, 4);
      return;
    }

    ctx.fillRect(dx, dy + 8, 4, 18);
    ctx.fillRect(dx + 4, dy + 6, 4, 22);
    ctx.fillRect(dx - 2, dy + 12, 4, 12);
    ctx.fillRect(dx + 2, dy + 4, 6, 4);
    ctx.fillRect(dx + 2, dy + 26, 6, 4);
    ctx.fillRect(dx + 8, dy + 10, 22, 18);
    ctx.fillRect(dx + 28, dy + 6, 6, 16);
    ctx.fillRect(dx + 32, dy + 4, 6, 10);
    ctx.fillRect(dx + 36, dy + 4, 8, 8);
    ctx.fillRect(dx + 42, dy + 8, 10, 3);
    ctx.fillRect(dx + 50, dy + 9, 2, 2);
    ctx.fillRect(dx + 38, dy + 2, 3, 3);
    ctx.fillStyle = bg; ctx.fillRect(dx + 38, dy + 6, 2, 2); ctx.fillStyle = fg;

    if (state.anteater.onGround && !state.gameOver) {
      const phase = Math.floor(state.frame / 5) % 2;
      if (phase === 0) {
        ctx.fillRect(dx + 10, dy + 28, 4, 8);
        ctx.fillRect(dx + 24, dy + 28, 4, 6);
      } else {
        ctx.fillRect(dx + 10, dy + 28, 4, 6);
        ctx.fillRect(dx + 24, dy + 28, 4, 8);
      }
    } else {
      ctx.fillRect(dx + 12, dy + 26, 4, 4);
      ctx.fillRect(dx + 22, dy + 26, 4, 4);
    }
  }

  function draw() {
    const { fg, bg } = getThemeColors();

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.35;
    state.clouds.forEach(c => {
      ctx.fillRect(c.x, c.y, 20, 4);
      ctx.fillRect(c.x + 4, c.y - 4, 12, 4);
      ctx.fillRect(c.x + 4, c.y + 4, 16, 2);
    });
    ctx.globalAlpha = 1;

    ctx.fillRect(0, GROUND_Y + 40, W, 2);
    for (let x = state.groundOffset; x < W; x += 20) {
      ctx.fillRect(x, GROUND_Y + 44, 8, 1);
      ctx.fillRect(x + 12, GROUND_Y + 46, 4, 1);
    }

    drawAnteater(state.anteater.x, state.anteater.y);

    state.obstacles.forEach(o => {
      if (o.type === 'mound') {
        const baseY = o.y + o.h;
        ctx.fillStyle = fg;
        ctx.fillRect(o.x - 2, baseY - 6, o.w + 4, 6);
        ctx.fillRect(o.x + 2, baseY - 14, o.w - 4, 8);
        ctx.fillRect(o.x + 6, baseY - 20, o.w - 12, 6);
        if (o.h > 24) ctx.fillRect(o.x + 10, baseY - 24, o.w - 20, 4);
        ctx.fillStyle = bg;
        ctx.fillRect(o.x + Math.floor(o.w / 2) - 1, baseY - 4, 3, 3);
        ctx.fillStyle = fg;
      } else {
        const yOff = o.flap ? 0 : -4;
        ctx.fillRect(o.x + 6, o.y + 8, 18, 6);
        ctx.fillRect(o.x, o.y + 10 + yOff, 8, 4);
        ctx.fillRect(o.x + 20, o.y + 10 + yOff, 10, 3);
        ctx.fillRect(o.x + 22, o.y + 6, 4, 4);
      }
    });

    if (state.gameOver) {
      ctx.fillStyle = fg;
      ctx.font = '500 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER — press space to restart', W / 2, 70);
    }

    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.5;
    ctx.font = '500 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(String(Math.floor(state.score)).padStart(5, '0'), W - 10, 24);
    ctx.globalAlpha = 1;
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }
  loop();

  function open() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    reset();
  }
  function close() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    state.running = false;
  }

  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  window.addEventListener('keydown', e => {
    if (modal.classList.contains('hidden')) return;
    if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    if (e.code === 'ArrowDown') { e.preventDefault(); duck(true); }
    if (e.code === 'Escape') close();
  });
  window.addEventListener('keyup', e => {
    if (e.code === 'ArrowDown') duck(false);
  });
  canvas.addEventListener('pointerdown', e => { e.preventDefault(); jump(); });
})();
</script>