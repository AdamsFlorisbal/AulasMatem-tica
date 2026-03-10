import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  NumerosIrracionais,
  RetaNumerica,
  ConjuntosNumericos,
  PotenciaRacional,
  SimplificacaoRadicais,
  OperacoesRadicais,
  TeoremaPitagoras,
} from "@/components/ano9/sections"
import { Ano9ExercisesSection } from "@/components/ano9/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "9º Ano — Números Reais",
  description: "Aula interativa sobre números irracionais, conjuntos numéricos, potência racional, radicais e Pitágoras para alunos de 9º ano.",
}

const NAV_SECTIONS = [
  { id: "irracionais",       label: "Irracionais",    number: 1 },
  { id: "retanumerica",      label: "Reta Numérica",  number: 2 },
  { id: "conjuntos",         label: "Conjuntos",      number: 3 },
  { id: "potenciaracional",  label: "Pot. Racional",  number: 4 },
  { id: "radicais",          label: "Radicais",       number: 5 },
  { id: "operacoesradicais", label: "Op. Radicais",   number: 6 },
  { id: "pitagoras",         label: "Pitágoras",      number: 7 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Números Irracionais", formula: "√2 = 1,41421…",       rule: "Decimal infinito não periódico",          color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Reta Numérica",       formula: "k < √n < k+1",        rule: "k² < n < (k+1)²",                        color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Conjuntos",           formula: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ",      rule: "Todo natural é inteiro é racional é real", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Potência Racional",   formula: "a^(m/n) = (ⁿ√a)ᵐ",   rule: "Denominador = índice da raiz",            color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Radicais",            formula: "√75 = 5√3",           rule: "Extraia fatores quadrados perfeitos",     color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Op. Radicais",        formula: "3√2 + 5√2 = 8√2",     rule: "Some coeficientes de radicais semelhantes", color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "Pitágoras",           formula: "c = √(a² + b²)",      rule: "Hipotenusa = raiz da soma dos catetos²",  color: "bg-primary/10 border-primary/30 text-primary" },
]

const HERO = {
  badge: "Aula 5 – Matemática · 9º Ano",
  titleLine1: "Números",
  titleLine2: "Reais",
  titleLine2Color: "text-chart-5",
  description: "Explore os irracionais, posicione raízes na reta numérica, domine potências racionais e resolva problemas com o Teorema de Pitágoras!",
  previews: [
    { label: "Irracionais",    formulaNode: <span>√2 = 1,41421…</span> },
    { label: "Pot. Racional",  formulaNode: <span>8^(2/3) = 4</span> },
    { label: "Pitágoras",      formulaNode: <span>c = √(a²+b²)</span> },
  ],
}

export default function Ano9Page() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <NumerosIrracionais />
          <RetaNumerica />
          <ConjuntosNumericos />
          <PotenciaRacional />
          <SimplificacaoRadicais />
          <OperacoesRadicais />
          <TeoremaPitagoras />
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Números Reais"
          subtitle="Os 7 tópicos do 9º ano"
          closingText="Os números reais são a base para o Ensino Médio: funções, trigonometria e geometria analítica usam tudo isso!"
        />
      }
      exercisesNode={<Ano9ExercisesSection />}
      yearLabel="9º Ano — Números Reais"
    />
  )
}
