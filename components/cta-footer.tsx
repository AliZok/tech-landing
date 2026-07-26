"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function CtaFooter() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const left = root.current?.querySelector<HTMLElement>(".cta-from-left")
      const right = root.current?.querySelector<HTMLElement>(".cta-from-right")
      if (!left || !right) return

      gsap.set(left, { xPercent: -55 })
      gsap.set(right, { xPercent: 55 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "top 25%",
            scrub: 1,
          },
        })
        .to(left, { xPercent: 0, ease: "none" }, 0)
        .to(right, { xPercent: 0, ease: "none" }, 0)
    },
    { scope: root },
  )

  return (
    <footer id="cta" ref={root} className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-48">
        <h2 className="overflow-hidden font-serif leading-[0.85] tracking-tight text-foreground">
          <span className="cta-from-left block text-[16vw] md:text-[11vw]">
            Hear it
          </span>
          <span className="cta-from-right block text-right text-[16vw] italic text-muted-foreground md:text-[11vw]">
            all.
          </span>
        </h2>

        <div className="mt-12 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <a
            href="#top"
            className="rounded-full bg-foreground px-10 py-4 text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
          >
            Reserve — $1,290
          </a>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            Limited to 500 units worldwide. Each pair is serialized and ships in a hand-finished case.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
          <span className="text-foreground">beyerdynamic</span>
          <div className="flex gap-6">
            <a href="#overview" className="transition-colors hover:text-foreground">
              Instagram
            </a>
            <a href="#overview" className="transition-colors hover:text-foreground">
              Support
            </a>
            <a href="#overview" className="transition-colors hover:text-foreground">
              Privacy
            </a>
          </div>
          <span>© {new Date().getFullYear()} — Reference Series</span>
        </div>
      </div>
    </footer>
  )
}
