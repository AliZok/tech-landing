"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TEXT =
  "Sound is not heard. It is felt. Every chamber, every alloy, every stitch is engineered to disappear — leaving only the recording, exactly as it was meant to be."

export function Manifesto() {
  const root = useRef<HTMLDivElement>(null)
  const words = TEXT.split(" ")

  useGSAP(
    () => {
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section id="overview" ref={root} className="mx-auto max-w-5xl px-6 py-32 md:px-10 md:py-48">
      <p className="mb-10 text-xs uppercase tracking-[0.4em] text-muted-foreground">The Philosophy</p>
      <p className="font-serif text-3xl leading-snug text-balance text-foreground md:text-5xl md:leading-tight">
        {words.map((word, i) => (
          <span key={i} className="manifesto-word inline-block">
            {word}&nbsp;
          </span>
        ))}
      </p>
    </section>
  )
}
