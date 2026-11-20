import BrandLogo from './BrandLogo'
import Icon from './Icons'
import Reveal from './Reveal'
import Sparkles from './Sparkles'
import { LINKS, ORTHO, waLink } from '../data/siteData'
import './Orthodontics.css'

/**
 * Bloque destacado de ortodoncia: va sobre fondo espresso para separarlo
 * del resto de especialidades y darle el peso que tiene en el consultorio.
 */
export default function Orthodontics() {
  return (
    <section id="ortodoncia" className="section ortho on-dark">
      <Sparkles tone="dark" />

      {/* Monograma gigante, muy tenue, como marca de agua. */}
      <BrandLogo layout="mark" variant="gold" className="ortho__watermark" />

      <div className="wrap ortho__inner">
        <div className="ortho__head">
          <Reveal as="span" variant="fade-up" className="eyebrow ortho__eyebrow">
            Ortodoncia y ortopedia maxilar
          </Reveal>

          <Reveal as="h2" variant="fade-up" delay={80} className="ortho__title">
            {ORTHO.title} <span className="script ortho__script">{ORTHO.titleScript}</span>
          </Reveal>

          <Reveal variant="fade" delay={160}>
            <span className="draw-line" />
          </Reveal>

          <Reveal as="p" variant="fade-up" delay={220} className="ortho__text">
            {ORTHO.text}
          </Reveal>

          <Reveal variant="fade-up" delay={300}>
            <a
              className="btn btn--primary ortho__cta"
              href={waLink(
                'Hola Dra. Ximena, quiero información sobre ortodoncia y agendar una valoración',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={19} />
              {ORTHO.cta}
            </a>
          </Reveal>
        </div>

        <ul className="ortho__list">
          {ORTHO.options.map((option, i) => (
            <Reveal
              as="li"
              key={option.name}
              variant="fade-right"
              delay={i * 70}
              className="ortho__item"
            >
              <span className="ortho__bullet" aria-hidden="true">
                <Icon name="braces" size={18} strokeWidth={1.5} />
              </span>

              <span className="ortho__item-body">
                <span className="ortho__name">{option.name}</span>
                <span className="ortho__desc">{option.text}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Enlace de apoyo, por si alguien llega buscando otra especialidad. */}
      <p className="sr-only">
        <a href={LINKS.whatsapp}>Escribir por WhatsApp para agendar una valoración</a>
      </p>
    </section>
  )
}
