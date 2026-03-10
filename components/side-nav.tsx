"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface NavSection {
  id: string
  label: string
  number: number
}

export function SideNav({ sections }: { sections: NavSection[] }) {
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

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map(({ id, label, number }) => (
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
