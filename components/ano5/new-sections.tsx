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

const B1 = "bg-chart-4/20 text-chart-4"
const B2 = "bg-accent/20 text-accent"
const B3 = "bg-primary/20 text-primary"
const B4 = "bg-chart-3/20 text-chart-3"

export function NumerosAteSeisAlgarismos({ number }: { number: number }) {
  const [val, setVal] = useState("345678")
  const n = parseInt(val.replace(/\D/g, ""), 10)
  const valid = !isNaN(n) && n >= 0 && n <= 999999

  return (
    <section id="grandes-numeros" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={number} badgeColor={B1} title="Números de até 6 algarismos" subtitle="Entendendo as classes e ordens" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            100.000 = Centena de Milhar
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Como funciona?</h3>
            <p className="text-foreground leading-relaxed">
              Os números são divididos em <strong className="text-primary">classes</strong> (de três em três algarismos) e <strong className="text-accent">ordens</strong> (cada algarismo). As classes principais até aqui são a das unidades simples e a dos milhares.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 rounded-xl bg-secondary/30 p-6">
            <FormulaBox className="mb-4">123.456</FormulaBox>
            <StepByStep steps={[
              { text: "Classe dos Milhares: 123 (Cento e vinte e três mil)" },
              { text: "Classe das Unidades Simples: 456 (Quatrocentos e cinquenta e seis)" },
              { text: "Leitura: Cento e vinte e três mil, quatrocentos e cinquenta e seis", highlight: true },
            ]} />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={500}>
          <CalcWrapper>
            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Digite um número (até 999.999)</label>
              <input type="text" value={val} onChange={e => setVal(e.target.value)} maxLength={6} className="w-40 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            {valid && (
              <CalcResult>
                <div className="font-mono text-2xl text-center text-accent">{n.toLocaleString("pt-BR")}</div>
                <div className="mt-2 text-center text-sm text-foreground">
                  <span className="text-primary">{Math.floor(n / 1000)} milhares</span> e <span className="text-chart-4">{n % 1000} unidades</span>
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function DecomposicaoNumeros({ number }: { number: number }) {
  const [val, setVal] = useState("35208")
  const n = parseInt(val.replace(/\D/g, ""), 10)
  const valid = !isNaN(n) && n >= 0 && n <= 999999

  const getAditiva = (num: number) => {
    const str = num.toString()
    let parts = []
    for(let i=0; i<str.length; i++) {
      const digit = parseInt(str[i])
      if(digit > 0) parts.push(digit * Math.pow(10, str.length - 1 - i))
    }
    return parts.join(" + ")
  }

  const getMultiplicativa = (num: number) => {
    const str = num.toString()
    let parts = []
    for(let i=0; i<str.length; i++) {
      const digit = parseInt(str[i])
      if(digit > 0) parts.push(`${digit} × ${Math.pow(10, str.length - 1 - i)}`)
    }
    return parts.join(" + ")
  }

  return (
    <section id="decomposicao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={number} badgeColor={B2} title="Decomposição de Números" subtitle="Escrita aditiva e multiplicativa" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            35.200 = 30.000 + 5.000 + 200
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              Decompor um número é separar o valor de cada um dos seus algarismos. Isso pode ser feito somando os valores <strong className="text-primary">(aditiva)</strong> ou multiplicando pelas ordens <strong className="text-accent">(multiplicativa)</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <CalcWrapper>
            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Digite um número</label>
              <input type="text" value={val} onChange={e => setVal(e.target.value)} maxLength={6} className="w-40 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            {valid && n > 0 && (
              <CalcResult>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Aditiva</p>
                    <p className="font-mono text-lg text-primary">{n.toLocaleString("pt-BR")} = {getAditiva(n)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Multiplicativa</p>
                    <p className="font-mono text-lg text-accent">{n.toLocaleString("pt-BR")} = {getMultiplicativa(n)}</p>
                  </div>
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function EstimativaComparacao({ number }: { number: number }) {
  return (
    <section id="estimativa-comparacao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={number} badgeColor={B3} title="Estimativa e Comparação" subtitle="Comparando números grandes" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>150.000 {">"} 99.999</FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              Para comparar grandes números, veja primeiro <strong className="text-primary">quantos algarismos</strong> ele tem. Se empatar, compare cada dígito da <strong className="text-accent">esquerda para a direita</strong> (da ordem maior para a menor).
            </p>
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll delay={400}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="45.600 vs 9.800" steps={["45.600 tem 5 algarismos", "9.800 tem 4 algarismos"]} conclusion="45.600 > 9.800" />
            <DetailedExampleCard title="87.500 vs 87.200" steps={["Mesma quantidade de algarismos", "Empate no 8 e 7", "Centena: 5 > 2"]} conclusion="87.500 > 87.200" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function DecimaisLeituraERepresentacao({ number }: { number: number }) {
  // We reuse parts of the original logic here but framed for introductory concepts
  return (
    <section id="decimais-leitura" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={number} badgeColor={B4} title="Leitura de Decimais" subtitle="Entendendo os números com vírgula" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            0,1 = um décimo &nbsp;|&nbsp; 0,01 = um centésimo &nbsp;|&nbsp; 0,001 = um milésimo
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              O que vem antes da vírgula é a parte <strong className="text-primary">inteira</strong>. O que vem depois da vírgula é a parte <strong className="text-accent">decimal</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailedExampleCard title="0,4" steps={["Zero inteiros", "Quatro décimos"]} conclusion="Lê-se: quatro décimos" />
            <DetailedExampleCard title="2,35" steps={["2 inteiros", "35 centésimos"]} conclusion="Dois inteiros e trinta e cinco centésimos" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function DecimaisRetaNumerica({ number }: { number: number }) {
  const [val, setVal] = useState("0.5")
  const n = parseFloat(val)
  const valid = !isNaN(n) && n >= 0 && n <= 1

  return (
    <section id="decimais-reta" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={number} badgeColor={B1} title="Decimais na Reta Numérica" subtitle="Posicionando entre inteiros" />

        <AnimateOnScroll delay={200}>
          <FormulaBox highlight>
            0 &lt; 0,5 &lt; 1
          </FormulaBox>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              Imagine o espaço entre 0 e 1 dividido em 10 partes iguais. Cada parte é um <strong className="text-primary">décimo (0,1)</strong>.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <CalcWrapper>
            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Número entre 0 e 1</label>
              <input type="number" step="0.1" min="0" max="1" value={val} onChange={e => setVal(e.target.value)} className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            {valid && (
              <CalcResult>
                <div className="relative h-12 w-full mt-4">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 rounded-full"></div>
                  {Array.from({length: 11}).map((_, i) => (
                    <div key={i} className="absolute top-1/2 w-1 h-3 bg-muted-foreground -translate-y-1/2" style={{ left: \`\${i * 10}%\` }}>
                       <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">0,{i}</div>
                    </div>
                  ))}
                  <div className="absolute top-1/2 w-4 h-4 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2 transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10" style={{ left: \`\${n * 100}%\` }}></div>
                </div>
              </CalcResult>
            )}
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export function DecimaisQuadroOrdens({ number }: { number: number }) {
  const [val, setVal] = useState("12,345")
  
  // parse safe for display
  const clean = val.replace(/[^0-9,]/g, "")
  const parts = clean.split(",")
  const intStr = parts[0] || "0"
  const decStr = parts[1] || "0"
  
  const c = intStr.length >= 3 ? intStr[intStr.length-3] : "0"
  const d = intStr.length >= 2 ? intStr[intStr.length-2] : "0"
  const u = intStr.length >= 1 ? intStr[intStr.length-1] : "0"
  
  const d_dec = decStr[0] || "0"
  const c_dec = decStr[1] || "0"
  const m_dec = decStr[2] || "0"

  return (
    <section id="decimais-quadro" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={number} badgeColor={B2} title="Quadro de Ordens" subtitle="Valor posicional com decimais" />

        <AnimateOnScroll delay={200}>
           <div className="mt-8 rounded-xl bg-secondary/50 p-6">
            <p className="text-foreground leading-relaxed">
              A vírgula separa a parte inteira (Unidade, Dezena, Centena) dos pedacinhos que são menores que 1 (Décimo, Centésimo, Milésimo).
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <CalcWrapper>
            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Digite um decimal (use vírgula)</label>
              <input type="text" value={clean} onChange={e => setVal(e.target.value)} maxLength={10} className="w-48 rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            
            <CalcResult>
               <div className="flex flex-col border border-border rounded-xl text-center overflow-hidden">
                 <div className="grid grid-cols-6 bg-secondary text-xs uppercase font-bold text-muted-foreground divider-x">
                    <div className="p-2 border-r border-border py-3">Centena</div>
                    <div className="p-2 border-r border-border py-3">Dezena</div>
                    <div className="p-2 border-r border-border py-3">Unidade</div>
                    <div className="p-2 border-r border-border bg-primary/10 py-3 text-primary">Décimo</div>
                    <div className="p-2 border-r border-border bg-primary/10 py-3 text-primary">Centésimo</div>
                    <div className="p-2 bg-primary/10 py-3 text-primary">Milésimo</div>
                 </div>
                 <div className="grid grid-cols-6 font-mono text-xl divider-x">
                    <div className="p-4 border-r border-border text-foreground">{c}</div>
                    <div className="p-4 border-r border-border text-foreground">{d}</div>
                    <div className="p-4 border-r border-border text-foreground relative">{u}<span className="absolute -right-1 text-accent font-bold">,</span></div>
                    <div className="p-4 border-r border-border font-bold text-primary bg-primary/5">{d_dec}</div>
                    <div className="p-4 border-r border-border font-bold text-primary bg-primary/5">{c_dec}</div>
                    <div className="p-4 font-bold text-primary bg-primary/5">{m_dec}</div>
                 </div>
               </div>
            </CalcResult>
          </CalcWrapper>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
