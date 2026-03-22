"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { RefreshCw, Lightbulb, Eye, EyeOff, Trophy } from "lucide-react"

/* ================================================================
   Generic exercise section factory
   ================================================================ */

export interface ExerciseMeta {
  label: string
  color: string
  bg: string
  border: string
}

export interface ExerciseSectionConfig<E> {
  generate: () => E[]
  renderQuestion: (ex: E) => React.ReactNode
  renderAnswer: (ex: E) => React.ReactNode
  getHint: (ex: E) => string
  getMeta: (ex: E) => ExerciseMeta
  headerDescription: string
}

export function createExerciseSection<E>(config: ExerciseSectionConfig<E>) {
  function ExerciseCard({ ex, index }: { ex: E; index: number }) {
    const [showHint, setShowHint] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const meta = config.getMeta(ex)

    return (
      <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
            Exercício {index + 1}
          </span>
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", meta.bg, meta.color, meta.border)}>
            {meta.label}
          </span>
        </div>

        <div className="flex items-center justify-center py-5 px-3 rounded-xl bg-secondary/40 border border-border">
          {config.renderQuestion(ex)}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border",
              showHint
                ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                : "bg-secondary/50 text-muted-foreground border-transparent hover:border-border hover:text-foreground"
            )}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? "Ocultar dica" : "Ver dica"}
          </button>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border",
              showAnswer
                ? "bg-accent/20 text-accent border-accent/30"
                : "bg-secondary/50 text-muted-foreground border-transparent hover:border-border hover:text-foreground"
            )}
          >
            {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAnswer ? "Ocultar" : "Ver resposta"}
          </button>
        </div>

        {showHint && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 animate-fade-in-up">
            <p className="text-sm text-amber-500 font-medium">
              <span className="mr-1">💡</span>
              {config.getHint(ex)}
            </p>
          </div>
        )}

        {showAnswer && (
          <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 animate-fade-in-up">
            <p className="text-xs font-bold text-accent uppercase tracking-wide mb-2">Resolução</p>
            {config.renderAnswer(ex)}
          </div>
        )}
      </div>
    )
  }

  function ExerciseSectionInstance() {
    const [exercises, setExercises] = useState<E[]>([])
    const [genKey, setGenKey] = useState(0)
    const [spinning, setSpinning] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string>("Geral")

    useEffect(() => {
      setExercises(config.generate())
    }, [genKey])

    const regenerate = useCallback(() => {
      setSpinning(true)
      setTimeout(() => setSpinning(false), 600)
      setGenKey((k) => k + 1)
    }, [])

    return (
      <section id="exercicios">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary">
                <Trophy className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Exercícios</h2>
                <p className="text-muted-foreground text-sm mt-1">{config.headerDescription}</p>
              </div>
            </div>
            <button
              onClick={regenerate}
              className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all active:scale-95"
            >
              <RefreshCw className={cn("w-4 h-4 transition-transform duration-500", spinning && "animate-spin")} />
              Gerar novos exercícios
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Geral", ...Array.from(new Set(exercises.map(ex => config.getMeta(ex).label)))].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg font-medium transition-colors border",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border-border"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {exercises.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              Gerando exercícios...
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {(activeCategory === "Geral" 
                  ? exercises.slice(0, 24) 
                  : exercises.filter(ex => config.getMeta(ex).label === activeCategory))
                .map((ex, i) => (
                  <ExerciseCard key={`${genKey}-${activeCategory}-${i}`} ex={ex} index={i} />
              ))}
            </div>
          )}

          <div className="mt-8 rounded-xl bg-secondary/40 border border-border p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Os exercícios são gerados aleatoriamente a cada carregamento.{" "}
              <span className="text-foreground font-medium">Clique em &quot;Gerar novos exercícios&quot;</span>
              {" "}para praticar com valores diferentes!
            </p>
          </div>
        </div>
      </section>
    )
  }

  ExerciseSectionInstance.displayName = "ExerciseSectionInstance"
  return ExerciseSectionInstance
}
