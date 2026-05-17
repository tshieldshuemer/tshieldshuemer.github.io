---
author: TSH
pubDatetime: 2025-08-05T04:58:53Z
title: Folding Support Bracket
description: A desk support bracket that folds out of the way when not in use
featured: true
heroImage: /WeightDemo.png
tags:
  - 3D Printing
  - CAD
  - Engineering
---

## Background

I always find myself a bit short on space in general, but especially desk space. Having studied architecture for a semester, I still had a massive A1 drawing board lying about. I figured that if I could find a way to effectively support the board on one side, resting the other on my desk I could essentially extend it to create a substantial workspace which could be stowed away when not in use.

<div class="flex gap-4">
  <img src="/DeskRender.png" alt="DeskRender" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />
  <img src="/BracketPrintBed.png" alt="BracketPrintBed Layout" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
</div>

### Design
I did some simple research on the yield strength of PLA printed parts and print orientation, then did some simple force calculations taking into account the maximum loading my desk would be exposed to when in use.
I opted for 100% print infill on the diagonal beam as it is quite a long component and carries a lot of compression. An infill of 40% plus would probably have been safe but I wanted to be conservative in light of factors such as creep. 

<div class="flex gap-4">
  <img src="/BracketEdraw.png" alt="BracketEdraw" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
  <img src="/WeightDemo.png" alt="WeightDemo" class="w-1/2 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
</div>

Most likely failure points were at the joints so print orientation was focused on strengthening at these locations: aligned to keep layer lines transverse to the principal stress direction. Pins were printed at 100% infill with their long axis parallel to the build plate so that layer lines run along the pin length.
The Horizontal and Vertical components were printed at 40% infill using diagonal grid infill.

<div class="flex gap-4">
  <img src="/Unfolded In Situ.png" alt="Unfolded In Situ" class="w-1/3 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />
  <img src="/UnfoldedBW.png" alt="UnfoldedBW" class="w-1/3 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
  <img src="/TableDemo.png" alt="TableDemo" class="w-1/3 lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition"/>
</div>

The print was a success and has been one of my most useful to date:

<img src="/DeskPic.jpeg" alt="Desk Pic" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition" />


