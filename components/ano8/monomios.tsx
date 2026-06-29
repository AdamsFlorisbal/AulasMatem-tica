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

const B3 = "bg-chart-4/20 text-chart-4"
const B4 = "bg-chart-3/20 text-chart-3"

function NumInput({ label, value, onChange, placeholder, step }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; step?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        step={step}
        className="w-24 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  )
}

/* ================================================================
   1. Monômios — Operações
   ================================================================ */
export function MonomiosOperacoes() {
  const [c1, setC1] = useState("5")
  const [c2, setC2] = useState("3")
  const [op, setOp] = useState<"add" | "sub" | "mult" | "div">("add")

  const coef1 = parseFloat(c1)
  const coef2 = parseFloat(c2)

  let result: string | null = null
  let explanation: string | null = null
  if (!isNaN(coef1) && !isNaN(coef2)) {
    switch (op) {
      case "add":
        result = `${coef1 + coef2}x`
        explanation = `${coef1}x + ${coef2}x = (${coef1} + ${coef2})x = ${coef1 + coef2}x`
        break
      case "sub":
        result = `${coef1 - coef2}x`
        explanation = `${coef1}x − ${coef2}x = (${coef1} − ${coef2})x = ${coef1 - coef2}x`
        break
      case "mult":
        result = `${coef1 * coef2}x²`
        explanation = `(${coef1}x) · (${coef2}x) = ${coef1}·${coef2} · x·x = ${coef1 * coef2}x²`
        break
      case "div":
        if (coef2 !== 0) {
          const r = coef1 / coef2
          result = `${Number.isInteger(r) ? r : parseFloat(r.toFixed(4))}`
          explanation = `(${coef1}x²) ÷ (${coef2}x) = (${coef1}÷${coef2}) · (x²÷x) = ${Number.isInteger(r) ? r : parseFloat(r.toFixed(4))}x`
          result = `${Number.isInteger(r) ? r : parseFloat(r.toFixed(4))}x`
        }
        break
    }
  }

  return (
    <AnimateOnScroll>
      <section id="monomios">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader
            number={6}
            badgeColor={B3}
            title="Monômios — Operações"
            subtitle="Adição, subtração, multiplicação e divisão"
          />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Um <strong>monômio</strong> é uma expressão formada por um <strong>número</strong> (coeficiente)
              multiplicado por uma ou mais <strong>variáveis</strong> (letras).
            </p>
            <p>
              Exemplos de monômios: <strong>5x</strong>, <strong>−3x²</strong>, <strong>7ab</strong>, <strong>2x³y</strong>
            </p>
          </div>

          <FormulaBox>
            <div className="text-left text-base space-y-1">
              <p><strong>Monômio</strong> = coeficiente × parte literal</p>
              <p className="text-sm text-muted-foreground">Em <strong>5x²</strong>: coeficiente = 5, parte literal = x²</p>
            </div>
          </FormulaBox>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-sm font-bold text-green-500 mb-2">Adição e Subtração</p>
              <p className="text-xs text-muted-foreground mb-1">Só funciona com <strong>monômios semelhantes</strong> (mesma parte literal)</p>
              <div className="text-sm space-y-1 mt-2">
                <p>5x + 3x = <strong>8x</strong> ✓</p>
                <p>5x + 3x² = <strong>não simplifica</strong> ✗</p>
              </div>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
              <p className="text-sm font-bold text-blue-500 mb-2">Multiplicação e Divisão</p>
              <p className="text-xs text-muted-foreground mb-1">Funciona com <strong>qualquer monômio</strong></p>
              <div className="text-sm space-y-1 mt-2">
                <p>3x · 2x = <strong>6x²</strong> ✓</p>
                <p>10x² ÷ 2x = <strong>5x</strong> ✓</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Adição de monômios — Passo a passo</h3>
            <StepByStep steps={[
              { text: "<strong>Regra:</strong> Some apenas os coeficientes. A parte literal fica igual!" },
              { text: "Exemplo: 5x + 3x" },
              { text: "Coeficientes: 5 + 3 = 8" },
              { text: "Parte literal: x (não muda)" },
              { text: "5x + 3x = <strong>8x</strong>", highlight: true },
            ]} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Subtração de monômios</h3>
            <StepByStep steps={[
              { text: "Exemplo: 7x² − 4x²" },
              { text: "Coeficientes: 7 − 4 = 3" },
              { text: "Parte literal: x² (não muda)" },
              { text: "7x² − 4x² = <strong>3x²</strong>", highlight: true },
            ]} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Multiplicação de monômios</h3>
            <StepByStep steps={[
              { text: "<strong>Regra:</strong> Multiplique os coeficientes e some os expoentes das variáveis!" },
              { text: "Exemplo: 3x² · 4x³" },
              { text: "Coeficientes: 3 × 4 = 12" },
              { text: "Variáveis: x² · x³ = x⁽²⁺³⁾ = x⁵" },
              { text: "3x² · 4x³ = <strong>12x⁵</strong>", highlight: true },
            ]} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Divisão de monômios</h3>
            <StepByStep steps={[
              { text: "<strong>Regra:</strong> Divida os coeficientes e subtraia os expoentes das variáveis!" },
              { text: "Exemplo: 12x⁵ ÷ 4x²" },
              { text: "Coeficientes: 12 ÷ 4 = 3" },
              { text: "Variáveis: x⁵ ÷ x² = x⁽⁵⁻²⁾ = x³" },
              { text: "12x⁵ ÷ 4x² = <strong>3x³</strong>", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Adição: 8ab + 5ab"
              steps={[
                "Mesma parte literal (ab)? Sim! ✓",
                "Coeficientes: 8 + 5 = 13",
              ]}
              conclusion="8ab + 5ab = 13ab"
            />
            <DetailedExampleCard
              title="Subtração: 10x³ − 7x³"
              steps={[
                "Mesma parte literal (x³)? Sim! ✓",
                "Coeficientes: 10 − 7 = 3",
              ]}
              conclusion="10x³ − 7x³ = 3x³"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Multiplicação: (−2x³)(5x²)"
              steps={[
                "Coef: (−2) × 5 = −10",
                "Var: x³ · x² = x⁵",
              ]}
              conclusion="(−2x³)(5x²) = −10x⁵"
            />
            <DetailedExampleCard
              title="Divisão: 20x⁴ ÷ (−5x)"
              steps={[
                "Coef: 20 ÷ (−5) = −4",
                "Var: x⁴ ÷ x¹ = x³",
              ]}
              conclusion="20x⁴ ÷ (−5x) = −4x³"
            />
          </div>

          <CalcWrapper title="Calculadora de operações com monômios">
            <div className="flex gap-2 mb-4 flex-wrap">
              <button onClick={() => setOp("add")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "add" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Adição</button>
              <button onClick={() => setOp("sub")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "sub" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Subtração</button>
              <button onClick={() => setOp("mult")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "mult" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Multiplicação</button>
              <button onClick={() => setOp("div")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${op === "div" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Divisão</button>
            </div>
            <div className="flex flex-wrap items-end gap-3 mb-3">
              <NumInput label="Coef 1" value={c1} onChange={setC1} placeholder="5" />
              <span className="text-muted-foreground pb-2 text-sm">
                {op === "mult" ? "x ·" : op === "div" ? "x² ÷" : "x"}
              </span>
              <span className="text-muted-foreground pb-2 text-lg font-bold">
                {op === "add" ? "+" : op === "sub" ? "−" : op === "mult" ? "" : ""}
              </span>
              <NumInput label="Coef 2" value={c2} onChange={setC2} placeholder="3" />
              <span className="text-muted-foreground pb-2 text-sm">
                {op === "mult" ? "x" : op === "div" ? "x" : "x"}
              </span>
            </div>
            {result && explanation && (
              <CalcResult>
                <p className="font-mono text-sm text-muted-foreground">{explanation}</p>
                <p className="font-mono text-sm font-bold text-accent">= {result}</p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   2. Valor Numérico de Expressões Algébricas
   ================================================================ */
export function ValorNumerico() {
  const [x, setX] = useState("3")
  const [expr, setExpr] = useState<"a" | "b" | "c">("a")

  const xv = parseFloat(x)

  let result: number | null = null
  let steps: string[] = []
  let exprText = ""

  if (!isNaN(xv)) {
    switch (expr) {
      case "a":
        exprText = "2x² + 3x − 5"
        result = 2 * xv * xv + 3 * xv - 5
        steps = [
          `Substituir x = ${xv}`,
          `2·(${xv})² + 3·(${xv}) − 5`,
          `2·${xv * xv} + ${3 * xv} − 5`,
          `${2 * xv * xv} + ${3 * xv} − 5`,
          `= ${result}`,
        ]
        break
      case "b":
        exprText = "x³ − 2x + 1"
        result = xv * xv * xv - 2 * xv + 1
        steps = [
          `Substituir x = ${xv}`,
          `(${xv})³ − 2·(${xv}) + 1`,
          `${xv * xv * xv} − ${2 * xv} + 1`,
          `= ${result}`,
        ]
        break
      case "c":
        exprText = "5x − x²"
        result = 5 * xv - xv * xv
        steps = [
          `Substituir x = ${xv}`,
          `5·(${xv}) − (${xv})²`,
          `${5 * xv} − ${xv * xv}`,
          `= ${result}`,
        ]
        break
    }
  }

  return (
    <AnimateOnScroll>
      <section id="valornumerico">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader
            number={7}
            badgeColor={B4}
            title="Valor Numérico de Expressões"
            subtitle="Substituir variáveis por números e calcular"
          />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Calcular o <strong>valor numérico</strong> de uma expressão é simples:
              basta <strong>trocar a letra pelo número</strong> dado e fazer a conta!
            </p>
          </div>

          <FormulaBox highlight>
            <div className="text-left text-base space-y-2">
              <p>Para calcular o valor numérico:</p>
              <p className="text-sm text-muted-foreground">1. Substitua cada variável pelo valor dado</p>
              <p className="text-sm text-muted-foreground">2. Resolva as potências primeiro</p>
              <p className="text-sm text-muted-foreground">3. Depois multiplicações e divisões</p>
              <p className="text-sm text-muted-foreground">4. Por último, adições e subtrações</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Calcular 3x² + 2x − 1 para x = 4</h3>
            <StepByStep steps={[
              { text: "<strong>Passo 1:</strong> Substituir x por 4 → 3·(4)² + 2·(4) − 1" },
              { text: "<strong>Passo 2:</strong> Resolver a potência → (4)² = 16" },
              { text: "<strong>Passo 3:</strong> Multiplicar → 3·16 = 48 e 2·4 = 8" },
              { text: "<strong>Passo 4:</strong> Somar tudo → 48 + 8 − 1 = <strong>55</strong>", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="2x + 5 para x = 3"
              steps={[
                "Substituir: 2·(3) + 5",
                "Multiplicar: 6 + 5",
                "Somar: 11",
              ]}
              conclusion="Valor numérico = 11"
            />
            <DetailedExampleCard
              title="x² − 4x + 3 para x = 5"
              steps={[
                "Substituir: (5)² − 4·(5) + 3",
                "Potência: 25 − 4·5 + 3",
                "Multiplicar: 25 − 20 + 3",
                "Calcular: 8",
              ]}
              conclusion="Valor numérico = 8"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="−x² + 6x para x = 2"
              steps={[
                "Substituir: −(2)² + 6·(2)",
                "Potência: −4 + 12",
                "Somar: 8",
              ]}
              conclusion="Valor numérico = 8"
            />
            <DetailedExampleCard
              title="4a² − 2a para a = −1"
              steps={[
                "Substituir: 4·(−1)² − 2·(−1)",
                "Potência: 4·1 − (−2)",
                "Multiplicar: 4 + 2",
                "Somar: 6",
              ]}
              conclusion="Valor numérico = 6"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="2ab para a = 3, b = 4"
              steps={[
                "Substituir: 2·(3)·(4)",
                "Multiplicar: 2·3 = 6",
                "6·4 = 24",
              ]}
              conclusion="Valor numérico = 24"
            />
            <DetailedExampleCard
              title="a² + b² para a = 3, b = 4"
              steps={[
                "Substituir: (3)² + (4)²",
                "Potências: 9 + 16",
                "Somar: 25",
              ]}
              conclusion="Valor numérico = 25"
            />
          </div>

          <CalcWrapper title="Calculadora de Valor Numérico">
            <div className="flex gap-2 mb-4 flex-wrap">
              <button onClick={() => setExpr("a")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${expr === "a" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>2x² + 3x − 5</button>
              <button onClick={() => setExpr("b")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${expr === "b" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>x³ − 2x + 1</button>
              <button onClick={() => setExpr("c")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${expr === "c" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>5x − x²</button>
            </div>
            <div className="flex flex-wrap items-end gap-4 mb-3">
              <NumInput label="Valor de x" value={x} onChange={setX} placeholder="3" />
              <span className="text-muted-foreground pb-2 text-sm">em {exprText}</span>
            </div>
            {result !== null && (
              <CalcResult>
                {steps.map((s, i) => (
                  <p key={i} className={`font-mono text-sm ${i === steps.length - 1 ? "font-bold text-accent" : "text-muted-foreground"}`}>{s}</p>
                ))}
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}
