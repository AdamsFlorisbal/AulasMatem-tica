import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  NumerosAteSeisAlgarismos,
  DecomposicaoNumeros,
  EstimativaComparacao,
  DecimaisLeituraERepresentacao,
  DecimaisRetaNumerica,
  DecimaisQuadroOrdens,
} from "@/components/ano5/new-sections"
import {
  DecimaisAdicao,
  DecimaisSubtracao,
  DecimaisMultiplicacao,
  DecimaisDivisao,
} from "@/components/ano5/sections"
import { Ano5ExercisesSection } from "@/components/ano5/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "5º Ano — Números Naturais e Decimais",
  description: "Aula interativa sobre grandes números e números decimais para 5º ano.",
}

const NAV_SECTIONS = [
  { id: "grandes-numeros", label: "Grandes Números", number: 1 },
  { id: "decomposicao", label: "Decomposição", number: 2 },
  { id: "estimativa-comparacao", label: "Estimativa e Comparação", number: 3 },
  { id: "decimais-leitura", label: "Decimais", number: 4 },
  { id: "decimais-reta", label: "Reta Numérica", number: 5 },
  { id: "decimais-quadro", label: "Quadro de Ordens", number: 6 },
  { id: "adicao", label: "Adição", number: 7 },
  { id: "subtracao", label: "Subtração", number: 8 },
  { id: "multiplicacao", label: "Multiplicação", number: 9 },
  { id: "divisao", label: "Divisão", number: 10 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Classes e Ordens", formula: "100.000 = CM", rule: "De três em três algarismos formam uma classe", color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Decomposição", formula: "Aditiva/Multiplicativa", rule: "1.200 = 1000 + 200 = 1x1000 + 2x100", color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Introdução aos Decimais", formula: "0,1 = 1/10", rule: "Parte decimal separada por vírgula", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Adição", formula: "2,35 + 1,40 = 3,75", rule: "Alinhe a vírgula, some coluna a coluna", color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Subtração", formula: "5,30 − 2,75 = 2,55", rule: "Alinhe a vírgula, use empréstimo", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Multiplicação", formula: "0,3 × 0,2 = 0,06", rule: "Multiplique e conte as casas decimais", color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Divisão", formula: "1,8 ÷ 3 = 0,6", rule: "Divida e mantenha a vírgula", color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
]

const HERO = {
  badge: "Aula 3 – Matemática · 5º Ano",
  titleLine1: "Naturais e",
  titleLine2: "Decimais",
  titleLine2Color: "text-chart-4",
  description: "Aprenda sobre números de até seis algarismos e descubra como funcionam os decimais e suas operações!",
  previews: [
    { label: "Grandes Números", formulaNode: <span>100.000</span> },
    { label: "Decimais", formulaNode: <span>0,1 = 1/10</span> },
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
          <NumerosAteSeisAlgarismos number={1} />
          <DecomposicaoNumeros number={2} />
          <EstimativaComparacao number={3} />
          <DecimaisLeituraERepresentacao number={4} />
          <DecimaisRetaNumerica number={5} />
          <DecimaisQuadroOrdens number={6} />
          <div className="mt-20 sm:mt-32">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Operações com Decimais</h2>
            <div className="space-y-20 sm:space-y-32">
              <DecimaisAdicao />
              <DecimaisSubtracao />
              <DecimaisMultiplicacao />
              <DecimaisDivisao />
            </div>
          </div>
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Números Decimais"
          subtitle="Naturais e Decimais"
          closingText="Pratique grandes números e continue dominando as operações decimais do dia a dia!"
        />
      }
      exercisesNode={<Ano5ExercisesSection />}
      yearLabel="5º Ano — Naturais e Decimais"
    />
  )
}
