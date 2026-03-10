import { YearPageShell } from "@/components/year-page-shell"
import {
  PropMultiplicacao,
  PropDivisao,
  PropPotenciaPotencia,
  PropPotenciaProduto,
  PropPotenciaQuociente,
  PropExpoenteZero,
  PropExpoenteNegativo,
} from "@/components/property-sections"
import { Ano7SummarySection } from "@/components/ano7/summary"
import { Ano7ExercisesSection } from "@/components/ano7/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "7º Ano — Propriedades das Potências",
  description: "Aula interativa sobre as propriedades das potências para alunos de 7º ano.",
}

const NAV_SECTIONS = [
  { id: "multiplicacao", label: "Mesma Base", number: 1 },
  { id: "divisao", label: "Divisão", number: 2 },
  { id: "potencia-potencia", label: "Pot. de Pot.", number: 3 },
  { id: "potencia-produto", label: "Pot. de Produto", number: 4 },
  { id: "potencia-quociente", label: "Pot. de Quociente", number: 5 },
  { id: "expoente-zero", label: "Expoente Zero", number: 6 },
  { id: "expoente-negativo", label: "Exp. Negativo", number: 7 },
]

const HERO = {
  badge: "Aula 5 – Matemática · 7º Ano",
  titleLine1: "Propriedades das",
  titleLine2: "Potências",
  description: "Descubra como as propriedades das potências podem simplificar cálculos complexos. Role para baixo e explore cada propriedade com exemplos visuais!",
  previews: [
    { label: "Mesma base", formulaNode: <span>a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup></span> },
    { label: "Potência de potência", formulaNode: <span>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></span> },
    { label: "Expoente zero", formulaNode: <span>a<sup>0</sup> = 1</span> },
  ],
}

export default function Ano7Page() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <PropMultiplicacao />
          <PropDivisao />
          <PropPotenciaPotencia />
          <PropPotenciaProduto />
          <PropPotenciaQuociente />
          <PropExpoenteZero />
          <PropExpoenteNegativo />
        </>
      }
      summaryNode={<Ano7SummarySection />}
      exercisesNode={<Ano7ExercisesSection />}
      yearLabel="7º Ano — Propriedades das Potências"
    />
  )
}
