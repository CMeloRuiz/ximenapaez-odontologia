import { LOGO_FULL, LOGO_MARK, LOGO_SIGN } from '../assets/logoPaths'
import { CLINIC } from '../data/siteData'
import './BrandLogo.css'

/**
 * Logo de la marca, vectorizado desde el original (ver `npm run logo`).
 *
 * Va inline como `<svg>` y no como `<img>` a propósito: así el trazo hereda
 * `currentColor` y puede pasar de dorado a champagne con una transición suave
 * cuando el navbar cambia de estado, sin cargar dos archivos ni usar filtros.
 * Al ser curvas, se ve nítido a cualquier tamaño y nunca arrastra fondo blanco.
 *
 * La bajada "Odontología integral y estética" es texto real: a la resolución
 * del original esas letras no se pueden vectorizar legibles.
 *
 * @param {'lockup'|'stacked'|'mark'} layout
 *   lockup  → monograma + firma en línea (navbar).
 *   stacked → pieza completa, el logo tal cual lo usa el consultorio (pie).
 *   mark    → solo el monograma (adornos).
 * @param {'gold'|'light'} variant  Color del trazo.
 * @param {boolean} withTagline     Muestra la bajada de texto.
 */
export default function BrandLogo({
  layout = 'lockup',
  variant = 'gold',
  withTagline = true,
  className = '',
}) {
  const classes = `brand brand--${layout} brand--${variant} ${className}`.trim()

  /* El nombre del consultorio ya va como texto accesible en `.sr-only`,
     así que los trazos son decorativos. */
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    fillRule: 'evenodd',
    'aria-hidden': 'true',
    focusable: 'false',
  }

  if (layout === 'mark') {
    return (
      <span className={classes}>
        <svg
          {...svgProps}
          className="brand__mark"
          viewBox={`0 0 ${LOGO_MARK.width} ${LOGO_MARK.height}`}
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
        >
          <path d={LOGO_MARK.d} />
        </svg>
      </span>
    )
  }

  if (layout === 'stacked') {
    return (
      <span className={classes}>
        <span className="sr-only">
          {CLINIC.name} — {CLINIC.tagline}
        </span>

        {/* La pieza completa se compone de las dos partes, cada una en su
            sitio dentro del lienzo original: así no se repiten los `path`. */}
        <svg
          {...svgProps}
          className="brand__full"
          viewBox={`0 0 ${LOGO_FULL.width} ${LOGO_FULL.height}`}
          width={LOGO_FULL.width}
          height={LOGO_FULL.height}
        >
          <g transform={`translate(${LOGO_FULL.markAt.join(' ')})`}>
            <path d={LOGO_MARK.d} />
          </g>
          <g transform={`translate(${LOGO_FULL.signAt.join(' ')})`}>
            <path d={LOGO_SIGN.d} />
          </g>
        </svg>

        {withTagline && <span className="brand__tagline">{CLINIC.tagline}</span>}
      </span>
    )
  }

  return (
    <span className={classes}>
      <span className="sr-only">
        {CLINIC.name} — {CLINIC.tagline}
      </span>

      <svg
        {...svgProps}
        className="brand__mark"
        viewBox={`0 0 ${LOGO_MARK.width} ${LOGO_MARK.height}`}
        width={LOGO_MARK.width}
        height={LOGO_MARK.height}
      >
        <path d={LOGO_MARK.d} />
      </svg>

      <span className="brand__text">
        <svg
          {...svgProps}
          className="brand__sign"
          viewBox={`0 0 ${LOGO_SIGN.width} ${LOGO_SIGN.height}`}
          width={LOGO_SIGN.width}
          height={LOGO_SIGN.height}
        >
          <path d={LOGO_SIGN.d} />
        </svg>

        {withTagline && <span className="brand__tagline">{CLINIC.tagline}</span>}
      </span>
    </span>
  )
}
