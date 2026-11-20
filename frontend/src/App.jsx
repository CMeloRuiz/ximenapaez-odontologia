import { useEffect } from 'react'

import Clinic from './components/Clinic'
import Contact from './components/Contact'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Orthodontics from './components/Orthodontics'
import Reviews from './components/Reviews'
import ScrollProgress from './components/ScrollProgress'
import Services from './components/Services'
import Steps from './components/Steps'
import TrustStrip from './components/TrustStrip'
import WhatsAppFloat from './components/WhatsAppFloat'

import usePrefersReducedMotion from './hooks/usePrefersReducedMotion'
import useScrollValue from './hooks/useScrollValue'

export default function App() {
  const { y, progress } = useScrollValue()
  const reducedMotion = usePrefersReducedMotion()

  // Al abrir la página con un ancla (por ejemplo /#contacto), el navegador
  // intenta saltar antes de que React haya pintado las secciones y se queda
  // arriba. Repetimos el salto una vez montado el contenido.
  useEffect(() => {
    const { hash } = window.location
    if (hash.length < 2) return

    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  // El parallax del hero se limita a su propia altura: más allá, la sección
  // ya salió de pantalla y no tiene sentido seguir desplazando la capa.
  const heroShift = reducedMotion ? 0 : Math.min(y, 900)

  // Desplazamiento suave y acotado para el fondo del CTA final.
  const ctaShift = reducedMotion ? 0 : (progress - 0.5) * 110

  return (
    <>
      <a className="skip-link" href="#inicio">
        Saltar al contenido
      </a>

      <ScrollProgress progress={progress} />
      <Navbar scrolled={y > 24} />

      <main>
        <Hero shift={heroShift} />
        <TrustStrip />
        <Services />
        <Orthodontics />
        <Clinic />
        <Reviews />
        <Steps />
        <Contact />
        <FinalCta shift={ctaShift} />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
