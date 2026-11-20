import { useEffect, useRef, useState } from 'react'

/**
 * Observa un elemento y avisa cuando entra en el viewport.
 * Se usa para disparar las animaciones de aparición al hacer scroll.
 *
 * @param {object}  options
 * @param {number}  options.threshold  Porción visible necesaria (0–1).
 * @param {string}  options.rootMargin Margen del root del observer.
 * @param {boolean} options.once       Si `true`, deja de observar tras aparecer.
 * @returns {[React.RefObject, boolean]} `[ref, visible]`
 */
export default function useReveal({
  threshold = 0.14,
  rootMargin = '0px 0px -6% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin IntersectionObserver mostramos el contenido directamente.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}
