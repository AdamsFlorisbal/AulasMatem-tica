"use client"

import { createExerciseSection, type ExerciseSectionConfig, type ExerciseMeta } from "@/components/exercises-section"

type ExType = "leitura" | "comparacao" | "adicao" | "subtracao" | "multiplicacao" | "divisao"

type Exercise =
  | { type: "leitura"; n: number }
  | { type: "comparacao"; a: number; b: number }
  | { type: "adicao"; a: number; b: number }
  | { type: "subtracao"; a: number; b: number }
  | { type: "multiplicacao"; a: number; b: number; casas: number }
  | { type: "divisao"; a: number; b: number }

const META: Record<ExType, ExerciseMeta> = {
  leitura: { label: "Leitura", color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/30" },
  comparacao: { label: "Comparação", color: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  adicao: { label: "Adição", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  subtracao: { label: "Subtração", color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30" },
  multiplicacao: { label: "Multiplicação", color: "text-chart-5", bg: "bg-chart-5/10", border: "border-chart-5/30" },
  divisao: { label: "Divisão", color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/30" },
}

function ri(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }
function rd(casas: number): number {
  const f = Math.pow(10, casas)
  return Math.round((Math.random() * 9 + 1) * f) / f / (casas > 0 ? 1 : 10)
}
function fmtDec(n: number): string { return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 4 }) }

function generate(): Exercise[] {
  const list: Exercise[] = []
  for (let i = 0; i < 2; i++) {
    list.push({ type: "leitura", n: Math.round(ri(1, 999) * 100 + ri(0, 99)) / 100 })
    const a = Math.round(ri(10, 99) * 10 + ri(0, 9)) / 100
    const b = Math.round(ri(10, 99) * 10 + ri(0, 9)) / 100
    list.push({ type: "comparacao", a, b })
    const aa = Math.round(ri(1, 9) * 10 + ri(0, 9)) / 10
    const bb = Math.round(ri(1, 9) * 10 + ri(0, 9)) / 10
    list.push({ type: "adicao", a: aa, b: bb })
    const big = Math.max(aa, bb), sml = Math.min(aa, bb)
    list.push({ type: "subtracao", a: big, b: sml })
    const fa = (ri(1, 9)) / 10, fb = ri(1, 9)
    list.push({ type: "multiplicacao", a: fa, b: fb, casas: 1 })
    const da = ri(2, 9) * ri(1, 5), db = ri(2, 5)
    list.push({ type: "divisao", a: da, b: db })
  }
  return list.sort(() => Math.random() - 0.5)
}

function renderQuestion(ex: Exercise): React.ReactNode {
  switch (ex.type) {
    case "leitura": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.n)}<span className="ml-3 text-muted-foreground text-lg">= ? (por extenso)</span></span>
    case "comparacao": return <span className="font-mono text-2xl">{fmtDec(ex.a)}<span className="mx-4 text-3xl text-muted-foreground">□</span>{fmtDec(ex.b)}</span>
    case "adicao": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.a)}<span className="mx-2 text-muted-foreground">+</span>{fmtDec(ex.b)}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "subtracao": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.a)}<span className="mx-2 text-muted-foreground">−</span>{fmtDec(ex.b)}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "multiplicacao": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.a)}<span className="mx-2 text-muted-foreground">×</span>{ex.b}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "divisao": return <span className="font-mono text-2xl text-foreground">{ex.a}<span className="mx-2 text-muted-foreground">÷</span>{ex.b}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
  }
}

function renderAnswer(ex: Exercise): React.ReactNode {
  switch (ex.type) {
    case "leitura": {
      const int = Math.floor(ex.n), dec = Math.round((ex.n - int) * 100)
      return <div><p className="font-mono text-sm text-foreground">{fmtDec(ex.n)} = {int} inteiros e {dec} centésimos</p><p className="text-xl font-bold text-accent">{fmtDec(ex.n)}</p></div>
    }
    case "comparacao": { const s = ex.a > ex.b ? ">" : ex.a < ex.b ? "<" : "="; return <p className="text-xl font-bold text-accent font-mono">{fmtDec(ex.a)} {s} {fmtDec(ex.b)}</p> }
    case "adicao": return <p className="text-xl font-bold text-accent font-mono">{fmtDec(ex.a)} + {fmtDec(ex.b)} = {fmtDec(ex.a + ex.b)}</p>
    case "subtracao": return <p className="text-xl font-bold text-accent font-mono">{fmtDec(ex.a)} − {fmtDec(ex.b)} = {fmtDec(ex.a - ex.b)}</p>
    case "multiplicacao": return <div><p className="font-mono text-sm">{fmtDec(ex.a)} × {ex.b}: multiplique como inteiros, {ex.casas} casa decimal</p><p className="text-xl font-bold text-accent font-mono">= {fmtDec(ex.a * ex.b)}</p></div>
    case "divisao": return <p className="text-xl font-bold text-accent font-mono">{ex.a} ÷ {ex.b} = {fmtDec(ex.a / ex.b)}</p>
  }
}

function getHint(ex: Exercise): string {
  switch (ex.type) {
    case "leitura": return `Identifique cada casa: unidades, décimos, centésimos, milésimos`
    case "comparacao": return `Complete com zeros para igualar as casas, depois compare dígito a dígito`
    case "adicao": return `Alinhe as vírgulas e some coluna por coluna da direita para a esquerda`
    case "subtracao": return `Alinhe as vírgulas e subtraia, usando empréstimo quando necessário`
    case "multiplicacao": return `Multiplique sem vírgula e depois conte quantas casas decimais há nos fatores`
    case "divisao": return `Divida normalmente. O resultado tem o mesmo número de casas do dividendo`
  }
}

const config: ExerciseSectionConfig<Exercise> = {
  generate, renderQuestion, renderAnswer, getHint,
  getMeta: (ex) => META[ex.type],
  headerDescription: "Pratique leitura, comparação e operações com decimais",
}

export const Ano5ExercisesSection = createExerciseSection(config)
