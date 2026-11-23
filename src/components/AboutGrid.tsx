import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, Briefcase } from '@/components/slab'
import AboutOrbit from './AboutOrbit'
import '@/styles/about-orbit.css'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const N8N = { src: '/icons/ai/n8n.svg', name: 'n8n' }
const ZAPIER = { src: '/icons/ai/zapier.svg', name: 'Zapier' }
const MAKE = { src: '/icons/ai/make.svg', name: 'Make.com' }
const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const GMAIL = { src: '/icons/ai/gmail.svg', name: 'Gmail' }
const SHEETS = { src: '/icons/ai/googlesheets.svg', name: 'Google Sheets' }
const OPENAI = { src: '/icons/openai.svg', name: 'OpenAI' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const ELEVENLABS = { src: '/icons/ai/elevenlabs.svg', name: 'ElevenLabs' }
const GITHUB = { src: '/icons/ai/github.svg', name: 'GitHub' }
const SUPABASE = { src: '/icons/ai/supabase.svg', name: 'Supabase' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Workflow automation', marks: [N8N, ZAPIER, MAKE] },
  { index: '02', title: 'GoHighLevel CRM', marks: [GHL, GMAIL, SHEETS] },
  { index: '03', title: 'AI agents & chatbots', marks: [OPENAI, CLAUDE, ELEVENLABS] },
  { index: '04', title: 'Web apps with Claude', marks: [CLAUDE, GITHUB, SUPABASE] },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          AI Automation & GoHighLevel Specialist.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I automate the busywork.
            <span> So you can focus on growth.</span>
          </p>

          <p className="agrid__note">
            I build workflows in <strong>n8n, Zapier and Make.com</strong>, set up{' '}
            <strong>GoHighLevel</strong> CRMs, and build web apps with <strong>Claude</strong>.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/icons/gohighlevel.png" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">GoHighLevel Specialist</span>
                <span className="agrid__cell-meta">CRM · Funnels · Automation</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · Philippines</span>
              </span>
            </span>

            <a
              className="agrid__cell agrid__cell--wide"
              href="https://www.upwork.com/freelancers/~0112683cedcf711515"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="agrid__cell-mark">
                <Briefcase size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Available for opportunities</span>
                <span className="agrid__cell-meta">Hire me on Upwork</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait agrid__portrait--orbit">
          <AboutOrbit />
        </div>
      </div>
    </section>
  )
}
