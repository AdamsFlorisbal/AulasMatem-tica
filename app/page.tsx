import Link from "next/link"
import { ArrowRight, GraduationCap } from "lucide-react"

const ANOS = [
  {
    slug: "ano5",
    ano: "5º",
    titulo: "Números Decimais",
    descricao: "Leitura, comparação, adição, subtração, multiplicação e divisão de decimais",
    cor: "text-chart-4",
    corBorda: "hover:border-chart-4/50",
    corBg: "group-hover:bg-chart-4/5",
    badge: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  {
    slug: "ano6",
    ano: "6º",
    titulo: "Números Naturais",
    descricao: "Divisibilidade, fatoração, números primos, MDC e MMC",
    cor: "text-chart-3",
    corBorda: "hover:border-chart-3/50",
    corBg: "group-hover:bg-chart-3/5",
    badge: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
  {
    slug: "ano7",
    ano: "7º",
    titulo: "Propriedades das Potências",
    descricao: "As 7 propriedades das potências com exemplos e calculadoras interativas",
    cor: "text-primary",
    corBorda: "hover:border-primary/50",
    corBg: "group-hover:bg-primary/5",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  {
    slug: "ano8",
    ano: "8º",
    titulo: "Potenciação, Radiciação e Notação Científica",
    descricao: "Raízes, potências com base negativa e escrita científica de números",
    cor: "text-accent",
    corBorda: "hover:border-accent/50",
    corBg: "group-hover:bg-accent/5",
    badge: "bg-accent/10 text-accent border-accent/20",
  },
  {
    slug: "ano9",
    ano: "9º",
    titulo: "Números Reais",
    descricao: "Irracionais, reta numérica, conjuntos, potência racional e radicais",
    cor: "text-chart-5",
    corBorda: "hover:border-chart-5/50",
    corBg: "group-hover:bg-chart-5/5",
    badge: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Matemática — Ensino Fundamental</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Escolha o <span className="text-primary">Ano Escolar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Selecione o conteúdo do seu ano e explore aulas interativas com exemplos, calculadoras e exercícios!
          </p>
        </div>

        {/* Year cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ANOS.map((a) => (
            <Link key={a.slug} href={`/${a.slug}`}>
              <div
                className={`group rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-7 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${a.corBorda} ${a.corBg} cursor-pointer h-full`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-6xl font-black ${a.cor} leading-none`}>{a.ano}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${a.badge}`}>
                    Ano
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-foreground leading-snug">{a.titulo}</h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.descricao}</p>
                </div>
                <div className={`flex items-center gap-2 text-sm font-semibold ${a.cor} group-hover:gap-3 transition-all`}>
                  Começar <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-border">
        <p className="text-xs text-muted-foreground/50">Professora Vanessa Florisbal</p>
        <p className="text-xs text-muted-foreground/40 mt-1">
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
    </main>
  )
}
