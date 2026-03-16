"use client"

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
  return (
    <section id="conjunto" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={1} badgeColor={B1} title="O Conjunto dos Números Naturais ($\mathbb{N}$)" subtitle="Os Números Naturais são aqueles que utilizamos para contar coisas inteiras no nosso dia a dia. Esse conjunto surgiu da necessidade humana de contar objetos, animais e alimentos." />

        <AnimateOnScroll delay={200}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">1. Representação do Conjunto</h3>
            <p className="text-foreground leading-relaxed mb-4">Usamos a letra maiúscula $\mathbb{N}$ para representar esse conjunto. Ele começa pelo zero e não tem fim (é infinito).</p>
            <FormulaBox>$\mathbb{N} = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, \dots\}$</FormulaBox>
            <p className="text-sm text-muted-foreground mt-4">O símbolo $(\dots)$: As reticências indicam que o conjunto é infinito.</p>
            <p className="text-sm text-muted-foreground mt-2">$\mathbb{N}^*$: Quando vemos o símbolo do asterisco, significa que o zero foi excluído do conjunto: $\mathbb{N}^* = \{1, 2, 3, 4, \dots\}$.</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">2. Sucessor e Antecessor</h3>
            <p className="text-foreground leading-relaxed mb-4">Para entender a ordem dos números, usamos dois conceitos simples:</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Sucessor:</strong> É o número que vem imediatamente depois. Para achar o sucessor, somamos 1 ao número.</p>
            <FormulaBox>Exemplo: O sucessor de 15 é $15 + 1 = 16$.</FormulaBox>
            <p className="text-foreground leading-relaxed my-2"><strong className="text-chart-3">Antecessor:</strong> É o número que vem imediatamente antes. Para achar o antecessor, subtraímos 1 do número.</p>
            <FormulaBox>Exemplo: O antecessor de 20 é $20 - 1 = 19$.</FormulaBox>
            <p className="text-sm text-amber-500 mt-4">⚠ Importante: No conjunto dos Números Naturais, o número 0 não possui antecessor.</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="3. Números Consecutivos" steps={["Números consecutivos são aqueles que seguem uma sequência sem saltos.", "Exemplo: 7, 8 e 9 são números consecutivos.", "Exemplo: 100 e 101 são números consecutivos."]} />
            <DetailedExampleCard title="4. A Reta Numérica" steps={["Podemos organizar os números naturais em uma reta para visualizar sua ordem. A distância entre cada número deve ser sempre a mesma.", "Os números crescem da esquerda para a direita.", "Quanto mais à direita um número estiver, maior ele é."]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">5. Comparação de Números</h3>
            <p className="text-foreground leading-relaxed mb-4">Para comparar dois números naturais, utilizamos os seguintes símbolos:</p>
            <div className="flex justify-center gap-4">
                <span className="font-mono text-2xl text-chart-3">&gt; (Maior que)</span>
                <span className="font-mono text-2xl text-chart-3">&lt; (Menor que)</span>
                <span className="font-mono text-2xl text-chart-3">= (Igual a)</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">Dica para os alunos: A "boca" do sinal sempre fica aberta para o lado do número maior.</p>
            <div className="mt-4 flex justify-center gap-4">
                <FormulaBox>$15 > 10$ (15 é maior que 10)</FormulaBox>
                <FormulaBox>$8 < 20$ (8 é menor que 20)</FormulaBox>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
export function OperacoesNaturais() {
  return (
    <section id="operacoes" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={2} badgeColor={B2} title="Operações com Números Naturais" subtitle="As operações fundamentais nos permitem resolver problemas de contagem, partilha, comparação e acúmulo." />

        <AnimateOnScroll delay={200}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">1. Adição (+)</h3>
            <p className="text-foreground leading-relaxed mb-4">A adição é utilizada quando precisamos juntar quantidades ou acrescentar uma quantidade a outra.</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Termos da Adição:</strong> As quantidades que somamos são chamadas de parcelas. O resultado é chamado de soma ou total.</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Propriedade Importante (Comutativa):</strong> A ordem das parcelas não altera a soma.</p>
            <FormulaBox>Exemplo: $15 + 10 = 25$ e $10 + 15 = 25$.</FormulaBox>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">2. Subtração (−)</h3>
            <p className="text-foreground leading-relaxed mb-4">A subtração é usada para retirar uma quantidade de outra, comparar valores ou descobrir quanto falta para completar uma quantidade.</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Termos da Subtração:</strong> Minuendo: A quantidade de onde vamos tirar. Subtraendo: A quantidade a ser retirada. Resto ou Diferença: O resultado da operação.</p>
            <p className="text-sm text-amber-500">⚠ Atenção: No conjunto dos Números Naturais ($\mathbb{N}$), a subtração $a - b$ só é possível se o primeiro número ($a$) for maior ou igual ao segundo ($b$).</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">3. Multiplicação ($\times$ ou $\cdot$)</h3>
            <p className="text-foreground leading-relaxed mb-4">A multiplicação é a forma resumida de escrever uma adição de parcelas iguais.</p>
            <FormulaBox>Exemplo: $5 + 5 + 5$ é o mesmo que $3 \times 5 = 15$.</FormulaBox>
            <p className="text-foreground leading-relaxed my-2"><strong className="text-chart-3">Termos da Multiplicação:</strong> Os números multiplicados são os fatores. O resultado é o produto.</p>
            <p className="text-foreground leading-relaxed my-2"><strong className="text-chart-3">Elemento Neutro:</strong> O número 1 é o elemento neutro da multiplicação. Qualquer número multiplicado por 1 é ele mesmo ($15 \cdot 1 = 15$).</p>
            <p className="text-foreground leading-relaxed"><strong className="text-chart-3">Zero na Multiplicação:</strong> Qualquer número multiplicado por 0 é igual a 0.</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <h3 className="text-lg font-bold text-primary mb-3">4. Divisão ($\div$ ou $ : $ )</h3>
            <p className="text-foreground leading-relaxed mb-4">A divisão é utilizada para repartir uma quantidade em partes iguais ou para saber quantas vezes uma quantidade cabe em outra.</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Termos da Divisão:</strong> Dividendo: O número que será dividido. Divisor: Em quantas partes vamos dividir. Quociente: O resultado da divisão. Resto: O que sobra da divisão.</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Divisão Exata:</strong> Quando o resto é igual a zero.</p>
            <p className="text-foreground leading-relaxed mb-2"><strong className="text-chart-3">Divisão Não Exata:</strong> Quando o resto é diferente de zero (mas sempre menor que o divisor).</p>
            <p className="text-sm text-red-500 font-bold">🚨 Regra de Ouro: Nunca existe divisão por zero!</p>
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
        <SectionHeader number={3} badgeColor={B1} title="Critérios de Divisibilidade" subtitle="Descubra os divisores sem fazer a divisão" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>n é divisível por d ↔ n ÷ d tem resto 0</FormulaBox>
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
        <SectionHeader number={4} badgeColor={B2} title="Fatoração em Primos" subtitle="Todo número natural é produto de fatores primos" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>60 = 2 × 2 × 3 × 5 = 2² × 3 × 5</FormulaBox>
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
        <SectionHeader number={5} badgeColor={B1} title="Números Primos" subtitle="Divisíveis apenas por 1 e por si mesmos" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>p é primo ↔ p > 1 e seus únicos divisores são 1 e p</FormulaBox>
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
        <SectionHeader number={6} badgeColor={B2} title="MDC — Máximo Divisor Comum" subtitle="O maior número que divide dois números ao mesmo tempo" />

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
        <SectionHeader number={7} badgeColor={B1} title="MMC — Mínimo Múltiplo Comum" subtitle="O menor número que é múltiplo dos dois ao mesmo tempo" />

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
        <SectionHeader number={8} badgeColor={B2} title="Aplicações" subtitle="MDC e MMC em problemas do dia a dia" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>MDC → maior divisor comum · MMC → menor múltiplo comum</FormulaBox>
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
