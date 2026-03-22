"use client"

import { useState } from "react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  FormulaBox,
  StepByStep,
  DetailedExampleCard,
  CalcWrapper,
  CalcResult,
  SectionHeader,
} from "@/components/shared/section-primitives"

const B1 = "bg-chart-5/20 text-chart-5"
const B2 = "bg-primary/20 text-primary"

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

function primeFactorization(n: number): { factors: number[]; text: string } {
  const factors: number[] = []
  let temp = n
  let divisor = 2
  
  while (divisor * divisor <= temp) {
    while (temp % divisor === 0) {
      factors.push(divisor)
      temp /= divisor
    }
    divisor++
  }
  
  if (temp > 1) {
    factors.push(temp)
  }
  
  const factorCount: Record<number, number> = {}
  factors.forEach(f => {
    factorCount[f] = (factorCount[f] || 0) + 1
  })
  
  const text = Object.entries(factorCount)
    .map(([prime, count]) => count > 1 ? `${prime}<sup>${count}</sup>` : prime)
    .join(" × ")
  
  return { factors, text }
}

function NumInput({ label, value, onChange, placeholder, step }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; step?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        step={step}
        className="w-24 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  )
}

/* ================================================================
   1. Números Irracionais
   ================================================================ */
export function NumerosIrracionais() {
  const [n, setN] = useState("2")

  const num = parseInt(n)
  const root = !isNaN(num) && num > 0 ? Math.sqrt(num) : null
  const isExact = root !== null && Number.isInteger(root)

  return (
    <AnimateOnScroll>
      <section id="irracionais">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={1} badgeColor={B1} title="Números Irracionais" subtitle="√2, √3, π — infinitos e não periódicos" />

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p>Irracional: decimal infinito e não periódico</p>
              <p className="text-sm text-muted-foreground">√2 = 1,41421356… &nbsp;|&nbsp; π = 3,14159265…</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Como identificar um irracional</h3>
            <StepByStep steps={[
              { text: "Calcule a raiz quadrada do número" },
              { text: "Se for inteiro → é racional (quadrado perfeito)" },
              { text: "Se for decimal infinito sem padrão → irracional" },
              { text: "Ex: √4 = 2 (racional) | √5 = 2,2360679… (irracional)", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Irracionais famosos"
              steps={["√2 = 1,41421356…", "√3 = 1,73205080…", "π = 3,14159265…"]}
              conclusion="e = 2,71828182…"
            />
            <DetailedExampleCard
              title="Racionais vs Irracionais"
              steps={["√9 = 3 → racional (3 = 3/1)", "1/3 = 0,333… → racional (periódico)", "√7 = 2,6457… → irracional"]}
              conclusion="0,1010010001… → irracional"
            />
          </div>

          <CalcWrapper title="Verificador de irracional">
            <NumInput label="n (calcular √n)" value={n} onChange={setN} placeholder="2" />
            <div className="mt-3">
              {root !== null && (
                <CalcResult>
                  <p className="font-mono text-sm">√{num} = {parseFloat(root.toFixed(6))}{isExact ? "" : "…"}</p>
                  <p className={`text-sm font-semibold ${isExact ? "text-primary" : "text-chart-5"}`}>
                    {isExact ? `√${num} = ${root} → RACIONAL (inteiro)` : `√${num} é IRRACIONAL`}
                  </p>
                </CalcResult>
              )}
            </div>
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   2. Conjuntos Numéricos
   ================================================================ */
export function ConjuntosNumericos() {
  const [val, setVal] = useState("5")

  const n = parseFloat(val)
  let conjunto = ""
  let explicacao = ""
  if (!isNaN(n)) {
    if (Number.isInteger(n) && n >= 0) {
      conjunto = "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ"
      explicacao = `${val} é natural → pertence a ℕ, ℤ, ℚ e ℝ`
    } else if (Number.isInteger(n)) {
      conjunto = "ℤ ⊂ ℚ ⊂ ℝ"
      explicacao = `${val} é inteiro negativo → pertence a ℤ, ℚ e ℝ`
    } else {
      conjunto = "ℚ ⊂ ℝ"
      explicacao = `${val} é decimal finito → racional, pertence a ℚ e ℝ`
    }
  }

  return (
    <AnimateOnScroll>
      <section id="conjuntos">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={2} badgeColor={B1} title="Conjuntos Numéricos" subtitle="ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ" />

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</p>
              <p className="text-sm text-muted-foreground">ℕ: 0,1,2… | ℤ: …-1,0,1… | ℚ: frações | ℝ = ℚ ∪ Irracionais</p>
            </div>
          </FormulaBox>

          <div className="flex justify-center">
            <svg viewBox="0 0 500 320" className="w-full max-w-md h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* ℝ - Números Reais (retângulo maior) */}
              <rect x="20" y="30" width="460" height="270" fill="rgba(59, 130, 246, 0.05)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
              <text x="460" y="55" fontSize="20" fontWeight="bold" fill="rgb(59, 130, 246)">ℝ</text>
              
              {/* Lado esquerdo: ℚ com ℤ e ℕ aninhados */}
              {/* ℚ - Números Racionais (círculo esquerdo) */}
              <circle cx="140" cy="150" r="110" fill="rgba(34, 197, 94, 0.1)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <text x="70" y="270" fontSize="18" fontWeight="bold" fill="rgb(34, 197, 94)">ℚ</text>
              
              {/* ℤ - Números Inteiros (círculo médio) */}
              <circle cx="140" cy="150" r="85" fill="rgba(249, 115, 22, 0.1)" stroke="rgb(249, 115, 22)" strokeWidth="2" />
              <text x="215" y="160" fontSize="18" fontWeight="bold" fill="rgb(249, 115, 22)" textAnchor="middle">ℤ</text>
              
              {/* ℕ - Números Naturais (círculo pequeno) */}
              <circle cx="140" cy="150" r="55" fill="rgba(168, 85, 247, 0.1)" stroke="rgb(168, 85, 247)" strokeWidth="2" />
              <text x="130" y="160" fontSize="18" fontWeight="bold" fill="rgb(168, 85, 247)" textAnchor="middle">ℕ</text>
              
              {/* Lado direito: Irracionais (separado de ℚ mas dentro de ℝ) */}
              <circle cx="360" cy="150" r="90" fill="rgba(239, 68, 68, 0.1)" stroke="rgb(239, 68, 68)" strokeWidth="2" />
              <text x="360" y="160" fontSize="16" fontWeight="bold" fill="rgb(239, 68, 68)" textAnchor="middle">Irracionais</text>
              <text x="360" y="180" fontSize="10" fill="rgb(239, 68, 68)" textAnchor="middle">(√2, π, e)</text>
            </svg>
          </div>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: "rgb(168, 85, 247)"}}></span> ℕ = Naturais: 0, 1, 2, 3, ...</p>
            <p className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: "rgb(249, 115, 22)"}}></span> ℤ = Inteiros: ..., -2, -1, 0, 1, 2, ...</p>
            <p className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: "rgb(34, 197, 94)"}}></span> ℚ = Racionais: frações p/q</p>
            <p className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: "rgb(59, 130, 246)"}}></span> ℝ = Reais: ℚ + Irracionais (√2, π, e, ...)</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Classificar −3/4</h3>
            <StepByStep steps={[
              { text: "-3/4 = -0,75 (decimal finito)" },
              { text: "Não é natural (negativo)" },
              { text: "Não é inteiro (tem parte decimal)" },
              { text: "É racional: pode ser escrito como p/q" },
              { text: "-3/4 ∈ ℚ ⊂ ℝ", highlight: true },
            ]} />
          </div>

          <DetailedExampleCard
            title="Diagrama dos conjuntos"
            steps={["ℝ contém todos os outros", "ℚ ∪ Irracionais = ℝ", "ℤ ⊂ ℚ: todo inteiro é racional"]}
            conclusion="ℕ ⊂ ℤ: todo natural é inteiro"
          />

          <CalcWrapper title="Classificador de número">
            <div className="flex flex-col gap-1.5 mb-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número</label>
              <input
                type="number"
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="ex: -3 ou 2.5"
                step="0.5"
                className="w-36 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            {conjunto && (
              <CalcResult>
                <p className="font-mono text-sm">{explicacao}</p>
                <p className="font-mono text-sm font-bold text-accent">{conjunto}</p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   4. Potência Racional
   ================================================================ */
export function PotenciaRacional() {
  const [base, setBase] = useState("8")
  const [num, setNum] = useState("2")
  const [den, setDen] = useState("3")

  const a = parseFloat(base)
  const m = parseInt(num)
  const n = parseInt(den)
  const result = !isNaN(a) && !isNaN(m) && !isNaN(n) && n !== 0
    ? Math.pow(Math.pow(a, 1 / n), m)
    : null

  return (
    <AnimateOnScroll>
      <section id="potenciaracional">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={3} badgeColor={B2} title="Potência Racional" subtitle="a<sup>(m/n)</sup> = <sup>n</sup>√(a<sup>m</sup>) = (<sup>n</sup>√a)<sup>m</sup>" />

          <FormulaBox highlight>
            <div className="text-left text-base space-y-1">
              <p>a<sup>(m/n)</sup> = <sup>n</sup>√(a<sup>m</sup>) = (<sup>n</sup>√a)<sup>m</sup></p>
              <p className="text-sm text-muted-foreground">O denominador é o índice da raiz, o numerador é a potência</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Calcular 8<sup>(2/3)</sup></h3>
            <StepByStep steps={[
              { text: "Usar a fórmula 8<sup>(2/3)</sup> = (<sup>3</sup>√8)<sup>2</sup>" },
              { text: "Calcular a raiz cúbica <sup>3</sup>√8 = 2 (porque 2 × 2 × 2 = 8)" },
              { text: "Elevar ao quadrado 2² = 2 × 2 = 4" },
              { text: "8<sup>(2/3)</sup> = 4", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="27<sup>(2/3)</sup>"
              steps={["Aplicar fórmula: (<sup>3</sup>√27)<sup>2</sup>", "Calcular raiz: <sup>3</sup>√27 = 3", "Elevar ao quadrado: 3² = 9"]}
              conclusion="27<sup>(2/3)</sup> = 9"
            />
            <DetailedExampleCard
              title="16<sup>(3/4)</sup>"
              steps={["Aplicar fórmula: (<sup>4</sup>√16)<sup>3</sup>", "Calcular raiz: <sup>4</sup>√16 = 2", "Elevar ao cubo: 2³ = 8"]}
              conclusion="16<sup>(3/4)</sup> = 8"
            />
          </div>

          <CalcWrapper title="Calculadora de potência racional">
            <div className="flex flex-wrap items-end gap-3 mb-3">
              <NumInput label="Base (a)" value={base} onChange={setBase} placeholder="8" />
              <span className="text-muted-foreground pb-2"> elevado a (</span>
              <NumInput label="Num. (m)" value={num} onChange={setNum} placeholder="2" />
              <span className="text-muted-foreground pb-2">/</span>
              <NumInput label="Den. (n)" value={den} onChange={setDen} placeholder="3" />
              <span className="text-muted-foreground pb-2">)</span>
            </div>
            {result !== null && !isNaN(result) && (
              <CalcResult>
                <p className="font-mono text-sm">{base}<sup>({m}/{n})</sup> = (<sup>{n}</sup>√{base})<sup>{m}</sup></p>
                <p className="font-mono text-sm"><sup>{n}</sup>√{base} ≈ {parseFloat(Math.pow(a, 1 / n).toFixed(4))}</p>
                <p className="font-mono text-sm font-bold text-accent">= {parseFloat(result.toFixed(6))}</p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   4. Simplificação de Radicais
   ================================================================ */
export function SimplificacaoRadicais() {
  const [val, setVal] = useState("75")

  const n = parseInt(val)
  const { outside, inside } = !isNaN(n) && n > 0 ? simplifyRadical(n) : { outside: 1, inside: n }
  const { text: factorText } = !isNaN(n) && n > 0 ? primeFactorization(n) : { text: "" }
  const isSimple = outside === 1

  return (
    <AnimateOnScroll>
      <section id="radicais">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={4} badgeColor={B1} title="Simplificação de Radicais" subtitle="√12 = 2√3" />

          <FormulaBox>
            √(k² × m) = k√m &nbsp;&nbsp; (m sem fatores quadrados)
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Simplificar √75 (por fatoração de primos)</h3>
            <StepByStep steps={[
              { text: "75 = 3 × 5²  (fatoração em primos: 3 × 5²)" },
              { text: "√75 = √(3 × 5²)" },
              { text: "√75 = √(5²) × √3" },
              { text: "= 5√3", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="√200"
              steps={["200 = 2³ × 5² (fatoração: 2³ × 5²)", "√200 = 10√2"]}
              conclusion="Extraia os pares"
            />
            <DetailedExampleCard
              title="√108"
              steps={["108 = 2² × 3³ (fatoração: 2² × 3³)", "√108 = 6√3"]}
              conclusion="Extraia os quadrados"
            />
          </div>

          <CalcWrapper title="Simplificador de radical (com fatoração)">
            <NumInput label="Radicando" value={val} onChange={setVal} placeholder="75" />
            <div className="mt-3">
              {!isNaN(n) && n > 0 && (
                <CalcResult>
                  {isSimple ? (
                    <>
                      <p className="font-mono text-sm">√{n} já está na forma mais simples</p>
                      <p className="font-mono text-sm text-muted-foreground text-xs mt-2">Fatoração: {factorText}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-mono text-sm text-muted-foreground mb-2">Fatoração: {factorText}</p>
                      <p className="font-mono text-sm">{n} = {outside}² × {inside}</p>
                      <p className="font-mono text-sm">√{n} = <strong className="text-accent text-base">{outside}√{inside}</strong></p>
                    </>
                  )}
                </CalcResult>
              )}
            </div>
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   5. Operações com Radicais Semelhantes
   ================================================================ */
export function OperacoesRadicais() {
  const [c1, setC1] = useState("3")
  const [c2, setC2] = useState("5")
  const [rad, setRad] = useState("2")
  const [op, setOp] = useState<"add" | "sub">("add")

  const coef1 = parseFloat(c1)
  const coef2 = parseFloat(c2)
  const r = parseInt(rad)

  const result = !isNaN(coef1) && !isNaN(coef2) && !isNaN(r) && r > 0
    ? (op === "add" ? coef1 + coef2 : coef1 - coef2)
    : null

  return (
    <AnimateOnScroll>
      <section id="operacoesradicais">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={5} badgeColor={B2} title="Operações com Radicais" subtitle="Radicais semelhantes: mesmo radicando" />

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p>a√n ± b√n = (a ± b)√n</p>
              <p className="text-sm text-muted-foreground">Radicais diferentes não se somam diretamente — simplifique primeiro</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Calcular 3√2 + 5√2</h3>
            <StepByStep steps={[
              { text: "Ambos têm o mesmo radicando: √2" },
              { text: "Some apenas os coeficientes: 3 + 5 = 8" },
              { text: "3√2 + 5√2 = 8√2", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="√8 + √18 (simplificar antes)"
              steps={["√8 = 2√2  e  √18 = 3√2"]}
              conclusion="2√2 + 3√2 = 5√2"
            />
            <DetailedExampleCard
              title="Racionalização"
              steps={["1/√2 = ?", "Multiplique por √2/√2", "(1×√2)/(√2×√2) = √2/2"]}
              conclusion="1/√2 = √2/2"
            />
          </div>

          <CalcWrapper title="Calculadora de radicais semelhantes">
            <div className="flex gap-2 mb-3">
              <button onClick={() => setOp("add")} className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "add" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Adição</button>
              <button onClick={() => setOp("sub")} className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "sub" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Subtração</button>
            </div>
            <div className="flex flex-wrap items-end gap-3 mb-3">
              <NumInput label="Coef 1" value={c1} onChange={setC1} placeholder="3" />
              <span className="text-muted-foreground pb-2 text-sm">√</span>
              <NumInput label="Radicando" value={rad} onChange={setRad} placeholder="2" />
              <span className="text-muted-foreground pb-2 text-lg font-bold">{op === "add" ? "+" : "−"}</span>
              <NumInput label="Coef 2" value={c2} onChange={setC2} placeholder="5" />
              <span className="text-muted-foreground pb-2 text-sm">√{rad}</span>
            </div>
            {result !== null && (
              <CalcResult>
                <p className="font-mono text-sm">{c1}√{r} {op === "add" ? "+" : "−"} {c2}√{r} = ({c1} {op === "add" ? "+" : "−"} {c2})√{r}</p>
                <p className="font-mono text-sm font-bold text-accent">= {result}√{r}</p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   7. Teorema de Pitágoras
   ================================================================ */
export function TeoremaPitagoras() {
  const [a, setA] = useState("3")
  const [b, setB] = useState("4")

  const av = parseFloat(a)
  const bv = parseFloat(b)
  const c2 = !isNaN(av) && !isNaN(bv) ? av * av + bv * bv : null
  const c = c2 !== null ? Math.sqrt(c2) : null
  const cExact = c !== null && Number.isInteger(c)
  const { outside, inside } = c2 !== null ? simplifyRadical(c2) : { outside: 1, inside: 0 }

  return (
    <AnimateOnScroll>
      <section id="pitagoras">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={6} badgeColor={B1} title="Teorema de Pitágoras" subtitle="c² = a² + b²" />

          <FormulaBox highlight>
            c² = a² + b² &nbsp;&nbsp; → &nbsp;&nbsp; c = √(a² + b²)
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Triângulo 5, 12, 13</h3>
            <StepByStep steps={[
              { text: "c² = 5² + 12²" },
              { text: "c² = 25 + 144 = 169" },
              { text: "c = √169 = 13" },
              { text: "Verificação: 25 + 144 = 169 ✓ (ternário pitagórico)", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Ternários pitagóricos"
              steps={["3, 4, 5 → 9 + 16 = 25 ✓", "5, 12, 13 → 25 + 144 = 169 ✓"]}
              conclusion="8, 15, 17 → 64 + 225 = 289 ✓"
            />
            <DetailedExampleCard
              title="Resultado irracional"
              steps={["Catetos 1 e 1:", "c² = 1 + 1 = 2"]}
              conclusion="c = √2 ≈ 1,414 (irracional)"
            />
          </div>

          <CalcWrapper title="Calculadora de Pitágoras">
            <div className="flex flex-wrap items-end gap-4 mb-3">
              <NumInput label="Cateto a" value={a} onChange={setA} placeholder="3" />
              <NumInput label="Cateto b" value={b} onChange={setB} placeholder="4" />
            </div>
            {c !== null && c2 !== null && (
              <CalcResult>
                <p className="font-mono text-sm">c² = {av}² + {bv}² = {av * av} + {bv * bv} = {c2}</p>
                <p className="font-mono text-sm font-bold text-accent">
                  c = {cExact ? c : outside > 1 ? `${outside}√${inside} ≈ ${parseFloat(c.toFixed(4))}` : `√${c2} ≈ ${parseFloat(c.toFixed(4))}`}
                </p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}
