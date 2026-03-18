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

const B3 = "bg-accent/20 text-accent"

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
        className="w-20 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  )
}

export function EquacoesSegundoGrau() {
  const [a, setA] = useState("1")
  const [b, setB] = useState("-5")
  const [c, setC] = useState("6")

  const av = parseFloat(a)
  const bv = parseFloat(b)
  const cv = parseFloat(c)

  let delta: number | null = null
  let x1: number | null = null
  let x2: number | null = null
  let discriminant = ""

  if (!isNaN(av) && !isNaN(bv) && !isNaN(cv) && av !== 0) {
    delta = bv * bv - 4 * av * cv
    discriminant = `Δ = ${bv}² - 4(${av})(${cv}) = ${bv * bv} - ${4 * av * cv} = ${delta}`

    if (delta >= 0) {
      const sqrtDelta = Math.sqrt(delta)
      x1 = (-bv + sqrtDelta) / (2 * av)
      x2 = (-bv - sqrtDelta) / (2 * av)
    }
  }

  return (
    <AnimateOnScroll>
      <section id="equacoes2grau">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader 
            number={7} 
            badgeColor={B3} 
            title="Equações do 2º Grau" 
            subtitle="ax² + bx + c = 0, x = (-b ± √Δ) / (2a)" 
          />

          <FormulaBox highlight>
            <div className="text-left text-base space-y-2">
              <p>ax² + bx + c = 0 &nbsp;&nbsp; (a ≠ 0)</p>
              <p className="text-sm text-muted-foreground">Discriminante: Δ = b² - 4ac</p>
              <p className="text-sm text-muted-foreground">Fórmula de Bhaskara: x = (-b ± √Δ) / (2a)</p>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Resolver x² - 5x + 6 = 0</h3>
            <StepByStep steps={[
              { text: "Passo 1: Identificar os valores - a = 1, b = -5, c = 6" },
              { text: "Passo 2: Calcular o discriminante Δ = b² - 4ac" },
              { text: "Δ = (-5)² - 4(1)(6) = 25 - 24 = 1" },
              { text: "Passo 3: Como Δ = 1 > 0, a equação tem 2 soluções reais" },
              { text: "Passo 4: Aplicar a fórmula x = (-b ± √Δ) / (2a)" },
              { text: "x = (5 ± √1) / 2 = (5 ± 1) / 2" },
              { text: "x₁ = (5 + 1) / 2 = 6 / 2 = 3" },
              { text: "x₂ = (5 - 1) / 2 = 4 / 2 = 2", highlight: true },
              { text: "Solução: x = 2 ou x = 3 (as duas respostas possíveis!)" },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="x² - 7x + 12 = 0"
              steps={["a = 1, b = -7, c = 12", "Δ = 49 - 48 = 1", "x = (7 ± 1) / 2", "x₁ = 4, x₂ = 3"]}
              conclusion="Duas raízes reais: {3, 4}"
            />
            <DetailedExampleCard
              title="x² + 2x + 5 = 0"
              steps={["a = 1, b = 2, c = 5", "Δ = 4 - 20 = -16", "Δ < 0: discriminante negativo"]}
              conclusion="Sem raízes reais (√(-16) não é real)"
            />
          </div>

          <CalcWrapper title="Calculadora de Bhaskara">
            <div className="flex flex-wrap items-end gap-4 mb-3">
              <NumInput label="a" value={a} onChange={setA} placeholder="1" />
              <span className="text-muted-foreground">x² +</span>
              <NumInput label="b" value={b} onChange={setB} placeholder="-5" />
              <span className="text-muted-foreground">x +</span>
              <NumInput label="c" value={c} onChange={setC} placeholder="6" />
              <span className="text-muted-foreground">= 0</span>
            </div>
            {delta !== null && !isNaN(av) && av !== 0 && (
              <CalcResult>
                <p className="font-mono text-sm text-muted-foreground mb-2">{discriminant}</p>
                {delta >= 0 ? (
                  <>
                    <p className="font-mono text-sm text-green-500/80">Δ ≥ 0: Duas raízes reais</p>
                    <p className="font-mono text-sm">x₁ = {parseFloat(x1!.toFixed(4))}</p>
                    <p className="font-mono text-sm font-bold text-accent">x₂ = {parseFloat(x2!.toFixed(4))}</p>
                  </>
                ) : (
                  <p className="font-mono text-sm text-red-500/80">Δ &lt; 0: Sem raízes reais</p>
                )}
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}
