import BrandLogo from './BrandLogo'
import Icon from './Icons'
import { CLINIC, FOOTER, LINKS, NAV_LINKS } from '../data/siteData'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        {/* ── Marca ────────────────────────────────────────────────────── */}
        <div className="footer__brand">
          <BrandLogo layout="stacked" variant="gold" className="footer__logo" />
          <p className="footer__note">{FOOTER.note}</p>

          <ul className="footer__social">
            <li>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: ${CLINIC.instagramHandle}`}
              >
                <Icon name="instagram" size={19} />
              </a>
            </li>
            <li>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp: ${CLINIC.phoneDisplay}`}
              >
                <Icon name="whatsapp" size={19} />
              </a>
            </li>
            <li>
              <a href={LINKS.email} aria-label={`Correo: ${CLINIC.email}`}>
                <Icon name="mail" size={19} strokeWidth={1.5} />
              </a>
            </li>
          </ul>
        </div>

        {/* ── Navegación ───────────────────────────────────────────────── */}
        <nav className="footer__nav" aria-label="Enlaces del pie de página">
          <h2 className="footer__heading">Secciones</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Datos ────────────────────────────────────────────────────── */}
        <div className="footer__contact">
          <h2 className="footer__heading">Contacto</h2>

          <ul>
            <li>
              <a href={LINKS.maps} target="_blank" rel="noopener noreferrer">
                <Icon name="location" size={16} strokeWidth={1.6} />
                {CLINIC.addressFull}
              </a>
            </li>
            <li>
              <a href={LINKS.tel}>
                <Icon name="phone" size={16} strokeWidth={1.6} />
                {CLINIC.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={LINKS.email}>
                <Icon name="mail" size={16} strokeWidth={1.6} />
                {CLINIC.email}
              </a>
            </li>
            <li>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={16} />
                {CLINIC.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer__legal">
        <p>
          © {year} {CLINIC.name}. {CLINIC.tagline}.
        </p>
        {/* Aviso de maqueta: quitar cuando el sitio sea el definitivo. */}
        <p className="footer__demo">{FOOTER.demo}</p>
      </div>
    </footer>
  )
}
