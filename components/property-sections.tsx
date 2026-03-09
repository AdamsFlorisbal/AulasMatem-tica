"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  ArrowRight,
  Equal,
  X,
  Minus,
  Plus,
} from "lucide-react"

/* ================================================================
   Shared UI
   ================================================================ */

function SectionBadge({ number, color }: { number: number; color: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold",
        color
      )}
    >
      {number}
    </span>
  )
}

function FormulaBox({
  children,
  highlight = false,
  className,
}: {
  children: React.ReactNode
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-6 py-4 font-mono text-center text-lg md:text-xl transition-all duration-500",
        highlight
          ? "border-primary bg-primary/10 text-primary animate-pulse-glow"
          : "border-border bg-card text-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

function StepByStep({ steps }: { steps: { text: string; highlight?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <AnimateOnScroll key={i} animation="animate-slide-in-left" delay={i * 150}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                step.highlight
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <code
              className={cn(
                "font-mono text-sm md:text-base",
                step.highlight ? "text-accent font-bold" : "text-foreground"
              )}
            >
              {step.text}
            </code>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  )
}

function InteractiveExample({
  base,
  exp1,
  exp2,
  operation,
  resultExp,
  resultBase,
}: {
  base: number
  exp1: number
  exp2: number
  operation: "+" | "-" | "x"
  resultExp: string
  resultBase?: number
}) {
  const [showResult, setShowResult] = useState(false)

  const displayOp = operation === "-" ? ":" : "\u00B7"

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setShowResult(!showResult)}
        className="group relative rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
      >
        {showResult ? "Esconder resultado" : "Ver passo a passo"}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-ping" />
      </button>

      {showResult && (
        <div className="w-full space-y-3 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 flex-wrap font-mono text-base md:text-lg">
            <span className="text-foreground">
              {resultBase ?? base}
              <sup className="text-primary">{exp1}</sup>
            </span>
            <span className="text-muted-foreground">{displayOp}</span>
            <span className="text-foreground">
              {resultBase ?? base}
              <sup className="text-primary">{exp2}</sup>
            </span>
            <Equal className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">
              {resultBase ?? base}
              <sup className="text-accent font-bold">{exp1} {operation} {exp2}</sup>
            </span>
            <Equal className="w-4 h-4 text-muted-foreground" />
            <span className="text-accent font-bold text-xl">
              {resultBase ?? base}
              <sup>{resultExp}</sup>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================
   PROPRIEDADE 1: Multiplica\u00E7\u00E3o de mesma base
   ================================================================ */

export function PropMultiplicacao() {
  return (
    <section id="multiplicacao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={1} color="bg-primary/20 text-primary" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {"Multiplica\u00E7\u00E3o de Mesma Base"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Conserva a base e soma os expoentes
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            a<sup>m</sup> &middot; a<sup>n</sup> = a<sup>m + n</sup>
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Como funciona?
            </h3>
            <p className="text-foreground leading-relaxed mb-4">
              {"Quando multiplicamos pot\u00EAncias com a "}
              <strong className="text-primary">mesma base</strong>
              {", mantemos a base e "}
              <strong className="text-accent">somamos os expoentes</strong>
              {". Isso acontece porque estamos juntando grupos de multiplica\u00E7\u00F5es repetidas."}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplo passo a passo
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <div className="mb-4">
                <FormulaBox className="mb-4">
                  2<sup>3</sup> &middot; 2<sup>4</sup>
                </FormulaBox>
              </div>
              <StepByStep
                steps={[
                  { text: "2\u00B3 = 2 \u00D7 2 \u00D7 2 (tr\u00EAs vezes)" },
                  { text: "2\u2074 = 2 \u00D7 2 \u00D7 2 \u00D7 2 (quatro vezes)" },
                  { text: "Juntando: 2 \u00D7 2 \u00D7 2 \u00D7 2 \u00D7 2 \u00D7 2 \u00D7 2 (sete vezes)" },
                  { text: "Logo: 2\u00B3 \u00B7 2\u2074 = 2\u00B3\u207A\u2074 = 2\u2077 = 128", highlight: true },
                ]}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mais exemplos
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <DetailedExampleCard
                title={"5\u00B2 \u00B7 5\u00B3"}
                steps={[
                  "5\u00B2 = 5 \u00D7 5 = 25",
                  "5\u00B3 = 5 \u00D7 5 \u00D7 5 = 125",
                  "25 \u00D7 125 = 3.125",
                ]}
                conclusion={"Pela propriedade: 5\u00B2\u207A\u00B3 = 5\u2075 = 3.125"}
              />
              <DetailedExampleCard
                title={"10\u00B9 \u00B7 10\u2074"}
                steps={[
                  "10\u00B9 = 10",
                  "10\u2074 = 10 \u00D7 10 \u00D7 10 \u00D7 10 = 10.000",
                  "10 \u00D7 10.000 = 100.000",
                ]}
                conclusion={"Pela propriedade: 10\u00B9\u207A\u2074 = 10\u2075 = 100.000"}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <div className="mt-6">
            <InteractiveExample
              base={3}
              exp1={2}
              exp2={5}
              operation="+"
              resultExp="7"
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   PROPRIEDADE 2: Divis\u00E3o de mesma base
   ================================================================ */

export function PropDivisao() {
  return (
    <section id="divisao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={2} color="bg-accent/20 text-accent" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {"Divis\u00E3o de Mesma Base"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {"Conserva a base e subtra\u00ED os expoentes"}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            a<sup>m</sup> : a<sup>n</sup> = a<sup>m - n</sup>
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Como funciona?
            </h3>
            <p className="text-foreground leading-relaxed">
              {"Na divis\u00E3o de pot\u00EAncias com a "}
              <strong className="text-primary">mesma base</strong>
              {", mantemos a base e "}
              <strong className="text-accent">{"subtra\u00EDmos os expoentes"}</strong>
              {". \u00C9 como se estiv\u00E9ssemos cancelando fatores iguais da multiplica\u00E7\u00E3o."}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplo passo a passo
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <FormulaBox className="mb-4">
                5<sup>6</sup> : 5<sup>2</sup>
              </FormulaBox>
              <StepByStep
                steps={[
                  { text: "5\u2076 = 5 \u00D7 5 \u00D7 5 \u00D7 5 \u00D7 5 \u00D7 5" },
                  { text: "5\u00B2 = 5 \u00D7 5" },
                  { text: "Cancelamos 2 fatores: (5 \u00D7 5 \u00D7 5 \u00D7 5 \u00D7 5 \u00D7 5) \u00F7 (5 \u00D7 5)" },
                  { text: "Sobram 4 fatores: 5\u2076 : 5\u00B2 = 5\u2076\u207B\u00B2 = 5\u2074 = 625", highlight: true },
                ]}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mais exemplos
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <DetailedExampleCard
                title={"7\u2075 : 7\u00B3"}
                steps={[
                  "7\u2075 = 7 \u00D7 7 \u00D7 7 \u00D7 7 \u00D7 7 = 16.807",
                  "7\u00B3 = 7 \u00D7 7 \u00D7 7 = 343",
                  "16.807 \u00F7 343 = 49",
                ]}
                conclusion={"Pela propriedade: 7\u2075\u207B\u00B3 = 7\u00B2 = 49"}
              />
              <DetailedExampleCard
                title={"10\u2078 : 10\u00B3"}
                steps={[
                  "10\u2078 = 100.000.000",
                  "10\u00B3 = 1.000",
                  "100.000.000 \u00F7 1.000 = 100.000",
                ]}
                conclusion={"Pela propriedade: 10\u2078\u207B\u00B3 = 10\u2075 = 100.000"}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   PROPRIEDADE 3: Pot\u00EAncia de Pot\u00EAncia
   ================================================================ */

export function PropPotenciaPotencia() {
  return (
    <section id="potencia-potencia" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={3} color="bg-chart-3/20 text-chart-3" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {"Pot\u00EAncia de Pot\u00EAncia"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Conserva a base e multiplica os expoentes
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            (a<sup>m</sup>)<sup>n</sup> = a<sup>m &middot; n</sup>
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Como funciona?
            </h3>
            <p className="text-foreground leading-relaxed">
              {"Quando elevamos uma pot\u00EAncia a outro expoente, mantemos a base e "}
              <strong className="text-accent">multiplicamos os expoentes</strong>
              {". \u00C9 como repetir a multiplica\u00E7\u00E3o da pot\u00EAncia interna v\u00E1rias vezes."}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplo passo a passo
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <FormulaBox className="mb-4">
                (3<sup>2</sup>)<sup>4</sup>
              </FormulaBox>
              <StepByStep
                steps={[
                  { text: "(3\u00B2)\u2074 significa repetir 3\u00B2 quatro vezes" },
                  { text: "= 3\u00B2 \u00D7 3\u00B2 \u00D7 3\u00B2 \u00D7 3\u00B2" },
                  { text: "Pela propriedade 1: soma os expoentes 2+2+2+2 = 8" },
                  { text: "(3\u00B2)\u2074 = 3\u00B2\u02E3\u2074 = 3\u2078 = 6.561", highlight: true },
                ]}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mais exemplos
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <DetailedExampleCard
                title={"(2\u00B3)\u00B2"}
                steps={[
                  "Significa repetir 2\u00B3 duas vezes: 2\u00B3 \u00D7 2\u00B3",
                  "2\u00B3 = 2 \u00D7 2 \u00D7 2 = 8",
                  "8 \u00D7 8 = 64",
                ]}
                conclusion={"Pela propriedade: 2\u00B3\u02E3\u00B2 = 2\u2076 = 64"}
              />
              <DetailedExampleCard
                title={"(10\u00B2)\u00B3"}
                steps={[
                  "Significa repetir 10\u00B2 tr\u00EAs vezes: 10\u00B2 \u00D7 10\u00B2 \u00D7 10\u00B2",
                  "10\u00B2 = 10 \u00D7 10 = 100",
                  "100 \u00D7 100 \u00D7 100 = 1.000.000",
                ]}
                conclusion={"Pela propriedade: 10\u00B2\u02E3\u00B3 = 10\u2076 = 1.000.000"}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   PROPRIEDADE 4: Pot\u00EAncia de um Produto
   ================================================================ */

export function PropPotenciaProduto() {
  return (
    <section id="potencia-produto" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={4} color="bg-chart-4/20 text-chart-4" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {"Pot\u00EAncia de um Produto"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Distribui o expoente para cada fator
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            (a &middot; b)<sup>n</sup> = a<sup>n</sup> &middot; b<sup>n</sup>
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Como funciona?
            </h3>
            <p className="text-foreground leading-relaxed">
              {"Quando temos um "}
              <strong className="text-primary">produto elevado a um expoente</strong>
              {", podemos "}
              <strong className="text-accent">distribuir o expoente</strong>
              {" para cada fator dentro do par\u00EAntese. \u00C9 como dar o mesmo expoente para cada um!"}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplo passo a passo
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <FormulaBox className="mb-4">
                (2 &middot; 5)<sup>3</sup>
              </FormulaBox>
              <StepByStep
                steps={[
                  { text: "(2 \u00B7 5)\u00B3 = (2 \u00B7 5) \u00D7 (2 \u00B7 5) \u00D7 (2 \u00B7 5)" },
                  { text: "Reagrupando: (2 \u00D7 2 \u00D7 2) \u00D7 (5 \u00D7 5 \u00D7 5)" },
                  { text: "= 2\u00B3 \u00D7 5\u00B3" },
                  { text: "= 8 \u00D7 125 = 1.000", highlight: true },
                ]}
              />
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-accent font-medium">
                  {"Conferindo: (2 \u00D7 5)\u00B3 = 10\u00B3 = 1.000 \u2714"}
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mais exemplos
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <DetailedExampleCard
                title={"(3 \u00B7 4)\u00B2"}
                steps={[
                  "(3 \u00B7 4)\u00B2 = 12\u00B2",
                  "Ou distribui: 3\u00B2 \u00B7 4\u00B2",
                  "3\u00B2 = 3 \u00D7 3 = 9",
                  "4\u00B2 = 4 \u00D7 4 = 16",
                  "9 \u00D7 16 = 144",
                ]}
                conclusion={"Conferindo: 12\u00B2 = 12 \u00D7 12 = 144 \u2714"}
              />
              <DetailedExampleCard
                title={"(2 \u00B7 3)\u2074"}
                steps={[
                  "(2 \u00B7 3)\u2074 = 6\u2074",
                  "Ou distribui: 2\u2074 \u00B7 3\u2074",
                  "2\u2074 = 2 \u00D7 2 \u00D7 2 \u00D7 2 = 16",
                  "3\u2074 = 3 \u00D7 3 \u00D7 3 \u00D7 3 = 81",
                  "16 \u00D7 81 = 1.296",
                ]}
                conclusion={"Conferindo: 6\u2074 = 6 \u00D7 6 \u00D7 6 \u00D7 6 = 1.296 \u2714"}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   PROPRIEDADE 5: Pot\u00EAncia de um Quociente
   ================================================================ */

export function PropPotenciaQuociente() {
  return (
    <section id="potencia-quociente" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={5} color="bg-chart-5/20 text-chart-5" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {"Pot\u00EAncia de um Quociente"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {"Distribui o expoente para numerador e denominador"}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            (a / b)<sup>n</sup> = a<sup>n</sup> / b<sup>n</sup>
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Como funciona?
            </h3>
            <p className="text-foreground leading-relaxed">
              {"Semelhante ao produto, quando temos uma "}
              <strong className="text-primary">{"divis\u00E3o elevada a um expoente"}</strong>
              {", distribu\u00EDmos o expoente tanto para o "}
              <strong className="text-accent">numerador</strong>
              {" quanto para o "}
              <strong className="text-accent">denominador</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplo passo a passo
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <FormulaBox className="mb-4">
                (4 / 2)<sup>3</sup>
              </FormulaBox>
              <StepByStep
                steps={[
                  { text: "(4 / 2)\u00B3 = (4/2) \u00D7 (4/2) \u00D7 (4/2)" },
                  { text: "= (4 \u00D7 4 \u00D7 4) / (2 \u00D7 2 \u00D7 2)" },
                  { text: "= 4\u00B3 / 2\u00B3" },
                  { text: "= 64 / 8 = 8", highlight: true },
                ]}
              />
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-accent font-medium">
                  {"Conferindo: (4/2)\u00B3 = 2\u00B3 = 8 \u2714"}
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mais exemplos
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <DetailedExampleCard
                title={"(6 / 3)\u00B2"}
                steps={[
                  "Distribui: 6\u00B2 / 3\u00B2",
                  "6\u00B2 = 6 \u00D7 6 = 36",
                  "3\u00B2 = 3 \u00D7 3 = 9",
                  "36 \u00F7 9 = 4",
                ]}
                conclusion={"Conferindo: (6/3)\u00B2 = 2\u00B2 = 4 \u2714"}
              />
              <DetailedExampleCard
                title={"(10 / 5)\u00B3"}
                steps={[
                  "Distribui: 10\u00B3 / 5\u00B3",
                  "10\u00B3 = 10 \u00D7 10 \u00D7 10 = 1.000",
                  "5\u00B3 = 5 \u00D7 5 \u00D7 5 = 125",
                  "1.000 \u00F7 125 = 8",
                ]}
                conclusion={"Conferindo: (10/5)\u00B3 = 2\u00B3 = 8 \u2714"}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   PROPRIEDADE 6: Expoente Zero
   ================================================================ */

export function PropExpoenteZero() {
  return (
    <section id="expoente-zero" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={6} color="bg-primary/20 text-primary" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Expoente Zero
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {"Todo n\u00FAmero elevado a zero \u00E9 igual a 1"}
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            a<sup>0</sup> = 1 &nbsp;&nbsp;&nbsp; (a &ne; 0)
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Por que isso funciona?
            </h3>
            <p className="text-foreground leading-relaxed">
              {"Parece estranho, mas faz total sentido! Veja: pela propriedade da divis\u00E3o, se dividimos uma pot\u00EAncia por ela mesma, temos expoente "}
              <strong className="text-primary">m - m = 0</strong>
              {". Mas qualquer n\u00FAmero dividido por ele mesmo \u00E9 "}
              <strong className="text-accent">1</strong>!
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              {"Entendendo com a divis\u00E3o"}
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <StepByStep
                steps={[
                  { text: "Sabemos que: a\u00B3 : a\u00B3 = 1 (qualquer n\u00FAmero dividido por ele mesmo)" },
                  { text: "Pela propriedade da divis\u00E3o: a\u00B3 : a\u00B3 = a\u00B3\u207B\u00B3 = a\u2070" },
                  { text: "Ent\u00E3o: a\u2070 = 1", highlight: true },
                ]}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { base: "5", result: "1" },
                { base: "100", result: "1" },
                { base: "(\u22123)", result: "1" },
                { base: "999", result: "1" },
              ].map((item, i) => (
                <AnimateOnScroll key={i} animation="animate-scale-in" delay={i * 100}>
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <div className="font-mono text-lg text-foreground">
                      {item.base}<sup className="text-primary">0</sup>
                    </div>
                    <div className="text-2xl font-bold text-accent mt-2">{item.result}</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <div className="mt-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
            <p className="text-sm text-foreground">
              <strong className="text-destructive">{"Aten\u00E7\u00E3o:"}</strong>
              {" 0\u2070 \u00E9 uma indetermina\u00E7\u00E3o! A regra do expoente zero s\u00F3 vale quando a base \u00E9 diferente de zero."}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   PROPRIEDADE 7: Expoente Negativo
   ================================================================ */

export function PropExpoenteNegativo() {
  return (
    <section id="expoente-negativo" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-4 mb-6">
            <SectionBadge number={7} color="bg-accent/20 text-accent" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Expoente Negativo
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Inverte a base e o expoente fica positivo
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            a<sup>-n</sup> = 1 / a<sup>n</sup> &nbsp;&nbsp;&nbsp; (a &ne; 0)
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Como funciona?
            </h3>
            <p className="text-foreground leading-relaxed">
              {"Um expoente negativo n\u00E3o significa que o resultado ser\u00E1 negativo! Ele indica o "}
              <strong className="text-accent">inverso</strong>
              {" da pot\u00EAncia. \u00C9 como se o n\u00FAmero fosse para o "}
              <strong className="text-primary">{"\"outro lado da fra\u00E7\u00E3o\""}</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Exemplo passo a passo
            </h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <FormulaBox className="mb-4">
                2<sup>-3</sup>
              </FormulaBox>
              <StepByStep
                steps={[
                  { text: "2\u207B\u00B3 = 1 / 2\u00B3" },
                  { text: "= 1 / (2 \u00D7 2 \u00D7 2)" },
                  { text: "= 1 / 8", highlight: true },
                ]}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Mais exemplos
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <DetailedExampleCard
                title={"5\u207B\u00B2"}
                steps={[
                  "5\u207B\u00B2 = 1 / 5\u00B2",
                  "5\u00B2 = 5 \u00D7 5 = 25",
                ]}
                conclusion={"Resultado: 1/25 = 0,04"}
              />
              <DetailedExampleCard
                title={"10\u207B\u00B9"}
                steps={[
                  "10\u207B\u00B9 = 1 / 10\u00B9",
                  "10\u00B9 = 10",
                ]}
                conclusion={"Resultado: 1/10 = 0,1"}
              />
              <DetailedExampleCard
                title={"3\u207B\u2074"}
                steps={[
                  "3\u207B\u2074 = 1 / 3\u2074",
                  "3\u2074 = 3 \u00D7 3 \u00D7 3 \u00D7 3 = 81",
                ]}
                conclusion={"Resultado: 1/81"}
              />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Dica: Caminho inverso
            </h3>
            <p className="text-foreground text-sm leading-relaxed mb-3">
              {"Isso tamb\u00E9m funciona ao contr\u00E1rio! Se temos uma fra\u00E7\u00E3o, podemos escrever com expoente negativo:"}
            </p>
            <div className="flex items-center justify-center gap-4 font-mono text-lg">
              <span className="text-foreground">1 / a<sup className="text-primary">n</sup></span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <span className="text-accent font-bold">a<sup>-n</sup></span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   Shared: DetailedExampleCard
   ================================================================ */

function DetailedExampleCard({
  title,
  steps,
  conclusion,
}: {
  title: string
  steps: string[]
  conclusion: string
}) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/80">
      <div className="font-mono text-lg font-bold text-primary mb-3">{title}</div>
      <div className="flex flex-col gap-1.5 mb-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs text-muted-foreground mt-0.5 shrink-0">{i + 1}.</span>
            <code className="font-mono text-sm text-foreground">{step}</code>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-border">
        <code className="font-mono text-sm font-bold text-accent">{conclusion}</code>
      </div>
    </div>
  )
}
