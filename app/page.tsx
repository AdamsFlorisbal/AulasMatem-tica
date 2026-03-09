"use client"

import { HeroSection } from "@/components/hero-section"
import { SideNav } from "@/components/side-nav"
import {
  PropMultiplicacao,
  PropDivisao,
  PropPotenciaPotencia,
  PropPotenciaProduto,
  PropPotenciaQuociente,
  PropExpoenteZero,
  PropExpoenteNegativo,
} from "@/components/property-sections"
import { SummarySection } from "@/components/summary-section"
import { ProgressBar } from "@/components/progress-bar"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background scrollbar-hide">
      <ProgressBar />
      <SideNav />

      <HeroSection />

      <div className="max-w-4xl mx-auto px-4 pb-20 flex flex-col gap-16 md:gap-24">
        <PropMultiplicacao />
        <PropDivisao />
        <PropPotenciaPotencia />
        <PropPotenciaProduto />
        <PropPotenciaQuociente />
        <PropExpoenteZero />
        <PropExpoenteNegativo />
        <SummarySection />

        <footer className="text-center pb-8">
          <p className="text-sm text-muted-foreground">
            {"Aula 5 \u2014 Propriedades das Pot\u00EAncias"}
          </p>
          <p className="text-xs text-muted-foreground/50 mt-1">
            Material informativo para alunos de 13 a 14 anos
          </p>
        </footer>
      </div>
    </main>
  )
}
