import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'

/**
 * Envoltorio que anima la entrada de su contenido cuando aparece en pantalla.
 *
 * @param {string} as       Etiqueta HTML a renderizar (div por defecto).
 * @param {string} variant  fade | fade-up | fade-down | fade-left | fade-right | zoom-in | zoom-out
 * @param {number} delay    Retraso en ms (para escalonar listas y grids).
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  threshold,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useReveal(threshold ? { threshold } : undefined)
  const [settled, setSettled] = useState(false)

  // Al terminar la transición liberamos `will-change`.
  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => setSettled(true), 1000 + delay)
    return () => window.clearTimeout(timer)
  }, [visible, delay])

  const classes = [
    'reveal',
    `reveal--${variant}`,
    visible ? 'is-visible' : '',
    settled ? 'is-settled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
