"use client"

import { createExerciseSection, type ExerciseSectionConfig, type ExerciseMeta } from "@/components/exercises-section"

type ExType = "grandesNumeros" | "decomposicao" | "comparacaoGrandes" | "leituraDecimais" | "retaDecimal" | "ordemDecimal" | "adicao" | "subtracao" | "multiplicacao" | "divisao"

type Exercise =
  | { type: "grandesNumeros"; n: number }
  | { type: "decomposicao"; n: number }
  | { type: "comparacaoGrandes"; a: number; b: number }
  | { type: "leituraDecimais"; n: number }
  | { type: "retaDecimal"; n: number; opt1: number; opt2: number; opt3: number }
  | { type: "ordemDecimal"; n: number; algarismo: number; ordem: string }
  | { type: "adicao"; a: number; b: number }
  | { type: "subtracao"; a: number; b: number }
  | { type: "multiplicacao"; a: number; b: number; casas: number }
  | { type: "divisao"; a: number; b: number }

const META: Record<ExType, ExerciseMeta> = {
  grandesNumeros: { label: "Classes", color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/30" },
  decomposicao: { label: "Decomposição", color: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  comparacaoGrandes: { label: "Comparação (> <)", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  leituraDecimais: { label: "Decimais", color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30" },
  retaDecimal: { label: "Reta Numérica", color: "text-chart-5", bg: "bg-chart-5/10", border: "border-chart-5/30" },
  ordemDecimal: { label: "Ordens", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  adicao: { label: "Adição", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  subtracao: { label: "Subtração", color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30" },
  multiplicacao: { label: "Multiplicação", color: "text-chart-5", bg: "bg-chart-5/10", border: "border-chart-5/30" },
  divisao: { label: "Divisão", color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/30" },
}

function ri(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }
function fmtDec(n: number): string { return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 4 }) }

function generate(): Exercise[] {
  const list: Exercise[] = []
  
  for (let i = 0; i < 5; i++) {
    list.push({ type: "grandesNumeros", n: ri(100000, 999999) })
    list.push({ type: "decomposicao", n: ri(10000, 99999) })
    
    const aLarge = ri(70000, 90000)
    list.push({ type: "comparacaoGrandes", a: aLarge, b: aLarge + ri(-1000, 1000) })
    
    list.push({ type: "leituraDecimais", n: Math.round(ri(1, 999) * 100 + ri(0, 99)) / 100 })
    
    const r_ans = Math.round(ri(1, 9)) / 10
    const opts = [r_ans, Math.round((r_ans + 0.1)*10)/10, Math.round((r_ans - 0.1)*10)/10].sort(() => Math.random() - 0.5)
    list.push({ type: "retaDecimal", n: r_ans, opt1: opts[0], opt2: opts[1], opt3: opts[2] })
    
    const numDec = Math.round(ri(10, 99) * 1000 + ri(100, 999)) / 1000 // ex: 34.567
    const strDec = numDec.toFixed(3) // "34.567"
    const ordens = [
      { name: "décimos", digit: parseInt(strDec.split(".")[1][0]) },
      { name: "centésimos", digit: parseInt(strDec.split(".")[1][1]) },
      { name: "milésimos", digit: parseInt(strDec.split(".")[1][2]) }
    ]
    const chosenOrdem = ordens[ri(0, 2)]
    list.push({ type: "ordemDecimal", n: numDec, algarismo: chosenOrdem.digit, ordem: chosenOrdem.name })
    
    const aa = Math.round(ri(1, 9) * 10 + ri(0, 9)) / 10
    const bb = Math.round(ri(1, 9) * 10 + ri(0, 9)) / 10
    list.push({ type: "adicao", a: aa, b: bb })
    
    const big = Math.max(aa, bb), sml = Math.min(aa, bb)
    list.push({ type: "subtracao", a: big, b: sml })
    
    const fa = (ri(1, 9)) / 10, fb = ri(1, 9)
    list.push({ type: "multiplicacao", a: fa, b: fb, casas: 1 })
    
    const da = ri(2, 9) * ri(1, 5), db = ri(2, 5)
    list.push({ type: "divisao", a: da, b: db })
  }

  return list.sort(() => Math.random() - 0.5)
}

function renderQuestion(ex: Exercise): React.ReactNode {
  switch (ex.type) {
    case "grandesNumeros": return <span className="font-mono text-xl text-foreground">Quantas <strong className="text-chart-4">classes</strong> tem o número {ex.n.toLocaleString("pt-BR")}?</span>
    case "decomposicao": return <span className="font-mono text-xl text-foreground">Decomponha: {ex.n.toLocaleString("pt-BR")}</span>
    case "comparacaoGrandes": return <span className="font-mono text-2xl">{ex.a.toLocaleString("pt-BR")}<span className="mx-4 text-3xl text-muted-foreground">□</span>{ex.b.toLocaleString("pt-BR")}</span>
    case "leituraDecimais": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.n)}<span className="ml-3 text-muted-foreground text-lg">lê-se: ?</span></span>
    case "retaDecimal": return (
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-xl">Qual número está na posição indicada por <strong className="text-primary">X</strong>?</span>
        <div className="relative h-8 w-64 mt-2">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 rounded-full"></div>
          {Array.from({length: 11}).map((_, i) => (
            <div key={i} className="absolute top-1/2 w-1 h-3 bg-muted-foreground -translate-y-1/2" style={{ left: `${i * 10}%` }}></div>
          ))}
          <div className="absolute top-1/2 text-primary font-bold -translate-y-1/2 -translate-x-1/2" style={{ left: `${ex.n * 100}%` }}>X</div>
        </div>
      </div>
    )
    case "ordemDecimal": return <span className="font-mono text-xl">Qual algarismo representa os <strong className="text-purple-500">{ex.ordem}</strong> no número {ex.n.toLocaleString("pt-BR", { minimumFractionDigits: 3 })}?</span>
    case "adicao": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.a)}<span className="mx-2 text-muted-foreground">+</span>{fmtDec(ex.b)}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "subtracao": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.a)}<span className="mx-2 text-muted-foreground">−</span>{fmtDec(ex.b)}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "multiplicacao": return <span className="font-mono text-2xl text-foreground">{fmtDec(ex.a)}<span className="mx-2 text-muted-foreground">×</span>{ex.b}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
    case "divisao": return <span className="font-mono text-2xl text-foreground">{ex.a}<span className="mx-2 text-muted-foreground">÷</span>{ex.b}<span className="ml-3 text-muted-foreground text-lg">= ?</span></span>
  }
}

function renderAnswer(ex: Exercise): React.ReactNode {
  switch (ex.type) {
    case "grandesNumeros": return <p className="text-xl font-bold text-chart-4 font-mono">2 classes (Milhares e Unidades Simples)</p>
    case "decomposicao": {
        const str = ex.n.toString()
        let parts = []
        for(let i=0; i<str.length; i++) {
          const digit = parseInt(str[i])
          if(digit > 0) parts.push(digit * Math.pow(10, str.length - 1 - i))
        }
        return <p className="text-lg font-bold text-accent font-mono">{parts.join(" + ")}</p>
    }
    case "comparacaoGrandes": { const s = ex.a > ex.b ? ">" : ex.a < ex.b ? "<" : "="; return <p className="text-xl font-bold text-primary font-mono">{ex.a.toLocaleString("pt-BR")} {s} {ex.b.toLocaleString("pt-BR")}</p> }
    case "leituraDecimais": {
      const int = Math.floor(ex.n), dec = Math.round((ex.n - int) * 100)
      return <div><p className="font-mono text-sm text-foreground">{fmtDec(ex.n)} = {int} inteiros e {dec} centésimos</p></div>
    }
    case "retaDecimal": return <p className="text-2xl font-bold text-chart-5 font-mono">0,{ex.n * 10}</p>
    case "ordemDecimal": return <p className="text-2xl font-bold text-purple-500 font-mono">Algarismo {ex.algarismo}</p>
    
    // Operações originais
    case "adicao": return <p className="text-xl font-bold text-primary font-mono">{fmtDec(ex.a)} + {fmtDec(ex.b)} = {fmtDec(ex.a + ex.b)}</p>
    case "subtracao": return <p className="text-xl font-bold text-chart-3 font-mono">{fmtDec(ex.a)} − {fmtDec(ex.b)} = {fmtDec(ex.a - ex.b)}</p>
    case "multiplicacao": return <div><p className="font-mono text-sm">{fmtDec(ex.a)} × {ex.b}: multiplique como inteiros, {ex.casas} casa decimal</p><p className="text-xl font-bold text-chart-5 font-mono">= {fmtDec(ex.a * ex.b)}</p></div>
    case "divisao": return <p className="text-xl font-bold text-chart-4 font-mono">{ex.a} ÷ {ex.b} = {fmtDec(ex.a / ex.b)}</p>
  }
}

function getHint(ex: Exercise): string {
  switch (ex.type) {
    case "grandesNumeros": return `Lembre-se que cada conjunto de três algarismos (da direita para a esquerda) forma uma classe.`
    case "decomposicao": return `Qual é o valor de cada algarismo pela sua posição?`
    case "comparacaoGrandes": return `Compare os números da esquerda para a direita (das maiores ordens para as menores).`
    case "leituraDecimais": return `O que vem depois da vírgula? A primeira casa é décimo, a segunda centésimo.`
    case "retaDecimal": return `Esta reta vai de 0 a 1 e tem 10 pedaços. Cada pedaço vale 0,1.`
    case "ordemDecimal": return `Décimo é a 1ª casa após a vírgula, centésimo a 2ª, milésimo a 3ª.`
    case "adicao": return `Alinhe as vírgulas e some coluna por coluna da direita para a esquerda.`
    case "subtracao": return `Alinhe as vírgulas e subtraia, usando empréstimo quando necessário.`
    case "multiplicacao": return `Multiplique sem vírgula e depois conte quantas casas decimais há nos fatores.`
    case "divisao": return `Divida normalmente. O resultado tem o mesmo número de casas do dividendo.`
  }
}

const config: ExerciseSectionConfig<Exercise> = {
  generate, renderQuestion, renderAnswer, getHint,
  getMeta: (ex) => META[ex.type],
  headerDescription: "Pratique grandes números, leitura de decimais e as quatro operações",
}

export const Ano5ExercisesSection = createExerciseSection(config)
