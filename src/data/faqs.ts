export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  { q: 'What do you do?', a: 'AI automations, GoHighLevel CRM setups and web apps.' },
  { q: 'Which tools do you use?', a: 'n8n, Zapier, Make.com, GoHighLevel, OpenAI and Claude.' },
  { q: 'Can you work with my current tools?', a: 'Yes. If it has an API or webhooks, I can connect it.' },
  { q: 'Where are you based?', a: 'Philippines (GMT+8). I work remotely with any time zone.' },
  { q: 'What happens after I write?', a: 'I reply within a day with a few questions and a plan.' },
]
