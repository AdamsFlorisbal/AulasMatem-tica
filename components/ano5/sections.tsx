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
const B1 = "bg-chart-4/20 text-chart-4"
const B2 = "bg-accent/20 text-accent"

/* ================================================================
   SEÇÃO 1 — Leitura e Representação de Decimais
   ================================================================ */
export function DecimaisLeitura() {
  const [val, setVal] = useState("3.75")
  const n = parseFloat(val)
  const valid = !isNaN(n) && isFinite(n)

  function decompose(x: number) {
    const int = Math.floor(Math.abs(x))
    const dec = (Math.abs(x) - int).toFixed(6).slice(2)
    const d = parseInt(dec[0] ?? "0")
    const c = parseInt(dec[1] ?? "0")
    const m = parseInt(dec[2] ?? "0")
    return { int, d, c, m }
  }

  const parts = valid ? decompose(n) : null

  return (
    <section id="leitura" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={1} badgeColor={B1} title="Leitura de Decimais" subtitle="Casas decimais: décimos, centésimos e milésimos" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            0,1 = 1/10 &nbsp;&nbsp; 0,01 = 1/100 &nbsp;&nbsp; 0,001 = 1/1000
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Como funciona?</h3>
            <p className="text-foreground leading-relaxed">
              Cada algarismo após a vírgula tem um <strong className="text-chart-4">valor posicional</strong>: o primeiro é o <strong className="text-primary">décimo (1/10)</strong>, o segundo é o <strong className="text-accent">centésimo (1/100)</strong> e o terceiro é o <strong className="text-chart-3">milésimo (1/1000)</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Exemplo passo a passo</h3>
            <div className="rounded-xl bg-secondary/30 p-6">
              <FormulaBox className="mb-4">3,75</FormulaBox>
              <StepByStep steps={[
                { text: "3 → parte inteira (3 unidades)" },
                { text: "7 → sete décimos (7/10 = 0,7)" },
                { text: "5 → cinco centésimos (5/100 = 0,05)" },
                { text: "3,75 = 3 + 7/10 + 5/100 = 3 + 0,7 + 0,05", highlight: true },
              ]} />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="0,4" steps={["0 unidades", "4 décimos = 4/10"]} conclusion="Lê-se: zero vírgula quatro" />
            <DetailedExampleCard title="2,056" steps={["2 unidades", "0 décimos", "5 centésimos", "6 milésimos"]} conclusion="Lê-se: dois vírgula zero cinquenta e seis" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número decimal</label>
                <input type="text" value={val} onChange={e => setVal(e.target.value)} placeholder="ex: 3,75" className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
              </div>
            </div>
            {valid && parts && (
              <CalcResult>
                <div className="font-mono text-base text-center space-y-1">
                  <p><strong className="text-chart-4">{n.toFixed(3).replace(".", ",")}</strong></p>
                  <p className="text-sm text-muted-foreground">{parts.int} <span className="text-foreground">unidades</span> + {parts.d} <span className="text-primary">décimos</span> + {parts.c} <span className="text-accent">centésimos</span> + {parts.m} <span className="text-chart-3">milésimos</span></p>
                  <p className="text-lg font-bold text-chart-4">= {parts.int} + {parts.d}/10 + {parts.c}/100 + {parts.m}/1000</p>
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 2 — Comparação de Decimais
   ================================================================ */
export function DecimaisComparacao() {
  const [a, setA] = useState("0.8")
  const [b, setB] = useState("0.72")
  const na = parseFloat(a), nb = parseFloat(b)
  const valid = !isNaN(na) && !isNaN(nb)
  const sym = valid ? (na > nb ? ">" : na < nb ? "<" : "=") : null

  return (
    <section id="comparacao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={2} badgeColor={B2} title="Comparação de Decimais" subtitle="Compare alinhando pela vírgula, dígito a dígito" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            Para comparar: alinhe as vírgulas e compare da esquerda para a direita
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Como funciona?</h3>
            <p className="text-foreground leading-relaxed">
              Complete os decimais com <strong className="text-primary">zeros à direita</strong> até ficarem com o mesmo número de casas. Depois compare dígito por dígito da esquerda para a direita.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">0,8 vs 0,72</FormulaBox>
            <StepByStep steps={[
              { text: "Complete: 0,80 e 0,72 (mesma quantidade de casas)" },
              { text: "Décimos: 8 > 7" },
              { text: "Conclusão: 0,8 > 0,72", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="0,5 vs 0,50" steps={["0,50 = 0,5 (zero à direita não muda)"]} conclusion="0,5 = 0,50" />
            <DetailedExampleCard title="1,3 vs 1,29" steps={["1,30 vs 1,29", "Décimos: 3 > 2"]} conclusion="1,3 > 1,29" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número A</label><input type="text" value={a} onChange={e => setA(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número B</label><input type="text" value={b} onChange={e => setB(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
            </div>
            {valid && sym && (
              <CalcResult>
                <div className="text-center font-mono text-2xl font-bold text-accent">
                  {a.replace(".", ",")} <span className="text-primary mx-3 text-3xl">{sym}</span> {b.replace(".", ",")}
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 3 — Adição de Decimais
   ================================================================ */
export function DecimaisAdicao() {
  const [a, setA] = useState("2.35")
  const [b, setB] = useState("1.4")
  const na = parseFloat(a), nb = parseFloat(b)
  const valid = !isNaN(na) && !isNaN(nb)
  const result = valid ? na + nb : null

  return (
    <section id="adicao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={3} badgeColor={B1} title="Adição de Decimais" subtitle="Alinhe a vírgula e some coluna a coluna" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>2,35 + 1,40 = 3,75</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              O segredo da adição de decimais é <strong className="text-primary">alinhar a vírgula</strong>. Complete com zeros se necessário, e some normalmente coluna por coluna, da direita para a esquerda.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">2,35 + 1,4</FormulaBox>
            <StepByStep steps={[
              { text: "Complete: 2,35 + 1,40 (igualando casas decimais)" },
              { text: "Some os centésimos: 5 + 0 = 5" },
              { text: "Some os décimos: 3 + 4 = 7" },
              { text: "Some as unidades: 2 + 1 = 3" },
              { text: "Resultado: 3,75", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="0,7 + 0,5" steps={["0,70 + 0,50", "Décimos: 7+5=12 → escreve 2, vai 1", "Unidades: 0+0+1=1"]} conclusion="= 1,2" />
            <DetailedExampleCard title="3,14 + 2,8" steps={["3,14 + 2,80", "Centésimos: 4+0=4", "Décimos: 1+8=9", "Unidades: 3+2=5"]} conclusion="= 5,94" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Parcela A</label><input type="text" value={a} onChange={e => setA(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Parcela B</label><input type="text" value={b} onChange={e => setB(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
            </div>
            {valid && result !== null && (
              <CalcResult>
                <div className="font-mono text-base text-center text-foreground">{a.replace(".", ",")} + {b.replace(".", ",")} =</div>
                <div className="text-center text-2xl font-bold text-accent font-mono">{result.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 6 })}</div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 4 — Subtração de Decimais
   ================================================================ */
export function DecimaisSubtracao() {
  const [a, setA] = useState("5.3")
  const [b, setB] = useState("2.75")
  const na = parseFloat(a), nb = parseFloat(b)
  const valid = !isNaN(na) && !isNaN(nb)
  const result = valid ? na - nb : null

  return (
    <section id="subtracao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={4} badgeColor={B2} title="Subtração de Decimais" subtitle="Alinhe a vírgula e subtraia com empréstimo se necessário" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>5,30 − 2,75 = 2,55</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              Igual à adição: <strong className="text-primary">alinhe a vírgula</strong>, complete com zeros e subtraia da direita para a esquerda. Use <strong className="text-accent">empréstimo</strong> quando necessário.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">5,3 − 2,75</FormulaBox>
            <StepByStep steps={[
              { text: "Complete: 5,30 − 2,75" },
              { text: "Centésimos: 0 − 5 → peço empréstimo: 10 − 5 = 5" },
              { text: "Décimos (com empréstimo): 2 − 7 → peço empréstimo: 12 − 7 = 5" },
              { text: "Unidades (com empréstimo): 4 − 2 = 2" },
              { text: "Resultado: 2,55", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="4,0 − 1,8" steps={["4,0 − 1,8", "Décimos: 0 − 8 → empréstimo: 10 − 8 = 2", "Unidades: 3 − 1 = 2"]} conclusion="= 2,2" />
            <DetailedExampleCard title="10,5 − 6,35" steps={["10,50 − 6,35", "Centésimos: 0−5 → emp.: 10−5=5", "Décimos: 4−3=1", "Unidades: 0−6 → emp.: 10−6=4", "Dezena: 0"]} conclusion="= 4,15" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Minuendo A</label><input type="text" value={a} onChange={e => setA(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subtraendo B</label><input type="text" value={b} onChange={e => setB(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
            </div>
            {valid && result !== null && (
              <CalcResult>
                <div className="font-mono text-base text-center text-foreground">{a.replace(".", ",")} − {b.replace(".", ",")} =</div>
                <div className="text-center text-2xl font-bold text-accent font-mono">{result.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 6 })}</div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 5 — Multiplicação de Decimais
   ================================================================ */
export function DecimaisMultiplicacao() {
  const [a, setA] = useState("0.3")
  const [b, setB] = useState("0.2")
  const na = parseFloat(a), nb = parseFloat(b)
  const valid = !isNaN(na) && !isNaN(nb)

  function countDecimals(s: string): number {
    const dot = s.indexOf(".")
    return dot < 0 ? 0 : s.length - dot - 1
  }

  const casasA = countDecimals(a)
  const casasB = countDecimals(b)
  const totalCasas = casasA + casasB
  const result = valid ? na * nb : null

  return (
    <section id="multiplicacao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={5} badgeColor={B1} title="Multiplicação de Decimais" subtitle="Multiplique como inteiros e conte as casas decimais" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            0,3 × 0,2 = 0,06 &nbsp; (1+1 = 2 casas decimais)
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              Multiplique os números <strong className="text-primary">ignorando a vírgula</strong>. Depois, some a quantidade de casas decimais dos dois fatores e coloque a vírgula no resultado.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">1,5 × 0,4</FormulaBox>
            <StepByStep steps={[
              { text: "Ignore a vírgula: 15 × 4 = 60" },
              { text: "1,5 tem 1 casa; 0,4 tem 1 casa → total: 2 casas" },
              { text: "Coloque 2 casas em 60 → 0,60 = 0,6" },
              { text: "1,5 × 0,4 = 0,6", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="0,5 × 4" steps={["5 × 4 = 20", "0,5 tem 1 casa decimal", "Resultado: 2,0"]} conclusion="= 2" />
            <DetailedExampleCard title="1,2 × 1,5" steps={["12 × 15 = 180", "1 + 1 = 2 casas decimais", "180 → 1,80"]} conclusion="= 1,8" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fator A</label><input type="text" value={a} onChange={e => setA(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fator B</label><input type="text" value={b} onChange={e => setB(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
            </div>
            {valid && result !== null && (
              <CalcResult>
                <p className="font-mono text-sm text-center text-foreground">{a.replace(".", ",")} tem <strong className="text-primary">{casasA}</strong> casa(s) + {b.replace(".", ",")} tem <strong className="text-primary">{casasB}</strong> casa(s) = <strong className="text-accent">{totalCasas}</strong> casas decimais</p>
                <div className="text-center text-2xl font-bold text-accent font-mono">= {result.toLocaleString("pt-BR", { maximumFractionDigits: 8 })}</div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 6 — Divisão de Decimais
   ================================================================ */
export function DecimaisDivisao() {
  const [a, setA] = useState("1.8")
  const [b, setB] = useState("3")
  const na = parseFloat(a), nb = parseFloat(b)
  const valid = !isNaN(na) && !isNaN(nb) && nb !== 0
  const result = valid ? na / nb : null

  return (
    <section id="divisao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={6} badgeColor={B2} title="Divisão de Decimais" subtitle="Divida o decimal por um número inteiro" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            1,8 ÷ 3 = 0,6 &nbsp;&nbsp;&nbsp; 2,5 ÷ 10 = 0,25
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              Divida normalmente como se fosse inteiro, mantendo a vírgula. Dividir por <strong className="text-primary">10</strong> move a vírgula 1 casa à esquerda; por <strong className="text-accent">100</strong>, 2 casas; por <strong className="text-chart-3">1000</strong>, 3 casas.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">2,4 ÷ 4</FormulaBox>
            <StepByStep steps={[
              { text: "Divida como se fosse: 24 ÷ 4 = 6" },
              { text: "2,4 tem 1 casa decimal → resultado também tem 1 casa" },
              { text: "6 → 0,6" },
              { text: "2,4 ÷ 4 = 0,6", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="3,6 ÷ 6" steps={["36 ÷ 6 = 6", "1 casa decimal → 0,6"]} conclusion="= 0,6" />
            <DetailedExampleCard title="4,5 ÷ 100" steps={["Move vírgula 2 casas à esq.", "4,5 → 0,045"]} conclusion="= 0,045" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dividendo</label><input type="text" value={a} onChange={e => setA(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Divisor</label><input type="text" value={b} onChange={e => setB(e.target.value)} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" /></div>
            </div>
            {nb === 0 && <p className="text-xs text-destructive mb-3">⚠ Divisão por zero não é permitida!</p>}
            {valid && result !== null && (
              <CalcResult>
                <div className="font-mono text-base text-center text-foreground">{a.replace(".", ",")} ÷ {b.replace(".", ",")} =</div>
                <div className="text-center text-2xl font-bold text-accent font-mono">{result.toLocaleString("pt-BR", { maximumFractionDigits: 8 })}</div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
