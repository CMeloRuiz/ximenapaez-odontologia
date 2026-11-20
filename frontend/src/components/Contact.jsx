import Icon from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { CLINIC, LINKS, SCHEDULE_NOTE } from '../data/siteData'
import './Contact.css'

/** Datos de contacto, redes y mapa. */
export default function Contact() {
  const channels = [
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: CLINIC.phoneDisplay,
      href: LINKS.whatsapp,
      external: true,
    },
    {
      icon: 'mail',
      label: 'Correo',
      value: CLINIC.email,
      href: LINKS.email,
      external: false,
    },
    {
      icon: 'instagram',
      label: 'Instagram',
      value: CLINIC.instagramHandle,
      href: LINKS.instagram,
      external: true,
    },
    {
      icon: 'location',
      label: 'Dirección',
      value: CLINIC.addressFull,
      href: LINKS.maps,
      external: true,
    },
  ]

  return (
    <section id="contacto" className="section contact">
      <div className="wrap">
        <SectionHeading
          eyebrow="Contacto y ubicación"
          title="Estamos en el centro de"
          script="Ubaté"
          text="Escríbenos por el canal que prefieras. Si vienes por primera vez, el WhatsApp es la vía más rápida para encontrar un espacio en la agenda."
        />

        <div className="contact__grid">
          {/* ── Canales ──────────────────────────────────────────────── */}
          <div className="contact__channels">
            <ul>
              {channels.map((channel, i) => (
                <Reveal
                  as="li"
                  key={channel.label}
                  variant="fade-up"
                  delay={i * 90}
                  className="contact__item"
                >
                  <a
                    className="contact__link"
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className="contact__icon">
                      <Icon name={channel.icon} size={20} strokeWidth={1.5} />
                    </span>

                    <span className="contact__body">
                      <span className="contact__label">{channel.label}</span>
                      <span className="contact__value">{channel.value}</span>
                    </span>

                    <span className="contact__arrow" aria-hidden="true">
                      <Icon name="arrowRight" size={17} />
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="fade-up" delay={380} className="contact__schedule">
              <span className="contact__schedule-icon">
                <Icon name="clock" size={18} strokeWidth={1.5} />
              </span>
              {/* TODO: cuando haya horario confirmado, reemplazar esta nota
                  por los días y las horas reales (`CLINIC.schedule`). */}
              <p>{SCHEDULE_NOTE}</p>
            </Reveal>
          </div>

          {/* ── Mapa ─────────────────────────────────────────────────── */}
          <Reveal variant="fade-left" delay={120} className="contact__map">
            <iframe
              src={LINKS.mapsEmbed}
              title={`Mapa de ubicación: ${CLINIC.addressFull}`}
              width="600"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <a
              className="btn btn--ghost btn--sm contact__map-cta"
              href={LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="location" size={16} strokeWidth={1.6} />
              Abrir en Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
