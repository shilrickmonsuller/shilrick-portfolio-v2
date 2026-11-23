export type AppStat = { value: string; label: string }

export type AppProject = {
  name: string
  tagline: string
  description: string
  /** Optional - omit for gradient placeholder cards */
  imageSrc?: string
  /** CSS object-position override. Defaults to 'top center'. */
  imagePosition?: string
  /** External brand color - not a site token. Passed via --app-color inline prop. */
  accentColor: string
  stats: AppStat[]
  badge: string
  /** Live link to the app. */
  href?: string
}

/** @deprecated use AppProject */
export type MobileApp = AppProject

/** Web apps, shown in the Projects "Web apps" pop-up. */
export const mobileApps: MobileApp[] = [
  {
    name: 'A Day With Jesus',
    tagline: 'Daily devotional app.',
    description: 'Devotionals, a 3-year Bible plan, memory verses, prayer and sermon notes. Works offline.',
    imageSrc: '/work/app-a-day-with-jesus.jpg',
    imagePosition: '50% 0%',
    accentColor: '#B7791F',
    stats: [
      { value: 'Offline', label: 'Bible built in' },
      { value: 'Google', label: 'Sign-in & Drive sync' },
      { value: 'PWA', label: 'Installable' },
    ],
    badge: 'Web app',
    href: 'https://shilrickmonsuller.github.io/a-day-with-jesus/',
  },
  {
    name: 'TUONTA',
    tagline: 'Notes, tasks and flashcards.',
    description: 'For work, projects and study. Saves on your phone first and syncs to Google Drive.',
    imageSrc: '/work/app-tuonta.jpg',
    imagePosition: '50% 0%',
    accentColor: '#2457C5',
    stats: [
      { value: 'Offline', label: 'First' },
      { value: 'Drive', label: 'Sync' },
      { value: 'PWA', label: 'Installable' },
    ],
    badge: 'Web app',
    href: 'https://shilrickmonsuller.github.io/tuonta/',
  },
]

export const webApps: AppProject[] = mobileApps
