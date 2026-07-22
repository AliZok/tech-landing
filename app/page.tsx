import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Manifesto } from "@/components/manifesto"
import { CraftShowcase } from "@/components/craft-showcase"
import { Gallery } from "@/components/gallery"
import { Specs } from "@/components/specs"
import { CtaFooter } from "@/components/cta-footer"

export default function Page() {
  return (
    <main className="relative bg-background">
      <SiteNav />
      <Hero />
      <Marquee />
      <Manifesto />
      <CraftShowcase />
      <Gallery />
      <Specs />
      <CtaFooter />
    </main>
  )
}
