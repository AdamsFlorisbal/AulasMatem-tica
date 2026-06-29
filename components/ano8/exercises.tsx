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

function toSciNode(n: number): React.ReactNode {
  if (n === 0) return "0"
  const exp = Math.floor(Math.log10(Math.abs(n)))
  const coef = n / Math.pow(10, exp)
  return <>{parseFloat(coef.toPrecision(4))} × 10<sup>{exp}</sup></>
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
type MonomioAddEx   = { kind: "monomioadd"; c1: number; c2: number; op: "add" | "sub" }
type MonomioMultEx  = { kind: "monomiomult"; c1: number; c2: number; e1: number; e2: number }
type ValorNumEx     = { kind: "valornum"; a: number; b: number; c: number; x: number }
type EquacaoAx2BEx  = { kind: "ax2b"; a: number; b: number }

type Ano8Exercise = PotenciacaoEx | RaizQuadEx | RaizCubicaEx | SimplRadicalEx | NotacaoCiEx | MonomioAddEx | MonomioMultEx | ValorNumEx | EquacaoAx2BEx

const PERFECT_SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]
const PERFECT_CUBES = [8, 27, 64, 125, 216]

function generate(): Ano8Exercise[] {
  const exercises: Ano8Exercise[] = []

  for (let i = 0; i < 5; i++) {
    // potenciacao base negativa
    exercises.push({ kind: "potenciacao", base: -rng(2, 5), exp: rng(2, 5) })

    // raiz quadrada
    const isExact = Math.random() > 0.4
    const nQuad = isExact ? pick(PERFECT_SQUARES) : rng(2, 80)
    exercises.push({ kind: "raizquad", n: nQuad })

    // raiz cubica
    const sign: 1 | -1 = Math.random() > 0.5 ? 1 : -1
    exercises.push({ kind: "raizcub", n: pick(PERFECT_CUBES), sign })

    // simplificacao de radical
    const k = rng(2, 5)
    const m = pick([2, 3, 5, 6, 7])
    exercises.push({ kind: "simplrad", n: k * k * m })

    // notacao cientifica
    const isLarge = Math.random() > 0.4
    const nSci = isLarge ? rng(100000, 9999999) : rng(1, 999) / 100000
    exercises.push({ kind: "notacaoci", n: nSci })

    // monomio adição/subtração
    const mOp: "add" | "sub" = Math.random() > 0.5 ? "add" : "sub"
    exercises.push({ kind: "monomioadd", c1: rng(2, 12), c2: rng(2, 12), op: mOp })

    // monomio multiplicação
    exercises.push({ kind: "monomiomult", c1: rng(2, 8), c2: rng(2, 8), e1: rng(1, 3), e2: rng(1, 3) })

    // valor numérico
    const va = rng(1, 4)
    const vb = pick([-3, -2, -1, 1, 2, 3, 4, 5])
    const vc = pick([-5, -3, -1, 0, 1, 2, 4])
    const vx = pick([-2, -1, 0, 1, 2, 3])
    exercises.push({ kind: "valornum", a: va, b: vb, c: vc, x: vx })

    // equação ax² = b
    const eqRoot = rng(1, 8)
    const eqA = pick([1, 2, 3, 4, 5])
    exercises.push({ kind: "ax2b", a: eqA, b: eqA * eqRoot * eqRoot })
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
          <p className="text-4xl font-black text-foreground">({ex.base})<sup>{ex.exp}</sup></p>
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
    case "monomioadd":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule</p>
          <p className="text-4xl font-black text-foreground">{ex.c1}x {ex.op === "add" ? "+" : "−"} {ex.c2}x</p>
        </div>
      )
    case "monomiomult":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule</p>
          <p className="text-3xl font-black text-foreground">({ex.c1}x<sup>{ex.e1}</sup>) · ({ex.c2}x<sup>{ex.e2}</sup>)</p>
        </div>
      )
    case "valornum":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule o valor numérico para x = {ex.x}</p>
          <p className="text-3xl font-black text-foreground">{ex.a}x² {ex.b >= 0 ? "+" : "−"} {Math.abs(ex.b)}x {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)}</p>
        </div>
      )
    case "ax2b":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Resolva a equação</p>
          <p className="text-4xl font-black text-foreground">{ex.a === 1 ? "" : ex.a}x² = {ex.b}</p>
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
          <p className="font-bold text-base text-accent">({ex.base})<sup>{ex.exp}</sup> = {result}</p>
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
      const sciNode = toSciNode(ex.n)
      const expVal = Math.floor(Math.log10(Math.abs(ex.n)))
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Identifique o expoente de 10: {expVal > 0 ? `mova a vírgula ${expVal} casas para a esquerda` : `mova a vírgula ${Math.abs(expVal)} casas para a direita`}</p>
          <p className="font-bold text-base text-accent">{sciNode}</p>
        </div>
      )
    }
    case "monomioadd": {
      const res = ex.op === "add" ? ex.c1 + ex.c2 : ex.c1 - ex.c2
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Monômios semelhantes (mesma parte literal: x)</p>
          <p>{ex.op === "add" ? "Some" : "Subtraia"} os coeficientes: {ex.c1} {ex.op === "add" ? "+" : "−"} {ex.c2} = {res}</p>
          <p className="font-bold text-base text-accent">{ex.c1}x {ex.op === "add" ? "+" : "−"} {ex.c2}x = {res}x</p>
        </div>
      )
    }
    case "monomiomult": {
      const coef = ex.c1 * ex.c2
      const expSum = ex.e1 + ex.e2
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Multiplique coeficientes: {ex.c1} × {ex.c2} = {coef}</p>
          <p>Some expoentes: x{ex.e1 > 1 ? <sup>{ex.e1}</sup> : ""} · x{ex.e2 > 1 ? <sup>{ex.e2}</sup> : ""} = x<sup>{expSum}</sup></p>
          <p className="font-bold text-base text-accent">{coef}x<sup>{expSum}</sup></p>
        </div>
      )
    }
    case "valornum": {
      const val = ex.a * ex.x * ex.x + ex.b * ex.x + ex.c
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>Substituir x = {ex.x}:</p>
          <p>{ex.a}·({ex.x})² {ex.b >= 0 ? "+" : "−"} {Math.abs(ex.b)}·({ex.x}) {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)}</p>
          <p>{ex.a}·{ex.x * ex.x} {ex.b * ex.x >= 0 ? "+" : "−"} {Math.abs(ex.b * ex.x)} {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)}</p>
          <p>{ex.a * ex.x * ex.x} {ex.b * ex.x >= 0 ? "+" : "−"} {Math.abs(ex.b * ex.x)} {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)}</p>
          <p className="font-bold text-base text-accent">= {val}</p>
        </div>
      )
    }
    case "ax2b": {
      const x2 = ex.b / ex.a
      const root = Math.sqrt(x2)
      const isExact = Number.isInteger(root)
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>x² = {ex.b} ÷ {ex.a} = {x2}</p>
          <p>x = ±√{x2} = ±{isExact ? root : parseFloat(root.toFixed(4))}</p>
          <p className="font-bold text-base text-accent">x = {isExact ? root : parseFloat(root.toFixed(4))} ou x = {isExact ? -root : -parseFloat(root.toFixed(4))}</p>
        </div>
      )
    }
  }
}

function getHint(ex: Ano8Exercise): string {
  switch (ex.kind) {
    case "potenciacao":
      return `Expoente ${ex.exp % 2 === 0 ? "par → resultado positivo" : "ímpar → resultado negativo"}. Multiplique a base ${Math.abs(ex.base)} por ela mesma ${ex.exp} vezes e aplique o sinal.`
    case "raizquad":
      return `Verifique se ${ex.n} é quadrado perfeito (raiz exata). Caso contrário, decomponha: ${ex.n} = k² × m.`
    case "raizcub":
      return `Procure b³ = ${ex.sign < 0 ? "-" : ""}${ex.n}. Cubo de número negativo é negativo.`
    case "simplrad":
      return `Fatore ${ex.n} e identifique quadrados perfeitos: ${ex.n} = k² × m. Então √${ex.n} = k√m.`
    case "notacaoci":
      return `Coloque um dígito não-zero antes da vírgula e conte quantas casas você moveu. Esse é o expoente de 10.`
    case "monomioadd":
      return `Monômios semelhantes têm a mesma parte literal. ${ex.op === "add" ? "Some" : "Subtraia"} apenas os coeficientes: ${ex.c1} ${ex.op === "add" ? "+" : "−"} ${ex.c2}.`
    case "monomiomult":
      return `Multiplique os coeficientes (${ex.c1} × ${ex.c2}) e some os expoentes das variáveis (${ex.e1} + ${ex.e2}).`
    case "valornum":
      return `Substitua x = ${ex.x} na expressão. Calcule as potências primeiro, depois multiplique, depois some.`
    case "ax2b":
      return `Isole x²: divida os dois lados por ${ex.a}. Depois tire a raiz quadrada (lembre do ±).`
  }
}

const META_MAP = {
  potenciacao:  { label: "Potenciação",  color: "text-accent",   bg: "bg-accent/10",   border: "border-accent/20" },
  raizquad:     { label: "Raiz ²",       color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  raizcub:      { label: "Raiz ³",       color: "text-chart-4",  bg: "bg-chart-4/10",  border: "border-chart-4/20" },
  simplrad:     { label: "Simplif. √",   color: "text-chart-3",  bg: "bg-chart-3/10",  border: "border-chart-3/20" },
  notacaoci:    { label: "Notação Ci.",  color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
  monomioadd:   { label: "Monômios +−",  color: "text-chart-4",  bg: "bg-chart-4/10",  border: "border-chart-4/20" },
  monomiomult:  { label: "Monômios ×",   color: "text-chart-3",  bg: "bg-chart-3/10",  border: "border-chart-3/20" },
  valornum:     { label: "Valor Num.",   color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  ax2b:         { label: "ax² = b",      color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
}

export const Ano8ExercisesSection = createExerciseSection<Ano8Exercise>({
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => META_MAP[ex.kind],
  headerDescription: "Potenciação, raízes, notação científica, monômios e equações",
})
