---
author: TSH
pubDatetime: 2025-09-09T04:58:53Z
title: Centrifugal Governor
description: A 3D printed demo piece
featured: true
heroImage: /CentGovRender.png
tags:
  - 3D Printing
  - CAD
  - Engineering
---

<model-viewer 
  src="/models/Centrifugal Governor Assembly.glb" 
  alt="3D Model" 
  auto-rotate 
  camera-controls 
  style="width: 100%; height: 400px;">
</model-viewer>

## Background

A year back I visited the Deutsches Technikmuseum in Berlin. While there I saw some old steam engine models and was quite impressed by the simplicity and beauty in the centrifugal governor mechanism used in these machines.

<img src="/MechGov.png" alt="Model Render" width="300" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />

### Mechanism

The governor works by exploiting centrifugal force: As the rotational speed of the shaft increases, the governor's weights are flung outwards, and this force is used to move something mechanically, such as a valve or lever. This creates a simple but clever negative feedback system, and is a purely mechanical proportional controller.

<img src="/Gov2.png" alt="Cad Model & Print" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>

### Design
In order to demonstrate the negative feedback loop, I designed a clutch system to engage and disengage the driven shaft. The large gear is spun to set the shaft in motion, then once a certain speed threshold is reached, the flyweights swing out and upward, disengaging the clutch untill the speed falls again

<div class="flex gap-4">
  <img src="/GovEdraw.png" alt="Edrawing" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />
  <img src="/Clutch.png" alt="Clutch" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
</div>

The design worked both in simulation and in practice, for video demonstration, take a look at my instagram page (linked on home)

<img src="/CentGovRender.png" alt="Cad Render" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>

