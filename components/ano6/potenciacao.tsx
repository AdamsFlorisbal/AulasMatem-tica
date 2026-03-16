"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import {
  FormulaBox,
  StepByStep,
  DetailedExampleCard,
  SectionHeader,
} from "@/components/shared/section-primitives"

const B1 = "bg-chart-3/20 text-chart-3"
const B2 = "bg-primary/20 text-primary"

export function NaturaisPotenciacaoRaiz() {
  return (
    <section id="potenciacao" className="scroll-mt-20">
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
        <SectionHeader number={9} badgeColor={B1} title="Potenciação e Raiz Quadrada" subtitle="Entenda como a potenciação simplifica multiplicações e a raiz quadrada desfaz essa operação." />

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