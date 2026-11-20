import BrandLogo from './BrandLogo'
import Icon from './Icons'
import Reveal from './Reveal'
import { CLINIC, CLINIC_SECTION } from '../data/siteData'
import './Clinic.css'

/**
 * Nuestro consultorio · por qué elegirnos · sobre la Dra. Ximena Páez.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO — FOTOS REALES DEL CONSULTORIO
 *
 *  Aquí va una foto de la recepción (el letrero dorado retroiluminado sobre
 *  el mármol) y otra del box de atención. Las capturas de Instagram que hay
 *  en `images/ref-recepcion.png` y `images/ref-consultorio-led.png` miden
 *  ~310x425 px y llevan textos encima: recortadas y mostradas a este tamaño
 *  se verían pixeladas, así que NO se usan.
 *
 *  Mientras llegan las fotos en buena resolución (mínimo 1600 px de ancho),
 *  el hueco lo ocupa una placa decorativa con el monograma de la marca:
 *  se lee como una pieza de identidad, no como un hueco vacío.
 *
 *  Para cambiarlo: añade la foto a `images/`, decláralas en
 *  `scripts/build-images.mjs`, corre `npm run images` y sustituye
 *  `<figure className="clinic__plate">` por `<Img name="consultorio" … />`.
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function Clinic() {
  const bio = CLINIC_SECTION.doctorBio ?? CLINIC_SECTION.doctorBioFallback

  return (
    <section id="consultorio" className="section clinic">
      <div className="wrap clinic__inner">
        {/* ── Placa decorativa ─────────────────────────────────────────── */}
        <Reveal variant="fade-right" className="clinic__visual">
          <figure className="clinic__plate">
            <span className="clinic__plate-glow" aria-hidden="true" />

            <BrandLogo layout="stacked" variant="gold" className="clinic__plate-logo" />

            <figcaption className="clinic__plate-caption">
              <Icon name="location" size={15} strokeWidth={1.6} />
              {CLINIC.addressFull}
            </figcaption>
          </figure>
        </Reveal>

        {/* ── Texto ────────────────────────────────────────────────────── */}
        <div className="clinic__body">
          <Reveal as="span" variant="fade-up" className="eyebrow">
            {CLINIC_SECTION.eyebrow}
          </Reveal>

          <Reveal as="h2" variant="fade-up" delay={80} className="clinic__title">
            {CLINIC_SECTION.title}{' '}
            <span className="script">{CLINIC_SECTION.titleScript}</span>
          </Reveal>

          <Reveal variant="fade" delay={160} className="clinic__line">
            <span className="draw-line" />
          </Reveal>

          <Reveal as="p" variant="fade-up" delay={220} className="lead clinic__text">
            {CLINIC_SECTION.text}
          </Reveal>

          <ul className="clinic__points">
            {CLINIC_SECTION.points.map((point, i) => (
              <Reveal
                as="li"
                key={point.title}
                variant="fade-up"
                delay={280 + i * 90}
                className="clinic__point"
              >
                <span className="clinic__point-icon">
                  <Icon name={point.icon} size={20} strokeWidth={1.5} />
                </span>

                <span>
                  <strong className="clinic__point-title">{point.title}</strong>
                  <span className="clinic__point-text">{point.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          {/* ── Sobre la doctora ───────────────────────────────────────── */}
          <Reveal variant="fade-up" delay={620} className="clinic__doctor">
            <h3 className="clinic__doctor-title">
              Sobre la <span className="script">Dra. Ximena Páez</span>
            </h3>
            <p className="clinic__doctor-text">{bio}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
