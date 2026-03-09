"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { RefreshCw, Lightbulb, Eye, EyeOff, Trophy } from "lucide-react"

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

const PROP_INFO: Record<PropType, { label: string; color: string; bg: string; border: string }> = {
  multiplicacao: {
    label: "Prop. 1 — Mult. Mesma Base",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  divisao: {
    label: "Prop. 2 — Div. Mesma Base",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  "potencia-potencia": {
    label: "Prop. 3 — Pot. de Potência",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
  },
  "potencia-produto": {
    label: "Prop. 4 — Pot. de Produto",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    border: "border-chart-4/30",
  },
  "potencia-quociente": {
    label: "Prop. 5 — Pot. de Quociente",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    border: "border-chart-5/30",
  },
  "expoente-zero": {
    label: "Prop. 6 — Expoente Zero",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  "expoente-negativo": {
    label: "Prop. 7 — Exp. Negativo",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
}

type Exercise =
  | { type: "multiplicacao"; base: number; exp1: number; exp2: number }
  | { type: "divisao"; base: number; exp1: number; exp2: number }
  | { type: "potencia-potencia"; base: number; exp1: number; exp2: number }
  | { type: "potencia-produto"; a: number; b: number; n: number }
  | { type: "potencia-quociente"; a: number; b: number; n: number }
  | { type: "expoente-zero"; base: number }
  | { type: "expoente-negativo"; base: number; exp: number }

/* ================================================================
   Random helpers
   ================================================================ */

function ri(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/* ================================================================
   Exercise generation
   ================================================================ */

function generateExercises(): Exercise[] {
  const list: Exercise[] = []

  for (let i = 0; i < 2; i++) {
    list.push({ type: "multiplicacao", base: ri(2, 7), exp1: ri(2, 4), exp2: ri(1, 3) })

    const divBase = ri(2, 7)
    const divExp1 = ri(4, 6)
    const divExp2 = ri(1, divExp1 - 1)
    list.push({ type: "divisao", base: divBase, exp1: divExp1, exp2: divExp2 })

    list.push({ type: "potencia-potencia", base: ri(2, 5), exp1: ri(2, 3), exp2: ri(2, 3) })

    const prodPairs: [number, number][] = [[2, 3], [2, 5], [3, 4], [4, 5], [3, 7], [2, 7]]
    const [pa, pb] = pickRandom(prodPairs)
    list.push({ type: "potencia-produto", a: pa, b: pb, n: ri(2, 3) })

    const quotPairs: [number, number][] = [[6, 3], [8, 2], [10, 5], [9, 3], [12, 4], [15, 5]]
    const [qa, qb] = pickRandom(quotPairs)
    list.push({ type: "potencia-quociente", a: qa, b: qb, n: ri(2, 3) })

    const zeroBases = [5, 7, 13, 25, 100, 42, 8, 17, 31, 99, 256]
    list.push({ type: "expoente-zero", base: pickRandom(zeroBases) })

    list.push({ type: "expoente-negativo", base: ri(2, 5), exp: ri(1, 3) })
  }

  return list.sort(() => Math.random() - 0.5)
}

/* ================================================================
   Question renderer
   ================================================================ */

function ExerciseQuestion({ ex }: { ex: Exercise }) {
  switch (ex.type) {
    case "multiplicacao":
      return (
        <span className="font-mono text-2xl text-foreground">
          {ex.base}<sup className="text-primary font-bold text-base">{ex.exp1}</sup>
          <span className="mx-2 text-muted-foreground">·</span>
          {ex.base}<sup className="text-primary font-bold text-base">{ex.exp2}</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
    case "divisao":
      return (
        <span className="font-mono text-2xl text-foreground">
          {ex.base}<sup className="text-primary font-bold text-base">{ex.exp1}</sup>
          <span className="mx-2 text-muted-foreground">:</span>
          {ex.base}<sup className="text-primary font-bold text-base">{ex.exp2}</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
    case "potencia-potencia":
      return (
        <span className="font-mono text-2xl text-foreground">
          <span className="text-muted-foreground">(</span>
          {ex.base}<sup className="text-primary font-bold text-base">{ex.exp1}</sup>
          <span className="text-muted-foreground">)</span>
          <sup className="text-primary font-bold text-base">{ex.exp2}</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
    case "potencia-produto":
      return (
        <span className="font-mono text-2xl text-foreground">
          <span className="text-muted-foreground">(</span>
          {ex.a}
          <span className="mx-1 text-muted-foreground">·</span>
          {ex.b}
          <span className="text-muted-foreground">)</span>
          <sup className="text-primary font-bold text-base">{ex.n}</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
    case "potencia-quociente":
      return (
        <span className="font-mono text-2xl text-foreground">
          <span className="text-muted-foreground">(</span>
          {ex.a}
          <span className="mx-1 text-muted-foreground">/</span>
          {ex.b}
          <span className="text-muted-foreground">)</span>
          <sup className="text-primary font-bold text-base">{ex.n}</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
    case "expoente-zero":
      return (
        <span className="font-mono text-2xl text-foreground">
          {ex.base}<sup className="text-primary font-bold text-base">0</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
    case "expoente-negativo":
      return (
        <span className="font-mono text-2xl text-foreground">
          {ex.base}<sup className="text-primary font-bold text-base">-{ex.exp}</sup>
          <span className="ml-3 text-muted-foreground text-lg">= ?</span>
        </span>
      )
  }
}

/* ================================================================
   Hint text
   ================================================================ */

function getHint(ex: Exercise): string {
  switch (ex.type) {
    case "multiplicacao":
      return `Mesma base (${ex.base}) → some os expoentes: ${ex.exp1} + ${ex.exp2} = ${ex.exp1 + ex.exp2}`
    case "divisao":
      return `Mesma base (${ex.base}) → subtraia os expoentes: ${ex.exp1} − ${ex.exp2} = ${ex.exp1 - ex.exp2}`
    case "potencia-potencia":
      return `Multiplique os expoentes: ${ex.exp1} × ${ex.exp2} = ${ex.exp1 * ex.exp2}`
    case "potencia-produto":
      return `Distribua o expoente ${ex.n} para cada fator: ${ex.a}^${ex.n} · ${ex.b}^${ex.n}`
    case "potencia-quociente":
      return `Distribua o expoente ${ex.n} para numerador e denominador`
    case "expoente-zero":
      return `Todo número diferente de zero elevado a zero é sempre igual a 1!`
    case "expoente-negativo":
      return `Expoente negativo = inverso: ${ex.base}^(-${ex.exp}) = 1 / ${ex.base}^${ex.exp}`
  }
}

/* ================================================================
   Answer renderer
   ================================================================ */

function fmtNum(n: number): string {
  if (!isFinite(n)) return "∞"
  if (Math.abs(n) > 1e12) return n.toExponential(2)
  return n.toLocaleString("pt-BR")
}

function ExerciseAnswer({ ex }: { ex: Exercise }) {
  switch (ex.type) {
    case "multiplicacao": {
      const newExp = ex.exp1 + ex.exp2
      const result = Math.pow(ex.base, newExp)
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            {ex.base}<sup>{ex.exp1}</sup> · {ex.base}<sup>{ex.exp2}</sup>
            {" = "}
            {ex.base}<sup>{ex.exp1} + {ex.exp2}</sup>
            {" = "}
            <strong className="text-accent">{ex.base}<sup>{newExp}</sup></strong>
          </p>
          <p className="text-xl font-bold text-accent font-mono">= {fmtNum(result)}</p>
        </div>
      )
    }
    case "divisao": {
      const newExp = ex.exp1 - ex.exp2
      const result = Math.pow(ex.base, newExp)
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            {ex.base}<sup>{ex.exp1}</sup> : {ex.base}<sup>{ex.exp2}</sup>
            {" = "}
            {ex.base}<sup>{ex.exp1} − {ex.exp2}</sup>
            {" = "}
            <strong className="text-accent">{ex.base}<sup>{newExp}</sup></strong>
          </p>
          <p className="text-xl font-bold text-accent font-mono">= {fmtNum(result)}</p>
        </div>
      )
    }
    case "potencia-potencia": {
      const newExp = ex.exp1 * ex.exp2
      const result = Math.pow(ex.base, newExp)
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            ({ex.base}<sup>{ex.exp1}</sup>)<sup>{ex.exp2}</sup>
            {" = "}
            {ex.base}<sup>{ex.exp1} × {ex.exp2}</sup>
            {" = "}
            <strong className="text-accent">{ex.base}<sup>{newExp}</sup></strong>
          </p>
          <p className="text-xl font-bold text-accent font-mono">= {fmtNum(result)}</p>
        </div>
      )
    }
    case "potencia-produto": {
      const an = Math.pow(ex.a, ex.n)
      const bn = Math.pow(ex.b, ex.n)
      const result = an * bn
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            ({ex.a} · {ex.b})<sup>{ex.n}</sup>
            {" = "}
            {ex.a}<sup>{ex.n}</sup> · {ex.b}<sup>{ex.n}</sup>
            {" = "}
            {fmtNum(an)} · {fmtNum(bn)}
          </p>
          <p className="text-xl font-bold text-accent font-mono">= {fmtNum(result)}</p>
        </div>
      )
    }
    case "potencia-quociente": {
      const an = Math.pow(ex.a, ex.n)
      const bn = Math.pow(ex.b, ex.n)
      const result = an / bn
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            ({ex.a} / {ex.b})<sup>{ex.n}</sup>
            {" = "}
            {ex.a}<sup>{ex.n}</sup> / {ex.b}<sup>{ex.n}</sup>
            {" = "}
            {fmtNum(an)} / {fmtNum(bn)}
          </p>
          <p className="text-xl font-bold text-accent font-mono">= {fmtNum(result)}</p>
        </div>
      )
    }
    case "expoente-zero":
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            {ex.base}<sup>0</sup> = <strong className="text-accent">1</strong>
          </p>
          <p className="text-xl font-bold text-accent font-mono">= 1</p>
          <p className="text-xs text-muted-foreground">(qualquer base ≠ 0 elevada a zero é sempre 1)</p>
        </div>
      )
    case "expoente-negativo": {
      const posResult = Math.pow(ex.base, ex.exp)
      const result = 1 / posResult
      return (
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            {ex.base}<sup>-{ex.exp}</sup>
            {" = "}
            1 / {ex.base}<sup>{ex.exp}</sup>
            {" = "}
            1 / {fmtNum(posResult)}
          </p>
          <p className="text-xl font-bold text-accent font-mono">
            = 1/{fmtNum(posResult)}
            <span className="text-sm ml-2 text-muted-foreground">
              ≈ {result.toFixed(4).replace(".", ",")}
            </span>
          </p>
        </div>
      )
    }
  }
}

/* ================================================================
   Exercise Card
   ================================================================ */

function ExerciseCard({ ex, index }: { ex: Exercise; index: number }) {
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const meta = PROP_INFO[ex.type]

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
          Exercício {index + 1}
        </span>
        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", meta.bg, meta.color, meta.border)}>
          {meta.label}
        </span>
      </div>

      {/* Question */}
      <div className="flex items-center justify-center py-5 px-3 rounded-xl bg-secondary/40 border border-border">
        <ExerciseQuestion ex={ex} />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowHint(!showHint)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border",
            showHint
              ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
              : "bg-secondary/50 text-muted-foreground border-transparent hover:border-border hover:text-foreground"
          )}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? "Ocultar dica" : "Ver dica"}
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border",
            showAnswer
              ? "bg-accent/20 text-accent border-accent/30"
              : "bg-secondary/50 text-muted-foreground border-transparent hover:border-border hover:text-foreground"
          )}
        >
          {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {showAnswer ? "Ocultar" : "Ver resposta"}
        </button>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 animate-fade-in-up">
          <p className="text-sm text-amber-500 font-medium">
            <span className="mr-1">💡</span>
            {getHint(ex)}
          </p>
        </div>
      )}

      {/* Answer */}
      {showAnswer && (
        <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 animate-fade-in-up">
          <p className="text-xs font-bold text-accent uppercase tracking-wide mb-2">Resolução</p>
          <ExerciseAnswer ex={ex} />
        </div>
      )}
    </div>
  )
}

/* ================================================================
   Main section
   ================================================================ */

export function ExercisesSection() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [genKey, setGenKey] = useState(0)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    setExercises(generateExercises())
  }, [genKey])

  const regenerate = useCallback(() => {
    setSpinning(true)
    setTimeout(() => setSpinning(false), 600)
    setGenKey((k) => k + 1)
  }, [])

  return (
    <section id="exercicios">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Exercícios</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Pratique as 7 propriedades com questões aleatórias
              </p>
            </div>
          </div>
          <button
            onClick={regenerate}
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all active:scale-95"
          >
            <RefreshCw className={cn("w-4 h-4 transition-transform duration-500", spinning && "animate-spin")} />
            Gerar novos exercícios
          </button>
        </div>

        {/* Grid */}
        {exercises.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            Gerando exercícios...
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {exercises.map((ex, i) => (
              <ExerciseCard key={`${genKey}-${i}`} ex={ex} index={i} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-8 rounded-xl bg-secondary/40 border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Os exercícios são gerados aleatoriamente a cada carregamento.{" "}
            <span className="text-foreground font-medium">Clique em &quot;Gerar novos exercícios&quot;</span>
            {" "}para praticar com valores diferentes!
          </p>
        </div>
      </div>
    </section>
  )
}
