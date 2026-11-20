import './ScrollProgress.css'

/** Barra de avance de lectura, fija en el borde superior de la ventana. */
export default function ScrollProgress({ progress = 0 }) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
