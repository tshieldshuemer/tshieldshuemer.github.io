---
author: TSH
pubDatetime: 2026-02-22T04:58:53Z
title: Print Extractor Fan
description: Print fume management project
featured: true
draft: false 
heroImage: /V1d.png
tags:
  - 3D Printing
  - CAD
  - Engineering
---

## Background

FDM printers release **VOCs *(volatile organic compounds)*** and **UFPs *(ultrafine particles)*** when in use.
The health impacts of these emissions are still being quantified, so since I run my printer in the same room I sleep in, I decided to err on the side of caution. 
The solution? A fume extractor to purge all fumes outside.


## First Iteration
<img src="/V1.png" alt="First Design Render" width="600" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition "/>
<img src="/V1d.png" alt="First Design Duct" width="600" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition "/>

My initial design was suboptimal - It used a weak 5V PC Cooling fan and a small cross sectional area meant that fume extraction was minimal.

### V1 fan (CLD8015L05X, 5V axial):

- Max Side Air Flow: 1.7 m³/h (0.98 CFM) 
- Maximum Side Static Pressure: 12Pa (0.048 inH₂O) 
- Power: 1.2 W
  
  
## Second Iteration

<img src="/V2CAD.png" alt="Second Design Render" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition " />

My second and final design uses a centrifugal blower, which features a much larger intake, a more powerful fan and is capable of handling the static pressures of the ducting.

### V2 blower (GDB1232-A @ 48V, your highlighted operating point):

- Air Flow:56 m³/h (33 CFM) 
- Static Pressure: 274 Pa (1.1 inH₂O)
- Power: 12 W (24V × 0.5A)

*Note: V1 figures are independent maxima; V2 figures are simultaneous values from a fan curve operating point.*

<img src="/FanSpecSheet.png" alt="SpecSheet" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition " />

<img src="/DimCad.png" alt="Second Design Render" width="1200" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition " />

To accommodate a larger intake area for the blower, I had to design and print a new lid. I opted for three separate layers to allow for interlocking joints. Each layer was split into four to fit within the print bed - giving a total of 12 part prints for the main lid alone. The piece consists mostly of PLA, with some parts in PETG as well as Polycarbonate windows.

<img src="/Phys.png" alt="Printer Lid IRL" width="600" class="lightbox-trigger border-4 border-black cursor-pointer hover:opacity-90 transition " />




