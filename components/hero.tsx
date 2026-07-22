"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type HeroProps = {
  animate?: boolean
}

export function Hero({ animate = false }: HeroProps) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = root.current
      if (!section) return

      const q = gsap.utils.selector(section)

      gsap.set(q(".hero-eyebrow"), { y: 20, opacity: 0 })
      gsap.set(q(".hero-line-inner"), { yPercent: 120 })
      gsap.set(q(".hero-image"), { scale: 1.15, opacity: 0 })
      gsap.set(q(".hero-meta-item"), { y: 24, opacity: 0 })

      if (animate) {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(q(".hero-eyebrow"), { y: 0, opacity: 1, duration: 0.8 })
          .to(q(".hero-line-inner"), { yPercent: 0, duration: 1.1, stagger: 0.08 }, "-=0.4")
          .to(q(".hero-image"), { scale: 1, opacity: 1, duration: 1.4 }, "-=1")
          .to(q(".hero-meta-item"), { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, "-=0.8")
      }

      gsap.to(q(".hero-image"), {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(q(".hero-headline"), {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    },
    { scope: root, dependencies: [animate] },
  )

  return (
    <section id="top" ref={root} className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 pb-10">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <p className="hero-eyebrow text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Reference Series — 01
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="hero-image relative aspect-square w-[88vw] max-w-[720px]">
          <Image
            src="/images/headphone-hero.png"
            alt="Beyerdynamic reference over-ear headphones floating in studio light"
            fill
            priority
            sizes="(max-width: 768px) 88vw, 720px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="hero-headline relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <h1 className="font-serif text-[18vw] leading-[0.82] tracking-tight text-foreground md:text-[15vw]">
          <span className="hero-line block overflow-hidden">
            <span className="hero-line-inner block">Beyer</span>
          </span>
          <span className="hero-line block overflow-hidden text-right italic text-muted-foreground">
            <span className="hero-line-inner block">dynamic</span>
          </span>
        </h1>
      </div>

      <div className="hero-meta relative z-10 mx-auto mt-8 flex w-full max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <p className="hero-meta-item max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          A study in precision acoustics. Hand-assembled in matte black aluminum, tuned for the
          uncompromising listener.
        </p>
        <div className="hero-meta-item flex items-center gap-8">
          <div>
            <p className="font-serif text-3xl text-foreground">$1,290</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Limited release</p>
          </div>
          <a
            href="#cta"
            className="rounded-full bg-foreground px-7 py-3 text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
          >
            Reserve
          </a>
        </div>
      </div>
    </section>
  )
}
