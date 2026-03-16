"use client"

import { createExerciseSection } from "@/components/exercises-section"

function rng(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

type PotenciaEx = { kind: "potencia"; base: number; exp: number }
type RaizEx = { kind: "raiz"; n: number }
type PotenciaBase10Ex = { kind: "potencia_base_10"; exp: number }

type Ano6PotenciaExercise =
  | PotenciaEx
  | RaizEx
  | PotenciaBase10Ex

function generate(): Ano6PotenciaExercise[] {
  const exercises: Ano6PotenciaExercise[] = []

  // 2 potencia
  exercises.push({ kind: "potencia", base: rng(2, 5), exp: rng(2, 4) })
  exercises.push({ kind: "potencia", base: rng(6, 10), exp: 2 })

  // 2 potencia base 10
  exercises.push({ kind: "potencia_base_10", exp: rng(2, 5) })

  // 2 raiz
  const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100]
  exercises.push({ kind: "raiz", n: perfectSquares[rng(0, 4)] })
  exercises.push({ kind: "raiz", n: perfectSquares[rng(5, 8)] })

  return exercises.sort(() => Math.random() - 0.5)
}

function renderQuestion(ex: Ano6PotenciaExercise): React.ReactNode {
  switch (ex.kind) {
    case "potencia":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule a potência</p>
          <p className="text-4xl font-black text-foreground">{ex.base}<sup>{ex.exp}</sup></p>
        </div>
      )
    case "potencia_base_10":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule a potência de base 10</p>
          <p className="text-4xl font-black text-foreground">10<sup>{ex.exp}</sup></p>
        </div>
      )
    case "raiz":
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Calcule a raiz quadrada</p>
          <p className="text-4xl font-black text-foreground">√{ex.n}</p>
        </div>
      )
  }
}

function renderAnswer(ex: Ano6PotenciaExercise): React.ReactNode {
  switch (ex.kind) {
    case "potencia": {
      const res = Math.pow(ex.base, ex.exp)
      return (
        <p className="text-base text-foreground">{ex.base}<sup>{ex.exp}</sup> = <strong className="text-accent">{res}</strong></p>
      )
    }
    case "potencia_base_10": {
      const res = Math.pow(10, ex.exp)
      return (
        <p className="text-base text-foreground">10<sup>{ex.exp}</sup> = <strong className="text-accent">{res}</strong></p>
      )
    }
    case "raiz": {
      const res = Math.sqrt(ex.n)
      return (
        <p className="text-base text-foreground">√{ex.n} = <strong className="text-accent">{res}</strong> porque {res}² = {ex.n}</p>
      )
    }
  }
}

function getHint(ex: Ano6PotenciaExercise): string {
  switch (ex.kind) {
    case "potencia":
      return `Multiplique a base (${ex.base}) por ela mesma ${ex.exp} vezes.`
    case "potencia_base_10":
      return `O resultado é o número 1 seguido de ${ex.exp} zeros.`
    case "raiz":
      return `Qual número multiplicado por ele mesmo resulta em ${ex.n}?`
  }
}

const META_MAP = {
  potencia: { label: "Potenciação", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  potencia_base_10: { label: "Potência de 10", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  raiz: { label: "Raiz Quadrada", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
}

export const Ano6PotenciaExercisesSection = createExerciseSection<Ano6PotenciaExercise>({
  generate,
  renderQuestion,
  renderAnswer,
  getHint,
  getMeta: (ex) => META_MAP[ex.kind],
  headerDescription: "Exercícios de potenciação e raiz quadrada para o 6º ano",
})
