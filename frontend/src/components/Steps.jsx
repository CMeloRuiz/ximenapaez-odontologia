import Icon from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { LINKS, STEPS, STEPS_SECTION } from '../data/siteData'
import './Steps.css'

/** Cómo agendar una cita, en tres pasos. */
export default function Steps() {
  return (
    <section id="agendar" className="section steps">
      <div className="wrap">
        <SectionHeading
          eyebrow={STEPS_SECTION.eyebrow}
          title={STEPS_SECTION.title}
          script={STEPS_SECTION.titleScript}
          text={STEPS_SECTION.text}
        />

        <ol className="steps__list">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              variant="fade-up"
              delay={i * 140}
              className="steps__item"
            >
              <span className="steps__marker">
                <span className="steps__number">{i + 1}</span>
                <span className="steps__icon">
                  <Icon name={step.icon} size={24} strokeWidth={1.5} />
                </span>
              </span>

              <h3 className="steps__title">{step.title}</h3>
              <p className="steps__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal variant="fade-up" delay={200} className="steps__cta">
          <a
            className="btn btn--wa"
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={19} />
            Empezar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
