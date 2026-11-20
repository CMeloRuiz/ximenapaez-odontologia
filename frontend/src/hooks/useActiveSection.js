import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección visible en pantalla, para resaltar
 * el enlace correspondiente del menú.
 *
 * @param {string[]} ids Ids de las secciones, en orden de aparición.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    // Guardamos la proporción visible de cada sección y elegimos la mayor.
    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let best = ''
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })

        if (best) setActive(best)
      },
      {
        // Zona de interés: franja central de la ventana.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
