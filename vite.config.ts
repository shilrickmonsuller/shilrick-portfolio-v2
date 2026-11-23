import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/**
 * Where the site is served from. '/' for Vercel, Netlify or a custom domain;
 * the GitHub Pages workflow sets BASE_PATH=/<repo-name>/ because a project
 * site lives under that folder.
 */
const BASE = process.env.BASE_PATH || '/'

/** Files in public/ are referenced in the code as '/icons/x.svg' and the like.
 *  Under a sub-folder those need the base in front, so rewrite them at build. */
const PUBLIC_REF = /(['"`(])\/(icons\/|work\/|case-studies\/|placeholders\/|funnels\/|samples\/|home\/|testimonials\/|avatar\.|portrait\.|photo-|favicon)/g
function publicBase(): Plugin {
  return {
    name: 'public-base',
    enforce: 'pre',
    transform(code, id) {
      if (BASE === '/' || id.includes('node_modules') || !/\.(tsx?|jsx?)$/.test(id)) return null
      return { code: code.replace(PUBLIC_REF, `$1${BASE}$2`), map: null }
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [publicBase(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Dev-time security headers. In production these MUST be set at the
    // reverse proxy (Nginx) along with CSP, HSTS, and a stricter
    // Permissions-Policy. Do not duplicate them in Nginx config blindly -
    // some headers (e.g. CSP) need values that differ between dev and prod.
    headers: {
      // SAMEORIGIN (not DENY) so the Funnels + SamplePlan modals can
      // iframe their own /funnels/*.html and /sample-automation-plan.html
      // documents. Cross-origin framing is still blocked.
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
})
