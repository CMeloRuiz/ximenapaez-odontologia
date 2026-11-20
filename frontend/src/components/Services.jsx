import Icon from './Icons'
import Marble from './Marble'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { SERVICES } from '../data/siteData'
import './Services.css'

/** Las siete especialidades del consultorio. */
export default function Services() {
  return (
    <section id="especialidades" className="section services">
      <Marble area="top" />

      <div className="wrap">
        <SectionHeading
          eyebrow="Especialidades"
          title="Todo lo que tu boca necesita, en un"
          script="lugar"
          text="Desde el control de rutina hasta los tratamientos especializados. Si tu caso requiere varias áreas, las coordinamos entre sí para que el plan tenga sentido como un todo."
        />

        <ul className="services__grid">
          {SERVICES.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              variant="fade-up"
              delay={(i % 3) * 110}
              className="card services__card"
            >
              <span className="services__icon">
                <Icon name={service.icon} size={28} strokeWidth={1.4} />
              </span>

              <h3 className="services__title">{service.title}</h3>
              <p className="services__text">{service.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
