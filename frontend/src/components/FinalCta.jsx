import Icon from './Icons'
import Reveal from './Reveal'
import Sparkles from './Sparkles'
import { FINAL_CTA, LINKS } from '../data/siteData'
import './FinalCta.css'

/** Cierre: una última invitación a escribir por WhatsApp. */
export default function FinalCta({ shift = 0 }) {
  return (
    <section className="final-cta on-dark" aria-labelledby="cta-title">
      <Sparkles tone="dark" shift={shift} />

      <div className="wrap wrap--narrow final-cta__inner">
        <Reveal as="h2" id="cta-title" variant="fade-up" className="final-cta__title">
          {FINAL_CTA.title} <span className="script final-cta__script">{FINAL_CTA.titleScript}</span>
          {FINAL_CTA.titleEnd}
        </Reveal>

        <Reveal variant="fade" delay={120} className="final-cta__line">
          <span className="draw-line draw-line--center" />
        </Reveal>

        <Reveal as="p" variant="fade-up" delay={180} className="final-cta__text">
          {FINAL_CTA.text}
        </Reveal>

        <Reveal variant="fade-up" delay={280} className="final-cta__actions">
          <a
            className="btn btn--primary"
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={19} />
            {FINAL_CTA.primary}
          </a>

          <a
            className="btn btn--outline-light"
            href={LINKS.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="location" size={18} strokeWidth={1.6} />
            {FINAL_CTA.secondary}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
