"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SLIDES = [
  { src: "/images/headphone-hero.png", label: "Studio", caption: "Reference Black / 3‑4 View" },
  { src: "/images/headphone-side.png", label: "Profile", caption: "Silhouette / Side Elevation" },
  { src: "/images/headphone-detail.png", label: "Detail", caption: "Aluminum Cup / Macro" },
]

export function Gallery() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.innerWidth < 768) return

      const getScrollDistance = () =>
        (track.current?.scrollWidth ?? 0) - window.innerWidth

      gsap.to(track.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + getScrollDistance(),
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section id="gallery" ref={root} className="relative overflow-hidden border-t border-border">
      <div className="absolute left-6 top-8 z-10 text-xs uppercase tracking-[0.4em] text-muted-foreground md:left-10">
        Gallery — 03 Frames
      </div>
      <div ref={track} className="flex flex-col md:h-svh md:w-[300%] md:flex-row">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="gallery-panel relative flex h-[80vh] w-full items-center justify-center border-b border-border px-6 md:h-full md:w-screen md:border-b-0 md:border-r"
          >
            <div className="relative h-[60%] w-full max-w-2xl">
              <Image
                src={slide.src || "/placeholder.svg"}
                alt={`${slide.label} view of the Beyerdynamic headphones`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
              />
              <div className="absolute -bottom-14 left-0 md:-bottom-16">
                <p className="font-serif text-5xl text-foreground md:text-7xl">{slide.label}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {slide.caption}
                </p>
              </div>
            </div>
            <span className="absolute right-6 top-1/2 font-mono text-xs text-muted-foreground md:right-10">
              0{i + 1} / 03
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
