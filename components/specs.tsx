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
      gsap.from(".specs-heading-line", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".specs-header", start: "top 80%" },
      })

      gsap.fromTo(
        ".specs-desc",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".specs-header",
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
          },
        },
      )

      gsap.fromTo(
        ".specs-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 1,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>(".spec-row").forEach((row, i) => {
        gsap.fromTo(
          row.querySelector(".spec-key"),
          { x: -32, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 62%",
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          row.querySelector(".spec-value"),
          { x: 32, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 62%",
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          row.querySelector(".spec-index"),
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 65%",
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          row,
          { borderColor: "rgba(255,255,255,0)" },
          {
            borderColor: "rgba(255,255,255,0.12)",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          },
        )
      })

      gsap.to(".specs-glow", {
        opacity: 0.35,
        y: -40,
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
    <section id="specs" ref={root} className="relative mx-auto max-w-7xl overflow-hidden px-6 py-32 md:px-10 md:py-48">
      <div
        className="specs-glow pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl opacity-0"
        aria-hidden="true"
      />

      <div className="specs-header relative mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="overflow-hidden font-serif text-5xl text-foreground md:text-7xl">
          <span className="specs-heading-line block">Specifications</span>
        </h2>
        <p className="specs-desc max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          Measured in our anechoic chamber. No software correction, no compromise.
        </p>
      </div>

      <div className="specs-progress mb-px h-px w-full origin-left bg-border" />

      <dl className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {SPECS.map((spec, i) => (
          <div key={spec.k} className="spec-row relative border-t border-border py-8">
            <span className="spec-index absolute right-0 top-8 font-mono text-[10px] text-muted-foreground/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <dt className="spec-key mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{spec.k}</dt>
            <dd className="spec-value font-serif text-3xl text-foreground md:text-4xl">{spec.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
