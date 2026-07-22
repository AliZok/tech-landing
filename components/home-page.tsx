"use client"

import { useState } from "react"
import { SiteNav } from "@/components/site-nav"
import { PageIntro } from "@/components/page-intro"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Manifesto } from "@/components/manifesto"
import { CraftShowcase } from "@/components/craft-showcase"
import { Gallery } from "@/components/gallery"
import { Specs } from "@/components/specs"
import { CtaFooter } from "@/components/cta-footer"

export function HomePage() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <PageIntro onFinish={() => setIntroDone(true)} />
      <main className="relative bg-background">
        <SiteNav />
        <Hero animate={introDone} />
        <Marquee />
        <Manifesto />
        <CraftShowcase />
        <Gallery />
        <Specs />
        <CtaFooter />
      </main>
    </>
  )
}
