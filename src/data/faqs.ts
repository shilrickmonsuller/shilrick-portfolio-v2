export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I build AI automations: n8n workflows, AI agents and chatbots, GoHighLevel CRM follow-ups and API integrations. The goal is less repetitive work and faster responses for your business.',
  },
  {
    q: 'What tools do you work with?',
    a: 'n8n is my primary platform. I connect it with OpenAI, GoHighLevel, Supabase and PostgreSQL, Google Workspace, Telegram, ElevenLabs and any service with a REST API or webhooks.',
  },
  {
    q: 'What is your background?',
    a: 'I am a Chemical Engineer (BS, Mindanao State University) with over ten years of leading industrial operations. That taught me to analyze processes, troubleshoot and build systems that hold up.',
  },
  {
    q: 'Where are you based?',
    a: 'Iligan City, Philippines (GMT+8). I work remotely and can overlap with clients in Asia, Australia, Europe and US time zones.',
  },
  {
    q: 'What happens after I write?',
    a: 'I reply by email, ask a few questions about your process and tools, then suggest how I would automate it before any work starts.',
  },
]
