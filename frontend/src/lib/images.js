import manifest from '../assets/img/manifest.json'

/**
 * Recoge todas las variantes generadas por `npm run images`.
 * Vite las procesa como assets (nombre con hash, caché larga).
 */
const urls = import.meta.glob('../assets/img/*.{webp,jpg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** { 'hero-960.webp': '/assets/hero-960.a1b2c3.webp', … } */
const byFile = Object.fromEntries(
  Object.entries(urls).map(([path, url]) => [path.split('/').pop(), url]),
)

/**
 * Devuelve lo necesario para pintar una imagen responsive.
 *
 * @param {string} name Clave del manifiesto (p. ej. 'hero').
 * @returns {{src:string, srcSet:string, width:number, height:number}}
 */
export function getImage(name) {
  const entry = manifest[name]

  if (!entry) {
    throw new Error(
      `No hay variantes para «${name}». ¿Falta añadirla a scripts/build-images.mjs y correr «npm run images»?`,
    )
  }

  const srcSet = entry.widths
    .map(({ w }) => `${byFile[`${name}-${w}.webp`]} ${w}w`)
    .join(', ')

  return {
    src: byFile[entry.fallback],
    srcSet,
    width: entry.width,
    height: entry.height,
  }
}
