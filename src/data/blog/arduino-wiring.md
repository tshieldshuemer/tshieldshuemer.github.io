---
author: TSH
pubDatetime: 2026-03-02T04:58:53Z
title: Arduino Buggy Wiring
description: Some diagrams & schematics for a line following buggy
featured: false
heroImage: /BuggyWires.jpg
tags:
  - Engineering
---



## Overview
This work was done as part of a second year design module based on the wiring and programming of a line following buggy using an Arduino Uno R4 Wifi, a H-Bridge, two DC Motors, Ultrasonic & IR sensors.

<img src="/BuggyWires.jpg" alt="Buggy Wires" width="400" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition "/>

## Block Diagram
A block diagram is a graphical representation of a system, used to show the major components & functions of a system and how they relate to one another.

<img src="/Block Diagram.png" alt="Block Diagram" width="2000" class="lightbox-trigger w-full border-4 border-black cursor-pointer hover:opacity-90 transition "/>

## Fritzing
I used the software fritzing to create wiring schematics. I carried out two layouts: They are technically the same, but one has the H-Bridge chip separate from the protoshield for the sake of tidyness and clarity, while the other is a direct representation of our actual wiring.

<div class="flex gap-4">
  <img src="/Wiring.png" alt="Tidy"  class="lightbox-trigger w-1/2 border-4 border-black cursor-pointer hover:opacity-90 transition "/> 
  <img src="/121Fritz.png" alt="121" class="lightbox-trigger w-1/2 border-4 border-black cursor-pointer hover:opacity-90 transition "/>
</div>


<img src="/Clean Build_Schaltplan.png" alt="Schaltplan" width="2000" class="lightbox-trigger w-full border-4 border-black cursor-pointer hover:opacity-90 transition "/>

## Hand Drawn
We encountered a few wiring issues early on in the project so to troubleshoot I did a hand drawing of all wiring connections and was able to find the issue.
<img src="/Wiring Hand Drawn.jpg" alt="Wiring Sketch" width="400" class="lightbox-trigger  border-4 border-black cursor-pointer hover:opacity-90 transition "/>


