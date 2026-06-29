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

const B5 = "bg-chart-5/20 text-chart-5"

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

export function EquacoesAx2B() {
  const [a, setA] = useState("2")
  const [b, setB] = useState("18")

  const av = parseFloat(a)
  const bv = parseFloat(b)

  let result: number | null = null
  let isExact = false
  let hasNoSolution = false

  if (!isNaN(av) && !isNaN(bv) && av !== 0) {
    const x2 = bv / av
    if (x2 < 0) {
      hasNoSolution = true
    } else {
      result = Math.sqrt(x2)
      isExact = Number.isInteger(result)
    }
  }

  return (
    <AnimateOnScroll>
      <section id="equacoesax2b">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader
            number={8}
            badgeColor={B5}
            title="Equações do tipo ax² = b"
            subtitle="Equações incompletas resolvidas por radiciação"
          />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Uma equação do tipo <strong>ax² = b</strong> é uma equação do 2º grau <strong>incompleta</strong>
              (falta o termo em x). Para resolver, basta <strong>isolar x²</strong> e depois <strong>tirar a raiz quadrada</strong>.
            </p>
            <p>
              Lembre-se: quando tiramos a raiz quadrada dos dois lados, a resposta pode ser
              <strong> positiva ou negativa</strong>! (x = +√ ou x = −√)
            </p>
          </div>

          <FormulaBox highlight>
            <div className="text-left text-base space-y-2">
              <p className="text-xl font-bold">ax² = b</p>
              <p className="text-sm text-muted-foreground">Passo 1: x² = b/a &nbsp;&nbsp;(divida os dois lados por a)</p>
              <p className="text-sm text-muted-foreground">Passo 2: x = ±√(b/a) &nbsp;&nbsp;(tire a raiz quadrada)</p>
            </div>
          </FormulaBox>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center">
              <p className="text-sm font-bold text-green-500 mb-1">b/a &gt; 0</p>
              <p className="text-xs text-muted-foreground">Resultado positivo</p>
              <p className="text-xs font-bold text-green-500 mt-2">2 soluções: x = ±√(b/a)</p>
            </div>
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-center">
              <p className="text-sm font-bold text-yellow-500 mb-1">b/a = 0</p>
              <p className="text-xs text-muted-foreground">Resultado igual a zero</p>
              <p className="text-xs font-bold text-yellow-500 mt-2">1 solução: x = 0</p>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-center">
              <p className="text-sm font-bold text-red-500 mb-1">b/a &lt; 0</p>
              <p className="text-xs text-muted-foreground">Resultado negativo</p>
              <p className="text-xs font-bold text-red-500 mt-2">Sem solução real</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Resolver 2x² = 18 — Passo a passo</h3>
            <StepByStep steps={[
              { text: "<strong>Passo 1:</strong> Isolar x² → dividir os dois lados por 2" },
              { text: "2x² = 18 → x² = 18 ÷ 2 → x² = 9" },
              { text: "<strong>Passo 2:</strong> Tirar a raiz quadrada dos dois lados" },
              { text: "x = ±√9" },
              { text: "x = ±3", highlight: true },
              { text: "✅ Solução: x = 3 ou x = −3 (dois valores!)" },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 1: x² = 25"
              steps={[
                "x² já está isolado!",
                "x = ±√25",
                "x = ±5",
              ]}
              conclusion="x = 5 ou x = −5"
            />
            <DetailedExampleCard
              title="Exemplo 2: 3x² = 48"
              steps={[
                "Isolar x²: x² = 48 ÷ 3 = 16",
                "x = ±√16",
                "x = ±4",
              ]}
              conclusion="x = 4 ou x = −4"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 3: 5x² = 125"
              steps={[
                "Isolar x²: x² = 125 ÷ 5 = 25",
                "x = ±√25",
                "x = ±5",
              ]}
              conclusion="x = 5 ou x = −5"
            />
            <DetailedExampleCard
              title="Exemplo 4: x² − 36 = 0"
              steps={[
                "Passar o 36 para o outro lado: x² = 36",
                "x = ±√36",
                "x = ±6",
              ]}
              conclusion="x = 6 ou x = −6"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 5: 4x² − 100 = 0"
              steps={[
                "Passar 100: 4x² = 100",
                "Isolar x²: x² = 100 ÷ 4 = 25",
                "x = ±√25",
                "x = ±5",
              ]}
              conclusion="x = 5 ou x = −5"
            />
            <DetailedExampleCard
              title="Exemplo 6: x² = −4 (sem solução)"
              steps={[
                "x² = −4",
                "Não existe √ de número negativo!",
                "Nenhum número ao quadrado dá negativo",
              ]}
              conclusion="Sem solução real!"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 7: 2x² = 50"
              steps={[
                "x² = 50 ÷ 2 = 25",
                "x = ±√25",
                "x = ±5",
              ]}
              conclusion="x = 5 ou x = −5"
            />
            <DetailedExampleCard
              title="Exemplo 8: x²/3 = 12"
              steps={[
                "Multiplicar os dois lados por 3: x² = 36",
                "x = ±√36",
                "x = ±6",
              ]}
              conclusion="x = 6 ou x = −6"
            />
          </div>

          <CalcWrapper title="Calculadora ax² = b">
            <div className="flex flex-wrap items-end gap-4 mb-3">
              <NumInput label="a" value={a} onChange={setA} placeholder="2" />
              <span className="text-muted-foreground pb-2 text-sm">x² =</span>
              <NumInput label="b" value={b} onChange={setB} placeholder="18" />
            </div>
            {!isNaN(av) && !isNaN(bv) && av !== 0 && (
              <CalcResult>
                <p className="font-mono text-sm text-muted-foreground">{av}x² = {bv}</p>
                <p className="font-mono text-sm text-muted-foreground">x² = {bv} ÷ {av} = {bv / av}</p>
                {hasNoSolution ? (
                  <p className="font-mono text-sm text-red-500 font-bold">x² = {bv / av} → Sem solução real (não existe √ de negativo)</p>
                ) : bv / av === 0 ? (
                  <p className="font-mono text-sm font-bold text-accent">x² = 0 → x = 0</p>
                ) : (
                  <>
                    <p className="font-mono text-sm">x = ±√{bv / av}{isExact ? ` = ±${result}` : ` ≈ ±${parseFloat(result!.toFixed(4))}`}</p>
                    <p className="font-mono text-sm font-bold text-accent">
                      x = {isExact ? result : parseFloat(result!.toFixed(4))} ou x = {isExact ? -result! : -parseFloat(result!.toFixed(4))}
                    </p>
                  </>
                )}
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}
