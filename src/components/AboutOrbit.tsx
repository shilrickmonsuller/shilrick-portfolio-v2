/**
 * About, right side: my tools orbiting my photo inside a browser window.
 * Adapted from "Orbiting icons" in the BrewedOps Motion Library.
 * Each icon counter-rotates against its ring so the logos stay upright.
 */
type Logo = { src: string; name: string }

const INNER: Logo[] = [
  { src: '/icons/ai/n8n.svg', name: 'n8n' },
  { src: '/icons/gohighlevel.png', name: 'GoHighLevel' },
  { src: '/icons/ai/claude-color.svg', name: 'Claude' },
]

const OUTER: Logo[] = [
  { src: '/icons/ai/zapier.svg', name: 'Zapier' },
  { src: '/icons/ai/make.svg', name: 'Make.com' },
  { src: '/icons/openai.svg', name: 'OpenAI' },
  { src: '/icons/ai/gmail.svg', name: 'Gmail' },
  { src: '/icons/ai/googlesheets.svg', name: 'Google Sheets' },
]

function Ring({ logos, cls, offset = 0 }: { logos: Logo[]; cls: string; offset?: number }) {
  return (
    <div className={`orbit__ring ${cls}`}>
      {logos.map((l, i) => {
        const a = offset + (360 / logos.length) * i
        return (
          <div key={l.name} className="orbit__it" style={{ '--a': `${a}deg`, '--na': `${-a}deg` } as React.CSSProperties}>
            <i title={l.name}>
              <img src={l.src} alt={l.name} loading="lazy" decoding="async" />
            </i>
          </div>
        )
      })}
    </div>
  )
}

export default function AboutOrbit() {
  return (
    <div className="orbit" role="img" aria-label="The tools I automate with, orbiting my photo: n8n, GoHighLevel, Claude, Zapier, Make.com, OpenAI, Gmail and Google Sheets">
      <div className="orbit__win">
        <div className="orbit__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="orbit__url">automations running</span>
          <span className="orbit__live">Live</span>
        </div>
        <div className="orbit__pg" aria-hidden="true">
          <div className="orbit__ob">
            <Ring logos={INNER} cls="orbit__r1" />
            <Ring logos={OUTER} cls="orbit__r2" offset={36} />
            <div className="orbit__ctr">
              <img src="/avatar.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
