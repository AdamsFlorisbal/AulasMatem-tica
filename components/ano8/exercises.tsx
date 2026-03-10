"use client"

import { createExerciseSection } from "@/components/exercises-section"

/* ================================================================
   Helpers
   ================================================================ */
function simplifyRadical(n: number): { outside: number; inside: number } {
  let outside = 1
  let inside = n
  for (let i = 2; i * i <= n; i++) {
    while (inside % (i * i) === 0) {
      outside *= i
      inside = inside / (i * i)
    }
  }
  return { outside, inside }
}

function toSci(n: number): string {
  if (n === 0) return "0"
  const exp = Math.floor(Math.log10(Math.abs(n)))
  const coef = n / Math.pow(10, exp)
  return `${parseFloat(coef.toPrecision(4))} × 10^${exp}`
}

function rng(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/* ================================================================
   Types
   ================================================================ */
type PotenciacaoEx  = { kind: "potenciacao"; base: number; exp: number }
type RaizQuadEx     = { kind: "raizquad"; n: number }
type RaizCubicaEx   = { kind: "raizcub"; n: number; sign: 1 | -1 }
type SimplRadicalEx = { kind: "simplrad"; n: number }
type NotacaoCiEx    = { kind: "notacaoci"; n: number }

type Ano8Exercise = PotenciacaoEx | RaizQuadEx | RaizCubicaEx | SimplRadicalEx | NotacaoCiEx

const PERFECT_SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]
const PERFECT_CUBES = [8, 27, 64, 125, 216]

function generate(): Ano8Exercise[] {
  const exercises: Ano8Exercise[] = []

  // 2 potenciacao base negativa
  for (let i = 0; i < 2; i++) {
    exercises.push({ kind: "potenciacao", base: -rng(2, 5), exp: rng(2, 5) })
  }

  // 2 raiz quadrada
  for (let i = 0; i < 2; i++) {
    const isExact = Math.random() > 0.4
    const n = isExact ? pick(PERFECT_SQUARES) : rng(2, 80)
    exercises.push({ kind: "raizquad", n })
  }

  // 2 raiz cubica
  for (let i = 0; i < 2; i++) {
    const sign: 1 | -1 = Math.random() > 0.5 ? 1 : -1
    exercises.push({ kind: "raizcub", n: pick(PERFECT_CUBES), sign })
  }

  // 2 simplificacao de radical
  for (let i = 0; i < 2; i++) {
    // generate numbers with non-trivial simplification: n = k^2 * m where m > 1
    const k = rng(2, 5)
    const m = pick([2, 3, 5, 6, 7])
    exercises.push({ kind: "simplrad", n: k * k * m })
  }

  // 2 notacao cientifica
  for (let i = 0; i < 2; i++) {
    const isLarge = Math.random() > 0.4
    const n = isLarge ? rng(100000, 9999999) : rng(1, 999) / 100000
    exercises.push({ kind: "notacaoci", n })
  }

  return exercises.sort(() => Math.random() - 0.5)
}

/* ================================================================
   Render
   ================================================================ */
function renderQuestion(ex: Ano8Exercise): React.ReactNode {
  switch (ex.kind) {
    case "potenciacao":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule</p>
          <p className="text-4xl font-black text-foreground">({ex.base})^{ex.exp}</p>
        </div>
      )
    case "raizquad":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule</p>
          <p className="text-4xl font-black text-foreground">√{ex.n}</p>
        </div>
      )
    case "raizcub":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule</p>
          <p className="text-4xl font-black text-foreground">∛({ex.sign < 0 ? "-" : ""}{ex.n})</p>
        </div>
      )
    case "simplrad":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Simplifique a raiz</p>
          <p className="text-4xl font-black text-foreground">√{ex.n}</p>
        </div>
      )
    case "notacaoci":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Escreva em notação científica</p>
          <p className="text-3xl font-black text-foreground">{ex.n.toLocaleString("pt-BR", { maximumSignificantDigits: 6 })}</p>
        </div>
      )
  }
}

function renderAnswer(ex: Ano8Exercise): React.ReactNode {
  switch (ex.kind) {
    case "potenciacao": {
      const result = Math.pow(ex.base, ex.exp)
      const sign = result > 0 ? "positivo" : "negativo"
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Base: {ex.base}, Expoente: {ex.exp} ({ex.exp % 2 === 0 ? "par" : "ímpar"})</p>
          <p>Expoente {ex.exp % 2 === 0 ? "par → resultado positivo" : "ímpar → resultado negativo"}</p>
          <p className="font-bold text-base text-accent">({ex.base})^{ex.exp} = {result}</p>
        </div>
      )
    }
    case "raizquad": {
      const root = Math.sqrt(ex.n)
      const isExact = Number.isInteger(root)
      const { outside, inside } = simplifyRadical(ex.n)
      return (
        <div className="space-y-1 text-sm text-foreground">
          {isExact ? (
            <p className="font-bold text-base text-accent">√{ex.n} = {root}</p>
          ) : outside > 1 ? (
            <>
              <p>{ex.n} = {outside * outside} × {inside}</p>
              <p className="font-bold text-base text-accent">√{ex.n} = {outside}√{inside} ≈ {parseFloat(root.toFixed(4))}</p>
            </>
          ) : (
            <p className="font-bold text-base text-accent">√{ex.n} ≈ {parseFloat(root.toFixed(4))} (irracional)</p>
          )}
        </div>
      )
    }
    case "raizcub": {
      const base = Math.round(Math.cbrt(ex.n))
      const result = base * ex.sign
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Procuro b tal que b³ = {ex.sign < 0 ? "-" : ""}{ex.n}</p>
          <p>({result})³ = {Math.pow(result, 3)}</p>
          <p className="font-bold text-base text-accent">∛({ex.sign < 0 ? "-" : ""}{ex.n}) = {result}</p>
        </div>
      )
    }
    case "simplrad": {
      const { outside, inside } = simplifyRadical(ex.n)
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>{ex.n} = {outside * outside} × {inside}</p>
          <p>√{ex.n} = √({outside * outside} × {inside}) = {outside}√{inside}</p>
          <p className="font-bold text-base text-accent">√{ex.n} = {outside}√{inside}</p>
        </div>
      )
    }
    case "notacaoci": {
      const sci = toSci(ex.n)
      const expVal = Math.floor(Math.log10(Math.abs(ex.n)))
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Identifique o expoente de 10: {expVal > 0 ? `mova a vírgula ${expVal} casas para a esquerda` : `mova a vírgula ${Math.abs(expVal)} casas para a direita`}</p>
          <p className="font-bold text-base text-accent">{sci}</p>
        </div>
      )
    }
  }
}

function getHint(ex: Ano8Exercise): string {
  switch (ex.kind) {
    case "potenciacao":
      return `Expoente ${ex.exp % 2 === 0 ? "par → resultado positivo" : "ímpar → resultado negativo"}. Calcule ${ex.base}^${ex.exp} e aplique o sinal.`
    case "raizquad":
      return `Verifique se ${ex.n} é quadrado perfeito (raiz exata). Caso contrário, decomponha: ${ex.n} = k² × m.`
    case "raizcub":
      return `Procure b³ = ${ex.sign < 0 ? "-" : ""}${ex.n}. Cubo de número negativo é negativo.`
    case "simplrad":
      return `Fatore ${ex.n} e identifique quadrados perfeitos: ${ex.n} = k² × m. Então √${ex.n} = k√m.`
    case "notacaoci":
      return `Coloque um dígito não-zero antes da vírgula e conte quantas casas você moveu. Esse é o expoente de 10.`
  }
}

const META_MAP = {
  potenciacao: { label: "Potenciação",  color: "text-accent",   bg: "bg-accent/10",   border: "border-accent/20" },
  raizquad:    { label: "Raiz ²",       color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  raizcub:     { label: "Raiz ³",       color: "text-chart-4",  bg: "bg-chart-4/10",  border: "border-chart-4/20" },
  simplrad:    { label: "Simplif. √",   color: "text-chart-3",  bg: "bg-chart-3/10",  border: "border-chart-3/20" },
  notacaoci:   { label: "Notação Ci.",  color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
}

export const Ano8ExercisesSection = createExerciseSection<Ano8Exercise>({
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => META_MAP[ex.kind],
  headerDescription: "Potenciação, raízes e notação científica",
})
