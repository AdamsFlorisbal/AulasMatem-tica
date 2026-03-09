"use client"

import { useState } from "react"
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
import { ExercisesSection } from "@/components/exercises-section"
import { BookOpen, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Page() {
  const [activeTab, setActiveTab] = useState<"conteudo" | "exercicios">("conteudo")

  function switchTab(tab: "conteudo" | "exercicios") {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen bg-background scrollbar-hide">
      <ProgressBar />
      {activeTab === "conteudo" && <SideNav />}

      <HeroSection />

      {/* Tab Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 py-2">
            <button
              onClick={() => switchTab("conteudo")}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                activeTab === "conteudo"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <BookOpen className="w-4 h-4" />
              Conteúdo
            </button>
            <button
              onClick={() => switchTab("exercicios")}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                activeTab === "exercicios"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <PenLine className="w-4 h-4" />
              Exercícios
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {activeTab === "conteudo" ? (
          <div className="flex flex-col gap-16 md:gap-24 pt-8">
            <PropMultiplicacao />
            <PropDivisao />
            <PropPotenciaPotencia />
            <PropPotenciaProduto />
            <PropPotenciaQuociente />
            <PropExpoenteZero />
            <PropExpoenteNegativo />
            <SummarySection />

            <footer className="text-center pb-8">
              <p className="text-xs text-muted-foreground/40 mt-1">
                Professora Vanessa Florisbal
              </p>
              <p className="text-xs text-muted-foreground/40 mt-2">
                Desenvolvido por{" "}
                <a
                  href="https://www.linkedin.com/in/adams-florisbal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/60 hover:text-primary transition-colors underline underline-offset-2"
                >
                  Adams Florisbal
                </a>
              </p>
            </footer>
          </div>
        ) : (
          <div className="pt-8">
            <ExercisesSection />
          </div>
        )}
      </div>
    </main>
  )
}
