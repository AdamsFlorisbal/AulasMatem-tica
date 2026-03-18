import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

const AULAS_ANO5 = [
  {
    slug: ".",
    titulo: "Números Decimais",
    descricao: "Leitura, comparação, adição, subtração, multiplicação e divisão de decimais",
    cor: "text-chart-4",
    corBorda: "hover:border-chart-4/50",
    corBg: "group-hover:bg-chart-4/5",
    badge: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    numero: "Aula 1",
  },
  {
    slug: "figuras-planas",
    titulo: "Figuras Planas",
    descricao: "Polígonos, triângulos, círculo e circunferência com cálculos de perímetro e área",
    cor: "text-green-600 dark:text-green-400",
    corBorda: "hover:border-green-500/50",
    corBg: "group-hover:bg-green-500/5",
    badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    numero: "Aula 2",
  },
]

export default function Ano5IndexPage() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-chart-4/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            ← Voltar para anos
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-chart-4/30 bg-chart-4/10 px-4 py-2 mb-6 mt-2">
            <BookOpen className="w-4 h-4 text-chart-4" />
            <span className="text-sm font-medium text-chart-4">5º Ano — Matemática</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Aulas do <span className="text-chart-4">5º Ano</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Escolha uma aula e explore conteúdo interativo, exemplos práticos e exercícios para aprender e treinar matemática.
          </p>
        </div>

        {/* Aulas cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AULAS_ANO5.map((aula) => (
            <Link key={aula.slug} href={aula.slug === "." ? "/ano5" : `/ano5/${aula.slug}`} className="block">
              <div
                className={`group rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 flex flex-col gap-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${aula.corBorda} ${aula.corBg} cursor-pointer h-full`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${aula.badge}`}>
                    {aula.numero}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground leading-snug">{aula.titulo}</h2>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{aula.descricao}</p>
                </div>
                <div className={`flex items-center gap-2 text-sm font-semibold ${aula.cor} group-hover:gap-3 transition-all`}>
                  Acessar <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
