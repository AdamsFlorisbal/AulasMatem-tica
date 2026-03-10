"use client"

import { SummarySection, type SummaryItem } from "@/components/summary-section"

const ANO7_ITEMS: SummaryItem[] = [
  {
    name: "Multiplicação de mesma base",
    formula: "aᵐ · aⁿ = aᵐ⁺ⁿ",
    rule: "Soma os expoentes",
    color: "bg-primary/10 border-primary/30 text-primary",
  },
  {
    name: "Divisão de mesma base",
    formula: "aᵐ : aⁿ = aᵐ⁻ⁿ",
    rule: "Subtrai os expoentes",
    color: "bg-accent/10 border-accent/30 text-accent",
  },
  {
    name: "Potência de potência",
    formula: "(aᵐ)ⁿ = aᵐˣⁿ",
    rule: "Multiplica os expoentes",
    color: "bg-chart-3/10 border-chart-3/30 text-chart-3",
  },
  {
    name: "Potência de um produto",
    formula: "(a · b)ⁿ = aⁿ · bⁿ",
    rule: "Distribui o expoente",
    color: "bg-chart-4/10 border-chart-4/30 text-chart-4",
  },
  {
    name: "Potência de um quociente",
    formula: "(a/b)ⁿ = aⁿ/bⁿ",
    rule: "Distribui o expoente",
    color: "bg-chart-5/10 border-chart-5/30 text-chart-5",
  },
  {
    name: "Expoente zero",
    formula: "a⁰ = 1",
    rule: "Resultado sempre 1 (a ≠ 0)",
    color: "bg-primary/10 border-primary/30 text-primary",
  },
  {
    name: "Expoente negativo",
    formula: "a⁻ⁿ = 1/aⁿ",
    rule: "Inverte a base",
    color: "bg-accent/10 border-accent/30 text-accent",
  },
]

export function Ano7SummarySection() {
  return (
    <SummarySection
      items={ANO7_ITEMS}
      title="Resumo das Propriedades"
      subtitle="Todas as 7 propriedades num só lugar"
      closingText="Dominar essas propriedades facilita a resolução de expressões numéricas e equações. Pratique!"
    />
  )
}
