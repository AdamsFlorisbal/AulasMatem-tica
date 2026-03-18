"use client"

import { createExerciseSection, type ExerciseSectionConfig, type ExerciseMeta } from "@/components/exercises-section"

type ExType = "poligono" | "triangulo" | "angulo-triangulo" | "circulo-perimetro" | "circulo-area" | "lado-circunferencia"

type Exercise =
  | { type: "poligono"; lados: number }
  | { type: "triangulo"; tipo: "equilatero" | "isosceles" | "escaleno" }
  | { type: "angulo-triangulo"; a: number; b: number }
  | { type: "circulo-perimetro"; raio: number }
  | { type: "circulo-area"; raio: number }
  | { type: "lado-circunferencia"; perimetro: number }

const META: Record<ExType, ExerciseMeta> = {
  poligono: { label: "Polígonos", color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
  triangulo: { label: "Triângulos", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  "angulo-triangulo": { label: "Ângulos Triângulo", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  "circulo-perimetro": { label: "Perímetro", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  "circulo-area": { label: "Área", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  "lado-circunferencia": { label: "Diâmetro", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
}

function ri(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }

function generate(): Exercise[] {
  const list: Exercise[] = []
  for (let i = 0; i < 2; i++) {
    list.push({ type: "poligono", lados: ri(3, 8) })
    const trianguloTipos: ("equilatero" | "isosceles" | "escaleno")[] = ["equilatero", "isosceles", "escaleno"]
    list.push({ type: "triangulo", tipo: trianguloTipos[ri(0, 2)] })
    const a = ri(40, 80)
    const b = ri(40, 80)
    list.push({ type: "angulo-triangulo", a, b })
    const raioPerimetro = ri(2, 8)
    list.push({ type: "circulo-perimetro", raio: raioPerimetro })
    const raioArea = ri(2, 8)
    list.push({ type: "circulo-area", raio: raioArea })
    const perimetroCircunferencia = ri(20, 60)
    list.push({ type: "lado-circunferencia", perimetro: perimetroCircunferencia })
  }
  return list.sort(() => Math.random() - 0.5)
}

function getNomePoligono(n: number): string {
  const nomes: Record<number, string> = {
    3: "Triângulo",
    4: "Quadrilátero",
    5: "Pentágono",
    6: "Hexágono",
    7: "Heptágono",
    8: "Octógono",
  }
  return nomes[n] || `Polígono com ${n} lados`
}

function getTriangleInfo(tipo: string): string {
  const info: Record<string, string> = {
    equilatero: "3 lados iguais",
    isosceles: "2 lados iguais",
    escaleno: "todos os lados diferentes",
  }
  return info[tipo] || tipo
}

function renderQuestion(ex: Exercise): React.ReactNode {
  const pi = 3.14
  switch (ex.type) {
    case "poligono": return <span className="font-mono text-2xl text-foreground">Qual é o nome do polígono com <strong>{ex.lados}</strong> lados?</span>
    case "triangulo": return <span className="font-mono text-2xl text-foreground">Qual é o triângulo que tem <strong>{getTriangleInfo(ex.tipo)}</strong>?</span>
    case "angulo-triangulo": return <span className="font-mono text-2xl text-foreground">Um triângulo tem ângulos de <strong>{ex.a}°</strong> e <strong>{ex.b}°</strong>. Quanto mede o terceiro?</span>
    case "circulo-perimetro": return <span className="font-mono text-2xl text-foreground">Qual é o perímetro de um círculo com raio <strong>{ex.raio} cm</strong>? (use π ≈ 3,14)</span>
    case "circulo-area": return <span className="font-mono text-2xl text-foreground">Qual é a área de um círculo com raio <strong>{ex.raio} cm</strong>? (use π ≈ 3,14)</span>
    case "lado-circunferencia": return <span className="font-mono text-2xl text-foreground">Uma circunferência mede <strong>{ex.perimetro} cm</strong>. Qual é o raio? (use π ≈ 3,14)</span>
  }
}

function renderAnswer(ex: Exercise): React.ReactNode {
  const pi = 3.14
  switch (ex.type) {
    case "poligono": return <p className="text-xl font-bold text-green-600 dark:text-green-400 font-mono">{getNomePoligono(ex.lados)}</p>
    case "triangulo": {
      const nomes: Record<string, string> = {
        equilatero: "Triângulo Equilátero",
        isosceles: "Triângulo Isósceles",
        escaleno: "Triângulo Escaleno",
      }
      return <p className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">{nomes[ex.tipo]}</p>
    }
    case "angulo-triangulo": {
      const terceiro = 180 - ex.a - ex.b
      return <p className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">{terceiro}°</p>
    }
    case "circulo-perimetro": {
      const resultado = (2 * ex.raio * pi).toFixed(2)
      return <div><p className="font-mono text-sm text-muted-foreground">P = 2 × π × {ex.raio} = 2 × 3,14 × {ex.raio}</p><p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 font-mono">≈ {resultado} cm</p></div>
    }
    case "circulo-area": {
      const resultado = (ex.raio * ex.raio * pi).toFixed(2)
      return <div><p className="font-mono text-sm text-muted-foreground">A = π × r² = 3,14 × {ex.raio}²</p><p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 font-mono">≈ {resultado} cm²</p></div>
    }
    case "lado-circunferencia": {
      const raio = (ex.perimetro / (2 * pi)).toFixed(2)
      return <div><p className="font-mono text-sm text-muted-foreground">P = 2 × π × r → {ex.perimetro} = 2 × 3,14 × r</p><p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 font-mono">r ≈ {raio} cm</p></div>
    }
  }
}

function getHint(ex: Exercise): string {
  switch (ex.type) {
    case "poligono": return `Os polígonos são nomeados pelo número de lados: tri (3), quad (4), penta (5), hexa (6), hepta (7), octo (8)`
    case "triangulo": return `Equilátero tem 3 lados iguais, Isósceles tem 2 iguais, Escaleno tem todos diferentes`
    case "angulo-triangulo": return `A soma dos 3 ângulos de qualquer triângulo é sempre 180°. Use: ânguloDesconhecido = 180 - ângulo1 - ângulo2`
    case "circulo-perimetro": return `O perímetro (comprimento) da circunferência é P = 2 × π × raio. Use π ≈ 3,14`
    case "circulo-area": return `A área do círculo é A = π × raio². Primeiro calcule raio × raio, depois multiplique por 3,14`
    case "lado-circunferencia": return `Se o perímetro é P = 2 × π × r, você pode descobrir o raio dividindo: r = P ÷ (2 × π)`
  }
}

const config: ExerciseSectionConfig<Exercise> = {
  generate, renderQuestion, renderAnswer, getHint,
  getMeta: (ex) => META[ex.type],
  headerDescription: "Pratique identify polígonos, triângulos, e cálculos com círculos",
}

export const Ano5FiguresExercisesSection = createExerciseSection(config)
