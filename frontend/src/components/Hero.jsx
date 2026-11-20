import Icon from './Icons'
import Marble from './Marble'
import Sparkles from './Sparkles'
import { getImage } from '../lib/images'
import { HERO, LINKS } from '../data/siteData'
import './Hero.css'

/**
 * Hero. La foto se funde con el fondo en lugar de recortarse:
 *
 *  · `mix-blend-mode: multiply` hace desaparecer el fondo blanco del original
 *    (es blanco puro y uniforme, así que multiplicado por el marfil devuelve
 *    exactamente el marfil).
 *  · dos máscaras en degradado suavizan los bordes donde la foto está
 *    recortada (izquierda, arriba y abajo).
 *
 * Importante: NINGÚN ancestro de la imagen puede crear un contexto de
 * apilamiento (`transform`, `opacity`, `filter`, `z-index` numérico, …). Si lo
 * hiciera, el grupo quedaría aislado y la mezcla dejaría de ver el fondo de la
 * sección: volvería a aparecer el rectángulo blanco. Por eso el parallax y la
 * animación de entrada van sobre la propia imagen, usando las propiedades
 * independientes `translate` y `scale` (que no compiten entre sí como lo
 * harían dos `transform`).
 *
 * Sin chips ni tarjetas flotantes sobre la foto: el hero va limpio.
 */
export default function Hero({ shift = 0 }) {
  const hero = getImage('hero')

  return (
    <section id="inicio" className="hero">
      {/* Capa 1: textura y destellos (se pinta primero, sin z-index). */}
      <div className="hero__bg">
        <Marble area="bottom" />
        <Sparkles tone="warm" shift={shift * 0.3} className="hero__sparkles" />
      </div>

      {/* Capa 2: la foto. */}
      <div className="hero__media">
        <picture>
          <source type="image/webp" srcSet={hero.srcSet} sizes="(min-width: 981px) 58vw, 100vw" />
          <img
            className="hero__photo"
            src={hero.src}
            width={hero.width}
            height={hero.height}
            sizes="(min-width: 981px) 58vw, 100vw"
            alt={HERO.imageAlt}
            fetchpriority="high"
            decoding="async"
            style={{ translate: `0 ${shift * 0.12}px` }}
          />
        </picture>
      </div>

      {/* Capa 3: el texto. */}
      <div className="wrap hero__inner">
        <div className="hero__content">
          <span className="hero__badge anim-rise" style={{ '--anim-delay': '100ms' }}>
            {HERO.badge}
          </span>

          <h1 className="hero__title">
            <span className="anim-rise" style={{ '--anim-delay': '220ms' }}>
              {HERO.titleTop}{' '}
            </span>
            <span className="script hero__title-script anim-rise" style={{ '--anim-delay': '340ms' }}>
              {HERO.titleScript}
            </span>
            <span className="anim-rise" style={{ '--anim-delay': '440ms' }}>
              {HERO.titleBottom}
            </span>
          </h1>

          <p className="hero__subtitle anim-rise" style={{ '--anim-delay': '560ms' }}>
            {HERO.subtitle}
          </p>

          <div className="hero__actions anim-rise" style={{ '--anim-delay': '680ms' }}>
            <a
              className="btn btn--primary"
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={19} />
              {HERO.primaryCta}
            </a>

            <a className="btn btn--ghost" href="#especialidades">
              {HERO.secondaryCta}
              <Icon name="arrowRight" size={18} />
            </a>
          </div>
        </div>
      </div>

      <a className="hero__cue" href="#especialidades" aria-label="Ir a especialidades">
        <Icon name="arrowDown" size={20} />
      </a>
    </section>
  )
}
