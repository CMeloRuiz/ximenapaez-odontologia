import { useCallback, useEffect, useId, useState } from 'react'

import BrandLogo from './BrandLogo'
import Icon from './Icons'
import useActiveSection from '../hooks/useActiveSection'
import { CLINIC, LINKS, NAV_LINKS } from '../data/siteData'
import './Navbar.css'

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

/**
 * Barra fija. Transparente sobre el hero; al hacer scroll pasa a marfil
 * translúcido con desenfoque y una sombra cálida.
 */
export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  // Cerrar al pasar a escritorio.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 981px)')
    const onChange = (e) => {
      if (e.matches) close()
    }
    if (mql.addEventListener) mql.addEventListener('change', onChange)
    else mql.addListener(onChange)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange)
      else mql.removeListener(onChange)
    }
  }, [close])

  return (
    <header className={`nav${scrolled ? ' nav--solid' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__inner wrap">
        {/* El hero es claro, así que el logo va en dorado en los dos estados;
            la transición de color queda lista para un hero oscuro.

            Sin `aria-label`: el nombre accesible sale del texto que BrandLogo
            deja en `.sr-only`. Poniendo uno distinto, el nombre anunciado y el
            texto del enlace dejarían de coincidir. */}
        <a href="#inicio" className="nav__brand" onClick={close}>
          <BrandLogo layout="lockup" variant="gold" />
        </a>

        <nav className="nav__links" aria-label="Navegación principal">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link${active === link.id ? ' is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="btn btn--primary btn--sm nav__cta"
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" size={17} />
          Agendar cita
        </a>

        <button
          type="button"
          className={`nav__burger${open ? ' is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Panel móvil */}
      <div id={menuId} className={`nav__panel${open ? ' is-open' : ''}`} hidden={!open}>
        <ul className="nav__panel-list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id} style={{ '--i': i }}>
              <a
                href={`#${link.id}`}
                className={`nav__panel-link${active === link.id ? ' is-active' : ''}`}
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="btn btn--wa nav__panel-cta"
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          <Icon name="whatsapp" size={18} />
          Agendar cita por WhatsApp
        </a>

        <p className="nav__panel-meta">
          {CLINIC.addressFull}
          <br />
          {CLINIC.phoneDisplay}
        </p>
      </div>

      {open && <button className="nav__scrim" onClick={close} aria-label="Cerrar menú" />}
    </header>
  )
}
