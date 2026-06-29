import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  PotenciacaoBaseNegativa,
  RadiciacaoRaizQuadrada,
  RadiciacaoRaizCubica,
  NotacaoCientifica,
  OperacoesNC,
} from "@/components/ano8/sections"
import { MonomiosOperacoes, ValorNumerico } from "@/components/ano8/monomios"
import { EquacoesAx2B } from "@/components/ano8/equacoes-ax2-b"
import { Ano8ExercisesSection } from "@/components/ano8/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "8º Ano — Potenciação, Radiciação, Monômios e Equações",
  description: "Aula interativa sobre potenciação, raízes, notação científica, monômios, valor numérico e equações ax²=b para alunos de 8º ano.",
}

const NAV_SECTIONS = [
  { id: "potenciacao",      label: "Potenciação",   number: 1 },
  { id: "raizquadrada",     label: "Raiz ²",        number: 2 },
  { id: "raizcubica",       label: "Raiz ³",        number: 3 },
  { id: "notacaocientifica",label: "NC",             number: 4 },
  { id: "operacoesnc",      label: "Op. NC",         number: 5 },
  { id: "monomios",         label: "Monômios",       number: 6 },
  { id: "valornumerico",    label: "Valor Num.",      number: 7 },
  { id: "equacoesax2b",     label: "ax² = b",        number: 8 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Potenciação (-base)", formula: "(-2)⁴ = 16",          rule: "Exp. par → positivo; ímpar → negativo", color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Raiz Quadrada",       formula: "√a = b ↔ b² = a",     rule: "Raiz de quadrado perfeito é exata",     color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Raiz Cúbica",         formula: "∛(-8) = -2",          rule: "Existe para negativos também",          color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Notação Científica",  formula: "6,4 × 10⁶",           rule: "1 ≤ |a| < 10; n conta as casas",        color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Op. em Notação Científica",    formula: "(a×10ᵐ)(b×10ⁿ)=ab×10ᵐ⁺ⁿ", rule: "Multiplique coef. e some expoentes", color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Monômios",            formula: "3x + 5x = 8x",        rule: "Some coeficientes de monômios semelhantes", color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Valor Numérico",      formula: "2x²+3x (x=2) → 14",  rule: "Substitua a variável e calcule",        color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Equação ax² = b",     formula: "x² = 9 → x = ±3",    rule: "Isole x² e tire a raiz quadrada",       color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
]

const HERO = {
  badge: "Aula 4 – Matemática · 8º Ano",
  titleLine1: "Álgebra e",
  titleLine2: "Equações",
  titleLine2Color: "text-accent",
  description: "Domine potências, raízes, notação científica, operações com monômios, valor numérico e equações incompletas do 2º grau!",
  previews: [
    { label: "Base negativa",    formulaNode: <span>(-2)³ = -8</span> },
    { label: "Monômios",         formulaNode: <span>3x + 5x = 8x</span> },
    { label: "ax² = b",          formulaNode: <span>x² = 9 → x = ±3</span> },
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
          <NotacaoCientifica />
          <OperacoesNC />
          <MonomiosOperacoes />
          <ValorNumerico />
          <EquacoesAx2B />
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Álgebra e Equações"
          subtitle="Os 8 tópicos do 8º ano"
          closingText="Monômios e equações são a base da álgebra — você vai usar isso em física, química e no Ensino Médio inteiro!"
        />
      }
      exercisesNode={<Ano8ExercisesSection />}
      yearLabel="8º Ano — Álgebra e Equações"
    />
  )
}
