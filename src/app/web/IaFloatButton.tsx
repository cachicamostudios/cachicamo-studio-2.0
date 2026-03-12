"use client";

import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";

function generateHalftone() {
  const dots: { x: number; y: number; r: number; opacity: number }[] = [];
  const R = 50;
  const ringGap = 7.5;
  const minR = R * 0.76;

  for (let radius = minR; radius <= R + ringGap / 2; radius += ringGap) {
    const circumference = 2 * Math.PI * radius;
    const numDots = Math.round(circumference / ringGap);
    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const normDist = radius / R;
      const opacity = 0.35 + 0.65 * Math.min(normDist, 1);
      dots.push({
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        r: 1.8,
        opacity: Math.round(opacity * 100) / 100,
      });
    }
  }
  return dots;
}

const DOTS = generateHalftone();

export default function IaFloatButton() {
  return (
    <Link href="/ia" className="ia-float-btn" aria-label="Explorar proyectos de IA">
      <svg viewBox="-62 -62 124 124" className="ia-float-svg" aria-hidden="true">
        <defs>
          <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feGaussianBlur stdDeviation="1.2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#dot-glow)">
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={`rgba(212,175,55,${d.opacity})`}
          />
        ))}
        </g>
      </svg>
      <span className={`ia-float-label ${GeistPixelSquare.className}`}>IA</span>
    </Link>
  );
}
