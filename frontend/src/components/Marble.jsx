import './Marble.css'

/**
 * Vetas de mármol dibujadas como SVG inline: tres o cuatro trazos muy finos,
 * casi transparentes, sobre el marfil del fondo.
 *
 * Es un adorno, no una textura fotográfica: pesa unos cientos de bytes y
 * escala a cualquier tamaño sin pixelarse. El `viewBox` no respeta la
 * proporción (`preserveAspectRatio="none"`) para que las vetas se estiren
 * con la sección en lugar de recortarse.
 *
 * @param {'top'|'bottom'|'full'} area  Dónde se concentran las vetas.
 */
export default function Marble({ area = 'full', className = '' }) {
  return (
    <svg
      className={`marble marble--${area} ${className}`.trim()}
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="marble__veins">
        <path d="M-40 118C140 92 268 168 392 188s214-30 330-6 196 118 330 96 240-74 240-74" />
        <path d="M-40 206C96 232 220 184 348 214s188 108 318 96 210-96 332-78 262 108 262 108" />
        <path d="M-40 392C120 356 232 430 368 442s204-64 330-44 198 110 326 92 216-96 216-96" />
        <path d="M-40 512C128 492 244 548 384 540s196-78 326-56 206 96 330 78 200-70 200-70" />
      </g>

      <g className="marble__veins marble__veins--fine">
        <path d="M-40 150C132 128 242 196 376 210s216-44 344-18 180 100 320 82 200-58 200-58" />
        <path d="M-40 452C124 428 236 486 376 492s190-62 320-40 212 92 344 74 200-62 200-62" />
      </g>
    </svg>
  )
}
