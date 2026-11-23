import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, GraduationCap, Briefcase } from '@/components/slab'
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
const SUPABASE = { src: '/icons/ai/supabase.svg', name: 'Supabase' }
const SHEETS = { src: '/icons/ai/googlesheets.svg', name: 'Google Sheets' }
const OPENAI = { src: '/icons/openai.svg', name: 'OpenAI' }
const ELEVENLABS = { src: '/icons/ai/elevenlabs.svg', name: 'ElevenLabs' }
const TELEGRAM = { src: '/icons/ai/telegram.svg', name: 'Telegram' }
const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const GMAIL = { src: '/icons/ai/gmail.svg', name: 'Gmail' }
const POSTGRES = { src: '/icons/ai/postgresql.svg', name: 'PostgreSQL' }
const PYTHON = { src: '/icons/ai/python.svg', name: 'Python' }
const GITHUB = { src: '/icons/ai/github.svg', name: 'GitHub' }
const DRIVE = { src: '/icons/ai/googledrive.svg', name: 'Google Drive' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Workflow automation', marks: [N8N, SUPABASE, SHEETS] },
  { index: '02', title: 'AI agents & integrations', marks: [OPENAI, ELEVENLABS, TELEGRAM] },
  { index: '03', title: 'CRM systems & follow-ups', marks: [GHL, GMAIL, POSTGRES] },
  { index: '04', title: 'Web, Python & data', marks: [PYTHON, GITHUB, DRIVE] },
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
          AI Automation Specialist with a Chemical Engineering background and years of leading industrial operations.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            Engineering roots. Automation future.
            <span> Practical thinking, measurable impact.</span>
          </p>

          <p className="agrid__note">
            I bring analytical thinking, problem-solving and process optimization from{' '}
            <strong>chemical manufacturing</strong> to AI automation. Using{' '}
            <a className="agrid__link" href="https://n8n.io" target="_blank" rel="noopener noreferrer">
              n8n
            </a>{' '}
            as my primary platform, I connect AI tools, CRMs, APIs, databases and business apps into
            reliable workflows that cut repetitive work and deliver long-term value.
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
              <span className="agrid__cell-mark">
                <GraduationCap size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">BS Chemical Engineering</span>
                <span className="agrid__cell-meta">Mindanao State University, Marawi</span>
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

        <div className="agrid__portrait">
          <img
            src="/portrait.webp"
            alt="Portrait of Shilrick Monsuller"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
