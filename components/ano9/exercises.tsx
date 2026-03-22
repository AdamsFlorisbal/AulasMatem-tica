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

type Ano9Exercise = IrracionaisEx | RetaEx | ConjuntosEx | PotRacionalEx | SimplRadEx | PitagorasEx

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
          <p className="text-4xl font-black text-foreground">{ex.base}^({ex.m}/{ex.n})</p>
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
          <p>{ex.base}^({ex.m}/{ex.n}) = ({ex.n}√{ex.base})^{ex.m}</p>
          <p>{ex.n}√{ex.base} = {Math.round(Math.pow(ex.base, 1 / ex.n))}</p>
          <p className="font-bold text-base text-accent">{ex.base}^({ex.m}/{ex.n}) = {ex.result}</p>
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
      return `${ex.base}^(${ex.m}/${ex.n}) = (${ex.n}√${ex.base})^${ex.m}. Calcule a raiz ${ex.n} de ${ex.base} primeiro.`
    case "simplrad":
      return `Decomponha ${ex.n} em fatores quadrados: ${ex.n} = k² × m. Então √${ex.n} = k√m.`
    case "pitagoras":
      return `c² = ${ex.a}² + ${ex.b}² = ${ex.a * ex.a} + ${ex.b * ex.b}. Depois extraia a raiz quadrada.`
  }
}

const META_MAP = {
  irracional:   { label: "Irracionais",    color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
  reta:         { label: "Reta Numérica",  color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  conjunto:     { label: "Conjuntos",      color: "text-chart-3",  bg: "bg-chart-3/10",  border: "border-chart-3/20" },
  potracional:  { label: "Pot. Racional",  color: "text-accent",   bg: "bg-accent/10",   border: "border-accent/20" },
  simplrad:     { label: "Radicais",       color: "text-chart-4",  bg: "bg-chart-4/10",  border: "border-chart-4/20" },
  pitagoras:    { label: "Pitágoras",      color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
}

export const Ano9ExercisesSection = createExerciseSection<Ano9Exercise>({
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => META_MAP[ex.kind],
  headerDescription: "Irracionais, conjuntos, potência racional e Pitágoras",
})
