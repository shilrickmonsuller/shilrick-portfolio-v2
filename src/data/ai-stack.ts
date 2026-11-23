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
  what: 'AI automations that solve real business problems.',
  stack: 'n8n · OpenAI · GoHighLevel · APIs',
  children: [
    {
      id: 'sales',
      Icon: ChatCircleDots,
      name: 'Customer support & sales',
      what: 'Every inquiry answered, 24/7.',
      children: [
        {
          id: 'support-agent',
          Icon: Headset,
          logos: [OPENAI],
          name: 'Multi-Agent Support & Sales',
          what: 'Answers, qualifies, books and follows up on Messenger.',
          stack: 'n8n · GoHighLevel · OpenAI · Supabase · PostgreSQL · Google Drive · Webhooks',
          status: 'Demo',
        },
      ],
    },
    {
      id: 'voice',
      Icon: AirplaneTilt,
      name: 'Voice assistants',
      what: 'Talk to it, get the work done.',
      children: [
        {
          id: 'travel-voice',
          Icon: Microphone,
          logos: [OPENAI],
          name: 'AI Voice Travel Assistant',
          what: 'Plans trips by voice and emails the itinerary.',
          stack: 'ElevenLabs · n8n · OpenAI · Gmail · Travel APIs · Webhooks',
          status: 'Demo',
        },
      ],
    },
    {
      id: 'wellness',
      Icon: Heartbeat,
      name: 'Coaching & tracking',
      what: 'Support where people already chat.',
      children: [
        {
          id: 'nutritionist',
          Icon: ForkKnife,
          logos: [OPENAI],
          name: 'AI Nutritionist & Wellness Coach',
          what: 'Logs meals from photos and coaches on Telegram.',
          stack: 'n8n · OpenAI GPT · Telegram Bot API · Google Drive',
          status: 'Demo',
        },
      ],
    },
    {
      id: 'content',
      Icon: Article,
      name: 'Content & marketing',
      what: 'From idea to published post.',
      children: [
        {
          id: 'linkedin-content',
          Icon: LinkedinLogo,
          logos: [OPENAI],
          name: 'LinkedIn Content Auto-Publishing',
          what: 'Researches, writes, illustrates and posts to LinkedIn.',
          stack: 'n8n · OpenAI GPT · DALL·E · Tavily · LinkedIn API · Google Sheets',
          status: 'Demo',
        },
      ],
    },
  ],
}
