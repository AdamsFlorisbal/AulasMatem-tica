"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Calculator } from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import "katex/dist/katex.min.css"

/* ================================================================
   SectionBadge
   ================================================================ */
export function SectionBadge({ number, color }: { number: number; color: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold",
        color
      )}
    >
      {number}
    </span>
  )
}

/* ================================================================
   FormulaBox
   ================================================================ */
export function FormulaBox({
  children,
  highlight = false,
  className,
}: {
  children: React.ReactNode
  highlight?: boolean
  className?: string
}) {
  // Check if children is a string formula (LaTeX)
  const isLatex = typeof children === "string" && children.startsWith("$") && children.endsWith("$")
  const formula = isLatex ? children.slice(1, -1) : null

  return (
    <div
      className={cn(
        "rounded-xl border px-6 py-4 text-center text-lg md:text-xl transition-all duration-500",
        highlight
          ? "border-primary bg-primary/10 text-primary animate-pulse-glow"
          : "border-border bg-card text-foreground",
        className
      )}
    >
      {formula ? (
        <BlockMath math={formula} />
      ) : (
        <span className="font-mono">{children}</span>
      )}
    </div>
  )
}

/* ================================================================
   StepByStep
   ================================================================ */
export function StepByStep({ steps }: { steps: { text: string; highlight?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, i) => {
        const isLatex = step.text.startsWith("$") && step.text.endsWith("$")
        const formula = isLatex ? step.text.slice(1, -1) : null
        const hasHtml = step.text.includes("<")

        return (
          <AnimateOnScroll key={i} animation="animate-slide-in-left" delay={i * 150}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  step.highlight
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {i + 1}
              </div>
              {formula ? (
                <div className="text-foreground">
                  <InlineMath math={formula} />
                </div>
              ) : hasHtml ? (
                <div
                  className={cn(
                    "font-mono text-sm md:text-base",
                    step.highlight ? "text-accent font-bold" : "text-foreground"
                  )}
                  dangerouslySetInnerHTML={{ __html: step.text }}
                />
              ) : (
                <code
                  className={cn(
                    "font-mono text-sm md:text-base",
                    step.highlight ? "text-accent font-bold" : "text-foreground"
                  )}
                >
                  {step.text}
                </code>
              )}
            </div>
          </AnimateOnScroll>
        )
      })}
    </div>
  )
}

/* ================================================================
   DetailedExampleCard
   ================================================================ */
export function DetailedExampleCard({
  title,
  steps,
  conclusion,
}: {
  title: string
  steps: string[]
  conclusion: string
}) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/80">
      <div className="font-mono text-lg font-bold text-primary mb-3" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="flex flex-col gap-2 mb-3">
        {steps.map((step, i) => {
          const isLatex = step.startsWith("$") && step.endsWith("$")
          const formula = isLatex ? step.slice(1, -1) : null
          const hasHtml = step.includes("<")

          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs text-muted-foreground mt-0.5 shrink-0">{i + 1}.</span>
              {formula ? (
                <div className="text-foreground">
                  <InlineMath math={formula} />
                </div>
              ) : hasHtml ? (
                <div className="font-mono text-sm text-foreground" dangerouslySetInnerHTML={{ __html: step }} />
              ) : (
                <code className="font-mono text-sm text-foreground">{step}</code>
              )}
            </div>
          )
        })}
      </div>
      {conclusion && (
        <div className="pt-3 border-t border-border">
          <div className="font-mono text-sm font-bold text-accent" dangerouslySetInnerHTML={{ __html: conclusion }} />
        </div>
      )}
    </div>
  )
}

/* ================================================================
   CalcWrapper
   ================================================================ */
export function CalcWrapper({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-primary" />
        {title ?? "Calcule você mesmo!"}
      </h3>
      {children}
    </div>
  )
}

/* ================================================================
   CalcInput
   ================================================================ */
export function CalcInput({
  label,
  value,
  onChange,
  min = 1,
  max = 20,
  step,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="w-24 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  )
}

/* ================================================================
   fmtResult
   ================================================================ */
export function fmtResult(n: number): string {
  if (!isFinite(n)) return "∞"
  if (Math.abs(n) > 1e12) return n.toExponential(2)
  return n.toLocaleString("pt-BR")
}

/* ================================================================
   CalcResult — display box for calculator output
   ================================================================ */
export function CalcResult({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 animate-fade-in-up space-y-2">
      {children}
    </div>
  )
}

/* ================================================================
   SectionHeader — consistent header for each property section
   ================================================================ */
export function SectionHeader({
  number,
  badgeColor,
  title,
  subtitle,
}: {
  number: number
  badgeColor: string
  title: string
  subtitle: string
}) {
  const hasHtml = subtitle.includes("<")

  return (
    <AnimateOnScroll>
      <div className="flex items-center gap-4 mb-6">
        <SectionBadge number={number} color={badgeColor} />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          {hasHtml ? (
            <p className="text-muted-foreground text-sm mt-1" dangerouslySetInnerHTML={{ __html: subtitle }} />
          ) : (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  )
}
