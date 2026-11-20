import Reveal from './Reveal'
import './SectionHeading.css'

/**
 * Encabezado de sección: antetítulo, título (con remate en tipografía script),
 * línea dorada que se dibuja al aparecer y texto de apoyo.
 */
export default function SectionHeading({
  eyebrow,
  title,
  script,
  titleEnd,
  text,
  align = 'center',
  tone = 'light',
  as: Tag = 'h2',
  id,
}) {
  return (
    <div className={`sec-head sec-head--${align} sec-head--${tone}`}>
      {eyebrow && (
        <Reveal as="span" variant="fade-up" className="eyebrow sec-head__eyebrow">
          {eyebrow}
        </Reveal>
      )}

      <Reveal as={Tag} id={id} variant="fade-up" delay={80} className="sec-head__title">
        {title}
        {script && (
          <>
            {' '}
            <span className="script sec-head__script">{script}</span>
          </>
        )}
        {titleEnd}
      </Reveal>

      <Reveal variant="fade" delay={160} className="sec-head__line-wrap">
        <span className={`draw-line${align === 'center' ? ' draw-line--center' : ''}`} />
      </Reveal>

      {text && (
        <Reveal as="p" variant="fade-up" delay={220} className="lead sec-head__text">
          {text}
        </Reveal>
      )}
    </div>
  )
}
