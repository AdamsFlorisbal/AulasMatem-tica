"use client"

import { Zap } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export interface HeroSectionProps {
  badge: string
  titleLine1: string
  titleLine2: string
  titleLine2Color?: string
  description: string
  previews: Array<{ label: string; formulaNode: React.ReactNode }>
}

export function HeroSection({
  badge,
  titleLine1,
  titleLine2,
  titleLine2Color = "text-primary",
  description,
  previews,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimateOnScroll animation="animate-scale-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-tight">
            <span className="text-foreground">{titleLine1}</span>
            <br />
            <span className={titleLine2Color}>{titleLine2}</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={400}>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            {description}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={600}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {previews.map((p, i) => (
              <FormulaPreview key={i} label={p.label} formulaNode={p.formulaNode} />
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={800}>
          <div className="mt-16 flex items-center justify-center">
            <div className="animate-float">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-muted-foreground">
                <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-bounce" />
              </svg>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

function FormulaPreview({ formulaNode, label }: { formulaNode: React.ReactNode; label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 backdrop-blur-sm px-6 py-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:scale-105">
      <code className="font-mono text-sm md:text-base text-primary">{formulaNode}</code>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
