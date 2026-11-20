import Icon from './Icons'
import Marble from './Marble'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  LINKS,
  REVIEWS,
  REVIEWS_SECTION,
} from '../data/siteData'
import './Reviews.css'

/**
 * Reseñas de Google.
 *
 * Las tarjetas que vienen en `siteData.REVIEWS` son de maqueta y están
 * marcadas con `placeholder: true`: el diseño está listo para recibir los
 * textos reales, pero no se inventa ninguna reseña ni ningún nombre.
 *
 * La calificación solo se dibuja si `GOOGLE_RATING` tiene una cifra
 * verificada; si está en `null`, no aparece ningún número.
 */
export default function Reviews() {
  const hasRating = typeof GOOGLE_RATING === 'number'

  return (
    <section id="resenas" className="section reviews">
      <Marble area="top" />

      <div className="wrap">
        <SectionHeading
          eyebrow={REVIEWS_SECTION.eyebrow}
          title={REVIEWS_SECTION.title}
          script={REVIEWS_SECTION.titleScript}
          text={REVIEWS_SECTION.text}
        />

        {hasRating && (
          <Reveal variant="zoom-in" className="reviews__score">
            <span className="reviews__score-value">{GOOGLE_RATING.toFixed(1)}</span>

            <span className="reviews__stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" size={18} />
              ))}
            </span>

            <span className="reviews__score-meta">
              {typeof GOOGLE_REVIEW_COUNT === 'number'
                ? `${GOOGLE_REVIEW_COUNT} reseñas en Google`
                : 'Calificación en Google'}
            </span>
          </Reveal>
        )}

        <ul className="reviews__grid">
          {REVIEWS.map((review, i) => (
            <Reveal
              as="li"
              key={i}
              variant="fade-up"
              delay={i * 120}
              className={`card reviews__card${review.placeholder ? ' is-placeholder' : ''}`}
            >
              <span className="reviews__quote" aria-hidden="true">
                <Icon name="quote" size={30} />
              </span>

              <span className="reviews__stars reviews__stars--card" aria-hidden="true">
                {Array.from({ length: 5 }, (_, s) => (
                  <Icon key={s} name="star" size={15} />
                ))}
              </span>

              <p className="reviews__text">{review.text}</p>

              <footer className="reviews__author">
                <span className="reviews__avatar" aria-hidden="true">
                  {review.initial}
                </span>
                <span className="reviews__name">{review.name}</span>
              </footer>
            </Reveal>
          ))}
        </ul>

        <Reveal variant="fade-up" delay={120} className="reviews__cta-wrap">
          <a
            className="btn btn--ghost"
            href={LINKS.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
          >
            {REVIEWS_SECTION.cta}
            <Icon name="externalLink" size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
