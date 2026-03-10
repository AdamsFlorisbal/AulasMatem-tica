import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  NaturaisDivisibilidade,
  NaturaisFatoracao,
  NaturaisPrimos,
  NaturaisMDC,
  NaturaisMMC,
  NaturaisAplicacoes,
} from "@/components/ano6/sections"
import { Ano6ExercisesSection } from "@/components/ano6/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "6º Ano — Números Naturais",
  description: "Aula interativa sobre divisibilidade, fatoração, números primos, MDC e MMC para alunos de 6º ano.",
}

const NAV_SECTIONS = [
  { id: "divisibilidade", label: "Divisibilidade", number: 1 },
  { id: "fatoracao",      label: "Fatoração",      number: 2 },
  { id: "primos",         label: "Nº Primos",      number: 3 },
  { id: "mdc",            label: "MDC",             number: 4 },
  { id: "mmc",            label: "MMC",             number: 5 },
  { id: "aplicacoes",     label: "Aplicações",      number: 6 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Divisibilidade", formula: "12 ÷ 3 = 4 (inteiro)", rule: "Regras para ÷2, 3, 4, 5, 6, 9, 10", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Fatoração",      formula: "12 = 2² × 3",          rule: "Divida pelos menores primos até 1",    color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Números Primos", formula: "2, 3, 5, 7, 11...",    rule: "Somente divisíveis por 1 e por si",    color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "MDC",            formula: "mdc(12,8) = 4",        rule: "Fatores comuns com menor expoente",    color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "MMC",            formula: "mmc(4,6) = 12",        rule: "Todos os fatores com maior expoente",  color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Aplicações",     formula: "MDC → ladrilhos; MMC → encontros", rule: "Problemas práticos com MDC e MMC", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
]

const HERO = {
  badge: "Aula 2 – Matemática · 6º Ano",
  titleLine1: "Números",
  titleLine2: "Naturais",
  titleLine2Color: "text-chart-3",
  description: "Explore a divisibilidade, decomponha números em fatores primos e aprenda a calcular MDC e MMC com facilidade!",
  previews: [
    { label: "Fatoração",     formulaNode: <span>12 = 2² × 3</span> },
    { label: "MDC",           formulaNode: <span>mdc(12, 8) = 4</span> },
    { label: "MMC",           formulaNode: <span>mmc(4, 6) = 12</span> },
  ],
}

export default function Ano6Page() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <NaturaisDivisibilidade />
          <NaturaisFatoracao />
          <NaturaisPrimos />
          <NaturaisMDC />
          <NaturaisMMC />
          <NaturaisAplicacoes />
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Números Naturais"
          subtitle="Divisibilidade, primos, MDC e MMC"
          closingText="Esses conceitos são a base da álgebra: frações, equações e muito mais dependem de MDC e MMC!"
        />
      }
      exercisesNode={<Ano6ExercisesSection />}
      yearLabel="6º Ano — Números Naturais"
    />
  )
}
