"use client"

import { useState } from "react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  SectionBadge,
  FormulaBox,
  StepByStep,
  DetailedExampleCard,
  CalcWrapper,
  CalcInput,
  fmtResult,
  CalcResult,
  SectionHeader,
} from "@/components/shared/section-primitives"

/* ================================================================
   Shared badge colors for 5th grade (amber palette)
   ================================================================ */
const B1 = "bg-blue-500/20 text-blue-600 dark:text-blue-400"
const B2 = "bg-green-500/20 text-green-600 dark:text-green-400"
const B3 = "bg-purple-500/20 text-purple-600 dark:text-purple-400"
const B4 = "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"

/* ================================================================
   SEÇÃO 1 — Figuras Planas
   ================================================================ */
export function FigurasPlanas() {
  return (
    <section id="figuras-planas" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={1} badgeColor={B1} title="Figuras Planas" subtitle="Formas básicas da geometria" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            Figuras planas são formas que possuem apenas 2 dimensões: comprimento e largura
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">O que são figuras planas?</h3>
            <p className="text-foreground leading-relaxed">
              Figuras planas são desenhos que podemos fazer em um papel. Elas têm <strong className="text-blue-600 dark:text-blue-400">comprimento</strong> e <strong className="text-blue-600 dark:text-blue-400">largura</strong>, mas não têm profundidade. Exemplos: quadrado, triângulo, círculo, retângulo.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Tipos principais</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <DetailedExampleCard 
                  title="Polígonos" 
                  steps={["Figuras fechadas", "Feitas de retas", "Exemplo: triângulo, quadrado"]} 
                  conclusion="Têm lados, vértices e ângulos"
                />
                <svg width="100%" height="130" viewBox="0 0 150 130" className="fill-none stroke-blue-600 dark:stroke-blue-400">
                  <polygon points="30,100 75,20 120,100" strokeWidth="2"/>
                  <text x="75" y="125" fontSize="11" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400">Triângulo (Polígono)</text>
                </svg>
              </div>
              <div className="space-y-4">
                <DetailedExampleCard 
                  title="Círculo" 
                  steps={["Figura redonda", "Sem retas", "Feita por uma curva"]} 
                  conclusion="Todos os pontos à mesma distância"
                />
                <svg width="100%" height="130" viewBox="0 0 150 130" className="fill-none stroke-blue-600 dark:stroke-blue-400">
                  <circle cx="75" cy="60" r="45" strokeWidth="2"/>
                  <text x="75" y="115" fontSize="11" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400">Círculo</text>
                </svg>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Partes dos Polígonos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3 text-foreground">
                  <p><strong className="text-blue-600 dark:text-blue-400">Lado:</strong> cada reta que forma o polígono</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Vértice:</strong> ponto onde dois lados se encontram</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Ângulo:</strong> espaço entre dois lados que se encontram</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Diagonal:</strong> reta que liga dois vértices não próximos</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <svg width="150" height="150" viewBox="0 0 150 150" className="fill-none stroke-blue-600 dark:stroke-blue-400">
                  <polygon points="75,20 120,110 30,110" strokeWidth="2.5"/>
                  <circle cx="75" cy="20" r="4" fill="currentColor" className="text-blue-600 dark:text-blue-400"/>
                  <circle cx="120" cy="110" r="4" fill="currentColor" className="text-blue-600 dark:text-blue-400"/>
                  <circle cx="30" cy="110" r="4" fill="currentColor" className="text-blue-600 dark:text-blue-400"/>
                  <path d="M 88 32 A 15 15 0 0 0 62 32" strokeWidth="2" className="stroke-blue-600 dark:stroke-blue-400"/>
                  <text x="75" y="12" fontSize="10" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400">Vértice</text>
                  <text x="95" y="60" fontSize="11" className="fill-blue-600 dark:fill-blue-400">Lado</text>
                  <text x="75" y="42" fontSize="11" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400">Ângulo</text>
                </svg>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 2 — Polígonos
   ================================================================ */
export function Poligonos() {
  const [numLados, setNumLados] = useState(4)

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

  return (
    <section id="poligonos" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={2} badgeColor={B2} title="Polígonos" subtitle="Figuras fechadas com lados retos" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            Polígono = Figura fechada feita só de retas
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Classificação dos polígonos</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Os polígonos são nomeados de acordo com o <strong className="text-green-600 dark:text-green-400">número de lados</strong> que possuem.
            </p>
            <div className="space-y-2 text-foreground">
              <p><strong className="text-green-600 dark:text-green-400">Triângulo:</strong> 3 lados</p>
              <p><strong className="text-green-600 dark:text-green-400">Quadrilátero:</strong> 4 lados</p>
              <p><strong className="text-green-600 dark:text-green-400">Pentágono:</strong> 5 lados</p>
              <p><strong className="text-green-600 dark:text-green-400">Hexágono:</strong> 6 lados</p>
              <p><strong className="text-green-600 dark:text-green-400">Octógono:</strong> 8 lados</p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Polígonos regulares vs irregulares</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <DetailedExampleCard 
                  title="Regular" 
                  steps={["Todos os lados iguais", "Todos os ângulos iguais", "Exemplo: quadrado"]} 
                  conclusion="Forma perfeita e simétrica"
                />
                <svg width="100%" height="150" viewBox="0 0 200 150" className="fill-none stroke-green-600 dark:stroke-green-400">
                  <rect x="40" y="20" width="120" height="120" strokeWidth="2.5"/>
                  <circle cx="40" cy="20" r="3" fill="currentColor" className="text-green-600 dark:text-green-400"/>
                  <circle cx="160" cy="20" r="3" fill="currentColor" className="text-green-600 dark:text-green-400"/>
                  <circle cx="160" cy="140" r="3" fill="currentColor" className="text-green-600 dark:text-green-400"/>
                  <circle cx="40" cy="140" r="3" fill="currentColor" className="text-green-600 dark:text-green-400"/>
                  <line x1="55" y1="15" x2="65" y2="15" strokeWidth="2" className="stroke-green-600 dark:stroke-green-400"/>
                  <line x1="55" y1="145" x2="65" y2="145" strokeWidth="2" className="stroke-green-600 dark:stroke-green-400"/>
                  <line x1="35" y1="55" x2="35" y2="65" strokeWidth="2" className="stroke-green-600 dark:stroke-green-400"/>
                  <line x1="165" y1="55" x2="165" y2="65" strokeWidth="2" className="stroke-green-600 dark:stroke-green-400"/>
                  <text x="100" y="85" fontSize="12" textAnchor="middle" className="fill-green-600 dark:fill-green-400">Quadrado</text>
                  <text x="100" y="130" fontSize="11" textAnchor="middle" className="fill-muted-foreground">Todos os lados iguais</text>
                </svg>
              </div>
              <div className="space-y-4">
                <DetailedExampleCard 
                  title="Irregular" 
                  steps={["Ângulos diferentes", "Lados podem ser diferentes"]} 
                  conclusion="Não tem todos os ângulos iguais"
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número de lados</label>
                <input 
                  type="number" 
                  value={numLados} 
                  onChange={e => setNumLados(Math.max(3, Math.min(8, parseInt(e.target.value) || 3)))}
                  min="3" 
                  max="8"
                  className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>
            </div>
            <CalcResult>
              <div className="font-mono text-base text-center space-y-2">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{getNomePoligono(numLados)}</p>
                <p className="text-sm text-muted-foreground">{numLados} lados • {numLados} vértices • {numLados} ângulos</p>
                <p className="text-sm text-muted-foreground">Diagonais: {Math.round((numLados * (numLados - 3)) / 2)}</p>
              </div>
            </CalcResult>
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 3 — Triângulos
   ================================================================ */
export function Triangulos() {
  const [tipo, setTipo] = useState<"equilatero" | "isosceles" | "escaleno">("equilatero")

  function getTriangleInfo(t: string) {
    const info: Record<string, any> = {
      equilatero: {
        nome: "Equilátero",
        descricao: "Todos os 3 lados têm o mesmo tamanho",
        propriedade: "Todos os ângulos medem 60°",
        lados: "3 cm, 3 cm, 3 cm",
      },
      isosceles: {
        nome: "Isósceles",
        descricao: "2 lados têm o mesmo tamanho",
        propriedade: "2 ângulos são iguais",
        lados: "4 cm, 4 cm, 6 cm",
      },
      escaleno: {
        nome: "Escaleno",
        descricao: "Todos os 3 lados têm tamanhos diferentes",
        propriedade: "Todos os ângulos são diferentes",
        lados: "3 cm, 4 cm, 5 cm",
      },
    }
    return info[t]
  }

  const current = getTriangleInfo(tipo)

  return (
    <section id="triangulos" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={3} badgeColor={B3} title="Triângulos" subtitle="O polígono com 3 lados" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            Triângulo: Polígono com 3 lados, 3 vértices e 3 ângulos
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Propriedade fundamental</h3>
            <p className="text-foreground leading-relaxed font-bold text-purple-600 dark:text-purple-400">
              A soma de todos os ângulos de um triângulo sempre é 180°
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={404}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Tipos de triângulos (por lados)</h3>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <svg width="100%" height="140" viewBox="0 0 100 140" className="fill-none stroke-purple-600 dark:stroke-purple-400">
                  <polygon points="50,10 90,120 10,120" strokeWidth="2"/>
                  <text x="50" y="135" fontSize="11" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400">Equilátero</text>
                </svg>
                <svg width="100%" height="140" viewBox="0 0 100 140" className="fill-none stroke-purple-600 dark:stroke-purple-400">
                  <polygon points="50,10 85,120 15,120" strokeWidth="2"/>
                  <text x="50" y="135" fontSize="11" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400">Isósceles</text>
                </svg>
                <svg width="100%" height="140" viewBox="0 0 100 140" className="fill-none stroke-purple-600 dark:stroke-purple-400">
                  <polygon points="50,10 95,120 5,120" strokeWidth="2"/>
                  <text x="50" y="135" fontSize="11" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400">Escaleno</text>
                </svg>
              </div>
              {["equilatero", "isosceles", "escaleno"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t as any)}
                  className={`rounded-lg p-4 text-left transition-all border ${
                    tipo === t
                      ? "bg-purple-100 dark:bg-purple-900/20 border-purple-500"
                      : "bg-secondary/30 border-border hover:border-purple-500/50"
                  }`}
                >
                  <p className="font-bold text-purple-600 dark:text-purple-400">{getTriangleInfo(t).nome}</p>
                  <p className="text-sm text-muted-foreground">{getTriangleInfo(t).lados}</p>
                </button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">{current.nome}</h3>
            <div className="space-y-3 text-foreground">
              <p><strong>Descrição:</strong> {current.descricao}</p>
              <p><strong>Propriedade:</strong> {current.propriedade}</p>
              <p><strong>Exemplo de lados:</strong> {current.lados}</p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Tipos de triângulos (by ângulos)</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <DetailedExampleCard 
                title="Acutângulo" 
                steps={["Todos os ângulos < 90°", "Todos os ângulos agudos"]} 
                conclusion={"Triângulo pequenino"}
              />
              <DetailedExampleCard 
                title="Retângulo" 
                steps={["Um ângulo = 90°", "Um ângulo reto"]} 
                conclusion="Com um canto quadrado"
              />
              <DetailedExampleCard 
                title="Obtusângulo" 
                steps={["Um ângulo > 90°", "Um ângulo obtuso"]} 
                conclusion="Com um canto aberto"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 4 — Círculo e Circunferência
   ================================================================ */
export function CirculoCircunferencia() {
  const [raio, setRaio] = useState(5)
  const pi = 3.14159
  const area = (raio * raio * pi).toFixed(2)
  const perimetro = (2 * raio * pi).toFixed(2)

  return (
    <section id="circulo-circunferencia" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={4} badgeColor={B4} title="Círculo e Circunferência" subtitle="Figuras redondas perfeitas" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            Circunferência = a curva &nbsp;&nbsp; | &nbsp;&nbsp; Círculo = tudo por dentro
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Qual é a diferença?</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-yellow-600 dark:text-yellow-400">Circunferência</p>
                <p className="text-foreground text-sm">É a linha (curva) que forma a borda do círculo. É o contorno!</p>
              </div>
              <div>
                <p className="font-bold text-yellow-600 dark:text-yellow-400">Círculo</p>
                <p className="text-foreground text-sm">É toda a região de dentro, incluindo a borda. É a área preenchida!</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={404}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Partes do círculo</h3>
              <div className="rounded-xl bg-secondary/30 p-6 space-y-4 text-foreground">
                <p><strong className="text-yellow-600 dark:text-yellow-400">Centro:</strong> ponto no meio do círculo</p>
                <p><strong className="text-yellow-600 dark:text-yellow-400">Raio (r):</strong> linha do centro até a borda</p>
                <p><strong className="text-yellow-600 dark:text-yellow-400">Diâmetro (d):</strong> linha que passa pelo centro (d = 2r)</p>
                <p><strong className="text-yellow-600 dark:text-yellow-400">Pi (π):</strong> aproximadamente 3,14159</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" className="fill-none stroke-yellow-600 dark:stroke-yellow-400">
                {/* Círculo */}
                <circle cx="100" cy="100" r="70" strokeWidth="2"/>
                {/* Centro */}
                <circle cx="100" cy="100" r="3" fill="currentColor" className="text-yellow-600 dark:text-yellow-400"/>
                {/* Raio */}
                <line x1="100" y1="100" x2="100" y2="30" strokeWidth="2" className="stroke-yellow-600 dark:stroke-yellow-400"/>
                <text x="115" y="65" fontSize="12" className="fill-yellow-600 dark:fill-yellow-400">Raio</text>
                {/* Diâmetro */}
                <line x1="30" y1="100" x2="170" y2="100" strokeWidth="2" className="stroke-yellow-600 dark:stroke-yellow-400" strokeDasharray="4,4"/>
                <text x="100" y="125" fontSize="12" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-400">Diâmetro</text>
              </svg>
            </div>
          </div>
        </AnimateOnScroll>


      </div>
    </section>
  )
}
