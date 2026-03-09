"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "multiplicacao", label: "Mesma Base", number: 1 },
  { id: "divisao", label: "Divis\u00E3o", number: 2 },
  { id: "potencia-potencia", label: "Pot. de Pot.", number: 3 },
  { id: "potencia-produto", label: "Pot. de Produto", number: 4 },
  { id: "potencia-quociente", label: "Pot. de Quociente", number: 5 },
  { id: "expoente-zero", label: "Expoente Zero", number: 6 },
  { id: "expoente-negativo", label: "Exp. Negativo", number: 7 },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -40% 0px" }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {SECTIONS.map(({ id, label, number }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-3 transition-all duration-300"
          aria-label={`Ir para ${label}`}
        >
          <span
            className={cn(
              "hidden group-hover:block text-xs font-medium text-right whitespace-nowrap rounded-lg px-3 py-1 transition-all",
              activeSection === id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground"
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300",
              activeSection === id
                ? "bg-primary text-primary-foreground scale-110 animate-pulse-glow"
                : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary"
            )}
          >
            {number}
          </span>
        </button>
      ))}
    </nav>
  )
}
