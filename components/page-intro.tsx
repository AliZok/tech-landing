"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

type PageIntroProps = {
  onFinish?: () => void
}

export function PageIntro({ onFinish }: PageIntroProps) {
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useGSAP(
    () => {
      const overlay = root.current
      if (!overlay) return

      const q = gsap.utils.selector(overlay)

      gsap.set(q(".intro-char"), { yPercent: 110 })
      gsap.set(q(".intro-designed"), { opacity: 0, y: 12 })
      gsap.set(q(".intro-by-word"), { opacity: 0, letterSpacing: "0.6em" })
      gsap.set(q(".intro-rule"), { scaleX: 0 })

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => setDone(true),
      })

      tl.to(q(".intro-char"), {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.04,
      })
        .to(q(".intro-designed"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .to(q(".intro-by-word"), { opacity: 1, letterSpacing: "0.2em", duration: 0.7 }, "-=0.2")
        .to(q(".intro-rule"), { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.3")
        .to({}, { duration: 1.4 })
        .to(q(".intro-content"), { opacity: 0, y: -16, duration: 0.5, ease: "power2.in" })
        .add(() => {
          document.body.style.overflow = ""
          onFinish?.()
        })
        .to(overlay, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.05")
    },
    { scope: root },
  )

  if (done) return null

  const name = "Ali Zokaei"

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      <div className="intro-content flex flex-col items-center text-center">
        <p className="overflow-hidden font-serif text-[calc(3rem+10px)] tracking-tight text-white md:text-[calc(4.5rem+10px)]">
          {name.split("").map((char, i) => (
            <span key={i} className="intro-char inline-block will-change-transform">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <div className="intro-designed mt-6 flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.35em] text-white/50">
          <span>Designed</span>
          <span className="intro-by overflow-hidden">
            <span className="intro-by-word inline-block text-white/80">by</span>
          </span>
        </div>

        <div className="intro-rule mt-10 h-px w-16 origin-center bg-white/30" />
      </div>
    </div>
  )
}
