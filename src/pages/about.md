---
layout: ../layouts/AboutLayout.astro
title: "About Me"
---
I'm an Engineering student from Galway, currently studying in Dublin. I'm interested in Environmental Engineering and Renewable Energy Development amongst other things.
<div class="not-prose">
  <img src="/Selfie.jpg" alt="Me" class="border-4 border-black" />
</div>
<div class="not-prose flex items-center justify-between gap-4 mt-8 mb-2">
  <h2 class="text-2xl font-semibold">What I do</h2>
  <label class="inline-flex items-center gap-2 cursor-pointer text-sm">
    <span>Show hobby posts</span>
    <button
      id="casual-toggle"
      role="switch"
      aria-checked="false"
      class="relative inline-flex h-6 w-11 items-center rounded-full bg-skin-line transition-colors"
    >
      <span
        id="casual-toggle-thumb"
        class="inline-block h-4 w-4 transform rounded-full bg-skin-fill transition-transform translate-x-1"
      ></span>
    </button>
  </label>
</div>

<p>On this page you might find content relating to</p>

<ul>
  <li><a href="/tags/engineering/">Engineering</a></li>
  <li><a href="/tags/cad/">CAD</a> &amp; <a href="/tags/3d-printing/">3D Printing</a></li>
  <li data-category="casual"><a href="/tags/running/">Running</a></li>
  <li data-category="casual"><a href="/tags/scuba/">Diving</a></li>
  <li data-category="casual"><a href="/tags/music/">Music</a></li>
  <li data-category="casual"><a href="/tags/photography/">Photography</a></li>
</ul>
<style is:global>
  html:not([data-show-casual="true"]) [data-category="casual"] {
    display: none;
  }
</style>

<script is:inline>
  (function () {
    const KEY = "show-casual";
    const root = document.documentElement;

    // Apply stored preference immediately to avoid flash
    const stored = localStorage.getItem(KEY) === "true";
    root.dataset.showCasual = stored ? "true" : "false";

    const toggle = document.getElementById("casual-toggle");
    const thumb = document.getElementById("casual-toggle-thumb");
    if (!toggle || !thumb) return;

    const render = (show) => {
      toggle.setAttribute("aria-checked", String(show));
      thumb.style.transform = show ? "translateX(20px)" : "translateX(4px)";
    };

    render(stored);

    toggle.addEventListener("click", () => {
      const next = toggle.getAttribute("aria-checked") !== "true";
      localStorage.setItem(KEY, String(next));
      root.dataset.showCasual = next ? "true" : "false";
      render(next);
    });
  })();
</script>

<a href="mailto:galwaywest3d@gmail.com" class="inline-block mt-4 px-4 py-2 rounded border border-accent text-accent hover:bg-accent hover:text-background transition">
  Get in touch ✉️
</a>
