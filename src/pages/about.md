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
      
      <button id="anteater-close" class="px-3 py-1 rounded border border-accent text-accent hover:bg-accent hover:text-background transition text-sm">
        Close (Esc)
      </button>
    </div>
    <div class="border-2 border-skin-line rounded p-3 bg-background">
      <canvas id="anteater-canvas" width="600" height="170" class="block w-full" style="image-rendering: pixelated; touch-action: none;"></canvas>
      <div class="flex justify-between text-sm mt-2 opacity-75">
        
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
  const GROUND_Y = 100;

  let best = parseInt(localStorage.getItem('anteaterBest') || '0', 10);
  bestEl.textContent = best;

  let state;
  function reset() {
    state = {
      running: true, gameOver: false, score: 0, speed: 6,
      anteater: { x: 60, y: GROUND_Y, vy: 0, ducking: false, onGround: true },
      obstacles: [], clouds: [{ x: 300, y: 30 }, { x: 500, y: 50 }],
      groundOffset: 0, spawnTimer: 60, frame: 0
    };
  }
  reset();
  state.running = false;

  function jump() {
    if (state.gameOver) { reset(); return; }
    if (state.anteater.onGround) { state.anteater.vy = -10; state.anteater.onGround = false; }
  }
  function duck(on) {
    if (on && state.anteater.onGround) state.anteater.ducking = true;
    else if (!on) state.anteater.ducking = false;
  }

  function spawnObstacle() {
    if (Math.random() < 0.7) {
      const v = Math.floor(Math.random() * 3);
      const widths = [22, 30, 40], heights = [22, 30, 26];
      state.obstacles.push({ type: 'mound', x: W, y: GROUND_Y + 70 - heights[v], w: widths[v], h: heights[v] });
    } else {
      state.obstacles.push({ type: 'bird', x: W, y: GROUND_Y + 12, w: 30, h: 16, flap: 0 });
    }
  }

  function getAnteaterBox() {
    const a = state.anteater;
    if (a.ducking) {
      return { x: a.x + 4, y: a.y + 44, w: 28, h: 24 };
    }
    if (!a.onGround) {
      return { x: a.x + 8, y: a.y + 28, w: 26, h: 28 };
    }
    return { x: a.x + 4, y: a.y + 20, w: 22, h: 52 };
  }

  function getObstacleBox(o) {
    if (o.type === 'mound') {
      return { x: o.x + 4, y: o.y + 2, w: o.w - 8, h: o.h - 2 };
    }
    return { x: o.x + 4, y: o.y + 4, w: o.w - 8, h: o.h - 8 };
  }

  function boxesOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
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
      state.spawnTimer = 70 + Math.random() * 60 - Math.min(30, state.speed * 2);
    }
    state.obstacles.forEach(o => {
      o.x -= state.speed;
      if (o.type === 'bird') o.flap = Math.floor(state.frame / 8) % 2;
    });
    state.obstacles = state.obstacles.filter(o => o.x + o.w > 0);

    const aBox = getAnteaterBox();
    for (const o of state.obstacles) {
      if (boxesOverlap(aBox, getObstacleBox(o))) {
        state.gameOver = true; state.running = false;
        const s = Math.floor(state.score);
        if (s > best) { best = s; localStorage.setItem('anteaterBest', best); bestEl.textContent = best; }
        break;
      }
    }

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

  function drawTpose(dx, dy) {
    const { fg, bg } = getThemeColors();
    ctx.fillStyle = fg;
    ctx.fillRect(dx - 8, dy + 22, 6, 20);
    ctx.fillRect(dx - 2, dy + 20, 4, 24);
    ctx.fillRect(dx - 10, dy + 26, 4, 12);
    ctx.fillRect(dx - 6, dy + 18, 6, 4);
    ctx.fillRect(dx - 6, dy + 42, 6, 4);
    ctx.fillRect(dx + 2, dy + 22, 22, 24);
    ctx.fillRect(dx, dy + 26, 2, 16);
    ctx.fillRect(dx + 24, dy + 26, 2, 16);
    ctx.fillRect(dx - 8, dy + 28, 10, 4);
    ctx.fillRect(dx + 24, dy + 28, 10, 4);
    ctx.fillRect(dx - 11, dy + 26, 3, 2);
    ctx.fillRect(dx + 31, dy + 26, 3, 2);
    ctx.fillRect(dx + 6, dy + 14, 14, 10);
    ctx.fillRect(dx + 5, dy + 16, 1, 6);
    ctx.fillRect(dx + 20, dy + 16, 1, 6);
    ctx.fillRect(dx + 20, dy + 16, 14, 4);
    ctx.fillRect(dx + 32, dy + 17, 3, 2);
    ctx.fillRect(dx + 16, dy + 10, 3, 4);
    ctx.fillStyle = bg; ctx.fillRect(dx + 14, dy + 17, 2, 2); ctx.fillStyle = fg;
    ctx.fillRect(dx + 6, dy + 46, 14, 6);
    ctx.fillRect(dx + 6, dy + 52, 5, 18);
    ctx.fillRect(dx + 15, dy + 52, 5, 18);
    ctx.fillRect(dx + 3, dy + 70, 9, 2);
    ctx.fillRect(dx + 14, dy + 70, 9, 2);
  }

  function drawDuck(dx, dy) {
    const { fg, bg } = getThemeColors();
    ctx.fillStyle = fg;
    const by = dy + 40;
    ctx.fillRect(dx - 8, by + 14, 6, 16);
    ctx.fillRect(dx - 2, by + 12, 4, 20);
    ctx.fillRect(dx - 10, by + 18, 4, 10);
    ctx.fillRect(dx - 6, by + 10, 6, 4);
    ctx.fillRect(dx - 6, by + 32, 6, 4);
    ctx.fillRect(dx + 2, by + 14, 26, 18);
    ctx.fillRect(dx + 28, by + 12, 4, 14);
    ctx.fillRect(dx + 32, by + 10, 6, 10);
    ctx.fillRect(dx + 38, by + 14, 14, 3);
    ctx.fillRect(dx + 50, by + 15, 3, 2);
    ctx.fillRect(dx + 34, by + 6, 3, 4);
    ctx.fillStyle = bg; ctx.fillRect(dx + 34, by + 12, 2, 2); ctx.fillStyle = fg;
    const phase = Math.floor(state.frame / 5) % 2;
    if (phase === 0) {
      ctx.fillRect(dx + 6, by + 32, 4, 6);
      ctx.fillRect(dx + 22, by + 32, 4, 4);
    } else {
      ctx.fillRect(dx + 6, by + 32, 4, 4);
      ctx.fillRect(dx + 22, by + 32, 4, 6);
    }
    ctx.fillRect(dx + 3, by + 38, 9, 2);
    ctx.fillRect(dx + 22, by + 38, 9, 2);
  }

  function drawJump(dx, dy) {
    const { fg, bg } = getThemeColors();
    ctx.fillStyle = fg;
    ctx.fillRect(dx - 6, dy + 22, 6, 16);
    ctx.fillRect(dx, dy + 20, 4, 20);
    ctx.fillRect(dx - 8, dy + 26, 4, 10);
    ctx.fillRect(dx - 4, dy + 18, 6, 4);
    ctx.fillRect(dx - 4, dy + 40, 6, 4);
    ctx.fillRect(dx + 4, dy + 20, 22, 22);
    ctx.fillRect(dx + 2, dy + 24, 2, 14);
    ctx.fillRect(dx + 26, dy + 24, 2, 14);
    ctx.fillRect(dx + 2, dy + 30, 6, 4);
    ctx.fillRect(dx + 22, dy + 30, 6, 4);
    ctx.fillRect(dx + 8, dy + 14, 14, 8);
    ctx.fillRect(dx + 7, dy + 16, 1, 4);
    ctx.fillRect(dx + 22, dy + 16, 1, 4);
    ctx.fillRect(dx + 22, dy + 16, 14, 4);
    ctx.fillRect(dx + 34, dy + 17, 3, 2);
    ctx.fillRect(dx + 18, dy + 10, 3, 4);
    ctx.fillStyle = bg; ctx.fillRect(dx + 16, dy + 17, 2, 2); ctx.fillStyle = fg;
    ctx.fillRect(dx + 8, dy + 42, 5, 4);
    ctx.fillRect(dx + 17, dy + 42, 5, 4);
  }

  function drawAnteater(dx, dy) {
    if (state.anteater.ducking) {
      drawDuck(dx, dy);
    } else if (!state.anteater.onGround) {
      drawJump(dx, dy);
    } else {
      drawTpose(dx, dy);
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

    ctx.fillRect(0, GROUND_Y + 70, W, 2);
    for (let x = state.groundOffset; x < W; x += 20) {
      ctx.fillRect(x, GROUND_Y + 74, 8, 1);
      ctx.fillRect(x + 12, GROUND_Y + 76, 4, 1);
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
      ctx.fillText('GAME OVER — press space to restart', W / 2, 50);
    }

    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.5;
    ctx.font = '500 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(String(Math.floor(state.score)).padStart(5, '0'), W - 10, 20);
    ctx.globalAlpha = 1;
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }
  loop();

  function open() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.style.display = 'flex';
  reset();
  state.running = true;
}
  function close() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    state.running = false;
  }

  trigger.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  open();
});
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
