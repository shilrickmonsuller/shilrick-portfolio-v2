import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Privacy Policy. Legal text has to describe YOUR site and what
 * it collects, so none is supplied. Write it (or have a lawyer or a policy
 * generator write it) and paste it into the sections below.
 */
export default function Privacy() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Privacy Policy">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: November 23, 2026</p>

        <div className="legal-page__body">
          <h2>Who this covers</h2>
          <p>This portfolio site is run by Shilrick Monsuller, an independent AI automation specialist based in Iligan City, Philippines. This policy covers this site only.</p>

          <h2>What is collected</h2>
          <p>The contact form does not store anything on this site. When you press send, it opens your own email app with your name, email and message filled in, and nothing is sent until you send that email. This site uses no analytics or tracking cookies. Your theme and accessibility choices are saved only in your own browser.</p>

          <h2>How it is used</h2>
          <p>Emails you send are used only to reply to you and discuss your project. They are not sold or shared.</p>

          <h2>How long it is kept</h2>
          <p>Emails are kept in my inbox for as long as they are useful for our conversation. Ask at any time and I will delete them.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
