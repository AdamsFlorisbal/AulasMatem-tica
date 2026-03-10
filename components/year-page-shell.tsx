"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, PenLine, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProgressBar } from "@/components/progress-bar"
import { HeroSection, type HeroSectionProps } from "@/components/hero-section"
import { SideNav, type NavSection } from "@/components/side-nav"

interface YearPageShellProps {
  heroProps: HeroSectionProps
  navSections: NavSection[]
  contentSections: React.ReactNode
  summaryNode: React.ReactNode
  exercisesNode: React.ReactNode
  yearLabel?: string
}

export function YearPageShell({
  heroProps,
  navSections,
  contentSections,
  summaryNode,
  exercisesNode,
  yearLabel,
}: YearPageShellProps) {
  const [activeTab, setActiveTab] = useState<"conteudo" | "exercicios">("conteudo")

  function switchTab(tab: "conteudo" | "exercicios") {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen bg-background scrollbar-hide">
      <ProgressBar />
      {activeTab === "conteudo" && <SideNav sections={navSections} />}

      <HeroSection {...heroProps} />

      {/* Tab Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 py-2">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mr-2 shrink-0"
            >
              <ArrowLeft className="w-3 h-3" />
              Início
            </Link>
            <div className="flex gap-1 flex-1">
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
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {activeTab === "conteudo" ? (
          <div className="flex flex-col gap-16 md:gap-24 pt-8">
            {contentSections}
            {summaryNode}
            <footer className="text-center pb-8">
              {yearLabel && (
                <p className="text-xs text-muted-foreground/50 mt-1">{yearLabel}</p>
              )}
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
            {exercisesNode}
          </div>
        )}
      </div>
    </main>
  )
}
