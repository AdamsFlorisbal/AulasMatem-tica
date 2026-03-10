import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  PotenciacaoBaseNegativa,
  RadiciacaoRaizQuadrada,
  RadiciacaoRaizCubica,
  PropriedadesRaiz,
  NotacaoCientifica,
  OperacoesNC,
} from "@/components/ano8/sections"
import { Ano8ExercisesSection } from "@/components/ano8/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "8º Ano — Potenciação, Radiciação e Notação Científica",
  description: "Aula interativa sobre potenciação com base negativa, raízes e notação científica para alunos de 8º ano.",
}

const NAV_SECTIONS = [
  { id: "potenciacao",      label: "Potenciação",  number: 1 },
  { id: "raizquadrada",     label: "Raiz ²",       number: 2 },
  { id: "raizcubica",       label: "Raiz ³",       number: 3 },
  { id: "propriedadesraiz", label: "Props. Raiz",  number: 4 },
  { id: "notacaocientifica",label: "NC",           number: 5 },
  { id: "operacoesnc",      label: "Operações NC", number: 6 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Potenciação (-base)", formula: "(-2)⁴ = 16",          rule: "Exp. par → positivo; ímpar → negativo", color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Raiz Quadrada",       formula: "√a = b ↔ b² = a",     rule: "Raiz de quadrado perfeito é exata",     color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Raiz Cúbica",         formula: "∛(-8) = -2",          rule: "Existe para negativos também",          color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Props. da Raiz",      formula: "√(ab) = √a · √b",     rule: "Simplifique separando fatores perfeitos", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Notação Científica",  formula: "6,4 × 10⁶",           rule: "1 ≤ |a| < 10; n conta as casas",        color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Operações com NC",    formula: "(a×10ᵐ)(b×10ⁿ)=ab×10ᵐ⁺ⁿ", rule: "Multiplique coef. e some expoentes", color: "bg-accent/10 border-accent/30 text-accent" },
]

const HERO = {
  badge: "Aula 4 – Matemática · 8º Ano",
  titleLine1: "Potenciação e",
  titleLine2: "Radiciação",
  titleLine2Color: "text-accent",
  description: "Domine potências com base negativa, raízes quadrada e cúbica, e aprenda a escrever qualquer número em notação científica!",
  previews: [
    { label: "Base negativa",    formulaNode: <span>(-2)³ = -8</span> },
    { label: "Raiz Quadrada",    formulaNode: <span>√48 = 4√3</span> },
    { label: "Notação Cient.",   formulaNode: <span>6,4 × 10⁶</span> },
  ],
}

export default function Ano8Page() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <PotenciacaoBaseNegativa />
          <RadiciacaoRaizQuadrada />
          <RadiciacaoRaizCubica />
          <PropriedadesRaiz />
          <NotacaoCientifica />
          <OperacoesNC />
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Potenciação e Radiciação"
          subtitle="Os 6 tópicos do 8º ano"
          closingText="Notação científica é usada em astronomia, química e física para representar números muito grandes ou muito pequenos!"
        />
      }
      exercisesNode={<Ano8ExercisesSection />}
      yearLabel="8º Ano — Potenciação, Radiciação e NC"
    />
  )
}
