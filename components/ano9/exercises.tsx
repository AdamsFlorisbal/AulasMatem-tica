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

function rng(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/* ================================================================
   Types
   ================================================================ */
type IrracionaisEx    = { kind: "irracional"; n: number }
type RetaEx           = { kind: "reta"; n: number }
type ConjuntosEx      = { kind: "conjunto"; n: number; isInteger: boolean; isNatural: boolean }
type PotRacionalEx    = { kind: "potracional"; base: number; m: number; n: number; result: number }
type SimplRadEx       = { kind: "simplrad"; n: number }
type PitagorasEx      = { kind: "pitagoras"; a: number; b: number }
type CoeficientesEx   = { kind: "coeficientes"; a: number; b: number; c: number }
type DeltaEx          = { kind: "delta"; a: number; b: number; c: number }
type BhaskaraEx       = { kind: "bhaskara"; a: number; b: number; c: number }

type Ano9Exercise = IrracionaisEx | RetaEx | ConjuntosEx | PotRacionalEx | SimplRadEx | PitagorasEx | CoeficientesEx | DeltaEx | BhaskaraEx

const PYTHAGOREAN = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10]]

function generate(): Ano9Exercise[] {
  const exercises: Ano9Exercise[] = []

  const numOptions = [
    { n: rng(1, 20), isInteger: true, isNatural: true },
    { n: -rng(1, 20), isInteger: true, isNatural: false },
    { n: rng(10, 50), isInteger: true, isNatural: true },
    { n: -rng(10, 50), isInteger: true, isNatural: false },
    { n: rng(50, 99), isInteger: true, isNatural: true },
  ]
  const powBases = [[4, 1, 2, 2], [8, 1, 3, 2], [27, 2, 3, 9], [16, 3, 4, 8]]

  for (let i = 0; i < 5; i++) {
    exercises.push({ kind: "irracional", n: rng(2, 30) })
    exercises.push({ kind: "reta", n: rng(2, 50) })
    exercises.push({ kind: "conjunto", ...numOptions[i] })

    const [base, m, n, result] = pick(powBases)
    exercises.push({ kind: "potracional", base, m, n, result })

    const k = rng(2, 6)
    const mRad = pick([2, 3, 5, 6, 7])
    exercises.push({ kind: "simplrad", n: k * k * mRad })

    const triple = pick(PYTHAGOREAN)
    exercises.push({ kind: "pitagoras", a: triple[0], b: triple[1] })

    // equações do 2º grau — coeficientes
    const eqA = pick([1, 2, 3, -1, -2])
    const eqB = pick([-7, -5, -3, -1, 1, 3, 5, 7])
    const eqC = pick([-6, -4, -2, 0, 2, 4, 6, 10])
    exercises.push({ kind: "coeficientes", a: eqA, b: eqB, c: eqC })

    // equações do 2º grau — delta
    const r1 = rng(-5, 5)
    const r2 = rng(-5, 5)
    const dA = pick([1, 2, 3])
    const dB = -dA * (r1 + r2)
    const dC = dA * r1 * r2
    exercises.push({ kind: "delta", a: dA, b: dB, c: dC })

    // equações do 2º grau — bhaskara
    const br1 = rng(-4, 6)
    const br2 = rng(-4, 6)
    const bA = 1
    const bB = -(br1 + br2)
    const bC = br1 * br2
    exercises.push({ kind: "bhaskara", a: bA, b: bB, c: bC })
  }

  return exercises.sort(() => Math.random() - 0.5)
}

/* ================================================================
   Render
   ================================================================ */
function renderQuestion(ex: Ano9Exercise): React.ReactNode {
  switch (ex.kind) {
    case "irracional":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">√{ex.n} é racional ou irracional?</p>
          <p className="text-5xl font-black text-foreground">√{ex.n}</p>
        </div>
      )
    case "reta":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Entre quais inteiros consecutivos está</p>
          <p className="text-5xl font-black text-foreground">√{ex.n}</p>
        </div>
      )
    case "conjunto":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">A qual(is) conjunto(s) pertence?</p>
          <p className="text-5xl font-black text-foreground">{ex.n}</p>
        </div>
      )
    case "potracional":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule</p>
          <p className="text-4xl font-black text-foreground">{ex.base}<sup>{ex.m}/{ex.n}</sup></p>
        </div>
      )
    case "simplrad":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Simplifique</p>
          <p className="text-5xl font-black text-foreground">√{ex.n}</p>
        </div>
      )
    case "pitagoras":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Catetos: {ex.a} e {ex.b}. Calcule a hipotenusa</p>
          <p className="text-3xl font-black text-foreground">c = √({ex.a}² + {ex.b}²)</p>
        </div>
      )
    case "coeficientes":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Identifique os coeficientes a, b e c</p>
          <p className="text-3xl font-black text-foreground">
            {ex.a === 1 ? "" : ex.a === -1 ? "−" : ex.a}x² {ex.b >= 0 ? "+" : "−"} {Math.abs(ex.b) === 1 ? "" : Math.abs(ex.b)}x {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)} = 0
          </p>
        </div>
      )
    case "delta":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule o discriminante (Δ)</p>
          <p className="text-3xl font-black text-foreground">
            {ex.a === 1 ? "" : ex.a === -1 ? "−" : ex.a}x² {ex.b >= 0 ? "+" : "−"} {Math.abs(ex.b)}x {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)} = 0
          </p>
        </div>
      )
    case "bhaskara":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Resolva usando Bhaskara</p>
          <p className="text-3xl font-black text-foreground">
            {ex.a === 1 ? "" : ex.a}x² {ex.b >= 0 ? "+" : "−"} {Math.abs(ex.b)}x {ex.c >= 0 ? "+" : "−"} {Math.abs(ex.c)} = 0
          </p>
        </div>
      )
  }
}

function renderAnswer(ex: Ano9Exercise): React.ReactNode {
  switch (ex.kind) {
    case "irracional": {
      const root = Math.sqrt(ex.n)
      const isRational = Number.isInteger(root)
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>√{ex.n} = {parseFloat(root.toFixed(6))}{isRational ? "" : "…"}</p>
          <p className={`font-bold text-base ${isRational ? "text-primary" : "text-chart-5"}`}>
            {isRational ? `√${ex.n} = ${root} → RACIONAL (inteiro)` : `√${ex.n} é IRRACIONAL (decimal infinito não periódico)`}
          </p>
        </div>
      )
    }
    case "reta": {
      const root = Math.sqrt(ex.n)
      const floor = Math.floor(root)
      const ceil = Math.ceil(root)
      return (
        <div className="space-y-1 text-sm text-foreground">
          {Number.isInteger(root) ? (
            <p className="font-bold text-base text-accent">√{ex.n} = {root} (inteiro exato)</p>
          ) : (
            <>
              <p>{floor}² = {floor * floor} e {ceil}² = {ceil * ceil}</p>
              <p>{floor * floor} &lt; {ex.n} &lt; {ceil * ceil}</p>
              <p className="font-bold text-base text-accent">{floor} &lt; √{ex.n} &lt; {ceil}  (≈ {parseFloat(root.toFixed(3))})</p>
            </>
          )}
        </div>
      )
    }
    case "conjunto": {
      let sets = ""
      if (ex.isNatural) sets = "ℕ, ℤ, ℚ e ℝ"
      else if (ex.isInteger) sets = "ℤ, ℚ e ℝ"
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>{ex.n} {ex.isNatural ? "é natural (inteiro ≥ 0)" : "é inteiro negativo"}</p>
          <p className="font-bold text-base text-accent">{ex.n} ∈ {sets}</p>
        </div>
      )
    }
    case "potracional": {
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>{ex.base}<sup>{ex.m}/{ex.n}</sup> = (<sup>{ex.n}</sup>√{ex.base})<sup>{ex.m}</sup></p>
          <p>{ex.n}√{ex.base} = {Math.round(Math.pow(ex.base, 1 / ex.n))}</p>
          <p className="font-bold text-base text-accent">{ex.base}<sup>{ex.m}/{ex.n}</sup> = {ex.result}</p>
        </div>
      )
    }
    case "simplrad": {
      const { outside, inside } = simplifyRadical(ex.n)
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>{ex.n} = {outside * outside} × {inside}</p>
          <p>√{ex.n} = {outside}√{inside}</p>
          <p className="font-bold text-base text-accent">√{ex.n} = {outside}√{inside}</p>
        </div>
      )
    }
    case "pitagoras": {
      const c2 = ex.a * ex.a + ex.b * ex.b
      const c = Math.sqrt(c2)
      const { outside, inside } = simplifyRadical(c2)
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>c² = {ex.a}² + {ex.b}² = {ex.a * ex.a} + {ex.b * ex.b} = {c2}</p>
          <p className="font-bold text-base text-accent">
            c = {Number.isInteger(c) ? c : outside > 1 ? `${outside}√${inside} ≈ ${parseFloat(c.toFixed(3))}` : `√${c2} ≈ ${parseFloat(c.toFixed(3))}`}
          </p>
        </div>
      )
    }
    case "coeficientes": {
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>O número na frente de x² → <strong>a = {ex.a}</strong></p>
          <p>O número na frente de x → <strong>b = {ex.b}</strong></p>
          <p>O termo independente → <strong>c = {ex.c}</strong></p>
          <p className="font-bold text-base text-accent">a = {ex.a}, b = {ex.b}, c = {ex.c}</p>
        </div>
      )
    }
    case "delta": {
      const delta = ex.b * ex.b - 4 * ex.a * ex.c
      const tipo = delta > 0 ? "Duas raízes reais" : delta === 0 ? "Raiz dupla" : "Sem raízes reais"
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>a = {ex.a}, b = {ex.b}, c = {ex.c}</p>
          <p>Δ = ({ex.b})² − 4·({ex.a})·({ex.c})</p>
          <p>Δ = {ex.b * ex.b} − {4 * ex.a * ex.c}</p>
          <p className="font-bold text-base text-accent">Δ = {delta} → {tipo}</p>
        </div>
      )
    }
    case "bhaskara": {
      const delta = ex.b * ex.b - 4 * ex.a * ex.c
      if (delta < 0) {
        return (
          <div className="space-y-1 text-sm text-foreground">
            <p>Δ = ({ex.b})² − 4·({ex.a})·({ex.c}) = {delta}</p>
            <p className="font-bold text-base text-red-500">Δ &lt; 0 → Sem raízes reais</p>
          </div>
        )
      }
      const sqrtD = Math.sqrt(delta)
      const x1 = (-ex.b + sqrtD) / (2 * ex.a)
      const x2 = (-ex.b - sqrtD) / (2 * ex.a)
      return (
        <div className="space-y-1 text-sm text-foreground">
          <p>a = {ex.a}, b = {ex.b}, c = {ex.c}</p>
          <p>Δ = {ex.b * ex.b} − {4 * ex.a * ex.c} = {delta}</p>
          <p>√Δ = {parseFloat(sqrtD.toFixed(4))}</p>
          <p>x = ({-ex.b} ± {parseFloat(sqrtD.toFixed(4))}) / {2 * ex.a}</p>
          <p className="font-bold text-base text-accent">x₁ = {parseFloat(x1.toFixed(4))}, x₂ = {parseFloat(x2.toFixed(4))}</p>
        </div>
      )
    }
  }
}

function getHint(ex: Ano9Exercise): string {
  switch (ex.kind) {
    case "irracional":
      return `Calcule √${ex.n}. Se o resultado for inteiro → racional. Se for decimal infinito → irracional.`
    case "reta":
      return `Encontre k tal que k² < ${ex.n} < (k+1)². Então k < √${ex.n} < k+1.`
    case "conjunto":
      return `Verifique: é não negativo? → ℕ. É inteiro? → ℤ. Pode ser escrito como fração? → ℚ. Qualquer número real → ℝ.`
    case "potracional":
      return `Na potência fracionária o denominador vira índice da raiz: calcule a raiz ${ex.n} de ${ex.base} primeiro, e eleve o resultado a ${ex.m}.`
    case "simplrad":
      return `Decomponha ${ex.n} em fatores quadrados: ${ex.n} = k² × m. Então √${ex.n} = k√m.`
    case "pitagoras":
      return `c² = ${ex.a}² + ${ex.b}² = ${ex.a * ex.a} + ${ex.b * ex.b}. Depois extraia a raiz quadrada.`
    case "coeficientes":
      return `a = número na frente de x², b = número na frente de x, c = termo independente (sem x). Cuidado com os sinais!`
    case "delta":
      return `Use Δ = b² − 4ac. Substitua a = ${ex.a}, b = ${ex.b}, c = ${ex.c} e faça a conta.`
    case "bhaskara":
      return `Primeiro calcule Δ = b² − 4ac. Se Δ ≥ 0, use x = (−b ± √Δ) / (2a).`
  }
}

const META_MAP = {
  irracional:   { label: "Irracionais",    color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
  reta:         { label: "Reta Numérica",  color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  conjunto:     { label: "Conjuntos",      color: "text-chart-3",  bg: "bg-chart-3/10",  border: "border-chart-3/20" },
  potracional:  { label: "Pot. Racional",  color: "text-accent",   bg: "bg-accent/10",   border: "border-accent/20" },
  simplrad:     { label: "Radicais",       color: "text-chart-4",  bg: "bg-chart-4/10",  border: "border-chart-4/20" },
  pitagoras:    { label: "Pitágoras",      color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
  coeficientes: { label: "Coeficientes",   color: "text-accent",   bg: "bg-accent/10",   border: "border-accent/20" },
  delta:        { label: "Delta",          color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  bhaskara:     { label: "Bhaskara",       color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
}

export const Ano9ExercisesSection = createExerciseSection<Ano9Exercise>({
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => META_MAP[ex.kind],
  headerDescription: "Irracionais, conjuntos, potência racional, Pitágoras e equações do 2º grau",
})
