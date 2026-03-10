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
   2. Reta Numérica
   ================================================================ */
export function RetaNumerica() {
  const [n, setN] = useState("7")

  const num = parseInt(n)
  const root = !isNaN(num) && num > 0 ? Math.sqrt(num) : null
  const floor = root !== null ? Math.floor(root) : null
  const ceil = root !== null ? Math.ceil(root) : null

  return (
    <AnimateOnScroll>
      <section id="retanumerica">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={2} badgeColor={B2} title="Reta Numérica" subtitle="Posicionando √n entre inteiros consecutivos" />

          <FormulaBox highlight>
            Se k² &lt; n &lt; (k+1)²,&nbsp; então&nbsp; k &lt; √n &lt; k+1
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Posicionar √7 na reta</h3>
            <StepByStep steps={[
              { text: "2² = 4 e 3² = 9" },
              { text: "4 < 7 < 9" },
              { text: "Portanto: 2 < √7 < 3" },
              { text: "√7 ≈ 2,646 (mais próximo de 3)", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="√20 na reta"
              steps={["4² = 16 e 5² = 25", "16 < 20 < 25"]}
              conclusion="4 < √20 < 5  (≈ 4,472)"
            />
            <DetailedExampleCard
              title="√50 na reta"
              steps={["7² = 49 e 8² = 64", "49 < 50 < 64"]}
              conclusion="7 < √50 < 8  (≈ 7,071)"
            />
          </div>

          <CalcWrapper title="Posicionador na reta numérica">
            <NumInput label="n (posicionar √n)" value={n} onChange={setN} placeholder="7" />
            <div className="mt-3">
              {root !== null && floor !== null && ceil !== null && (
                <CalcResult>
                  {Number.isInteger(root) ? (
                    <p className="font-mono text-sm">√{num} = <strong className="text-accent text-base">{root}</strong> (inteiro exato)</p>
                  ) : (
                    <>
                      <p className="font-mono text-sm">{floor}² = {floor * floor}  e  {ceil}² = {ceil * ceil}</p>
                      <p className="font-mono text-sm">{floor * floor} &lt; {num} &lt; {ceil * ceil}</p>
                      <p className="font-mono text-sm font-bold text-accent">{floor} &lt; √{num} &lt; {ceil}  (≈ {parseFloat(root.toFixed(3))})</p>
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
   3. Conjuntos Numéricos
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
          <SectionHeader number={3} badgeColor={B1} title="Conjuntos Numéricos" subtitle="ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ" />

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</p>
              <p className="text-sm text-muted-foreground">ℕ: 0,1,2… | ℤ: …-1,0,1… | ℚ: frações | ℝ = ℚ ∪ Irracionais</p>
            </div>
          </FormulaBox>

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

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Diagrama dos conjuntos"
              steps={["ℝ contém todos os outros", "ℚ ∪ Irracionais = ℝ", "ℤ ⊂ ℚ: todo inteiro é racional"]}
              conclusion="ℕ ⊂ ℤ: todo natural é inteiro"
            />
            <DetailedExampleCard
              title="Exemplos por conjunto"
              steps={["ℕ: 0, 1, 5, 100", "ℤ \\ ℕ: -1, -7, -200", "ℚ \\ ℤ: 1/2, -3/4, 0,333…"]}
              conclusion="ℝ \\ ℚ: √2, √3, π, e"
            />
          </div>

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
          <SectionHeader number={4} badgeColor={B2} title="Potência Racional" subtitle="a^(m/n) = (ⁿ√a)ᵐ" />

          <FormulaBox highlight>
            a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ)
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Calcular 8^(2/3)</h3>
            <StepByStep steps={[
              { text: "8^(2/3) = (³√8)²" },
              { text: "³√8 = 2   (pois 2³ = 8)" },
              { text: "2² = 4" },
              { text: "8^(2/3) = 4", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="27^(2/3)"
              steps={["27^(2/3) = (³√27)²", "³√27 = 3", "3² = 9"]}
              conclusion="27^(2/3) = 9"
            />
            <DetailedExampleCard
              title="16^(3/4)"
              steps={["16^(3/4) = (⁴√16)³", "⁴√16 = 2", "2³ = 8"]}
              conclusion="16^(3/4) = 8"
            />
          </div>

          <CalcWrapper title="Calculadora de potência racional">
            <div className="flex flex-wrap items-end gap-3 mb-3">
              <NumInput label="Base (a)" value={base} onChange={setBase} placeholder="8" />
              <span className="text-muted-foreground pb-2">^(</span>
              <NumInput label="Num. (m)" value={num} onChange={setNum} placeholder="2" />
              <span className="text-muted-foreground pb-2">/</span>
              <NumInput label="Den. (n)" value={den} onChange={setDen} placeholder="3" />
              <span className="text-muted-foreground pb-2">)</span>
            </div>
            {result !== null && !isNaN(result) && (
              <CalcResult>
                <p className="font-mono text-sm">{base}^({m}/{n}) = ({n}√{base})^{m}</p>
                <p className="font-mono text-sm">{n}√{base} ≈ {parseFloat(Math.pow(a, 1 / n).toFixed(4))}</p>
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
   5. Simplificação de Radicais
   ================================================================ */
export function SimplificacaoRadicais() {
  const [val, setVal] = useState("75")

  const n = parseInt(val)
  const { outside, inside } = !isNaN(n) && n > 0 ? simplifyRadical(n) : { outside: 1, inside: n }
  const isSimple = outside === 1

  return (
    <AnimateOnScroll>
      <section id="radicais">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={5} badgeColor={B1} title="Simplificação de Radicais" subtitle="√12 = 2√3" />

          <FormulaBox>
            √(k² × m) = k√m &nbsp;&nbsp; (m sem fatores quadrados)
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Simplificar √75</h3>
            <StepByStep steps={[
              { text: "75 = 25 × 3" },
              { text: "√75 = √(25 × 3) = √25 × √3" },
              { text: "= 5√3", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="√200"
              steps={["200 = 100 × 2", "√200 = √100 × √2"]}
              conclusion="= 10√2"
            />
            <DetailedExampleCard
              title="√108"
              steps={["108 = 36 × 3", "√108 = √36 × √3"]}
              conclusion="= 6√3"
            />
          </div>

          <CalcWrapper title="Simplificador de radical">
            <NumInput label="Radicando" value={val} onChange={setVal} placeholder="75" />
            <div className="mt-3">
              {!isNaN(n) && n > 0 && (
                <CalcResult>
                  {isSimple ? (
                    <p className="font-mono text-sm">√{n} já está na forma mais simples</p>
                  ) : (
                    <>
                      <p className="font-mono text-sm">{n} = {outside * outside} × {inside}</p>
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
   6. Operações com Radicais Semelhantes
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
          <SectionHeader number={6} badgeColor={B2} title="Operações com Radicais" subtitle="Radicais semelhantes: mesmo radicando" />

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
          <SectionHeader number={7} badgeColor={B1} title="Teorema de Pitágoras" subtitle="c² = a² + b²" />

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
