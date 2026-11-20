import Icon from './Icons'
import { CLINIC, LINKS } from '../data/siteData'
import './WhatsAppFloat.css'

/** Botón flotante de WhatsApp, visible durante toda la navegación. */
export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${CLINIC.phoneDisplay} para agendar una cita`}
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <span className="wa-float__pulse wa-float__pulse--2" aria-hidden="true" />

      <span className="wa-float__icon">
        <Icon name="whatsapp" size={28} />
      </span>

      <span className="wa-float__label" aria-hidden="true">
        Agenda tu cita
      </span>
    </a>
  )
}
