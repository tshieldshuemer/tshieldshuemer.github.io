---
author: TSH
pubDatetime: 2025-08-08T04:58:53Z
title: Coin Sorter
description: A gravity fed coin sorting tower
featured: true
heroImage: /Edraw.png
tags:
  - 3D Printing
  - CAD
---

## Background

I found I had a huge amount of spare change lying about - I thought it would be a fun project to design and manufacture a sorting system.

<img src="/Col.jpg" alt="Design Collage" width="600" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />

### Design

I started by modelling a stepped filter frame to separate coins by their diameters, followed by coin stackers for each coin type.

<div class="flex gap-4">
  <img src="/FilterFrame.png" alt="Filter Frame" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />
  <img src="/Tubes.jpeg" alt="Stacker Tubes" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
</div>

I then had to do some testing to find the right inclination angles in order to have the coins fall at the right speed;

- Too steep and they would overshoot their respective chutes
- Too gradual and coins would get jammed

Once I established the optimal angles, I designed the housing and funnel connections between the filter and the stackers.

<img src="/Edraw.png" alt="Housing Edrawing" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />

Finally, I printed all components in PLA. Assembly was done by a combination of friction fit, as well as some embedded magnet connections in order to allow opening of the tower in the event of a jam.

<img src="/Sort.png" alt="Final Printed Model" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>

### Outcome

Despite my best efforts in setting the right angle, the sorting tower still has some inconsistencies, with circa 10% of coins landing in the wrong chamber, making it somewhat useless. 

I think the issue lay in my order of design - when designing the filter piece I was testing each coin type individually, while holding up the filter frame with my hand, meaning there was a variation in angle between tests. 

This meant that each coin tested correctly individually, but at different angles. When I ultimately printed the full frame and fixed the filter frame to a constant position, the coins behaved differently due to the change in angle.
