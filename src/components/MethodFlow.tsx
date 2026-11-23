import { useEffect, useState } from 'react'

/**
 * "My approach" as a live n8n canvas: a lead comes in, AI analyzes it, an IF
 * node qualifies it, GoHighLevel stores it, Gmail follows up, and it becomes a
 * customer. Nodes run one after another (running ring, then a green check),
 * and data packets travel the wires between them. Three sticky notes group
 * the nodes into Analyze, Build and Scale.
 */

type NodeDef = {
  id: string
  x: number
  y: number
  w?: number
  name: string
  sub?: string
  icon?: string
  glyph?: 'bolt' | 'if' | 'won'
  trigger?: boolean
  inside?: boolean
}

const H = 64
const NODES: NodeDef[] = [
  { id: 'lead', x: 24, y: 104, name: 'New lead', sub: 'Form / Messenger', glyph: 'bolt', trigger: true },
  { id: 'ai', x: 150, y: 104, w: 176, name: 'AI Agent', sub: 'Analyze lead data', icon: '/icons/openai.svg', inside: true },
  { id: 'if', x: 392, y: 104, name: 'Qualified?', glyph: 'if' },
  { id: 'ghl', x: 552, y: 34, name: 'GoHighLevel', sub: 'Create contact', icon: '/icons/gohighlevel.png' },
  { id: 'mail', x: 690, y: 34, name: 'Gmail', sub: 'Send follow-up', icon: '/icons/ai/gmail.svg' },
  { id: 'won', x: 828, y: 34, name: 'New customer', sub: 'Booked', glyph: 'won' },
  { id: 'nurture', x: 552, y: 170, name: 'Google Sheets', sub: 'Nurture list', icon: '/icons/ai/googlesheets.svg' },
]

const WIRES = [
  { id: 'w1', d: 'M88 136 H150' },
  { id: 'w2', d: 'M326 136 H392' },
  { id: 'w3', d: 'M456 121 C504 121 504 66 552 66', label: 'true', lx: 470, ly: 104 },
  { id: 'w4', d: 'M616 66 H690' },
  { id: 'w5', d: 'M754 66 H828' },
  { id: 'w6', d: 'M456 151 C504 151 504 202 552 202', label: 'false', lx: 468, ly: 176 },
]

/** The run, one entry per tick: what is running at that moment. */
const STEPS: string[] = ['lead', 'w1', 'ai', 'ai', 'w2', 'if', 'w3', 'ghl', 'w4', 'mail', 'w5', 'won', 'done', 'done', 'done']
const ORDER = ['lead', 'w1', 'ai', 'w2', 'if', 'w3', 'ghl', 'w4', 'mail', 'w5', 'won']
const TICK = 520

function Glyph({ kind, cx, cy }: { kind: NonNullable<NodeDef['glyph']>; cx: number; cy: number }) {
  if (kind === 'bolt')
    return <path d={`M${cx + 3} ${cy - 15} L${cx - 9} ${cy + 3} H${cx} L${cx - 3} ${cy + 15} L${cx + 9} ${cy - 3} H${cx} Z`} className="mflow__glyph mflow__glyph--gold" />
  if (kind === 'if')
    return (
      <g className="mflow__glyph-line" transform={`translate(${cx} ${cy})`}>
        <path d="M-14 0 H-2 M-2 0 L10 -10 M-2 0 L10 10" />
        <path d="M5 -12 L11 -10 L9 -4 M5 12 L11 10 L9 4" />
      </g>
    )
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="15" className="mflow__glyph" />
      <path d="M-7 0 L-2 5 L8 -6" className="mflow__glyph-check" />
    </g>
  )
}

/** Which approach step each part of the run belongs to. */
const STAGE_OF: Record<string, number> = { lead: 0, w1: 0, ai: 0, w2: 0, if: 0, w3: 1, ghl: 1, w4: 1, mail: 1, w5: 2, won: 2, done: 3 }

export default function MethodFlow({ onStage }: { onStage?: (stage: number) => void }) {
  const [step, setStep] = useState(STEPS.length - 1)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.a11yMotion === 'true'
    if (reduce) return
    setStep(0)
    const t = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), TICK)
    return () => window.clearInterval(t)
  }, [])

  const current = STEPS[step]
  useEffect(() => { onStage?.(STAGE_OF[current]) }, [current, onStage])
  const reached = current === 'done' ? ORDER.length : ORDER.indexOf(current)
  const state = (id: string) => {
    const i = ORDER.indexOf(id)
    if (i === -1) return 'idle'
    if (i < reached) return 'done'
    if (i === reached) return 'run'
    return 'idle'
  }

  return (
    <div className="mflow" role="img" aria-label="An n8n workflow running: a new lead is analyzed by an AI agent, qualified, added to GoHighLevel, sent a follow-up by Gmail and becomes a customer.">
      <div className="mflow__scroll">
        <svg viewBox="0 0 920 270" className="mflow__svg" aria-hidden="true">
          <defs>
            <pattern id="mflow-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" className="mflow__dot" />
            </pattern>
          </defs>
          <rect width="920" height="270" rx="16" fill="url(#mflow-dots)" />

          {/* Sticky notes: the three stages of the approach. */}
          <g className="mflow__sticky">
            <rect x="10" y="72" width="460" height="186" rx="12" />
            <text x="24" y="92"><tspan className="mflow__sticky-n">01</tspan> Analyze</text>
          </g>
          <g className="mflow__sticky">
            <rect x="538" y="6" width="236" height="150" rx="12" />
            <text x="552" y="26"><tspan className="mflow__sticky-n">02</tspan> Build</text>
          </g>
          <g className="mflow__sticky">
            <rect x="808" y="6" width="104" height="150" rx="12" />
            <text x="822" y="26"><tspan className="mflow__sticky-n">03</tspan> Scale</text>
          </g>

          {/* Wires */}
          {WIRES.map((w) => {
            const s = state(w.id)
            return (
              <g key={w.id} className={`mflow__wire is-${s}`}>
                <path d={w.d} className="mflow__wire-base" />
                {s === 'run' && <path d={w.d} pathLength={100} className="mflow__packet" />}
                {w.label && <text x={w.lx} y={w.ly} className="mflow__wire-label">{w.label}</text>}
                {s === 'done' && w.id !== 'w6' && (
                  <text className="mflow__items">
                    <textPath href={`#${w.id}-p`} startOffset="50%" textAnchor="middle">1 item</textPath>
                  </text>
                )}
                <path id={`${w.id}-p`} d={w.d} fill="none" transform="translate(0 -7)" />
              </g>
            )
          })}

          {/* Nodes */}
          {NODES.map((n) => {
            const w = n.w ?? 64
            const s = state(n.id)
            const cx = n.x + w / 2
            const cy = n.y + H / 2
            const shape = n.trigger
              ? `M${n.x + 30} ${n.y} H${n.x + w - 10} Q${n.x + w} ${n.y} ${n.x + w} ${n.y + 10} V${n.y + H - 10} Q${n.x + w} ${n.y + H} ${n.x + w - 10} ${n.y + H} H${n.x + 30} A30 32 0 0 1 ${n.x + 30} ${n.y} Z`
              : undefined
            return (
              <g key={n.id} className={`mflow__node is-${s}${n.id === 'nurture' ? ' is-branch' : ''}`}>
                {shape ? <path d={shape} className="mflow__box" /> : <rect x={n.x} y={n.y} width={w} height={H} rx="12" className="mflow__box" />}
                {/* handles */}
                {!n.trigger && <circle cx={n.x} cy={cy} r="4" className="mflow__handle" />}
                {n.id === 'if' ? (
                  <>
                    <circle cx={n.x + w} cy={cy - 15} r="4" className="mflow__handle" />
                    <circle cx={n.x + w} cy={cy + 15} r="4" className="mflow__handle" />
                  </>
                ) : n.id !== 'won' && n.id !== 'nurture' ? (
                  <circle cx={n.x + w} cy={cy} r="4" className="mflow__handle" />
                ) : null}

                {n.inside ? (
                  <>
                    <rect x={n.x + 12} y={n.y + 14} width="36" height="36" rx="10" className="mflow__chip" />
                    <image href={n.icon} x={n.x + 18} y={n.y + 20} width="24" height="24" />
                    <text x={n.x + 58} y={n.y + 29} className="mflow__in-name">{n.name}</text>
                    <text x={n.x + 58} y={n.y + 46} className="mflow__in-sub">{n.sub}</text>
                  </>
                ) : n.icon ? (
                  <image href={n.icon} x={cx - 16} y={cy - 16} width="32" height="32" />
                ) : n.glyph ? (
                  <Glyph kind={n.glyph} cx={cx} cy={cy} />
                ) : null}

                {!n.inside && (
                  <>
                    <text x={cx} y={n.y + H + 16} textAnchor="middle" className="mflow__name">{n.name}</text>
                    {n.sub && <text x={cx} y={n.y + H + 30} textAnchor="middle" className="mflow__sub">{n.sub}</text>}
                  </>
                )}

                {/* status: spinner while running, check when done */}
                {s === 'run' && (
                  <circle cx={n.x + w - 2} cy={n.y + 2} r="8" className="mflow__spin" />
                )}
                {s === 'done' && (
                  <g transform={`translate(${n.x + w - 2} ${n.y + 2})`} className="mflow__ok">
                    <circle r="9" />
                    <path d="M-4 0 L-1 3 L4 -3" />
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="mflow__status" aria-hidden="true">
        <span className={`mflow__pill ${current === 'done' ? 'is-done' : ''}`}>
          {current === 'done' ? 'Workflow executed · new customer booked' : 'Executing workflow…'}
        </span>
      </div>
    </div>
  )
}
