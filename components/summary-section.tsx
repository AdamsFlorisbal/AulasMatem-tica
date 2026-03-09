"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { BookOpen } from "lucide-react"

const SUMMARY = [
  {
    name: "Multiplica\u00E7\u00E3o de mesma base",
    formula: "a\u1D50 \u00B7 a\u207F = a\u1D50\u207A\u207F",
    rule: "Soma os expoentes",
    color: "bg-primary/10 border-primary/30 text-primary",
  },
  {
    name: "Divis\u00E3o de mesma base",
    formula: "a\u1D50 : a\u207F = a\u1D50\u207B\u207F",
    rule: "Subtra\u00ED os expoentes",
    color: "bg-accent/10 border-accent/30 text-accent",
  },
  {
    name: "Pot\u00EAncia de pot\u00EAncia",
    formula: "(a\u1D50)\u207F = a\u1D50\u02E3\u207F",
    rule: "Multiplica os expoentes",
    color: "bg-chart-3/10 border-chart-3/30 text-chart-3",
  },
  {
    name: "Pot\u00EAncia de um produto",
    formula: "(a \u00B7 b)\u207F = a\u207F \u00B7 b\u207F",
    rule: "Distribui o expoente",
    color: "bg-chart-4/10 border-chart-4/30 text-chart-4",
  },
  {
    name: "Pot\u00EAncia de um quociente",
    formula: "(a/b)\u207F = a\u207F/b\u207F",
    rule: "Distribui o expoente",
    color: "bg-chart-5/10 border-chart-5/30 text-chart-5",
  },
  {
    name: "Expoente zero",
    formula: "a\u2070 = 1",
    rule: "Resultado sempre 1 (a \u2260 0)",
    color: "bg-primary/10 border-primary/30 text-primary",
  },
  {
    name: "Expoente negativo",
    formula: "a\u207B\u207F = 1/a\u207F",
    rule: "Inverte a base",
    color: "bg-accent/10 border-accent/30 text-accent",
  },
]

export function SummarySection() {
  return (
    <section className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Resumo das Propriedades
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {"Todas as 7 propriedades num s\u00F3 lugar"}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-3 md:grid-cols-2">
          {SUMMARY.map((item, i) => (
            <AnimateOnScroll
              key={i}
              animation={i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}
              delay={i * 100}
            >
              <div
                className={`rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] ${item.color}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.rule}</p>
                  </div>
                  <code className="font-mono text-base shrink-0">{item.formula}</code>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={800}>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              {"Dominar essas propriedades facilita a resolu\u00E7\u00E3o de express\u00F5es num\u00E9ricas e equa\u00E7\u00F5es. Pratique!"}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
