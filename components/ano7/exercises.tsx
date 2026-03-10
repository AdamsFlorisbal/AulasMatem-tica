"use client"

import { createExerciseSection, type ExerciseSectionConfig, type ExerciseMeta } from "@/components/exercises-section"

/* ================================================================
   Types
   ================================================================ */
type PropType =
  | "multiplicacao"
  | "divisao"
  | "potencia-potencia"
  | "potencia-produto"
  | "potencia-quociente"
  | "expoente-zero"
  | "expoente-negativo"

type Exercise =
  | { type: "multiplicacao"; base: number; exp1: number; exp2: number }
  | { type: "divisao"; base: number; exp1: number; exp2: number }
  | { type: "potencia-potencia"; base: number; exp1: number; exp2: number }
  | { type: "potencia-produto"; a: number; b: number; n: number }
  | { type: "potencia-quociente"; a: number; b: number; n: number }
  | { type: "expoente-zero"; base: number }
  | { type: "expoente-negativo"; base: number; exp: number }

/* ================================================================
   Meta
   ================================================================ */
const PROP_INFO: Record<PropType, ExerciseMeta> = {
  multiplicacao: { label: "Prop. 1 — Mult. Mesma Base", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  divisao: { label: "Prop. 2 — Div. Mesma Base", color: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  "potencia-potencia": { label: "Prop. 3 — Pot. de Potência", color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30" },
  "potencia-produto": { label: "Prop. 4 — Pot. de Produto", color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/30" },
  "potencia-quociente": { label: "Prop. 5 — Pot. de Quociente", color: "text-chart-5", bg: "bg-chart-5/10", border: "border-chart-5/30" },
  "expoente-zero": { label: "Prop. 6 — Expoente Zero", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  "expoente-negativo": { label: "Prop. 7 — Exp. Negativo", color: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
}

/* ================================================================
   Helpers
   ================================================================ */
function ri(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }
function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function fmt(n: number): string {
  if (!isFinite(n)) return "∞"
  if (Math.abs(n) > 1e12) return n.toExponential(2)
  return n.toLocaleString("pt-BR")
}

/* ================================================================
   Generation
   ================================================================ */
function generate(): Exercise[] {
  const list: Exercise[] = []
  for (let i = 0; i < 2; i++) {
    list.push({ type: "multiplicacao", base: ri(2, 7), exp1: ri(2, 4), exp2: ri(1, 3) })
    const dExp1 = ri(4, 6); const dExp2 = ri(1, dExp1 - 1)
    list.push({ type: "divisao", base: ri(2, 7), exp1: dExp1, exp2: dExp2 })
    list.push({ type: "potencia-potencia", base: ri(2, 5), exp1: ri(2, 3), exp2: ri(2, 3) })
    const [pa, pb] = pickRandom<[number, number]>([[2, 3], [2, 5], [3, 4], [4, 5], [3, 7]])
    list.push({ type: "potencia-produto", a: pa, b: pb, n: ri(2, 3) })
    const [qa, qb] = pickRandom<[number, number]>([[6, 3], [8, 2], [10, 5], [9, 3], [12, 4]])
    list.push({ type: "potencia-quociente", a: qa, b: qb, n: ri(2, 3) })
    list.push({ type: "expoente-zero", base: pickRandom([5, 7, 13, 25, 100, 42, 8, 17]) })
    list.push({ type: "expoente-negativo", base: ri(2, 5), exp: ri(1, 3) })
  }
  return list.sort(() => Math.random() - 0.5)
}

/* ================================================================
   Render question
   ================================================================ */
function renderQuestion(ex: Exercise): React.ReactNode {
  switch (ex.type) {
    case "multiplicacao":
      return <span className="font-mono text-2xl">{ex.base}<sup className="text-primary font-bold text-base">{ex.exp1}</sup><span className="mx-2 text-muted-foreground">·</span>{ex.base}<sup className="text-primary font-bold text-base">{ex.exp2}</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "divisao":
      return <span className="font-mono text-2xl">{ex.base}<sup className="text-primary font-bold text-base">{ex.exp1}</sup><span className="mx-2 text-muted-foreground">:</span>{ex.base}<sup className="text-primary font-bold text-base">{ex.exp2}</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "potencia-potencia":
      return <span className="font-mono text-2xl"><span className="text-muted-foreground">(</span>{ex.base}<sup className="text-primary font-bold text-base">{ex.exp1}</sup><span className="text-muted-foreground">)</span><sup className="text-primary font-bold text-base">{ex.exp2}</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "potencia-produto":
      return <span className="font-mono text-2xl"><span className="text-muted-foreground">(</span>{ex.a}<span className="mx-1 text-muted-foreground">·</span>{ex.b}<span className="text-muted-foreground">)</span><sup className="text-primary font-bold text-base">{ex.n}</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "potencia-quociente":
      return <span className="font-mono text-2xl"><span className="text-muted-foreground">(</span>{ex.a}<span className="mx-1 text-muted-foreground">/</span>{ex.b}<span className="text-muted-foreground">)</span><sup className="text-primary font-bold text-base">{ex.n}</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "expoente-zero":
      return <span className="font-mono text-2xl">{ex.base}<sup className="text-primary font-bold text-base">0</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "expoente-negativo":
      return <span className="font-mono text-2xl">{ex.base}<sup className="text-primary font-bold text-base">-{ex.exp}</sup><span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
  }
}

/* ================================================================
   Render answer
   ================================================================ */
function renderAnswer(ex: Exercise): React.ReactNode {
  switch (ex.type) {
    case "multiplicacao": { const e = ex.exp1 + ex.exp2; const r = Math.pow(ex.base, e); return <div className="space-y-1"><p className="font-mono text-sm">{ex.base}<sup>{ex.exp1}</sup> · {ex.base}<sup>{ex.exp2}</sup> = {ex.base}<sup>{ex.exp1}+{ex.exp2}</sup> = <strong className="text-accent">{ex.base}<sup>{e}</sup></strong></p><p className="text-xl font-bold text-accent font-mono">= {fmt(r)}</p></div> }
    case "divisao": { const e = ex.exp1 - ex.exp2; const r = Math.pow(ex.base, e); return <div className="space-y-1"><p className="font-mono text-sm">{ex.base}<sup>{ex.exp1}</sup> : {ex.base}<sup>{ex.exp2}</sup> = {ex.base}<sup>{ex.exp1}−{ex.exp2}</sup> = <strong className="text-accent">{ex.base}<sup>{e}</sup></strong></p><p className="text-xl font-bold text-accent font-mono">= {fmt(r)}</p></div> }
    case "potencia-potencia": { const e = ex.exp1 * ex.exp2; const r = Math.pow(ex.base, e); return <div className="space-y-1"><p className="font-mono text-sm">({ex.base}<sup>{ex.exp1}</sup>)<sup>{ex.exp2}</sup> = {ex.base}<sup>{ex.exp1}×{ex.exp2}</sup> = <strong className="text-accent">{ex.base}<sup>{e}</sup></strong></p><p className="text-xl font-bold text-accent font-mono">= {fmt(r)}</p></div> }
    case "potencia-produto": { const an = Math.pow(ex.a, ex.n); const bn = Math.pow(ex.b, ex.n); return <div className="space-y-1"><p className="font-mono text-sm">({ex.a}·{ex.b})<sup>{ex.n}</sup> = {ex.a}<sup>{ex.n}</sup>·{ex.b}<sup>{ex.n}</sup> = {fmt(an)}·{fmt(bn)}</p><p className="text-xl font-bold text-accent font-mono">= {fmt(an * bn)}</p></div> }
    case "potencia-quociente": { const an = Math.pow(ex.a, ex.n); const bn = Math.pow(ex.b, ex.n); return <div className="space-y-1"><p className="font-mono text-sm">({ex.a}/{ex.b})<sup>{ex.n}</sup> = {ex.a}<sup>{ex.n}</sup>/{ex.b}<sup>{ex.n}</sup> = {fmt(an)}/{fmt(bn)}</p><p className="text-xl font-bold text-accent font-mono">= {fmt(an / bn)}</p></div> }
    case "expoente-zero": return <div className="space-y-1"><p className="font-mono text-sm">{ex.base}<sup>0</sup> = <strong className="text-accent">1</strong></p><p className="text-xl font-bold text-accent font-mono">= 1</p><p className="text-xs text-muted-foreground">qualquer base ≠ 0 elevada a zero é sempre 1</p></div>
    case "expoente-negativo": { const pr = Math.pow(ex.base, ex.exp); const r = 1 / pr; return <div className="space-y-1"><p className="font-mono text-sm">{ex.base}<sup>-{ex.exp}</sup> = 1/{ex.base}<sup>{ex.exp}</sup> = 1/{fmt(pr)}</p><p className="text-xl font-bold text-accent font-mono">≈ {r.toFixed(4).replace(".", ",")}</p></div> }
  }
}

/* ================================================================
   Hints
   ================================================================ */
function getHint(ex: Exercise): string {
  switch (ex.type) {
    case "multiplicacao": return `Mesma base (${ex.base}) → some os expoentes: ${ex.exp1} + ${ex.exp2} = ${ex.exp1 + ex.exp2}`
    case "divisao": return `Mesma base (${ex.base}) → subtraia os expoentes: ${ex.exp1} − ${ex.exp2} = ${ex.exp1 - ex.exp2}`
    case "potencia-potencia": return `Multiplique os expoentes: ${ex.exp1} × ${ex.exp2} = ${ex.exp1 * ex.exp2}`
    case "potencia-produto": return `Distribua o expoente ${ex.n} para cada fator: ${ex.a}^${ex.n} · ${ex.b}^${ex.n}`
    case "potencia-quociente": return `Distribua o expoente ${ex.n} para numerador e denominador`
    case "expoente-zero": return `Todo número ≠ 0 elevado a zero é sempre 1!`
    case "expoente-negativo": return `Expoente negativo = inverso: ${ex.base}^(-${ex.exp}) = 1 / ${ex.base}^${ex.exp}`
  }
}

/* ================================================================
   Config & export
   ================================================================ */
const config: ExerciseSectionConfig<Exercise> = {
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => PROP_INFO[ex.type],
  headerDescription: "Pratique as 7 propriedades das potências com questões aleatórias",
}

export const Ano7ExercisesSection = createExerciseSection(config)
