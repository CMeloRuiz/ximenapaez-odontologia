import { useEffect, useState } from 'react'

/**
 * Escucha el scroll con `requestAnimationFrame` y devuelve
 * `{ y, progress }`: posición en píxeles y avance total de la página (0–1).
 *
 * Un único listener alimenta la barra de progreso, el navbar y el parallax.
 */
export default function useScrollValue() {
  const [value, setValue] = useState({ y: 0, progress: 0 })

  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      const y = window.scrollY || window.pageYOffset || 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0
      setValue({ y, progress })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return value
}
