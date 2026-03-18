import { YearPageShell } from "@/components/year-page-shell"
import { SummarySection, type SummaryItem } from "@/components/summary-section"
import {
  FigurasPlanas,
  Poligonos,
  Triangulos,
  CirculoCircunferencia,
} from "@/components/ano5/figures-sections"
import { Ano5FiguresExercisesSection } from "@/components/ano5/figures-exercises"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "5º Ano — Figuras Planas",
  description: "Aula interativa sobre figuras planas, polígonos, triângulos, círculo e circunferência para alunos de 5º ano.",
}

const NAV_SECTIONS = [
  { id: "figuras-planas", label: "Figuras Planas", number: 1 },
  { id: "poligonos", label: "Polígonos", number: 2 },
  { id: "triangulos", label: "Triângulos", number: 3 },
  { id: "circulo-circunferencia", label: "Círculo e Circunferência", number: 4 },
]

const SUMMARY_ITEMS: SummaryItem[] = [
  {
    name: "Figuras Planas",
    formula: "Formas 2D",
    rule: "Possuem comprimento e largura",
    color: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    visual: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-14 h-14">
        <rect x="10" y="15" width="15" height="15" fill="currentColor" opacity="0.7" />
        <circle cx="42" cy="23" r="8" fill="currentColor" opacity="0.7" />
        <polygon points="30,45 24,55 36,55" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Polígonos",
    formula: "Lados retos",
    rule: "Nomeados pelo número de lados",
    color: "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
    visual: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-14 h-14">
        <polygon points="30,10 50,25 45,45 15,45 10,25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <circle cx="30" cy="10" r="2" fill="currentColor" />
        <circle cx="50" cy="25" r="2" fill="currentColor" />
        <circle cx="45" cy="45" r="2" fill="currentColor" />
        <circle cx="15" cy="45" r="2" fill="currentColor" />
        <circle cx="10" cy="25" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Triângulos",
    formula: "Ângulos = 180°",
    rule: "3 lados, 3 vértices, 3 ângulos",
    color: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
    visual: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-14 h-14">
        <polygon points="30,15 50,45 10,45" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="15" r="2" fill="currentColor" />
        <circle cx="50" cy="45" r="2" fill="currentColor" />
        <circle cx="10" cy="45" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Círculo",
    formula: "Formas redondas",
    rule: "Região interna da circunferência",
    color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400",
    visual: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-14 h-14">
        <circle cx="30" cy="30" r="18" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Circunferência",
    formula: "Linha redonda",
    rule: "Linha redonda que forma o círculo",
    color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400",
    visual: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-14 h-14">
        <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <line x1="30" y1="30" x2="30" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <text x="32" y="35" fontSize="10" fill="currentColor" opacity="0.6">r</text>
      </svg>
    ),
  },
]

const HERO = {
  badge: "Aula 4 – Matemática · 5º Ano",
  titleLine1: "Figuras",
  titleLine2: "Planas",
  titleLine2Color: "text-green-600 dark:text-green-400",
  description: "Explore o mundo das formas geométricas! Aprenda sobre polígonos, triângulos, círculos e circunferências com exemplos e atividades interativas.",
  previews: [
    { label: "Polígonos", formulaNode: <span>3, 4, 5, 6... lados</span> },
    { label: "Triângulos", formulaNode: <span>∠ = 180°</span> },
    { label: "Círculo", formulaNode: <span>A = πr²</span> },
  ],
}

export default function Ano5FigurasPage() {
  return (
    <YearPageShell
      heroProps={HERO}
      navSections={NAV_SECTIONS}
      contentSections={
        <>
          <FigurasPlanas />
          <Poligonos />
          <Triangulos />
          <CirculoCircunferencia />
        </>
      }
      summaryNode={
        <SummarySection
          items={SUMMARY_ITEMS}
          title="Resumo — Figuras Planas"
          subtitle="Conceitos fundamentais da geometria plana"
          closingText="Compreender as formas geométricas nos ajuda a entender o mundo ao nosso redor!"
        />
      }
      exercisesNode={<Ano5FiguresExercisesSection />}
      yearLabel="5º Ano — Figuras Planas"
    />
  )
}
