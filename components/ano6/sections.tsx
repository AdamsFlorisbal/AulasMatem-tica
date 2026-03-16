import { useState } from "react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  FormulaBox,
  StepByStep,
  DetailedExampleCard,
  CalcWrapper,
  CalcInput,
  fmtResult,
  CalcResult,
  SectionHeader,
} from "@/components/shared/section-primitives"

const B1 = "bg-chart-3/20 text-chart-3"
const B2 = "bg-primary/20 text-primary"

/* ================================================================
   Helpers matemáticos
   ================================================================ */
function mdc(a: number, b: number): number { return b === 0 ? a : mdc(b, a % b) }
function mmc(a: number, b: number): number { return (a * b) / mdc(a, b) }

function primeFactors(n: number): number[] {
  const factors: number[] = []
  let d = 2
  while (d * d <= n) {
    while (n % d === 0) { factors.push(d); n = Math.floor(n / d) }
    d++
  }
  if (n > 1) factors.push(n)
  return factors
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false
  return true
}

function getDivisors(n: number): number[] {
  const divs: number[] = []
  for (let i = 1; i <= n; i++) if (n % i === 0) divs.push(i)
  return divs
}

function factorString(n: number): string {
  const f = primeFactors(n)
  if (f.length === 0) return `${n}`
  const map: Record<number, number> = {}
  f.forEach(p => map[p] = (map[p] ?? 0) + 1)
  return Object.entries(map).map(([p, e]) => e === 1 ? p : `${p}²`.replace("2", e > 2 ? String(e) : "²")).join(" × ")
}
export function ConjuntoNaturais() {
  const [num, setNum] = useState("15")
  const n = parseInt(num)
  const valid = !isNaN(n) && n >= 0

  return (
    <section id="conjunto" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
        <SectionHeader
          number={1}
          badgeColor={B1}
          title="O Conjunto dos Números Naturais (ℕ)"
          subtitle="Os números que utilizamos para contar coisas inteiras no dia a dia — surgiu da necessidade humana de contar objetos, animais e alimentos."
        />

        {/* Representação */}
        <AnimateOnScroll delay={200}>
          <div className="rounded-xl bg-secondary/50 p-6 space-y-4">
            <h3 className="text-base font-bold text-primary uppercase tracking-wide">1. Representação do Conjunto</h3>
            <p className="text-foreground leading-relaxed text-sm">
              Usamos a letra <strong className="text-chart-3">ℕ</strong> para representar esse conjunto.
              Ele começa pelo zero e não tem fim (é infinito).
            </p>
            <FormulaBox highlight>ℕ = {"{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, …}"}</FormulaBox>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Símbolo (…)</p>
                <p className="text-sm text-foreground">As reticências indicam que o conjunto é <strong>infinito</strong> — nunca tem fim.</p>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <p className="text-xs font-bold text-primary uppercase mb-1">ℕ* (com asterisco)</p>
                <p className="text-sm text-foreground">O zero é excluído: <strong className="text-primary">ℕ* = {"{1, 2, 3, 4, …}"}</strong></p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Sucessor e Antecessor */}
        <AnimateOnScroll delay={300}>
          <div className="rounded-xl bg-secondary/30 p-6 space-y-4">
            <h3 className="text-base font-bold text-primary uppercase tracking-wide">2. Sucessor e Antecessor</h3>
            <p className="text-sm text-foreground leading-relaxed">Para entender a ordem dos números, usamos dois conceitos simples:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-chart-3/30 bg-chart-3/5 p-4 space-y-2">
                <p className="text-sm font-bold text-chart-3">Sucessor — vem depois</p>
                <p className="text-sm text-foreground">Soma-se <strong>+1</strong> ao número.</p>
                <FormulaBox>Sucessor de 15 = 15 + 1 = <strong>16</strong></FormulaBox>
              </div>
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-2">
                <p className="text-sm font-bold text-accent">Antecessor — vem antes</p>
                <p className="text-sm text-foreground">Subtrai-se <strong>−1</strong> do número.</p>
                <FormulaBox>Antecessor de 20 = 20 − 1 = <strong>19</strong></FormulaBox>
              </div>
            </div>
            <p className="text-sm text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2">
              ⚠ Importante: o número <strong>0</strong> não possui antecessor em ℕ.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Consecutivos + Reta */}
        <AnimateOnScroll delay={400}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="text-base font-bold text-primary uppercase tracking-wide">3. Números Consecutivos</h3>
              <p className="text-sm text-foreground leading-relaxed">Números que seguem uma sequência <strong>sem saltos</strong>, cada um sendo o sucessor do anterior.</p>
              <div className="flex gap-2 flex-wrap">
                {[7, 8, 9].map(v => (
                  <span key={v} className="rounded-lg bg-chart-3/15 border border-chart-3/30 px-3 py-1.5 font-mono font-bold text-chart-3">{v}</span>
                ))}
                <span className="text-muted-foreground self-center text-sm">e também</span>
                {[100, 101, 102].map(v => (
                  <span key={v} className="rounded-lg bg-chart-3/15 border border-chart-3/30 px-3 py-1.5 font-mono font-bold text-chart-3">{v}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="text-base font-bold text-primary uppercase tracking-wide">4. A Reta Numérica</h3>
              <p className="text-sm text-foreground leading-relaxed">Os números são organizados em ordem crescente da <strong>esquerda para a direita</strong> com distâncias iguais.</p>
              <div className="flex items-center gap-1 overflow-x-auto py-2">
                {[0, 1, 2, 3, 4, 5, 6].map(v => (
                  <div key={v} className="flex flex-col items-center shrink-0">
                    <span className="text-xs font-mono font-bold text-foreground">{v}</span>
                    <span className="w-px h-3 bg-border mt-0.5" />
                  </div>
                ))}
                <span className="text-muted-foreground font-mono ml-1">→</span>
              </div>
              <p className="text-xs text-muted-foreground">Quanto mais à direita, <strong>maior</strong> o número.</p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Comparação */}
        <AnimateOnScroll delay={500}>
          <div className="rounded-xl bg-secondary/50 p-6 space-y-4">
            <h3 className="text-base font-bold text-primary uppercase tracking-wide">5. Comparação de Números</h3>
            <p className="text-sm text-foreground">Para comparar dois números naturais, utilizamos os seguintes símbolos:</p>
            <div className="grid grid-cols-3 gap-3">
              {([
                [">", "Maior que", "15 > 10"],
                ["<", "Menor que", "8 < 20"],
                ["=", "Igual a", "7 = 7"],
              ] as [string, string, string][]).map(([sym, label, ex]) => (
                <div key={sym} className="rounded-lg border border-border bg-card p-3 text-center space-y-1">
                  <span className="text-3xl font-mono font-bold text-chart-3">{sym}</span>
                  <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                  <p className="text-xs font-mono text-foreground">{ex}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center bg-secondary rounded-lg px-4 py-2">
              💡 Dica: a <strong>&quot;boca&quot;</strong> do sinal sempre fica aberta para o lado do número <strong>maior</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Calculadora */}
        <AnimateOnScroll delay={600}>
          <CalcWrapper title="Calculadora — Sucessor e Antecessor">
            <div className="flex flex-wrap items-end gap-4 mb-4">
              <CalcInput label="Número" value={num} onChange={setNum} min={0} max={99999} />
            </div>
            {valid && (
              <CalcResult>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-accent/10 border border-accent/20 p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Antecessor</p>
                    <p className="font-mono text-xl font-bold text-accent">
                      {n === 0 ? "não existe em ℕ" : n - 1}
                    </p>
                    {n > 0 && <p className="text-xs text-muted-foreground">{n} − 1 = {n - 1}</p>}
                  </div>
                  <div className="rounded-lg bg-chart-3/10 border border-chart-3/20 p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Sucessor</p>
                    <p className="font-mono text-xl font-bold text-chart-3">{n + 1}</p>
                    <p className="text-xs text-muted-foreground">{n} + 1 = {n + 1}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Consecutivos: … {n > 1 ? n - 1 : ""} {n > 0 ? n - 1 === 0 ? "0" : "" : ""}{n === 0 ? "0" : n - 1 > 0 ? `${n - 1},` : "0,"} <strong className="text-foreground">{n}</strong>, {n + 1} …
                </p>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function OperacoesNaturais() {
  const [va, setVa] = useState("15")
  const [vb, setVb] = useState("10")
  const [op, setOp] = useState<"+" | "-" | "×" | "÷">("+")

  const a = parseInt(va), b = parseInt(vb)
  const valid = !isNaN(a) && !isNaN(b) && a >= 0 && b >= 0

  let resultado: number | null = null
  let erro = ""
  if (valid) {
    if (op === "+") resultado = a + b
    else if (op === "-") { if (a >= b) resultado = a - b; else erro = "Em ℕ, só subtraímos se o minuendo ≥ subtraendo." }
    else if (op === "×") resultado = a * b
    else if (op === "÷") { if (b === 0) erro = "Divisão por zero não existe!"; else { resultado = Math.floor(a / b) } }
  }
  const resto = op === "÷" && valid && b > 0 ? a % b : null

  const TERMOS: Record<string, { cor: string; titulo: string; termos: [string, string][]; alerta?: string }> = {
    "+": { cor: "text-chart-3", titulo: "Adição (+)", termos: [["Parcelas", "Os números somados (15 e 10)"], ["Soma / Total", "O resultado da operação (25)"]], },
    "-": { cor: "text-primary", titulo: "Subtração (−)", termos: [["Minuendo", "De onde retiramos (15)"], ["Subtraendo", "O que retiramos (10)"], ["Diferença / Resto", "O resultado (5)"]], alerta: "Em ℕ, só é possível se minuendo ≥ subtraendo." },
    "×": { cor: "text-accent", titulo: "Multiplicação (×)", termos: [["Fatores", "Os números multiplicados (3 e 5)"], ["Produto", "O resultado (15)"]], },
    "÷": { cor: "text-chart-5", titulo: "Divisão (÷)", termos: [["Dividendo", "O número a dividir"], ["Divisor", "Pelo que dividimos"], ["Quociente", "O resultado da divisão"], ["Resto", "O que sobra (0 = exata)"]], alerta: "Nunca divida por zero!" },
  }
  const info = TERMOS[op]

  return (
    <section id="operacoes" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10 space-y-8">
        <SectionHeader
          number={2}
          badgeColor={B2}
          title="Operações com Números Naturais"
          subtitle="As quatro operações fundamentais permitem resolver problemas de contagem, partilha, comparação e acúmulo."
        />

        {/* Cards das 4 operações */}
        <AnimateOnScroll delay={200}>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Adição */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-chart-3/20 text-chart-3 font-bold text-lg flex items-center justify-center">+</span>
                <h3 className="font-bold text-foreground">Adição</h3>
              </div>
              <p className="text-sm text-foreground">Junta quantidades. A ordem das <strong>parcelas</strong> não altera a <strong>soma</strong> (propriedade comutativa).</p>
              <FormulaBox>15 + 10 = 25  e  10 + 15 = 25</FormulaBox>
            </div>
            {/* Subtração */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-lg flex items-center justify-center">−</span>
                <h3 className="font-bold text-foreground">Subtração</h3>
              </div>
              <p className="text-sm text-foreground">Retira uma quantidade de outra. <strong>Minuendo − Subtraendo = Diferença.</strong></p>
              <FormulaBox>20 − 8 = 12</FormulaBox>
              <p className="text-xs text-amber-500">⚠ Em ℕ: minuendo ≥ subtraendo</p>
            </div>
            {/* Multiplicação */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent font-bold text-lg flex items-center justify-center">×</span>
                <h3 className="font-bold text-foreground">Multiplicação</h3>
              </div>
              <p className="text-sm text-foreground">Adição repetida de <strong>fatores</strong> iguais. O resultado é o <strong>produto</strong>.</p>
              <FormulaBox>5 + 5 + 5 = 3 × 5 = 15</FormulaBox>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>Elemento neutro: <strong className="text-foreground">n × 1 = n</strong></p>
                <p>Elemento nulo: <strong className="text-foreground">n × 0 = 0</strong></p>
              </div>
            </div>
            {/* Divisão */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-chart-5/20 text-chart-5 font-bold text-lg flex items-center justify-center">÷</span>
                <h3 className="font-bold text-foreground">Divisão</h3>
              </div>
              <p className="text-sm text-foreground">Reparte em partes iguais. <strong>Dividendo ÷ Divisor = Quociente</strong> (com resto).</p>
              <FormulaBox>17 ÷ 5 = 3  resto 2</FormulaBox>
              <div className="text-xs space-y-0.5">
                <p className="text-muted-foreground">Exata: resto = 0 &nbsp;|&nbsp; Não exata: resto ≠ 0</p>
                <p className="text-red-500 font-semibold">🚨 Nunca divida por zero!</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Termos detalhados */}
        <AnimateOnScroll delay={300}>
          <StepByStep steps={[
            { text: "Adição: parcela + parcela = soma (total)" },
            { text: "Subtração: minuendo − subtraendo = diferença" },
            { text: "Multiplicação: fator × fator = produto" },
            { text: "Divisão: dividendo ÷ divisor = quociente (resto)", highlight: true },
          ]} />
        </AnimateOnScroll>

        {/* Calculadora interativa */}
        <AnimateOnScroll delay={400}>
          <CalcWrapper title="Calculadora — as 4 operações">
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {(["+", "-", "×", "÷"] as const).map(o => (
                <button key={o} onClick={() => setOp(o)}
                  className={`w-10 h-10 rounded-lg font-mono font-bold text-lg transition-all ${op === o ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {o}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-4 mb-4">
              <CalcInput label="Número A" value={va} onChange={setVa} min={0} max={9999} />
              <span className="text-2xl font-mono font-bold text-muted-foreground pb-2">{op}</span>
              <CalcInput label="Número B" value={vb} onChange={setVb} min={0} max={9999} />
            </div>

            {/* Termos da operação */}
            <div className="mb-4 rounded-lg border border-border bg-card/60 p-3">
              <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${info.cor}`}>{info.titulo} — Termos</p>
              <div className="grid sm:grid-cols-2 gap-1.5">
                {info.termos.map(([t, d]) => (
                  <div key={t} className="flex gap-2 text-xs">
                    <strong className="text-foreground shrink-0">{t}:</strong>
                    <span className="text-muted-foreground">{d}</span>
                  </div>
                ))}
              </div>
              {info.alerta && <p className="text-xs text-amber-500 mt-2">⚠ {info.alerta}</p>}
            </div>

            {valid && (
              <CalcResult>
                {erro ? (
                  <p className="text-sm text-destructive font-semibold text-center">{erro}</p>
                ) : resultado !== null ? (
                  <>
                    <p className="font-mono text-center text-xl font-bold text-accent">
                      {a} {op} {b} = {resultado}
                      {op === "÷" && resto !== null && resto > 0 && <span className="text-base text-muted-foreground"> (resto {resto})</span>}
                    </p>
                    {op === "÷" && resto === 0 && <p className="text-xs text-center text-primary">Divisão exata ✓ (resto = 0)</p>}
                    {op === "÷" && resto !== null && resto > 0 && <p className="text-xs text-center text-muted-foreground">Divisão não exata — resto {resto} &lt; {b}</p>}
                  </>
                ) : null}
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function NaturaisPotenciacaoRaiz() {
  return (
    <section id="potenciacao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={3} badgeColor={B1} title="Potenciação e Raiz Quadrada" subtitle="Entenda como a potenciação simplifica multiplicações e a raiz quadrada desfaz essa operação." />

        <AnimateOnScroll delay={200}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">1. Potenciação de Números Naturais</h3>
            <p className="text-foreground leading-relaxed mb-4">A potenciação é uma forma de escrever uma multiplicação de fatores iguais. Em vez de escrever $5 \times 5 \times 5$, podemos simplificar para $5^3$.</p>
            <FormulaBox>$a^n = \underbrace{a \times a \times \dots \times a}_{\text{n vezes}}$</FormulaBox>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <p className="text-center"><strong className="text-chart-3">a</strong>: Base (o número que se repete)</p>
              <p className="text-center"><strong className="text-chart-3">n</strong>: Expoente (quantas vezes a base se repete)</p>
              <p className="text-center"><strong className="text-chart-3">aⁿ</strong>: Potência (o resultado)</p>
            </div>
            <div className="mt-4 flex justify-center">
              <DetailedExampleCard title="Exemplo: 2⁴" steps={["Base: 2, Expoente: 4", "$2^4 = 2 \times 2 \times 2 \times 2 = 16$"]} conclusion="Leitura: dois elevado à quarta potência" />
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">Casos Especiais</h3>
            <p><strong className="text-chart-3">Expoente 1:</strong> Todo número elevado a 1 é ele mesmo. <FormulaBox>$7^1 = 7$</FormulaBox></p>
            <p className="mt-2"><strong className="text-chart-3">Expoente 0:</strong> Todo número (diferente de zero) elevado a 0 é igual a 1. <FormulaBox>$9^0 = 1$</FormulaBox></p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">2. Potências de Base 10</h3>
            <p className="text-foreground leading-relaxed mb-4">As potências de base 10 são muito úteis para representar números grandes. O expoente indica a quantidade de zeros após o número 1.</p>
            <StepByStep steps={[
              { text: "$10^0 = 1$" },
              { text: "$10^1 = 10$" },
              { text: "$10^2 = 100$" },
              { text: "$10^3 = 1000$" },
              { text: "$10^6 = 1.000.000$ (um milhão)", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">3. Raiz Quadrada Exata</h3>
            <p className="text-foreground leading-relaxed mb-4">A raiz quadrada é a operação inversa da potenciação com expoente 2. Perguntar "Qual a raiz quadrada de 25?" é o mesmo que perguntar "Que número elevado ao quadrado dá 25?".</p>
            <div className="flex justify-center gap-4">
              <FormulaBox>$\sqrt{25} = 5$</FormulaBox>
              <FormulaBox>porque $5^2 = 25$</FormulaBox>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">Apenas números que são "quadrados perfeitos" (resultado de um número multiplicado por ele mesmo) têm raiz quadrada exata.</p>
            <div className="mt-4 flex justify-center">
              <DetailedExampleCard title="Quadrados Perfeitos" steps={["$1^2=1 \rightarrow \sqrt{1}=1$", "$2^2=4 \rightarrow \sqrt{4}=2$", "$3^2=9 \rightarrow \sqrt{9}=3$", "$10^2=100 \rightarrow \sqrt{100}=10$"]} />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 1 — Divisibilidade
   ================================================================ */
export function NaturaisDivisibilidade() {
  const [val, setVal] = useState("126")
  const n = parseInt(val)
  const valid = !isNaN(n) && n > 0

  function check(x: number) {
    const digits = String(x).split("").map(Number)
    const sumD = digits.reduce((a, b) => a + b, 0)
    return {
      por2: x % 2 === 0,
      por3: sumD % 3 === 0,
      por4: x % 4 === 0,
      por5: x % 5 === 0,
      por6: x % 2 === 0 && sumD % 3 === 0,
      por9: sumD % 9 === 0,
      por10: x % 10 === 0,
      sumD,
    }
  }

  const c = valid ? check(n) : null

  return (
    <section id="divisibilidade" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={4} badgeColor={B1} title="Critérios de Divisibilidade" subtitle="Descubra os divisores sem fazer a divisão" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>{'n é divisível por d ↔ n ÷ d tem resto 0'}</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-5">
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["÷ 2", "Termina em 0, 2, 4, 6 ou 8 (número par)"],
                ["÷ 3", "Soma dos dígitos divisível por 3"],
                ["÷ 4", "Dois últimos dígitos divisíveis por 4"],
                ["÷ 5", "Termina em 0 ou 5"],
                ["÷ 6", "Divisível por 2 E por 3"],
                ["÷ 9", "Soma dos dígitos divisível por 9"],
                ["÷ 10", "Termina em 0"],
              ].map(([d, r]) => (
                <div key={d} className="flex gap-2 items-start text-sm">
                  <span className="font-mono font-bold text-chart-3 shrink-0 w-8">{d}</span>
                  <span className="text-foreground">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">126</FormulaBox>
            <StepByStep steps={[
              { text: "126 termina em 6 (par) → divisível por 2 ✔" },
              { text: "1+2+6 = 9, divisível por 3 → divisível por 3 ✔" },
              { text: "Divisível por 2 e 3 → divisível por 6 ✔" },
              { text: "126 ÷ 2 = 63; 126 ÷ 3 = 42; 126 ÷ 6 = 21", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="360" steps={["Par → ÷2 ✔", "3+6+0=9 → ÷3 ✔ e ÷9 ✔", "Termina em 0 → ÷5 ✔ e ÷10 ✔", "÷2 e ÷3 → ÷6 ✔"]} conclusion="360 é divisível por 2,3,4,5,6,9,10" />
            <DetailedExampleCard title="245" steps={["Termina em 5 → ÷5 ✔", "2+4+5=11, não ÷3", "Não par → não ÷2"]} conclusion="245 é divisível apenas por 5" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <CalcInput label="Número" value={val} onChange={setVal} min={1} max={9999} />
            </div>
            {valid && c && (
              <CalcResult>
                <p className="text-sm text-muted-foreground mb-3 text-center">Soma dos dígitos: <strong className="text-primary">{c.sumD}</strong></p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {([["÷ 2", c.por2], ["÷ 3", c.por3], ["÷ 4", c.por4], ["÷ 5", c.por5], ["÷ 6", c.por6], ["÷ 9", c.por9], ["÷ 10", c.por10]] as [string, boolean][]).map(([d, ok]) => (
                    <div key={d} className={`rounded-lg p-2 text-center text-sm font-bold border ${ok ? "bg-accent/20 text-accent border-accent/30" : "bg-secondary text-muted-foreground border-border"}`}>{d} {ok ? "✔" : "✗"}</div>
                  ))}
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
   SEÇÃO 2 — Fatoração em Primos
   ================================================================ */
export function NaturaisFatoracao() {
  const [val, setVal] = useState("60")
  const n = parseInt(val)
  const valid = !isNaN(n) && n > 1 && n <= 10000

  const factors = valid ? primeFactors(n) : []
  const factStr = valid ? factorString(n) : ""

  return (
    <section id="fatoracao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={5} badgeColor={B2} title="Fatoração em Primos" subtitle="Todo número natural é produto de fatores primos" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>{'60 = 2 × 2 × 3 × 5 = 2² × 3 × 5'}</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">Divida o número pelo menor primo possível (2, 3, 5, 7...) até chegar a 1. Os divisores usados formam a <strong className="text-chart-3">fatoração em primos</strong>.</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">60</FormulaBox>
            <StepByStep steps={[
              { text: "60 ÷ 2 = 30" },
              { text: "30 ÷ 2 = 15" },
              { text: "15 ÷ 3 = 5" },
              { text: "5 ÷ 5 = 1" },
              { text: "60 = 2² × 3 × 5", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="12" steps={["12 ÷ 2 = 6", "6 ÷ 2 = 3", "3 ÷ 3 = 1"]} conclusion="12 = 2² × 3" />
            <DetailedExampleCard title="90" steps={["90 ÷ 2 = 45", "45 ÷ 3 = 15", "15 ÷ 3 = 5", "5 ÷ 5 = 1"]} conclusion="90 = 2 × 3² × 5" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <CalcInput label="Número (≤ 10000)" value={val} onChange={setVal} min={2} max={10000} />
            </div>
            {valid && (
              <CalcResult>
                <p className="text-sm text-muted-foreground text-center mb-2">Fatores primos: {factors.join(" × ")}</p>
                <div className="text-center text-xl font-bold text-accent font-mono">{n} = {factStr}</div>
              </CalcResult>
            )}
            {n <= 1 && <p className="text-xs text-amber-500">⚠ Digite um número maior que 1</p>}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 3 — Números Primos
   ================================================================ */
export function NaturaisPrimos() {
  const [val, setVal] = useState("17")
  const n = parseInt(val)
  const valid = !isNaN(n) && n >= 2 && n <= 1000
  const primo = valid ? isPrime(n) : false
  const divisors = valid ? getDivisors(n) : []

  return (
    <section id="primos" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={6} badgeColor={B1} title="Números Primos" subtitle="Divisíveis apenas por 1 e por si mesmos" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>{'p é primo ↔ p > 1 e seus únicos divisores são 1 e p'}</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed mb-4">Os primeiros primos: <strong className="text-chart-3">2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47...</strong></p>
            <p className="text-sm text-muted-foreground">O <strong className="text-foreground">2</strong> é o único primo par. Todo número par maior que 2 é composto (divisível por 2).</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <StepByStep steps={[
              { text: "17: verificar divisores até √17 ≈ 4,1" },
              { text: "17 ÷ 2 = 8,5 (não inteiro)" },
              { text: "17 ÷ 3 = 5,67 (não inteiro)" },
              { text: "Nenhum divisor → 17 é primo!", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="15 (composto)" steps={["15 ÷ 3 = 5 (inteiro!)", "Divisores: 1, 3, 5, 15"]} conclusion="15 = 3 × 5 → NÃO é primo" />
            <DetailedExampleCard title="29 (primo)" steps={["29 ÷ 2 = 14,5", "29 ÷ 3 = 9,67", "29 ÷ 5 = 5,8"]} conclusion="29 é PRIMO ✔" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <CalcInput label="Número (2–1000)" value={val} onChange={setVal} min={2} max={1000} />
            </div>
            {valid && (
              <CalcResult>
                <div className={`text-center text-xl font-bold font-mono ${primo ? "text-accent" : "text-chart-3"}`}>
                  {n} {primo ? "é PRIMO ✔" : "NÃO é primo ✗"}
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2">Divisores: {divisors.join(", ")}</p>
                {!primo && <p className="text-sm text-center">{n} = {factorString(n)}</p>}
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 4 — MDC
   ================================================================ */
export function NaturaisMDC() {
  const [a, setA] = useState("12")
  const [b, setB] = useState("8")
  const na = parseInt(a), nb = parseInt(b)
  const valid = !isNaN(na) && !isNaN(nb) && na > 0 && nb > 0 && na <= 9999 && nb <= 9999

  const resultado = valid ? mdc(na, nb) : null
  const fa = valid ? factorString(na) : ""
  const fb = valid ? factorString(nb) : ""

  return (
    <section id="mdc" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={7} badgeColor={B2} title="MDC — Máximo Divisor Comum" subtitle="O maior número que divide dois números ao mesmo tempo" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>MDC(12, 8) = 4</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">O MDC é o <strong className="text-chart-3">produto dos fatores comuns</strong> com o <strong className="text-primary">menor expoente</strong>. Pode ser encontrado pelo método da fatoração ou pelo algoritmo de Euclides.</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">MDC(12, 18)</FormulaBox>
            <StepByStep steps={[
              { text: "12 = 2² × 3" },
              { text: "18 = 2 × 3²" },
              { text: "Fatores comuns: 2¹ e 3¹ (menores expoentes)" },
              { text: "MDC(12, 18) = 2 × 3 = 6", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="MDC(24, 36)" steps={["24 = 2³ × 3", "36 = 2² × 3²", "Comuns: 2² e 3"]} conclusion="MDC = 4 × 3 = 12" />
            <DetailedExampleCard title="MDC(15, 25)" steps={["15 = 3 × 5", "25 = 5²", "Fator comum: 5¹"]} conclusion="MDC = 5" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <CalcInput label="Número A" value={a} onChange={setA} min={1} max={9999} />
              <CalcInput label="Número B" value={b} onChange={setB} min={1} max={9999} />
            </div>
            {valid && resultado !== null && (
              <CalcResult>
                <p className="font-mono text-sm text-center">{na} = {fa}</p>
                <p className="font-mono text-sm text-center">{nb} = {fb}</p>
                <div className="text-center text-2xl font-bold text-accent font-mono mt-2">MDC({na}, {nb}) = {resultado}</div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 5 — MMC
   ================================================================ */
export function NaturaisMMC() {
  const [a, setA] = useState("4")
  const [b, setB] = useState("6")
  const na = parseInt(a), nb = parseInt(b)
  const valid = !isNaN(na) && !isNaN(nb) && na > 0 && nb > 0 && na <= 9999 && nb <= 9999

  const resultado = valid ? mmc(na, nb) : null
  const fa = valid ? factorString(na) : ""
  const fb = valid ? factorString(nb) : ""

  return (
    <section id="mmc" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={8} badgeColor={B1} title="MMC — Mínimo Múltiplo Comum" subtitle="O menor número que é múltiplo dos dois ao mesmo tempo" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>MMC(4, 6) = 12</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">O MMC é o <strong className="text-chart-3">produto de TODOS os fatores</strong> com o <strong className="text-primary">maior expoente</strong>, sejam comuns ou não.</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">MMC(4, 6)</FormulaBox>
            <StepByStep steps={[
              { text: "4 = 2²" },
              { text: "6 = 2 × 3" },
              { text: "Todos os fatores com maior expoente: 2² e 3" },
              { text: "MMC(4, 6) = 4 × 3 = 12", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="MMC(6, 9)" steps={["6 = 2 × 3", "9 = 3²", "Fatores: 2¹ e 3²"]} conclusion="MMC = 2 × 9 = 18" />
            <DetailedExampleCard title="MMC(8, 12)" steps={["8 = 2³", "12 = 2² × 3", "Fatores: 2³ e 3"]} conclusion="MMC = 8 × 3 = 24" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <CalcInput label="Número A" value={a} onChange={setA} min={1} max={9999} />
              <CalcInput label="Número B" value={b} onChange={setB} min={1} max={9999} />
            </div>
            {valid && resultado !== null && (
              <CalcResult>
                <p className="font-mono text-sm text-center">{na} = {fa}</p>
                <p className="font-mono text-sm text-center">{nb} = {fb}</p>
                <div className="text-center text-2xl font-bold text-accent font-mono mt-2">MMC({na}, {nb}) = {fmtResult(resultado)}</div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 6 — Aplicações MDC e MMC
   ================================================================ */
export function NaturaisAplicacoes() {
  const [larg, setLarg] = useState("12")
  const [comp, setComp] = useState("18")
  const nl = parseInt(larg), nc = parseInt(comp)
  const valid = !isNaN(nl) && !isNaN(nc) && nl > 0 && nc > 0 && nl <= 999 && nc <= 999
  const ladrilho = valid ? mdc(nl, nc) : null
  const total = ladrilho ? (nl / ladrilho) * (nc / ladrilho) : null

  return (
    <section id="aplicacoes" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={9} badgeColor={B2} title="Aplicações" subtitle="MDC e MMC em problemas do dia a dia" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>{'MDC → maior divisor comum · MMC → menor múltiplo comum'}</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-primary/10 border border-primary/20 p-5">
              <h3 className="text-sm font-bold text-primary mb-2">🧱 Quando usar MDC?</h3>
              <p className="text-sm text-foreground">Quando precisamos <strong>dividir</strong> em partes iguais. Ex: qual o maior ladrilho quadrado que cobre um piso sem cortes?</p>
            </div>
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-5">
              <h3 className="text-sm font-bold text-accent mb-2">🔄 Quando usar MMC?</h3>
              <p className="text-sm text-foreground">Quando precisamos encontrar o <strong>próximo encontro</strong>. Ex: dois ônibus que saem em intervalos diferentes, quando voltam juntos?</p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">Piso de 12 m × 18 m com ladrilhos quadrados</FormulaBox>
            <StepByStep steps={[
              { text: "Queremos o maior ladrilho quadrado (sem cortes)" },
              { text: "12 = 2² × 3" },
              { text: "18 = 2 × 3²" },
              { text: "MDC(12, 18) = 2 × 3 = 6 → ladrilhos de 6m × 6m", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="Ônibus A: 15 min · B: 20 min" steps={["MMC(15, 20) = ?", "15 = 3 × 5; 20 = 2² × 5", "MMC = 2² × 3 × 5 = 60"]} conclusion="Voltam juntos a cada 60 minutos" />
            <DetailedExampleCard title="Repartir 24 e 36 em grupos iguais" steps={["MDC(24, 36) = ?", "24 = 2³ × 3; 36 = 2² × 3²", "MDC = 2² × 3 = 12"]} conclusion="Grupos de 12 (maior possível)" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper title="Problema do Ladrilho">
            <p className="text-xs text-muted-foreground mb-4">Qual é o maior ladrilho quadrado que cobre o piso sem cortes?</p>
            <div className="flex flex-wrap items-end gap-4 mb-5">
              <CalcInput label="Largura (m)" value={larg} onChange={setLarg} min={1} max={999} />
              <CalcInput label="Comprimento (m)" value={comp} onChange={setComp} min={1} max={999} />
            </div>
            {valid && ladrilho !== null && total !== null && (
              <CalcResult>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">MDC({nl}, {nc}) = <strong className="text-primary">{ladrilho}</strong></p>
                  <p className="text-xl font-bold text-accent font-mono">Ladrilho: {ladrilho}m × {ladrilho}m</p>
                  <p className="text-sm text-muted-foreground">Total de ladrilhos: {total}</p>
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
