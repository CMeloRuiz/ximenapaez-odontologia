import { getImage } from '../lib/images'

/**
 * Imagen responsive: sirve WebP por `srcset` y deja un JPEG/PNG de respaldo.
 *
 * Siempre lleva `width` y `height` reales para que el navegador reserve el
 * hueco antes de descargar la imagen (evita saltos de maquetación).
 *
 * @param {string}  name     Clave del manifiesto generado.
 * @param {string}  alt      Texto alternativo ('' si es decorativa).
 * @param {string}  sizes    Ancho de presentación para que el navegador elija.
 * @param {boolean} priority `true` solo en la imagen del hero.
 */
export default function Img({
  name,
  alt = '',
  sizes,
  priority = false,
  className = '',
  ...rest
}) {
  const { src, srcSet, width, height } = getImage(name)

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        decoding="async"
        {...(priority
          ? { fetchpriority: 'high' }
          : { loading: 'lazy' })}
        {...rest}
      />
    </picture>
  )
}
