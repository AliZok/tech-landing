"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SPECS = [
  { k: "Driver", v: "45mm Tesla" },
  { k: "Frequency", v: "5Hz – 40kHz" },
  { k: "Impedance", v: "48 Ω" },
  { k: "Weight", v: "330 g" },
  { k: "Material", v: "Milled Aluminum" },
  { k: "Cable", v: "OFC / 1.8m" },
  { k: "Sensitivity", v: "102 dB" },
  { k: "Warranty", v: "5 Years" },
]

export function Specs() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(".spec-row", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      })
    },
    { scope: root },
  )

  return (
    <section id="specs" ref={root} className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-48">
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-5xl text-foreground md:text-7xl">Specifications</h2>
        <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          Measured in our anechoic chamber. No software correction, no compromise.
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {SPECS.map((spec) => (
          <div key={spec.k} className="spec-row border-t border-border py-8">
            <dt className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{spec.k}</dt>
            <dd className="font-serif text-3xl text-foreground md:text-4xl">{spec.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
