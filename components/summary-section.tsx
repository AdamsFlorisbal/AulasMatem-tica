"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { BookOpen } from "lucide-react"

export interface SummaryItem {
  name: string
  formula: string
  rule: string
  color: string
  visual?: React.ReactNode
}

interface SummarySectionProps {
  items: SummaryItem[]
  title?: string
  subtitle?: string
  closingText?: string
}

export function SummarySection({
  items,
  title = "Resumo",
  subtitle,
  closingText,
}: SummarySectionProps) {
  return (
    <section className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
              {subtitle && (
                <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, i) => (
            <AnimateOnScroll
              key={i}
              animation={i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}
              delay={i * 100}
            >
              <div
                className={`rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] ${item.color}`}
              >
                {item.visual && (
                  <div className="flex justify-center mb-3">
                    {item.visual}
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.rule}</p>
                  </div>
                  {item.formula.includes("<") ? (
                    <code className="font-mono text-base shrink-0" dangerouslySetInnerHTML={{ __html: item.formula }} />
                  ) : (
                    <code className="font-mono text-base shrink-0">{item.formula}</code>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {closingText && (
          <AnimateOnScroll delay={800}>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">{closingText}</p>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  )
}
