import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  DecimaisLeitura,
  DecimaisComparacao,
  DecimaisAdicao,
  DecimaisSubtracao,
  DecimaisMultiplicacao,
  DecimaisDivisao,
} from "@/components/ano5/sections"
import { Ano5ExercisesSection } from "@/components/ano5/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "5º Ano — Números Decimais",
  description: "Aula interativa sobre números decimais para alunos de 5º ano.",
}

const NAV_SECTIONS = [
  { id: "leitura", label: "Leitura", number: 1 },
  { id: "comparacao", label: "Comparação", number: 2 },
  { id: "adicao", label: "Adição", number: 3 },
  { id: "subtracao", label: "Subtração", number: 4 },
  { id: "multiplicacao", label: "Multiplicação", number: 5 },
  { id: "divisao", label: "Divisão", number: 6 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Leitura de decimais", formula: "0,1 = 1/10", rule: "Cada casa tem valor posicional", color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Comparação", formula: "0,8 > 0,72", rule: "Alinhe a vírgula, compare da esq. p/ dir.", color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Adição", formula: "2,35 + 1,40 = 3,75", rule: "Alinhe a vírgula, some coluna a coluna", color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Subtração", formula: "5,30 − 2,75 = 2,55", rule: "Alinhe a vírgula, use empréstimo", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Multiplicação", formula: "0,3 × 0,2 = 0,06", rule: "Multiplique e conte as casas decimais", color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Divisão", formula: "1,8 ÷ 3 = 0,6", rule: "Divida e mantenha a vírgula", color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
]

const HERO = {
  badge: "Aula 3 – Matemática · 5º Ano",
  titleLine1: "Números",
  titleLine2: "Decimais",
  titleLine2Color: "text-chart-4",
  description: "Aprenda a ler, escrever, comparar e operar com números decimais. Cada casa decimal tem um valor especial!",
  previews: [
    { label: "Leitura", formulaNode: <span>0,1 = 1/10</span> },
    { label: "Comparação", formulaNode: <span>0,8 &gt; 0,72</span> },
    { label: "Multiplicação", formulaNode: <span>0,3 × 0,2 = 0,06</span> },
  ],
}

export default function Ano5Page() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <DecimaisLeitura />
          <DecimaisComparacao />
          <DecimaisAdicao />
          <DecimaisSubtracao />
          <DecimaisMultiplicacao />
          <DecimaisDivisao />
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Números Decimais"
          subtitle="As 6 operações com decimais"
          closingText="Dominar os decimais é fundamental para o dia a dia: dinheiro, medidas e muito mais!"
        />
      }
      exercisesNode={<Ano5ExercisesSection />}
      yearLabel="5º Ano — Números Decimais"
    />
  )
}
