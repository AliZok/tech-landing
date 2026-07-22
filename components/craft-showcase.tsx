"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FEATURES = [
  {
    no: "01",
    title: "Milled Aluminum",
    body: "Each ear cup is carved from a single billet of aerospace-grade aluminum, then bead-blasted to a matte, fingerprint-resistant finish.",
  },
  {
    no: "02",
    title: "45mm Tesla Drivers",
    body: "Custom-wound voice coils deliver a flat, reference-grade frequency response from 5Hz to 40kHz with zero coloration.",
  },
  {
    no: "03",
    title: "Memory Protein Pads",
    body: "Hand-stitched earpads contour to the head over time, sealing out the world while staying weightless across long sessions.",
  },
]

export function CraftShowcase() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".craft-item").forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        })
      })

      gsap.to(".craft-image", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section id="craft" ref={root} className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-px md:grid-cols-2">
        {/* Sticky image column */}
        <div className="relative md:sticky md:top-0 md:h-svh">
          <div className="relative h-[60vh] w-full overflow-hidden md:h-full">
            <Image
              src="/images/headphone-detail.png"
              alt="Macro detail of the milled aluminum ear cup and stitched earpad"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="craft-image object-cover"
            />
            <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-foreground/70 md:left-10 md:top-10">
              The Craft
            </div>
          </div>
        </div>

        {/* Scrolling features */}
        <div className="flex flex-col justify-center gap-px px-6 py-16 md:px-12 md:py-32">
          {FEATURES.map((f) => (
            <div key={f.no} className="craft-item border-b border-border py-10 last:border-b-0">
              <div className="mb-4 flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted-foreground">{f.no}</span>
                <h3 className="font-serif text-3xl text-foreground md:text-4xl">{f.title}</h3>
              </div>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
