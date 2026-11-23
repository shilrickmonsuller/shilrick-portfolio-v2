import { useState } from 'react'
import { CheckCircle } from '@/components/slab'
import MethodFlow from './MethodFlow'
import '@/styles/method-flow.css'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 * */

/* ---------- The method ---------- */


/* ---------- The services ---------- */

const GHL = '/icons/gohighlevel.png'
const N8N = '/icons/ai/n8n.svg'
const ZAPIER = '/icons/ai/zapier.svg'
const MAKE = '/icons/ai/make.svg'
const OPENAI = '/icons/openai.svg'
const CLAUDE = '/icons/ai/claude-color.svg'
const TELEGRAM = '/icons/ai/telegram.svg'
const SUPABASE = '/icons/ai/supabase.svg'
const SHEETS = '/icons/ai/googlesheets.svg'
const GMAIL = '/icons/ai/gmail.svg'
const GITHUB = '/icons/ai/github.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  { index: '01', title: 'Workflow Automation', description: 'Connect your apps and drop manual steps.', chip: 'n8n · Zapier · Make', logos: [N8N, ZAPIER, MAKE], bullets: ['Triggers & webhooks', 'App-to-app data sync', 'Error handling'] },
  { index: '02', title: 'GoHighLevel CRM', description: 'Pipelines, funnels and automatic follow-ups.', chip: 'GHL', logos: [GHL, GMAIL, N8N], bullets: ['Lead capture', 'Follow-up sequences', 'Booking & reminders'] },
  { index: '03', title: 'AI Agents & Chatbots', description: 'Answer, qualify and book leads 24/7.', chip: 'AI', logos: [OPENAI, CLAUDE, TELEGRAM], bullets: ['Support & sales', 'Knowledge base', 'Messenger & Telegram'] },
  { index: '04', title: 'API & Data Integrations', description: 'APIs and databases working as one.', chip: 'APIs', logos: [SUPABASE, SHEETS, N8N], bullets: ['REST APIs', 'Supabase & Sheets', 'Clean data'] },
  { index: '05', title: 'Web Apps with Claude', description: 'Fast, installable web apps.', chip: 'Claude', logos: [CLAUDE, GITHUB, SUPABASE], bullets: ['Works offline', 'Google sign-in', 'Phone & desktop'] },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

const METHOD_STEPS = ['Analyze', 'Build', 'Scale']

export default function ServicesGrid() {
  // Which approach step the live workflow is in (0-2), or 3 when it finished.
  const [stage, setStage] = useState(0)
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Automation that works while you don’t.
        </h1>
        <p className="pgrid__lede">
          Less manual work. Faster replies. More booked clients.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">My approach</span>
            <h2 className="sr-only" id="method-title">Analyze, build, scale</h2>
            <ol className="sgrid__steps" role="list">
              {METHOD_STEPS.map((label, i) => (
                <li key={label} className={`sgrid__step${stage === i ? ' is-on' : ''}${stage > i ? ' is-done' : ''}`}>
                  <span className="sgrid__step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sgrid__step-label">{label}</span>
                </li>
              ))}
            </ol>
            <p className="sgrid__method-sub">
              Understand first, then automate.
            </p>
          </div>

          <MethodFlow onStage={setStage} />
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I can build for you.</h2>
            <p className="sgrid__offers-sub">Not sure which fits? Tell me the problem.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Live automation</span>
              <h2 className="sgrid__flow-title">A lead, from first message to booking.</h2>
              <p className="sgrid__flow-sub">
                AI qualifies, the CRM updates, follow-ups run until it’s booked.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
