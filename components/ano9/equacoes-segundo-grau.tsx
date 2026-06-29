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
const B4 = "bg-primary/20 text-primary"
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
        className="w-20 rounded-lg border border-border bg-background px-2 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  )
}

/* ================================================================
   7a. O que é uma Equação do 2º Grau
   ================================================================ */
export function EquacoesSegundoGrauIntro() {
  return (
    <AnimateOnScroll>
      <section id="equacoes2grau-intro">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader
            number={7}
            badgeColor={B3}
            title="O que é uma Equação do 2º Grau?"
            subtitle="ax² + bx + c = 0 — a forma geral"
          />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Uma <strong>equação do 2º grau</strong> é uma equação onde a maior potência da incógnita (x) é <strong>2</strong>.
              Ela sempre pode ser escrita na forma:
            </p>
          </div>

          <FormulaBox highlight>
            <div className="text-left text-base space-y-2">
              <p className="text-xl font-bold">ax² + bx + c = 0</p>
              <p className="text-sm text-muted-foreground">onde <strong>a</strong>, <strong>b</strong> e <strong>c</strong> são números reais e <strong>a ≠ 0</strong></p>
            </div>
          </FormulaBox>

          <div className="space-y-4 text-sm leading-relaxed">
            <p>Pense assim: se a equação tem um <strong>x²</strong>, ela é do 2º grau!</p>
            <p>Os números <strong>a</strong>, <strong>b</strong> e <strong>c</strong> são chamados de <strong>coeficientes</strong>:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 text-center">
              <p className="text-2xl font-black text-accent mb-1">a</p>
              <p className="text-xs text-muted-foreground">Coeficiente de x²</p>
              <p className="text-xs text-muted-foreground mt-1">É o número que multiplica x²</p>
              <p className="text-xs font-bold text-accent mt-2">Nunca pode ser zero!</p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
              <p className="text-2xl font-black text-primary mb-1">b</p>
              <p className="text-xs text-muted-foreground">Coeficiente de x</p>
              <p className="text-xs text-muted-foreground mt-1">É o número que multiplica x</p>
              <p className="text-xs font-bold text-primary mt-2">Pode ser zero</p>
            </div>
            <div className="rounded-xl border border-chart-5/30 bg-chart-5/5 p-4 text-center">
              <p className="text-2xl font-black text-chart-5 mb-1">c</p>
              <p className="text-xs text-muted-foreground">Termo independente</p>
              <p className="text-xs text-muted-foreground mt-1">É o número sozinho (sem x)</p>
              <p className="text-xs font-bold text-chart-5 mt-2">Pode ser zero</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Identificando os coeficientes — Passo a passo</h3>
            <StepByStep steps={[
              { text: "Passo 1: Coloque a equação na forma ax² + bx + c = 0 (tudo de um lado)" },
              { text: "Passo 2: O número na frente do x² é o coeficiente <strong>a</strong>" },
              { text: "Passo 3: O número na frente do x é o coeficiente <strong>b</strong>" },
              { text: "Passo 4: O número sozinho (sem x) é o coeficiente <strong>c</strong>" },
              { text: "⚠️ Cuidado com o sinal! Se tem −3x, então b = −3 (negativo!)", highlight: true },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 1: x² − 5x + 6 = 0"
              steps={[
                "Quem multiplica x²? → 1 (está escondido!)",
                "a = 1",
                "Quem multiplica x? → −5",
                "b = −5",
                "Termo independente → +6",
                "c = 6",
              ]}
              conclusion="a = 1, b = −5, c = 6"
            />
            <DetailedExampleCard
              title="Exemplo 2: 3x² + 7x − 2 = 0"
              steps={[
                "Quem multiplica x²? → 3",
                "a = 3",
                "Quem multiplica x? → +7",
                "b = 7",
                "Termo independente → −2",
                "c = −2",
              ]}
              conclusion="a = 3, b = 7, c = −2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 3: −2x² + 4x = 0"
              steps={[
                "Quem multiplica x²? → −2",
                "a = −2",
                "Quem multiplica x? → +4",
                "b = 4",
                "Não tem termo independente!",
                "c = 0",
              ]}
              conclusion="a = −2, b = 4, c = 0"
            />
            <DetailedExampleCard
              title="Exemplo 4: 5x² − 20 = 0"
              steps={[
                "Quem multiplica x²? → 5",
                "a = 5",
                "Não tem x! (sem termo em x)",
                "b = 0",
                "Termo independente → −20",
                "c = −20",
              ]}
              conclusion="a = 5, b = 0, c = −20"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 5: x² = 9"
              steps={[
                "Primeiro: passe o 9 para o outro lado",
                "x² − 9 = 0",
                "a = 1 (na frente do x²)",
                "b = 0 (não tem x)",
                "c = −9",
              ]}
              conclusion="a = 1, b = 0, c = −9"
            />
            <DetailedExampleCard
              title="Exemplo 6: −x² + 3x + 10 = 0"
              steps={[
                "Quem multiplica x²? → −1 (o menos escondido!)",
                "a = −1",
                "Quem multiplica x? → +3",
                "b = 3",
                "Termo independente → +10",
                "c = 10",
              ]}
              conclusion="a = −1, b = 3, c = 10"
            />
          </div>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   7b. Calculando o Discriminante (Delta)
   ================================================================ */
export function EquacoesDelta() {
  const [a, setA] = useState("1")
  const [b, setB] = useState("-5")
  const [c, setC] = useState("6")

  const av = parseFloat(a)
  const bv = parseFloat(b)
  const cv = parseFloat(c)

  let delta: number | null = null
  let interpretation = ""

  if (!isNaN(av) && !isNaN(bv) && !isNaN(cv) && av !== 0) {
    delta = bv * bv - 4 * av * cv
    if (delta > 0) interpretation = "Δ > 0 → A equação tem DUAS raízes reais diferentes"
    else if (delta === 0) interpretation = "Δ = 0 → A equação tem DUAS raízes reais iguais (uma raiz dupla)"
    else interpretation = "Δ < 0 → A equação NÃO tem raízes reais"
  }

  return (
    <AnimateOnScroll>
      <section id="equacoes2grau-delta">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader
            number={8}
            badgeColor={B4}
            title="Calculando o Delta (Δ)"
            subtitle="Δ = b² − 4ac — O discriminante"
          />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Antes de encontrar as raízes (soluções), precisamos calcular o <strong>discriminante</strong>,
              que chamamos de <strong>delta (Δ)</strong>. Ele nos diz quantas soluções a equação tem!
            </p>
          </div>

          <FormulaBox highlight>
            <div className="text-left text-base space-y-2">
              <p className="text-xl font-bold">Δ = b² − 4 · a · c</p>
              <p className="text-sm text-muted-foreground">É só substituir os valores de a, b e c e fazer a conta!</p>
            </div>
          </FormulaBox>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center">
              <p className="text-lg font-black text-green-500 mb-1">Δ &gt; 0</p>
              <p className="text-xs text-muted-foreground">Delta positivo</p>
              <p className="text-sm font-bold text-green-500 mt-2">2 raízes reais diferentes</p>
            </div>
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-center">
              <p className="text-lg font-black text-yellow-500 mb-1">Δ = 0</p>
              <p className="text-xs text-muted-foreground">Delta igual a zero</p>
              <p className="text-sm font-bold text-yellow-500 mt-2">2 raízes reais iguais</p>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-center">
              <p className="text-lg font-black text-red-500 mb-1">Δ &lt; 0</p>
              <p className="text-xs text-muted-foreground">Delta negativo</p>
              <p className="text-sm font-bold text-red-500 mt-2">Não tem raiz real</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Calcular Δ de x² − 5x + 6 = 0</h3>
            <StepByStep steps={[
              { text: "Passo 1: Identificar os coeficientes → a = 1, b = −5, c = 6" },
              { text: "Passo 2: Escrever a fórmula → Δ = b² − 4 · a · c" },
              { text: "Passo 3: Substituir → Δ = (−5)² − 4 · 1 · 6" },
              { text: "Passo 4: Calcular b² → (−5)² = (−5) × (−5) = 25" },
              { text: "Passo 5: Calcular 4·a·c → 4 × 1 × 6 = 24" },
              { text: "Passo 6: Subtrair → Δ = 25 − 24 = 1", highlight: true },
              { text: "Δ = 1 > 0 → Tem duas raízes reais diferentes! ✓" },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 1: 2x² + 3x − 5 = 0"
              steps={[
                "a = 2, b = 3, c = −5",
                "Δ = b² − 4·a·c",
                "Δ = (3)² − 4·(2)·(−5)",
                "Δ = 9 − (−40)",
                "Δ = 9 + 40 = 49",
                "Δ = 49 > 0 ✓",
              ]}
              conclusion="Duas raízes reais diferentes"
            />
            <DetailedExampleCard
              title="Exemplo 2: x² − 6x + 9 = 0"
              steps={[
                "a = 1, b = −6, c = 9",
                "Δ = (−6)² − 4·(1)·(9)",
                "Δ = 36 − 36",
                "Δ = 0",
              ]}
              conclusion="Δ = 0 → Duas raízes iguais (raiz dupla)"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 3: x² + 2x + 5 = 0"
              steps={[
                "a = 1, b = 2, c = 5",
                "Δ = (2)² − 4·(1)·(5)",
                "Δ = 4 − 20",
                "Δ = −16",
                "Δ = −16 < 0",
              ]}
              conclusion="Δ < 0 → Sem raízes reais!"
            />
            <DetailedExampleCard
              title="Exemplo 4: 3x² − 12x + 12 = 0"
              steps={[
                "a = 3, b = −12, c = 12",
                "Δ = (−12)² − 4·(3)·(12)",
                "Δ = 144 − 144",
                "Δ = 0",
              ]}
              conclusion="Δ = 0 → Duas raízes iguais"
            />
          </div>

          <CalcWrapper title="Calculadora de Delta">
            <div className="flex flex-wrap items-end gap-4 mb-3">
              <NumInput label="a" value={a} onChange={setA} placeholder="1" />
              <span className="text-muted-foreground pb-2 text-sm">x² +</span>
              <NumInput label="b" value={b} onChange={setB} placeholder="-5" />
              <span className="text-muted-foreground pb-2 text-sm">x +</span>
              <NumInput label="c" value={c} onChange={setC} placeholder="6" />
              <span className="text-muted-foreground pb-2 text-sm">= 0</span>
            </div>
            {delta !== null && (
              <CalcResult>
                <p className="font-mono text-sm text-muted-foreground">Δ = ({bv})² − 4·({av})·({cv})</p>
                <p className="font-mono text-sm text-muted-foreground">Δ = {bv * bv} − {4 * av * cv}</p>
                <p className="font-mono text-sm font-bold text-accent">Δ = {delta}</p>
                <p className={`text-sm font-semibold mt-2 ${delta > 0 ? "text-green-500" : delta === 0 ? "text-yellow-500" : "text-red-500"}`}>
                  {interpretation}
                </p>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   7c. Fórmula de Bhaskara — Calculando as Raízes
   ================================================================ */
export function EquacoesBhaskara() {
  const [a, setA] = useState("1")
  const [b, setB] = useState("-5")
  const [c, setC] = useState("6")

  const av = parseFloat(a)
  const bv = parseFloat(b)
  const cv = parseFloat(c)

  let delta: number | null = null
  let x1: number | null = null
  let x2: number | null = null
  let sqrtDelta: number | null = null

  if (!isNaN(av) && !isNaN(bv) && !isNaN(cv) && av !== 0) {
    delta = bv * bv - 4 * av * cv
    if (delta >= 0) {
      sqrtDelta = Math.sqrt(delta)
      x1 = (-bv + sqrtDelta) / (2 * av)
      x2 = (-bv - sqrtDelta) / (2 * av)
    }
  }

  return (
    <AnimateOnScroll>
      <section id="equacoes2grau">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
          <SectionHeader
            number={9}
            badgeColor={B5}
            title="Fórmula de Bhaskara"
            subtitle="x = (−b ± √Δ) / (2a) — Encontrando as raízes"
          />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Agora que sabemos calcular o <strong>delta</strong>, podemos usar a <strong>Fórmula de Bhaskara</strong>
              para encontrar os valores de x (as <strong>raízes</strong> da equação).
            </p>
            <p>
              A fórmula tem um <strong>±</strong> (mais ou menos), o que significa que fazemos a conta
              <strong> duas vezes</strong>: uma com + e outra com −.
            </p>
          </div>

          <FormulaBox highlight>
            <div className="text-left text-base space-y-2">
              <p className="text-xl font-bold">x = (−b ± √Δ) / (2a)</p>
              <div className="text-sm text-muted-foreground space-y-1 mt-2">
                <p>x₁ = (−b <strong>+</strong> √Δ) / (2a) &nbsp;&nbsp;← com o sinal de <strong>mais</strong></p>
                <p>x₂ = (−b <strong>−</strong> √Δ) / (2a) &nbsp;&nbsp;← com o sinal de <strong>menos</strong></p>
              </div>
            </div>
          </FormulaBox>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Resolver x² − 5x + 6 = 0 (passo a passo completo)</h3>
            <StepByStep steps={[
              { text: "<strong>Passo 1:</strong> Identificar coeficientes → a = 1, b = −5, c = 6" },
              { text: "<strong>Passo 2:</strong> Calcular Δ = b² − 4ac = (−5)² − 4·1·6 = 25 − 24 = <strong>1</strong>" },
              { text: "<strong>Passo 3:</strong> Calcular √Δ = √1 = <strong>1</strong>" },
              { text: "<strong>Passo 4:</strong> Aplicar na fórmula → x = (−(−5) ± 1) / (2·1) = (5 ± 1) / 2" },
              { text: "<strong>Passo 5:</strong> Calcular x₁ → x₁ = (5 + 1) / 2 = 6 / 2 = <strong>3</strong>" },
              { text: "<strong>Passo 6:</strong> Calcular x₂ → x₂ = (5 − 1) / 2 = 4 / 2 = <strong>2</strong>", highlight: true },
              { text: "✅ Solução: x = 2 ou x = 3" },
            ]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 1: x² − 7x + 12 = 0"
              steps={[
                "a = 1, b = −7, c = 12",
                "Δ = (−7)² − 4·1·12 = 49 − 48 = 1",
                "√Δ = √1 = 1",
                "x = (−(−7) ± 1) / (2·1) = (7 ± 1) / 2",
                "x₁ = (7 + 1) / 2 = 8 / 2 = 4",
                "x₂ = (7 − 1) / 2 = 6 / 2 = 3",
              ]}
              conclusion="x = 3 ou x = 4"
            />
            <DetailedExampleCard
              title="Exemplo 2: x² − 3x − 10 = 0"
              steps={[
                "a = 1, b = −3, c = −10",
                "Δ = (−3)² − 4·1·(−10) = 9 + 40 = 49",
                "√Δ = √49 = 7",
                "x = (3 ± 7) / 2",
                "x₁ = (3 + 7) / 2 = 10 / 2 = 5",
                "x₂ = (3 − 7) / 2 = −4 / 2 = −2",
              ]}
              conclusion="x = 5 ou x = −2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 3: 2x² − 8x + 6 = 0"
              steps={[
                "a = 2, b = −8, c = 6",
                "Δ = (−8)² − 4·2·6 = 64 − 48 = 16",
                "√Δ = √16 = 4",
                "x = (8 ± 4) / (2·2) = (8 ± 4) / 4",
                "x₁ = (8 + 4) / 4 = 12 / 4 = 3",
                "x₂ = (8 − 4) / 4 = 4 / 4 = 1",
              ]}
              conclusion="x = 1 ou x = 3"
            />
            <DetailedExampleCard
              title="Exemplo 4: x² − 4x + 4 = 0 (Δ = 0)"
              steps={[
                "a = 1, b = −4, c = 4",
                "Δ = (−4)² − 4·1·4 = 16 − 16 = 0",
                "√Δ = √0 = 0",
                "x = (4 ± 0) / 2 = 4 / 2 = 2",
                "x₁ = x₂ = 2 (raiz dupla!)",
              ]}
              conclusion="x = 2 (raiz dupla)"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DetailedExampleCard
              title="Exemplo 5: x² + x − 6 = 0"
              steps={[
                "a = 1, b = 1, c = −6",
                "Δ = (1)² − 4·1·(−6) = 1 + 24 = 25",
                "√Δ = √25 = 5",
                "x = (−1 ± 5) / 2",
                "x₁ = (−1 + 5) / 2 = 4 / 2 = 2",
                "x₂ = (−1 − 5) / 2 = −6 / 2 = −3",
              ]}
              conclusion="x = 2 ou x = −3"
            />
            <DetailedExampleCard
              title="Exemplo 6: 3x² + 2x − 1 = 0"
              steps={[
                "a = 3, b = 2, c = −1",
                "Δ = (2)² − 4·3·(−1) = 4 + 12 = 16",
                "√Δ = √16 = 4",
                "x = (−2 ± 4) / (2·3) = (−2 ± 4) / 6",
                "x₁ = (−2 + 4) / 6 = 2 / 6 = 1/3",
                "x₂ = (−2 − 4) / 6 = −6 / 6 = −1",
              ]}
              conclusion="x = 1/3 ou x = −1"
            />
          </div>

          <CalcWrapper title="Calculadora Completa de Bhaskara">
            <div className="flex flex-wrap items-end gap-4 mb-3">
              <NumInput label="a" value={a} onChange={setA} placeholder="1" />
              <span className="text-muted-foreground pb-2 text-sm">x² +</span>
              <NumInput label="b" value={b} onChange={setB} placeholder="-5" />
              <span className="text-muted-foreground pb-2 text-sm">x +</span>
              <NumInput label="c" value={c} onChange={setC} placeholder="6" />
              <span className="text-muted-foreground pb-2 text-sm">= 0</span>
            </div>
            {delta !== null && !isNaN(av) && av !== 0 && (
              <CalcResult>
                <div className="space-y-2">
                  <p className="font-mono text-xs text-muted-foreground">1️⃣ Coeficientes: a = {av}, b = {bv}, c = {cv}</p>
                  <p className="font-mono text-xs text-muted-foreground">2️⃣ Δ = ({bv})² − 4·({av})·({cv}) = {bv * bv} − {4 * av * cv} = {delta}</p>
                  {delta >= 0 && sqrtDelta !== null ? (
                    <>
                      <p className="font-mono text-xs text-muted-foreground">3️⃣ √Δ = √{delta} = {parseFloat(sqrtDelta.toFixed(4))}</p>
                      <p className="font-mono text-xs text-muted-foreground">4️⃣ x = (−({bv}) ± {parseFloat(sqrtDelta.toFixed(4))}) / (2·{av})</p>
                      <p className="font-mono text-xs text-muted-foreground">&nbsp;&nbsp;&nbsp;x = ({-bv} ± {parseFloat(sqrtDelta.toFixed(4))}) / {2 * av}</p>
                      <div className="border-t border-border pt-2 mt-2">
                        <p className="font-mono text-sm">x₁ = ({-bv} + {parseFloat(sqrtDelta.toFixed(4))}) / {2 * av} = <strong className="text-accent">{parseFloat(x1!.toFixed(4))}</strong></p>
                        <p className="font-mono text-sm">x₂ = ({-bv} − {parseFloat(sqrtDelta.toFixed(4))}) / {2 * av} = <strong className="text-accent">{parseFloat(x2!.toFixed(4))}</strong></p>
                      </div>
                      <p className={`text-sm font-semibold mt-1 ${delta > 0 ? "text-green-500" : "text-yellow-500"}`}>
                        {delta > 0 ? "Duas raízes reais diferentes" : "Raiz dupla (x₁ = x₂)"}
                      </p>
                    </>
                  ) : (
                    <p className="font-mono text-sm text-red-500 font-bold">Δ &lt; 0 → Sem raízes reais (não existe √ de número negativo)</p>
                  )}
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </div>
      </section>
    </AnimateOnScroll>
  )
}

/* ================================================================
   Combined export (backwards-compatible)
   ================================================================ */
export function EquacoesSegundoGrau() {
  return (
    <>
      <EquacoesSegundoGrauIntro />
      <div className="h-6" />
      <EquacoesDelta />
      <div className="h-6" />
      <EquacoesBhaskara />
    </>
  )
}
