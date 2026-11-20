import Icon from './Icons'
import Reveal from './Reveal'
import { TRUST } from '../data/siteData'
import './TrustStrip.css'

/**
 * Franja de confianza: cuatro conceptos que definen la atención.
 * Cada uno entra escalonado y su anillo dorado se "dibuja" al aparecer.
 */
export default function TrustStrip() {
  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="wrap">
        {/* Encabezado solo para lectores de pantalla: la franja es visualmente
            un listado suelto, pero sin un <h2> los <h3> de dentro saltarían
            del <h1> del hero directamente al nivel 3. */}
        <h2 id="trust-title" className="sr-only">
          Cómo atendemos
        </h2>

        <ul className="trust__grid">
          {TRUST.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              variant="fade-up"
              delay={i * 110}
              className="trust__item"
            >
              <span className="trust__ring">
                <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                  <circle className="trust__ring-track" cx="32" cy="32" r="29" />
                  {/* El giro de -90° (para que el trazo arranque arriba) va
                      sobre este <circle>, NUNCA sobre el contenedor: si se
                      aplicara al <span>, el icono de dentro saldría tumbado. */}
                  <circle className="trust__ring-arc" cx="32" cy="32" r="29" />
                </svg>

                <span className="trust__icon">
                  <Icon name={item.icon} size={24} strokeWidth={1.5} />
                </span>
              </span>

              <h3 className="trust__title">{item.title}</h3>
              <p className="trust__text">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
