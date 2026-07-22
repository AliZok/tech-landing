"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const WORDS = ["Tesla Drivers", "45mm Acoustics", "Hand Assembled", "Pure Silence", "Reference Tuned"]

export function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Base continuous scroll
      const loop = gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      })

      // Scroll velocity nudges the marquee speed/direction
      gsap.to(loop, {
        timeScale: 2.4,
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="border-y border-border py-6 overflow-hidden">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((word, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl uppercase tracking-tight text-muted-foreground md:text-4xl">
            {word}
            <span className="text-foreground" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
