---
author: TSH
pubDatetime: 2026-07-10T04:58:53Z
modDatetime: 2026-07-10T14:30:00Z
title: 3D Model Library
description: Interactive 3D models
featured: true
draft: false 
heroImage: /AssemblyIcon.png
tags:
  - CAD
---

<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>

<div class="model-grid">
  <model-viewer src="/models/ExLidExplo.glb" alt="ExLidExplo" auto-rotate camera-controls></model-viewer>
  <model-viewer src="/models/LamHin.glb" alt="Lamp Hinge" auto-rotate camera-controls></model-viewer>
  <model-viewer src="/models/Dart_Light.glb" alt="Dart Light" auto-rotate camera-controls></model-viewer>
  <model-viewer src="/CGov.glb" alt="CGov" auto-rotate camera-controls></model-viewer>

  Centrifugal Governor Assembly.stl (1)
</div>

<style>
  .model-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  model-viewer {
    width: 100%;
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #f5f5f5;
  }
  @media (max-width: 640px) {
    .model-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
