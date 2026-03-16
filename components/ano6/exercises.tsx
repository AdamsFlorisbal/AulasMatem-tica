"use client"

import { createExerciseSection } from "@/components/exercises-section"

/* ================================================================
   Helpers
   ================================================================ */
function mdc(a: number, b: number): number { return b === 0 ? a : mdc(b, a % b) }
function mmc(a: number, b: number): number { return (a * b) / mdc(a, b) }

function primeFactors(n: number): number[] {
  const factors: number[] = []
  let d = 2
  let x = n
  while (d * d <= x) {
    while (x % d === 0) { factors.push(d); x = Math.floor(x / d) }
    d++
  }
  if (x > 1) factors.push(x)
  return factors
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false
  return true
}

function factorString(n: number): string {
  const f = primeFactors(n)
  if (f.length === 0) return `${n}`
  const map: Record<number, number> = {}
  for (const p of f) map[p] = (map[p] ?? 0) + 1
  return Object.entries(map).map(([p, e]) => e > 1 ? `${p}^${e}` : p).join(" × ")
}

function rng(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* ================================================================
   Types
   ================================================================ */
type SucessorAntecessorEx = { kind: "sucessor_antecessor"; n: number; type: "sucessor" | "antecessor" }
type ComparacaoEx = { kind: "comparacao"; a: number; b: number }
type OperacoesEx = { kind: "operacoes"; a: number; b: number; op: "+" | "-" | "×" | "÷" }
type DivisibilidadeEx = { kind: "divisibilidade"; n: number; divisor: number }
type PrimoEx = { kind: "primo"; n: number }
type FatoracaoEx = { kind: "fatoracao"; n: number }
type MdcEx = { kind: "mdc"; a: number; b: number }
type MmcEx = { kind: "mmc"; a: number; b: number }

type Ano6Exercise =
  | SucessorAntecessorEx
  | ComparacaoEx
  | OperacoesEx
  | DivisibilidadeEx
  | PrimoEx
  | FatoracaoEx
  | MdcEx
  | MmcEx

const DIVISORS = [2, 3, 4, 5, 6, 9, 10]

function isDivisible(n: number, d: number): boolean {
  const s = String(n)
  const digits = s.split("").map(Number)
  const last = digits[digits.length - 1]
  const lastTwo = Number(s.slice(-2))
  const digitSum = digits.reduce((a, b) => a + b, 0)
  switch (d) {
    case 2: return last % 2 === 0
    case 3: return digitSum % 3 === 0
    case 4: return lastTwo % 4 === 0
    case 5: return last === 0 || last === 5
    case 6: return isDivisible(n, 2) && isDivisible(n, 3)
    case 9: return digitSum % 9 === 0
    case 10: return last === 0
    default: return n % d === 0
  }
}

function generate(): Ano6Exercise[] {
  const exercises: Ano6Exercise[] = []

  // 2 sucessor/antecessor
  exercises.push({ kind: "sucessor_antecessor", n: rng(100, 999), type: "sucessor" })
  exercises.push({ kind: "sucessor_antecessor", n: rng(100, 999), type: "antecessor" })

  // 2 comparacao
  exercises.push({ kind: "comparacao", a: rng(10, 100), b: rng(10, 100) })
  exercises.push({ kind: "comparacao", a: rng(100, 200), b: rng(100, 200) })
  
  // 2 operacoes
  exercises.push({ kind: "operacoes", a: rng(10, 50), b: rng(10, 50), op: "+" })
  exercises.push({ kind: "operacoes", a: rng(50, 100), b: rng(10, 50), op: "-" })


  // 2 divisibilidade
  for (let i = 0; i < 2; i++) {
    const n = rng(100, 999)
    const divisor = DIVISORS[rng(0, DIVISORS.length - 1)]
    exercises.push({ kind: "divisibilidade", n, divisor })
  }

  // 2 primo
  for (let i = 0; i < 2; i++) {
    exercises.push({ kind: "primo", n: rng(2, 50) })
  }

  // 2 fatoracao
  for (let i = 0; i < 2; i++) {
    exercises.push({ kind: "fatoracao", n: rng(12, 100) })
  }

  // 2 mdc
  for (let i = 0; i < 2; i++) {
    const a = rng(12, 60)
    const b = rng(12, 60)
    exercises.push({ kind: "mdc", a, b })
  }

  // 2 mmc
  for (let i = 0; i < 2; i++) {
    const a = rng(4, 20)
    const b = rng(4, 20)
    exercises.push({ kind: "mmc", a, b })
  }

  // shuffle
  return exercises.sort(() => Math.random() - 0.5)
}

/* ================================================================
   Render helpers
   ================================================================ */
function renderQuestion(ex: Ano6Exercise): React.ReactNode {
  switch (ex.kind) {
    case "sucessor_antecessor":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Qual é o <strong>{ex.type}</strong> de</p>
          <p className="text-4xl font-black text-foreground">{ex.n}</p>
        </div>
      )
    case "comparacao":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Compare os números usando {`">" ou "<"`}</p>
          <p className="text-4xl font-black text-foreground">{ex.a} ___ {ex.b}</p>
        </div>
      )
    case "operacoes":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule a {ex.op === "+" ? "soma" : "diferença"}</p>
          <p className="text-4xl font-black text-foreground">{ex.a} {ex.op} {ex.b}</p>
        </div>
      )
    case "divisibilidade":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">O número</p>
          <p className="text-4xl font-black text-foreground">{ex.n}</p>
          <p className="text-sm text-muted-foreground mt-1">é divisível por <strong>{ex.divisor}</strong>?</p>
        </div>
      )
    case "primo":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">O número</p>
          <p className="text-4xl font-black text-foreground">{ex.n}</p>
          <p className="text-sm text-muted-foreground mt-1">é primo?</p>
        </div>
      )
    case "fatoracao":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Decomponha em fatores primos</p>
          <p className="text-4xl font-black text-foreground">{ex.n}</p>
        </div>
      )
    case "mdc":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule o MDC</p>
          <p className="text-4xl font-black text-foreground">
            MDC({ex.a}, {ex.b})
          </p>
        </div>
      )
    case "mmc":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule o MMC</p>
          <p className="text-4xl font-black text-foreground">
            MMC({ex.a}, {ex.b})
          </p>
        </div>
      )
  }
}

function renderAnswer(ex: Ano6Exercise): React.ReactNode {
  switch (ex.kind) {
    case "sucessor_antecessor": {
      const res = ex.type === "sucessor" ? ex.n + 1 : ex.n - 1
      return (
        <p className="text-base text-foreground">O {ex.type} de {ex.n} é <strong className="text-accent">{res}</strong>.</p>
      )
    }
    case "comparacao": {
      const symbol = ex.a > ex.b ? ">" : ex.a < ex.b ? "<" : "="
      return (
        <p className="text-base text-foreground">
          {ex.a} <strong className="text-accent">{symbol}</strong> {ex.b}
        </p>
      )
    }
    case "operacoes": {
      const res = ex.op === "+" ? ex.a + ex.b : ex.a - ex.b
      return (
         <p className="text-base text-foreground">{ex.a} {ex.op} {ex.b} = <strong className="text-accent">{res}</strong></p>
      )
    }
    case "divisibilidade": {
      const res = isDivisible(ex.n, ex.divisor)
      const rule: Record<number, string> = {
        2: "O último dígito é par",
        3: "A soma dos dígitos é múltiplo de 3",
        4: "Os dois últimos dígitos formam múltiplo de 4",
        5: "O último dígito é 0 ou 5",
        6: "É divisível por 2 E por 3",
        9: "A soma dos dígitos é múltiplo de 9",
        10: "O último dígito é 0",
      }
      const digits = String(ex.n).split("").map(Number)
      const digitSum = digits.reduce((a, b) => a + b, 0)
      return (
        <div className="space-y-2 text-sm text-foreground">
          <p><strong>Regra:</strong> {rule[ex.divisor]}</p>
          {(ex.divisor === 3 || ex.divisor === 9) && (
            <p>Soma dos dígitos: {digits.join(" + ")} = {digitSum}</p>
          )}
          <p className={`font-bold text-base ${res ? "text-accent" : "text-destructive"}`}>
            {res ? `✓ Sim, ${ex.n} é divisível por ${ex.divisor}` : `✗ Não, ${ex.n} não é divisível por ${ex.divisor}`}
          </p>
        </div>
      )
    }
    case "primo": {
      const prime = isPrime(ex.n)
      const divs: number[] = []
      for (let i = 1; i <= ex.n; i++) if (ex.n % i === 0) divs.push(i)
      return (
        <div className="space-y-2 text-sm text-foreground">
          <p>Divisores de {ex.n}: {divs.join(", ")}</p>
          <p className={`font-bold text-base ${prime ? "text-accent" : "text-destructive"}`}>
            {prime ? `✓ Sim, ${ex.n} é primo (apenas 2 divisores: 1 e ele mesmo)` : `✗ Não, ${ex.n} não é primo (tem ${divs.length} divisores)`}
          </p>
        </div>
      )
    }
    case "fatoracao": {
      const str = factorString(ex.n)
      const factors = primeFactors(ex.n)
      const steps: string[] = []
      let x = ex.n
      let d = 2
      while (d * d <= x) {
        while (x % d === 0) { steps.push(`${x} ÷ ${d} = ${x / d}`); x = Math.floor(x / d) }
        d++
      }
      if (x > 1) steps.push(`${x} é primo`)
      return (
        <div className="space-y-2 text-sm text-foreground">
          {steps.map((s, i) => <p key={i}>{s}</p>)}
          <p className="font-bold text-base text-accent">{ex.n} = {str}</p>
        </div>
      )
    }
    case "mdc": {
      const result = mdc(ex.a, ex.b)
      const steps: string[] = []
      let a = ex.a, b = ex.b
      while (b !== 0) {
        steps.push(`mdc(${a}, ${b}): ${a} = ${b} × ${Math.floor(a / b)} + ${a % b}`)
        const r = a % b; a = b; b = r
      }
      steps.push(`mdc = ${result}`)
      return (
        <div className="space-y-1 text-sm text-foreground">
          {steps.map((s, i) => <p key={i}>{s}</p>)}
          <p className="font-bold text-base text-accent mt-2">MDC({ex.a}, {ex.b}) = {result}</p>
        </div>
      )
    }
    case "mmc": {
      const result = mmc(ex.a, ex.b)
      const fa = factorString(ex.a)
      const fb = factorString(ex.b)
      return (
        <div className="space-y-2 text-sm text-foreground">
          <p>{ex.a} = {fa}</p>
          <p>{ex.b} = {fb}</p>
          <p>MMC = produto de todos os fatores com maior expoente</p>
          <p className="font-bold text-base text-accent">MMC({ex.a}, {ex.b}) = {result}</p>
        </div>
      )
    }
  }
}

function getHint(ex: Ano6Exercise): string {
  switch (ex.kind) {
    case "sucessor_antecessor":
      return `Sucessor é o número que vem depois (+1), antecessor é o que vem antes (-1).`
    case "comparacao":
      return `O número com mais dígitos é maior. Se tiverem a mesma quantidade, compare da esquerda para a direita.`
    case "operacoes":
      return `Alinhe os números e realize a operação coluna por coluna.`
    case "divisibilidade":
      return `Aplique a regra de divisibilidade por ${ex.divisor} ao número ${ex.n}.`
    case "primo":
      return `Tente dividir ${ex.n} por 2, 3, 5, 7... Se nenhum dividir, é primo.`
    case "fatoracao":
      return `Divida ${ex.n} sucessivamente pelos menores primos: comece por 2, depois 3, 5...`
    case "mdc":
      return `Use o algoritmo de Euclides: mdc(${ex.a}, ${ex.b}) = mdc(${ex.b}, ${ex.a % ex.b})`
    case "mmc":
      return `MMC(a, b) = (a × b) ÷ MDC(a, b). Calcule primeiro o MDC(${ex.a}, ${ex.b}).`
  }
}

const META_MAP = {
  sucessor_antecessor: { label: "Sucessor/Antecessor", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  comparacao:       { label: "Comparação", color: "text-lime-500", bg: "bg-lime-500/10", border: "border-lime-500/20" },
  operacoes:        { label: "Operações", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  divisibilidade: { label: "Divisibilidade", color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/20" },
  primo:          { label: "Nº Primo",       color: "text-primary",  bg: "bg-primary/10",  border: "border-primary/20" },
  fatoracao:      { label: "Fatoração",       color: "text-accent",   bg: "bg-accent/10",   border: "border-accent/20" },
  mdc:            { label: "MDC",             color: "text-chart-4",  bg: "bg-chart-4/10",  border: "border-chart-4/20" },
  mmc:            { label: "MMC",             color: "text-chart-5",  bg: "bg-chart-5/10",  border: "border-chart-5/20" },
}

export const Ano6ExercisesSection = createExerciseSection<Ano6Exercise>({
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => META_MAP[ex.kind],
  headerDescription: "Exercícios de matemática para o 6º ano",
})

