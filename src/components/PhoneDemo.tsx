import { useEffect, useState } from 'react'

/**
 * A phone that plays an app's own screens: a finger taps the next tab in the
 * tab bar, then the screen slides to it. Loops through every tab.
 * Screens are real screenshots in public/work/apps/<app>-<n>.webp.
 */
export type DemoApp = {
  id: string
  name: string
  tabs: string[]
  /** One line on what each tab does, same order as tabs. */
  notes: string[]
  accent: string
  /** No bottom tab bar (a scrolling site): skip the finger tap. */
  noTap?: boolean
}

export const DEMO_APPS: Record<string, DemoApp> = {
  'A Day With Jesus': {
    id: 'a-day-with-jesus',
    name: 'A Day With Jesus',
    tabs: ['Today', 'Plan', 'Bible', 'Memory', 'More'],
    notes: ['Daily devotional', '3-year Bible plan', 'Bible, works offline', 'Memory verses', 'Prayer, journal, sermons'],
    accent: '#B7791F',
  },
  TUONTA: {
    id: 'tuonta',
    name: 'TUONTA',
    tabs: ['Notes', 'Notebooks', 'Review', 'More'],
    notes: ['Notes, tasks, tags', 'Sorted by project', 'Flashcard review', 'Calendar & reminders'],
    accent: '#2457C5',
  },
  'Wedding Invitation': {
    id: 'wedding-invitation',
    name: 'Wedding Invitation',
    tabs: ['Invite', 'Welcome', 'Details', 'Attire', 'RSVP', 'Venue'],
    notes: ['Opening envelope', 'Live countdown', 'When and where', 'Color palette', 'Online RSVP to n8n', 'Maps and Waze'],
    accent: '#8B5A3C',
    noTap: true,
  },
}

export const HOLD = 2200 // time on each screen
const TAP = 450 // the tap lands this long before the switch

export default function PhoneDemo({
  app,
  offset = 0,
  size = 'md',
  onIndex,
}: {
  app: DemoApp
  offset?: number
  size?: 'sm' | 'md'
  /** Called with the tab now showing, so a caption can follow along. */
  onIndex?: (i: number) => void
}) {
  const n = app.tabs.length
  const [i, setI] = useState(0)
  const [tapping, setTapping] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.a11yMotion === 'true'
    if (reduce) return
    let tapT = 0
    let start = 0
    const tick = () => {
      setTapping(true)
      tapT = window.setTimeout(() => {
        setTapping(false)
        setI((v) => (v + 1) % n)
      }, TAP)
    }
    start = window.setTimeout(() => {
      tick()
      start = window.setInterval(tick, HOLD) as unknown as number
    }, HOLD - TAP + offset)
    return () => {
      window.clearTimeout(tapT)
      window.clearTimeout(start)
      window.clearInterval(start)
    }
  }, [n, offset])

  useEffect(() => { onIndex?.(i) }, [i, onIndex])

  const next = (i + 1) % n
  // Tab bar buttons are evenly spread across the screen width.
  const tapX = `${((next + 0.5) / n) * 100}%`

  return (
    <div className={`phone phone--${size}`} style={{ '--accent': app.accent } as React.CSSProperties}>
      <div className="phone__screen">
        <div className="phone__track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {app.tabs.map((t, k) => (
            <img
              key={t}
              src={`/work/apps/${app.id}-${k}.webp`}
              alt={k === i ? `${app.name}: ${t} tab` : ''}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
        {!app.noTap && (
          <span className={`phone__tap${tapping ? ' is-on' : ''}`} style={{ left: tapX }} aria-hidden="true" />
        )}
      </div>
      <span className="phone__notch" aria-hidden="true" />
    </div>
  )
}
