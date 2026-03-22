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

const B1 = "bg-accent/20 text-accent"
const B2 = "bg-primary/20 text-primary"

/* ================================================================
   Helpers
   ================================================================ */
function toSciNode(n: number): React.ReactNode {
  if (n === 0) return "0"
  const exp = Math.floor(Math.log10(Math.abs(n)))
  const coef = n / Math.pow(10, exp)
  return <>{parseFloat(coef.toPrecision(4))} × 10<sup>{exp}</sup></>
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
   1. Potenciação com base negativa
   ================================================================ */
export function PotenciacaoBaseNegativa() {
  const [base, setBase] = useState("-2")
  const [exp, setExp] = useState("3")

  const b = parseFloat(base)
  const e = parseInt(exp)
  const result = isNaN(b) || isNaN(e) ? null : Math.pow(b, e)
  const isEven = !isNaN(e) && e % 2 === 0

  return (
    <AnimateOnScroll>
      <section id="potenciacao">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={1} badgeColor={B1} title="Potenciação" subtitle="Base negativa e sinal do resultado" />

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p>(-a)ⁿ: sinal depende da paridade do expoente</p>
              <p className="text-sm text-muted-foreground">Par → positivo &nbsp;|&nbsp; Ímpar → negativo</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Regra do sinal — passo a passo</h3>
            <StepByStep steps={[
              { text: "(-2)³ = (-2) × (-2) × (-2)" },
              { text: "= (+4) × (-2)   [dois negativos = positivo]" },
              { text: "= -8             [positivo × negativo = negativo]" },
              { text: "Expoente ímpar → resultado negativo", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="(-3)⁴ — expoente par"
              steps={["(-3)⁴ = (-3)×(-3)×(-3)×(-3)", "= 9 × 9 = 81"]}
              conclusion="Expoente par → resultado positivo ✓"
            />
            <DetailedExampleCard
              title="(-2)⁵ — expoente ímpar"
              steps={["(-2)⁵ = 4 × 4 × (-2)", "= 16 × (-2) = -32"]}
              conclusion="Expoente ímpar → resultado negativo ✓"
            />
          </div>

          <CalcWrapper title="Calculadora — base negativa">
            <div className="flex flex-wrap items-end gap-4 mb-4">
              <NumInput label="Base" value={base} onChange={setBase} placeholder="-2" />
              <NumInput label="Expoente" value={exp} onChange={setExp} placeholder="3" />
            </div>
            {result !== null && (
              <CalcResult>
                <p className="font-mono text-sm">({base})<sup>{e}</sup> = <strong className="text-accent text-base">{result}</strong></p>
                <p className="text-sm text-muted-foreground">Expoente {isEven ? "par" : "ímpar"} → resultado {result > 0 ? "positivo" : result < 0 ? "negativo" : "zero"}</p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   2. Raiz Quadrada
   ================================================================ */
export function RadiciacaoRaizQuadrada() {
  const [val, setVal] = useState("49")

  const n = parseFloat(val)
  const root = isNaN(n) || n < 0 ? null : Math.sqrt(n)
  const isExact = root !== null && Number.isInteger(root)

  return (
    <AnimateOnScroll>
      <section id="raizquadrada">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={2} badgeColor={B2} title="Raiz Quadrada" subtitle="√a = b  ↔  b² = a" />

          <FormulaBox highlight>
            √a = b  ↔  b² = a &nbsp;&nbsp; (a ≥ 0)
          </FormulaBox>
          
          <div className="grid md:grid-cols-1 gap-6">
            <DetailedExampleCard
              title="√100 — quadrado perfeito"
              steps={["√100 = 10", "Verificação: 10² = 100 ✓"]}
              conclusion="Resultado exato"
            />
          </div>

          <CalcWrapper title="Calculadora de raiz quadrada">
            <NumInput label="Radicando" value={val} onChange={setVal} placeholder="49" />
            <div className="mt-3">
              {!isNaN(n) && n < 0 && <p className="text-sm text-destructive">Raiz de número negativo não é real.</p>}
              {root !== null && (
                <CalcResult>
                  {isExact ? (
                    <>
                      <p className="font-mono text-sm">√{n} = <strong className="text-accent text-base">{root}</strong></p>
                      <p className="text-sm text-muted-foreground">Verificação: {root}² = {root * root} ✓</p>
                    </>
                  ) : (
                    <p className="text-sm text-destructive">O número {n} não é um quadrado perfeito. Tente outro número.</p>
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
   3. Raiz Cúbica
   ================================================================ */
export function RadiciacaoRaizCubica() {
  const [val, setVal] = useState("27")

  const n = parseFloat(val)
  const root = isNaN(n) ? null : Math.cbrt(n)
  const rounded = root !== null ? Math.round(root) : null
  const isExact = rounded !== null && root !== null && Math.abs(Math.pow(rounded, 3) - n) < 0.0001

  return (
    <AnimateOnScroll>
      <section id="raizcubica">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={3} badgeColor={B1} title="Raiz Cúbica" subtitle="∛a = b  ↔  b³ = a" />

          <FormulaBox>
            ∛a = b  ↔  b³ = a &nbsp;&nbsp; (existe para negativos!)
          </FormulaBox>

          <div className="grid md:grid-cols-1 gap-6">
            <DetailedExampleCard
              title="∛64 — cubo perfeito"
              steps={["∛64 = 4", "Verificação: 4³ = 64 ✓"]}
              conclusion="Resultado exato"
            />
          </div>

          <CalcWrapper title="Calculadora de raiz cúbica">
            <NumInput label="Radicando" value={val} onChange={setVal} placeholder="27" />
            <div className="mt-3">
              {root !== null && rounded !== null && (
                <CalcResult>
                  {isExact ? (
                    <>
                      <p className="font-mono text-sm">∛{n} = <strong className="text-accent text-base">{rounded}</strong></p>
                      <p className="text-sm text-muted-foreground">Verificação: {rounded}³ = {Math.pow(rounded, 3)} ✓</p>
                    </>
                  ) : (
                    <p className="text-sm text-destructive">O número {n} não é um cubo perfeito. Tente outro número.</p>
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
   5. Notação Científica
   ================================================================ */
export function NotacaoCientifica() {
  const [val, setVal] = useState("6400000")
  const [mode, setMode] = useState<"toSci" | "fromSci">("toSci")
  const [coef, setCoef] = useState("6.4")
  const [exp10, setExp10] = useState("6")

  const n = parseFloat(val)
  const sciResult = !isNaN(n) && n !== 0 ? toSciNode(n) : null

  const c = parseFloat(coef)
  const e = parseInt(exp10)
  const fromSciResult = !isNaN(c) && !isNaN(e) ? c * Math.pow(10, e) : null

  function fmtLarge(x: number): string {
    if (!isFinite(x)) return "∞"
    if (Math.abs(x) > 1e12) return x.toExponential(4)
    return parseFloat(x.toPrecision(10)).toString()
  }

  return (
    <AnimateOnScroll>
      <section id="notacaocientifica">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={5} badgeColor={B1} title="Notação Científica" subtitle="a × 10ⁿ onde 1 ≤ |a| < 10" />

          <FormulaBox highlight>
            N = a × 10ⁿ &nbsp;&nbsp; com 1 ≤ |a| &lt; 10
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Converter 0,0000034 para NC</h3>
            <StepByStep steps={[
              { text: "Mova a vírgula até 1 dígito não-zero antes dela" },
              { text: "0,0000034 → 3,4  (movemos 6 casas para a direita)" },
              { text: "Mover para a direita → expoente negativo" },
              { text: "0,0000034 = 3,4 × 10⁻⁶", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="6.400.000 → NC"
              steps={["Mova vírgula 6 casas para a esquerda"]}
              conclusion="6.400.000 = 6,4 × 10⁶"
            />
            <DetailedExampleCard
              title="NC → número"
              steps={["2,5 × 10³ = 2,5 × 1.000"]}
              conclusion="= 2.500"
            />
          </div>

          <CalcWrapper title="Conversor de Notação Científica">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setMode("toSci")} className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${mode === "toSci" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                Número → NC
              </button>
              <button onClick={() => setMode("fromSci")} className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${mode === "fromSci" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                NC → Número
              </button>
            </div>
            {mode === "toSci" ? (
              <>
                <div className="flex flex-col gap-1.5 mb-3">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número</label>
                  <input type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="6400000" className="w-40 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                </div>
                {sciResult && (
                  <CalcResult>
                    <p className="font-mono text-sm">{val} = <strong className="text-accent text-base">{sciResult}</strong></p>
                  </CalcResult>
                )}
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-end gap-4 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Coef. (a)</label>
                    <input type="number" value={coef} onChange={ev => setCoef(ev.target.value)} placeholder="6.4" step="0.1" className="w-24 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>
                  <span className="text-muted-foreground pb-2">× 10 elevado a</span>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Exp. (n)</label>
                    <input type="number" value={exp10} onChange={ev => setExp10(ev.target.value)} placeholder="6" className="w-20 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>
                </div>
                {fromSciResult !== null && (
                  <CalcResult>
                    <p className="font-mono text-sm">{coef} × 10<sup>{e}</sup> = <strong className="text-accent text-base">{fmtLarge(fromSciResult)}</strong></p>
                  </CalcResult>
                )}
              </>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   6. Operações com Notação Científica
   ================================================================ */
export function OperacoesNC() {
  const [a1, setA1] = useState("3.2")
  const [e1, setE1] = useState("5")
  const [a2, setA2] = useState("2.0")
  const [e2, setE2] = useState("3")
  const [op, setOp] = useState<"mult" | "div">("mult")

  const coef1 = parseFloat(a1)
  const exp1 = parseInt(e1)
  const coef2 = parseFloat(a2)
  const exp2 = parseInt(e2)

  const valid = [coef1, exp1, coef2, exp2].every((v) => !isNaN(v))
  let result: React.ReactNode = null
  if (valid) {
    if (op === "mult") {
      result = toSciNode(coef1 * coef2 * Math.pow(10, exp1 + exp2))
    } else if (coef2 !== 0) {
      result = toSciNode((coef1 / coef2) * Math.pow(10, exp1 - exp2))
    }
  }

  return (
    <AnimateOnScroll>
      <section id="operacoesnc">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader number={6} badgeColor={B2} title="Operações em Notação Científica" subtitle="Multiplicação e divisão com potências de 10" />

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p>(a × 10ᵐ) × (b × 10ⁿ) = (a×b) × 10ᵐ⁺ⁿ</p>
              <p className="text-sm text-muted-foreground">(a × 10ᵐ) ÷ (b × 10ⁿ) = (a÷b) × 10ᵐ⁻ⁿ</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">(4 × 10³) × (2 × 10²)</h3>
            <StepByStep steps={[
              { text: "Multiplicar coeficientes: 4 × 2 = 8" },
              { text: "Somar expoentes: 10⁽³⁺²⁾ = 10⁵" },
              { text: "Resultado: 8 × 10⁵ = 800.000", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Divisão em NC"
              steps={["(9 × 10⁶) ÷ (3 × 10²)", "= (9÷3) × 10⁽⁶⁻²⁾"]}
              conclusion="= 3 × 10⁴ = 30.000"
            />
            <DetailedExampleCard
              title="Ajuste do coeficiente"
              steps={["(5 × 10³) × (4 × 10²) = 20 × 10⁵", "20 ∉ NC → 2 × 10¹ × 10⁵"]}
              conclusion="= 2 × 10⁶"
            />
          </div>

          <CalcWrapper title="Calculadora de Operações com NC">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setOp("mult")} className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "mult" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Multiplicação</button>
              <button onClick={() => setOp("div")} className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "div" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Divisão</button>
            </div>
            <div className="flex flex-wrap items-end gap-3 mb-3">
              <NumInput label="a₁" value={a1} onChange={setA1} placeholder="3.2" step="0.1" />
              <span className="text-muted-foreground pb-2 text-sm">× 10 elevado a</span>
              <NumInput label="n₁" value={e1} onChange={setE1} placeholder="5" />
              <span className="text-muted-foreground pb-2 text-lg font-bold">{op === "mult" ? "×" : "÷"}</span>
              <NumInput label="a₂" value={a2} onChange={setA2} placeholder="2.0" step="0.1" />
              <span className="text-muted-foreground pb-2 text-sm">× 10 elevado a</span>
              <NumInput label="n₂" value={e2} onChange={setE2} placeholder="3" />
            </div>
            {valid && result && (
              <CalcResult>
                <p className="font-mono text-sm">
                  {op === "mult"
                    ? `Coef: ${coef1} × ${coef2} = ${coef1 * coef2} | Exp: ${exp1} + ${exp2} = ${exp1 + exp2}`
                    : `Coef: ${coef1} ÷ ${coef2} = ${parseFloat((coef1 / coef2).toPrecision(4))} | Exp: ${exp1} − ${exp2} = ${exp1 - exp2}`}\
                </p>
                <p className="font-mono text-sm">Resultado: <strong className="text-accent text-base">{result}</strong></p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}
