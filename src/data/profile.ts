/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. 
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Shilrick Monsuller',
  firstName: 'Shilrick',
  handle: '@shilrickmonsuller',
  role: 'AI Automation Specialist',
  avatarSrc: '/avatar.webp',
  verifiedLabel: 'BS Chemical Engineering, Mindanao State University',
  email: 'shilrickmonsuller@gmail.com',
  location: 'Iligan City, Philippines',
  stats: [
    { value: '10+ yrs', label: 'Leading operations', Icon: Briefcase },
    { value: 'n8n', label: 'Primary platform', Icon: SealCheck },
    { value: 'GMT+8', label: 'Philippines', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  displayName: { line1: 'Complex processes,', line2: 'automated.' },
  hero: {
    body: 'AI Automation Specialist building reliable workflows with n8n, AI, APIs and CRM integrations.',
    portraitSrc: '/portrait.webp',
    portraitAlt: 'Portrait of Shilrick Monsuller',
  },
  socials: [
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/shilrick-monsuller-7805b9442/', iconPath: '/icons/linkedin.svg' },
    { label: 'Upwork profile', href: 'https://www.upwork.com/freelancers/~0112683cedcf711515', iconPath: '/icons/upwork.svg' },
    { label: 'OnlineJobs.ph profile', href: 'https://v2.onlinejobs.ph/jobseekers/info/5448246', iconPath: '/icons/onlinejobs.svg' },
    { label: 'GitHub profile', href: 'https://github.com/shilrickmonsuller', iconPath: '/icons/github.svg' },
  ],
}
