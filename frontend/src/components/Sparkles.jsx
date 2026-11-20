import './Sparkles.css'

/**
 * Fondo decorativo de destellos dorados: círculos difuminados en champagne
 * que flotan muy lento, como el reflejo del letrero retroiluminado.
 *
 * Las posiciones son fijas (no aleatorias) para que el render sea estable
 * entre recargas y no haya saltos de maquetación.
 *
 * @param {'warm'|'dark'} tone  Champagne sobre marfil, o dorado sobre espresso.
 * @param {number}        shift Desplazamiento de parallax en píxeles.
 */

const DOTS = [
  { x: 6, y: 18, size: 120, blur: 28, opacity: 0.5, delay: 0, duration: 18, depth: 0.5 },
  { x: 18, y: 70, size: 60, blur: 15, opacity: 0.44, delay: 2.4, duration: 14, depth: 0.9 },
  { x: 31, y: 12, size: 34, blur: 8, opacity: 0.55, delay: 1.1, duration: 11, depth: 1.2 },
  { x: 44, y: 84, size: 92, blur: 24, opacity: 0.34, delay: 3.6, duration: 20, depth: 0.4 },
  { x: 58, y: 26, size: 48, blur: 12, opacity: 0.5, delay: 0.8, duration: 15, depth: 1 },
  { x: 72, y: 62, size: 136, blur: 32, opacity: 0.3, delay: 2, duration: 22, depth: 0.35 },
  { x: 84, y: 16, size: 66, blur: 17, opacity: 0.45, delay: 4.2, duration: 16, depth: 0.8 },
  { x: 92, y: 78, size: 40, blur: 9, opacity: 0.5, delay: 1.6, duration: 12, depth: 1.1 },
  { x: 12, y: 44, size: 22, blur: 5, opacity: 0.6, delay: 3, duration: 9, depth: 1.4 },
  { x: 66, y: 90, size: 26, blur: 6, opacity: 0.55, delay: 0.4, duration: 10, depth: 1.3 },
]

export default function Sparkles({ tone = 'warm', shift = 0, className = '' }) {
  return (
    <div className={`sparkles sparkles--${tone} ${className}`.trim()} aria-hidden="true">
      {DOTS.map((dot, i) => (
        <span
          key={i}
          className="sparkles__dot"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            filter: `blur(${dot.blur}px)`,
            opacity: dot.opacity,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            // El wrapper lleva el parallax; el hijo, la flotación continua.
            transform: `translate3d(0, ${shift * dot.depth}px, 0)`,
          }}
        />
      ))}
    </div>
  )
}
