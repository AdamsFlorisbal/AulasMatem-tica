"use client"

import { useState } from "react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  FormulaBox,
  StepByStep,
  DetailedExampleCard,
  CalcWrapper,
  CalcInput,
  CalcResult,
  SectionHeader,
} from "@/components/shared/section-primitives"

const B1 = "bg-chart-3/20 text-chart-3"
const B2 = "bg-primary/20 text-primary"

/* ================================================================
   SEÇÃO 10 — Ideias da Multiplicação e Divisão
   ================================================================ */
export function IdeiasMultiplicacaoDivisao({ idx }: { idx?: number }) {
  return (
    <section id="ideias-mult-div" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={10} badgeColor={B2} title="Ideias da Multiplicação e Divisão" subtitle="Diferentes formas de interpretar e resolver problemas" />

        <AnimateOnScroll delay={200}>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent font-bold flex items-center justify-center">×</span>
                <h3 className="font-bold text-accent text-lg">Ideias da Multiplicação</h3>
              </div>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex gap-2">
                  <strong className="text-accent shrink-0">1. Adição de parcelas iguais:</strong>
                  <span>Comprar 4 cadernos de R$ 5,00. (5 + 5 + 5 + 5 = 4 × 5)</span>
                </li>
                <li className="flex gap-2">
                  <strong className="text-accent shrink-0">2. Disposição retangular:</strong>
                  <span>Cadeiras de um teatro com 5 fileiras de 8 cadeiras. (5 × 8 = 40)</span>
                </li>
                <li className="flex gap-2">
                  <strong className="text-accent shrink-0">3. Combinações:</strong>
                  <span>Montar um lanche com 3 tipos de pão e 4 recheios. (3 × 4 = 12 pares)</span>
                </li>
                <li className="flex gap-2">
                  <strong className="text-accent shrink-0">4. Proporcionalidade:</strong>
                  <span>Uma receita usa 2 ovos. Para fazer o triplo, usamos 2 × 3 = 6 ovos.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-chart-5/10 border border-chart-5/20 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-chart-5/20 text-chart-5 font-bold flex items-center justify-center">÷</span>
                <h3 className="font-bold text-chart-5 text-lg">Ideias da Divisão</h3>
              </div>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex gap-2">
                  <strong className="text-chart-5 shrink-0">1. Repartir em partes iguais:</strong>
                  <span>Distribuir 20 balas igualmente entre 4 amigos. (20 ÷ 4 = 5 cada)</span>
                </li>
                <li className="flex gap-2">
                  <strong className="text-chart-5 shrink-0">2. Medida (quantas vezes cabe):</strong>
                  <span>Quantas caixas de 5 kg cabem em um caminhão de 50 kg? (50 ÷ 5 = 10 caixas)</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6 space-y-4">
            <h3 className="font-bold text-primary mb-2">Resolvendo Problemas Práticos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailedExampleCard title="Problema de Combinação" steps={["Temos 3 camisas (Azul, Branca, Verde) e 2 calças (Jeans, Preta).", "Quantas combinações são possíveis?", "3 camisas × 2 calças = 6"]} conclusion="6 visuais diferentes" />
              <DetailedExampleCard title="Problema de Medida" steps={["Você tem uma fita de 12 metros.", "Quer cortar em pedaços de 3 metros.", "Quantos pedaços vai obter?", "12 ÷ 3 = 4 (O 3 'cabe' 4 vezes no 12)."]} conclusion="4 pedaços" />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 11 — Propriedades da Multiplicação e Calculadora
   ================================================================ */
export function PropriedadesCalculadora() {
  const [va, setVa] = useState("12")
  const [vb, setVb] = useState("3")
  const [vc, setVc] = useState("5")

  const a = parseInt(va) || 0, b = parseInt(vb) || 0, c = parseInt(vc) || 0

  return (
    <section id="propriedades-calculadora" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={11} badgeColor={B1} title="Propriedades e Uso da Calculadora" subtitle="Compreendendo como as operações se comportam" />

        <AnimateOnScroll delay={200}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
             <p className="text-foreground leading-relaxed mb-4">Investigar com uma calculadora nos permite ver rapidamente regras poderosas sobre multiplicação e divisão.</p>
             <div className="grid md:grid-cols-3 gap-4">
               <div className="bg-card border border-border rounded-lg p-4">
                 <h4 className="font-bold text-primary text-sm uppercase mb-1">Comutativa</h4>
                 <p className="text-xs text-muted-foreground mb-2">A ordem dos fatores não altera o produto.</p>
                 <FormulaBox>{`a × b = b × a`}</FormulaBox>
               </div>
               <div className="bg-card border border-border rounded-lg p-4">
                 <h4 className="font-bold text-accent text-sm uppercase mb-1">Associativa</h4>
                 <p className="text-xs text-muted-foreground mb-2">Podemos agrupar como quisermos.</p>
                 <FormulaBox>{`(a × b) × c = a × (b × c)`}</FormulaBox>
               </div>
               <div className="bg-card border border-border rounded-lg p-4">
                 <h4 className="font-bold text-chart-3 text-sm uppercase mb-1">Distributiva</h4>
                 <p className="text-xs text-muted-foreground mb-2">Multiplicando uma soma.</p>
                 <FormulaBox>{`a × (b + c) = a×b + a×c`}</FormulaBox>
               </div>
             </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <CalcWrapper title="Laboratório Interativo">
            <p className="text-xs text-muted-foreground mb-4">Mude os números para ver as propriedades acontecendo em tempo real (como em uma calculadora).</p>
            <div className="flex flex-wrap items-end gap-3 mb-5">
              <CalcInput label="a" value={va} onChange={setVa} max={999} min={0} />
              <CalcInput label="b" value={vb} onChange={setVb} max={999} min={0} />
              <CalcInput label="c" value={vc} onChange={setVc} max={999} min={0} />
            </div>
            
            <CalcResult>
               <div className="space-y-4">
                 <div className="p-3 bg-secondary/30 rounded border border-border">
                    <p className="text-xs font-bold text-primary uppercase mb-1">teste 1: A ordem altera na Multiplicação?</p>
                    <div className="flex items-center justify-center gap-8 font-mono">
                      <span className="text-accent">{a} × {b} = <strong>{a * b}</strong></span>
                      <strong className="text-foreground">=</strong>
                      <span className="text-accent">{b} × {a} = <strong>{b * a}</strong></span>
                    </div>
                 </div>

                 <div className="p-3 bg-secondary/30 rounded border border-border">
                    <p className="text-xs font-bold text-chart-4 uppercase mb-1">teste 2: E na Divisão, a ordem importa?</p>
                    <div className="flex items-center justify-center gap-8 font-mono">
                      <span className="text-chart-4">{a} ÷ {b} = {b ? (a / b).toFixed(2) : "Erro"}</span>
                      <strong className="text-destructive">≠</strong>
                      <span className="text-chart-4">{b} ÷ {a} = {a ? (b / a).toFixed(2) : "Erro"}</span>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-2">Sim! A divisão <strong>não</strong> é comutativa.</p>
                 </div>

                 <div className="p-3 bg-secondary/30 rounded border border-border">
                    <p className="text-xs font-bold text-chart-3 uppercase mb-1">teste 3: Distribuindo a Multiplicação</p>
                    <div className="flex flex-col items-center gap-2 font-mono text-sm">
                      <span className="text-chart-3">{a} × ({b} + {c}) = {a} × {b + c} = <strong>{a * (b + c)}</strong></span>
                      <strong className="text-foreground">É igual a...</strong>
                      <span className="text-chart-3">({a} × {b}) + ({a} × {c}) = {a * b} + {a * c} = <strong>{a * b + a * c}</strong></span>
                    </div>
                 </div>
               </div>
            </CalcResult>
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ================================================================
   SEÇÃO 12 — Expressões Numéricas
   ================================================================ */
export function ExpressoesNumericas() {
  const [expr, setExpr] = useState("10 + 2 * ( 15 - 5 ) / 2")

  function handleEval() {
     try {
       const str = expr.replace(/[^\d\+\-\*\/\(\)\[\]\{\} ]/g, "")
       const evalFn = new Function("return " + str.replace(/\[/g, '(').replace(/\]/g, ')').replace(/\{/g, '(').replace(/\}/g, ')'))
       return evalFn()
     } catch(e) {
       return "Inválida"
     }
  }

  return (
    <section id="expressoes" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={12} badgeColor={B2} title="Expressões Numéricas" subtitle="As regras de prioridade das operações" />

        <AnimateOnScroll delay={200}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6 space-y-4">
             <p className="text-foreground leading-relaxed">Quando juntamos várias operações numa mesma conta, temos uma <strong className="text-primary">expressão numérica</strong>. Para não errar o resultado, existe uma ordem rigorosa a seguir!</p>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-accent pl-4">
                   <h3 className="font-bold text-accent text-sm uppercase mb-2">1ª Regra: O que resolver primeiro?</h3>
                   <ul className="text-sm space-y-2 text-muted-foreground">
                      <li><strong>1º)</strong> Multiplicações (×) e Divisões (÷) <em>(na ordem em que aparecem)</em>.</li>
                      <li><strong>2º)</strong> Adições (+) e Subtrações (−) <em>(na ordem em que aparecem)</em>.</li>
                   </ul>
                </div>
                <div className="border-l-4 border-chart-3 pl-4">
                   <h3 className="font-bold text-chart-3 text-sm uppercase mb-2">2ª Regra: Sinais de Associação</h3>
                   <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>Quando existem parênteses, a prioridade muda!</li>
                      <li><strong>1º)</strong> Primeiro resolve-se dentro dos Parênteses <strong>( )</strong></li>
                      <li><strong>2º)</strong> Depois Colchetes <strong>[ ]</strong>, se houver.</li>
                      <li><strong>3º)</strong> Depois Chaves <strong>{"{ }"}</strong>, se houver.</li>
                   </ul>
                </div>
             </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">12 + 8 ÷ 2 − (3 × 2)</FormulaBox>
            <StepByStep steps={[
              { text: "1. Resolver dentro dos parênteses: (3 × 2) = 6" },
              { text: "Expressão fica: 12 + 8 ÷ 2 − 6" },
              { text: "2. Resolver multiplicação ou divisão: 8 ÷ 2 = 4" },
              { text: "Expressão fica: 12 + 4 − 6" },
              { text: "3. Resolver soma e subtração da esquerda pra direita" },
              { text: "12 + 4 = 16  →  16 − 6 = 10", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <CalcWrapper title="Testador de Expressões (Símbolos +, -, *, / e Parênteses)">
             <div className="flex flex-col gap-2 mb-4">
                <input 
                  type="text" 
                  value={expr} 
                  onChange={e => setExpr(e.target.value)} 
                  className="w-full font-mono px-4 py-3 rounded-lg border border-border bg-card text-foreground"
                  placeholder="Ex: 5 + 3 * 2"
                />
             </div>
             {expr && (
               <CalcResult>
                  <p className="text-center font-mono text-xl text-primary font-bold">
                     = {handleEval()}
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-2">Dica: lembre de usar * para multiplicar e / para dividir!</p>
               </CalcResult>
             )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
