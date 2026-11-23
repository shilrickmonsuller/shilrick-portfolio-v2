import { ArrowUpRight } from '@/components/slab'
import { useState, type CSSProperties } from 'react'
import PhoneDemo, { DEMO_APPS, HOLD, type DemoApp } from './PhoneDemo'
import '@/styles/phone-demo.css'
import { mobileApps, type AppProject } from '@/data/projects'
import AIStack from '@/components/AIStack'
import Flagship from '@/components/Flagship'

/* ── App card ───────────────────────────────────────────────── */
function AppCard({ app }: { app: AppProject }) {
  return (
    <li
      className="app-card"
      style={{ ['--app-color' as string]: app.accentColor }}
    >
      <div className={`app-card__img-wrap${DEMO_APPS[app.name] ? ' app-card__img-wrap--phone' : ''}`}>
        {DEMO_APPS[app.name] ? (
          <PhoneDemo app={DEMO_APPS[app.name]} offset={app.name === 'TUONTA' ? 1100 : 0} />
        ) : app.imageSrc ? (
          <img
            className="app-card__img"
            src={app.imageSrc}
            alt={`${app.name} screenshot`}
            style={app.imagePosition ? { objectPosition: app.imagePosition } : undefined}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="app-card__img-placeholder" aria-hidden="true">
            <span className="app-card__img-initials">
              {app.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}
        <span className="app-card__badge">{app.badge}</span>
        <span className="app-card__img-fade" aria-hidden="true" />
      </div>
      <div className="app-card__body">
        <h3 className="app-card__name">{app.name}</h3>
        <p className="app-card__tagline">{app.tagline}</p>
        <p className="app-card__desc">{app.description}</p>
        {app.href && (
          <a className="app-card__open" href={app.href} target="_blank" rel="noopener noreferrer">
            Open the app
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
        )}
        <ul className="app-card__stats" role="list">
          {app.stats.map((stat) => (
            <li key={stat.label} className="app-card__stat">
              <span className="app-card__stat-value">{stat.value}</span>
              <span className="app-card__stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

/* ── Sections ───────────────────────────────────────────────
   Two exports so the Projects dialog can open each body of work on its own;
   the default still composes them (with Flagship) for anything that wants
   the whole section. */
export function AIStackSection() {
  return (
    <section
      className="projects projects--ai"
      id="projects"
      aria-labelledby="projects-heading"
      data-reveal
    >
      <header className="projects__header">
        <span className="projects__eyebrow">AI automation</span>
        <h2 className="projects__headline" id="projects-heading">
          My AI projects.
        </h2>
      </header>
      <div className="projects__panel" id="projects-panel">
        <AIStack />
      </div>
    </section>
  )
}

/** A web app as one compact row: the phone plays its tabs on the left, and
 *  on the right each tab's one-liner lights up as the phone reaches it. */
function AppShowcase({ app, demo, index }: { app: AppProject; demo: DemoApp; index: number }) {
  const [tab, setTab] = useState(0)
  return (
    <li className="appx" style={{ '--app-color': app.accentColor, '--k': index, '--hold': `${HOLD}ms` } as CSSProperties}>
      <div className="appx__stage">
        <PhoneDemo app={demo} offset={index * 1100} onIndex={setTab} />
      </div>
      <div className="appx__info">
        <span className="appx__badge">{app.badge}</span>
        <h3 className="appx__name">{app.name}</h3>
        <p className="appx__tagline">{app.tagline}</p>
        <ol className="appx__tabs" role="list">
          {demo.tabs.map((t, j) => (
            <li key={t} className={`appx__tab${j === tab ? ' is-on' : ''}`} style={{ '--j': j } as CSSProperties}>
              <span className="appx__tab-name">{t}</span>
              <span className="appx__tab-note">{demo.notes[j]}</span>
              {j === tab && <span className="appx__tab-bar" aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <div className="appx__foot">
          <ul className="appx__chips" role="list">
            {app.stats.map((s) => (
              <li key={s.label}>{s.value}</li>
            ))}
          </ul>
          {app.href && (
            <a className="appx__open" href={app.href} target="_blank" rel="noopener noreferrer">
              Open the app
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </li>
  )
}

export function AppsSection() {
  return (
    <section className="projects projects--apps" aria-label="Web apps" data-reveal>
      <div className="projects__panel">
        <span className="projects__ext-eyebrow">Web apps built with Claude</span>
        <ul className="appx-list" role="list">
          {mobileApps.map((app, k) =>
            DEMO_APPS[app.name] ? (
              <AppShowcase key={app.name} app={app} demo={DEMO_APPS[app.name]} index={k} />
            ) : (
              <AppCard key={app.name} app={app} />
            ),
          )}
        </ul>
      </div>
    </section>
  )
}

export default function Projects() {
  return (
    <>
      <AIStackSection />
      <AppsSection />
      <Flagship />
    </>
  )
}
