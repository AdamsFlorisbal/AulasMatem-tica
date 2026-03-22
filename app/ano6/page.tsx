import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  ConjuntoNaturais,
  OperacoesNaturais,
  NaturaisPotenciacaoRaiz,
  NaturaisDivisibilidade,
  NaturaisFatoracao,
  NaturaisPrimos,
  NaturaisMDC,
  NaturaisMMC,
  NaturaisAplicacoes,
} from "@/components/ano6/sections"
import {
  IdeiasMultiplicacaoDivisao,
  PropriedadesCalculadora,
  ExpressoesNumericas,
} from "@/components/ano6/new-sections"
import { Ano6ExercisesSection } from "@/components/ano6/exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "6º Ano — Números Naturais",
  description: "Aula interativa sobre divisibilidade, fatoração, números primos, MDC e MMC para alunos de 6º ano.",
}

const NAV_SECTIONS = [
  { id: "conjunto",       label: "Conjunto ℕ",      number: 1 },
  { id: "operacoes",      label: "Operações",        number: 2 },
  { id: "potenciacao",    label: "Potenciação",      number: 3 },
  { id: "divisibilidade", label: "Divisibilidade",   number: 4 },
  { id: "fatoracao",      label: "Fatoração",        number: 5 },
  { id: "primos",         label: "Nº Primos",        number: 6 },
  { id: "mdc",            label: "MDC",              number: 7 },
  { id: "mmc",            label: "MMC",              number: 8 },
  { id: "aplicacoes",     label: "Aplicações",       number: 9 },
  { id: "ideias-mult-div",label: "Ideias +, -, *, /",number: 10 },
  { id: "propriedades-calculadora", label: "Propriedades", number: 11 },
  { id: "expressoes",     label: "Expressões",       number: 12 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  { name: "Potenciação",     formula: "2⁴ = 16",                      rule: "Multiplicação de fatores iguais",      color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
  { name: "Potências de 10", formula: "10³ = 1.000",                rule: "Expoente = número de zeros",          color: "bg-primary/10 border-primary/30 text-primary" },
  { name: "Raiz Quadrada",   formula: "√25 = 5",                    rule: "Inverso da potenciação (expoente 2)", color: "bg-accent/10 border-accent/30 text-accent" },
  { name: "Divisibilidade", formula: "12 ÷ 3 = 4 (inteiro)", rule: "Regras para ÷2, 3, 4, 5, 6, 9, 10", color: "bg-chart-4/10 border-chart-4/30 text-chart-4" },
  { name: "Fatoração",      formula: "12 = 2² × 3",          rule: "Divida pelos menores primos até 1",    color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
  { name: "MDC e MMC",      formula: "mdc(12,8)=4; mmc(4,6)=12", rule: "Máximo divisor e mínimo múltiplo comuns", color: "bg-chart-3/10 border-chart-3/30 text-chart-3" },
]

const HERO = {
  badge: "Aula 2 – Matemática · 6º Ano",
  titleLine1: "Números",
  titleLine2: "Naturais",
  titleLine2Color: "text-chart-3",
  description: "Aprenda potenciação, expressões matemáticas, potências de base 10 e raiz quadrada. Depois, explore divisibilidade, primos, MDC e MMC com facilidade!",
  previews: [
    { label: "Potenciação",   formulaNode: <span>2⁴ = 16</span> },
    { label: "Raiz Quadrada", formulaNode: <span>√25 = 5</span> },
    { label: "Fatoração",     formulaNode: <span>12 = 2² × 3</span> },
  ],
}

export default function Ano6Page() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <ConjuntoNaturais />
          <OperacoesNaturais />
          <IdeiasMultiplicacaoDivisao />
          <PropriedadesCalculadora />
          <ExpressoesNumericas />
          <NaturaisPotenciacaoRaiz />
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
