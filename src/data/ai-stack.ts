/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so swapping in content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself a system; a branch without one is a
 *   group whose children are the systems.
 * - Status is what the thing actually does today: "Live" (in use by others),
 *   "Internal" (works, you use it), "Beta".
 * - Logo marks in AIStackGrid.tsx are keyed by the node `id` below.
 */

import {
  Sparkle,
  Headset,
  Microphone,
  ForkKnife,
  LinkedinLogo,
  ChatCircleDots,
  AirplaneTilt,
  Heartbeat,
  Article,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta' | 'Demo'

/** A vendor mark, masked to a single ink colour so the row reads as one set
 *  rather than a rainbow of brand palettes. Only marks that already exist in
 *  public/icons are listed. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / model / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const OPENAI: StackLogo = { src: '/icons/openai.svg', name: 'OpenAI' }

/** Single root: you. Branches are the categories. Status 'Demo' marks an
 *  independent project built to show the approach, not a client system. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Hands-on AI automation projects that solve real business problems with agents, integrations and automated processes.',
  stack: 'n8n · OpenAI · GoHighLevel · APIs',
  children: [
    {
      id: 'sales',
      Icon: ChatCircleDots,
      name: 'Customer support & sales',
      what: 'Turn every customer inquiry into a business opportunity, 24/7.',
      children: [
        {
          id: 'support-agent',
          Icon: Headset,
          logos: [OPENAI],
          name: 'Multi-Agent Support & Sales',
          what: 'AI agents answer customers, qualify leads, book appointments and follow up across Messenger and other channels. Built for plumbing, electrical and HVAC businesses.',
          stack: 'n8n · GoHighLevel · OpenAI · Supabase · PostgreSQL · Google Drive · Webhooks',
          status: 'Demo',
        },
      ],
    },
    {
      id: 'voice',
      Icon: AirplaneTilt,
      name: 'Voice assistants',
      what: 'Voice conversations turned into finished work, without manual research.',
      children: [
        {
          id: 'travel-voice',
          Icon: Microphone,
          logos: [OPENAI],
          name: 'AI Voice Travel Assistant',
          what: 'Understands travel preferences by voice, pulls live flight, hotel and activity data, and emails a personalized itinerary.',
          stack: 'ElevenLabs · n8n · OpenAI · Gmail · Travel APIs · Webhooks',
          status: 'Demo',
        },
      ],
    },
    {
      id: 'wellness',
      Icon: Heartbeat,
      name: 'Coaching & tracking',
      what: 'Personal support that scales, delivered where people already chat.',
      children: [
        {
          id: 'nutritionist',
          Icon: ForkKnife,
          logos: [OPENAI],
          name: 'AI Nutritionist & Wellness Coach',
          what: 'Turns food photos, voice notes and text into calorie estimates, logs meals in Google Sheets and coaches through Telegram.',
          stack: 'n8n · OpenAI GPT · Telegram Bot API · Google Drive',
          status: 'Demo',
        },
      ],
    },
    {
      id: 'content',
      Icon: Article,
      name: 'Content & marketing',
      what: 'From content ideas to published posts, with tracking.',
      children: [
        {
          id: 'linkedin-content',
          Icon: LinkedinLogo,
          logos: [OPENAI],
          name: 'LinkedIn Content Auto-Publishing',
          what: 'Researches trending topics, writes and evaluates posts and images with AI agents, then publishes to LinkedIn and tracks status in Google Sheets.',
          stack: 'n8n · OpenAI GPT · DALL·E · Tavily · LinkedIn API · Google Sheets',
          status: 'Demo',
        },
      ],
    },
  ],
}
