/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Generador de imágenes responsive  ·  npm run images
 * ─────────────────────────────────────────────────────────────────────────────
 *  Lee los originales de `images/` y escribe en `src/assets/img/` una versión
 *  WebP por cada ancho declarado, más un JPEG/PNG de respaldo al ancho mayor.
 *
 *  Regla de oro: NUNCA se genera un ancho por encima del nativo. Ampliar una
 *  foto no añade detalle, solo peso y aspecto blando; es preferible servirla a
 *  su tamaño real y dejar que el navegador la encaje.
 *
 *  Los componentes no importan estos archivos a mano: `src/lib/images.js` los
 *  recoge con `import.meta.glob` y arma el `srcset`.
 *
 *  Además compone la imagen de Open Graph (`public/og-image.jpg`) a partir de
 *  la foto del hero y del logo ya vectorizado.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { LOGO_FULL, LOGO_MARK, LOGO_SIGN } from '../src/assets/logoPaths.js'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..')
const SRC_DIR = join(ROOT, 'images')
const OUT_DIR = join(ROOT, 'src', 'assets', 'img')
const PUBLIC_DIR = join(ROOT, 'public')

/** Marfil del sitio (`--ivory`): el fondo con el que se funde la foto. */
const IVORY = '#fbf8f3'

/**
 * `widths`  anchos a generar (los que superen el nativo se descartan).
 * `sharpen` enfoque suave, solo para recortes que se amplían.
 * `alpha`   conserva transparencia (respaldo en PNG en vez de JPEG).
 */
const IMAGES = [
  /**
   * Hero. Nativo: 1345x896.
   * Se muestra a `min(62vw, 1000px)` en escritorio y a ~104vw en móvil, así
   * que 1345 cubre hasta un 1440 CSS en pantalla 1.5x. No se amplía más.
   */
  { file: 'hero.webp', name: 'hero', widths: [480, 760, 1040, 1345], quality: 80 },

  /*
   * TODO — FOTOS DEL CONSULTORIO
   * Cuando lleguen las fotos reales (recepción con el letrero dorado y box de
   * atención, mínimo 1600 px de ancho), añádelas a `images/` y descomenta:
   *
   *   { file: 'consultorio.jpg', name: 'consultorio', widths: [480, 760, 1100], quality: 80 },
   *   { file: 'recepcion.jpg',   name: 'recepcion',   widths: [480, 760, 1100], quality: 80 },
   *
   * Después corre `npm run images` y usa <Img name="consultorio" … /> en
   * `src/components/Clinic.jsx`, en lugar de la placa decorativa.
   *
   * Las capturas de Instagram que hay ahora en `images/ref-*.png` miden unos
   * 300x420 px: sirven como referencia de color y de contenido, pero no se
   * publican porque a cualquier tamaño útil se ven pixeladas.
   */
]

/** Reescalado común a todas las salidas. */
function pipeline(input, width, { sharpen, alpha }) {
  let img = sharp(input).resize({
    width,
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: true,
    fit: 'inside',
  })

  // Enfoque leve: devuelve nitidez al borde sin halos marcados.
  if (sharpen) img = img.sharpen({ sigma: 0.7, m1: 0.5, m2: 0.9 })
  // El fondo del hero es blanco puro; aplanarlo contra blanco lo conserva
  // intacto y evita que un canal alfa suelto arrastre bordes grises.
  if (!alpha) img = img.flatten({ background: '#ffffff' })

  return img
}

/* ── Imagen de Open Graph ───────────────────────────────────────────────── */

/**
 * Compone 1200x630: marfil, el logo a la izquierda y la foto del hero a la
 * derecha. La foto trae fondo blanco puro, así que se funde con el marfil
 * mediante una máscara en degradado sobre el borde izquierdo.
 */
async function buildOgImage() {
  const W = 1200
  const H = 630

  // Foto recortada a la mitad derecha.
  const photoW = 620
  const photo = await sharp(join(SRC_DIR, 'hero.webp'))
    .resize({ width: photoW, height: H, fit: 'cover', position: 'right' })
    .toBuffer()

  /*
   * Degradado que desvanece el borde izquierdo de la foto.
   *
   * La máscara actúa sobre el CANAL ALFA (`dest-in`), no sobre el color: con
   * `multiply` y un degradado de negro a blanco la foto no se desvanecía,
   * se ennegrecía, y quedaba una franja oscura en la junta.
   */
  const fadeMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${photoW}" height="${H}">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
           <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
           <stop offset="42%" stop-color="#fff" stop-opacity="1"/>
         </linearGradient>
       </defs>
       <rect width="100%" height="100%" fill="url(#g)"/>
     </svg>`,
  )

  const photoFaded = await sharp(photo)
    .ensureAlpha()
    .composite([{ input: fadeMask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  // Logo vectorizado, en dorado: monograma y firma, cada uno en su sitio.
  const logoW = 430
  const logo = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_FULL.width} ${LOGO_FULL.height}">
         <g fill="#a67c3d" fill-rule="evenodd">
           <path transform="translate(${LOGO_FULL.markAt.join(' ')})" d="${LOGO_MARK.d}"/>
           <path transform="translate(${LOGO_FULL.signAt.join(' ')})" d="${LOGO_SIGN.d}"/>
         </g>
       </svg>`,
    ),
    { density: 600 },
  )
    .resize({ width: logoW })
    .png()
    .toBuffer()

  const logoMeta = await sharp(logo).metadata()

  const caption = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="84">
       <text x="0" y="24" font-family="Jost, Helvetica, Arial, sans-serif"
             font-size="21" letter-spacing="4" fill="#7a5a2a">
         ODONTOLOGÍA INTEGRAL Y ESTÉTICA
       </text>
       <text x="0" y="60" font-family="Jost, Helvetica, Arial, sans-serif"
             font-size="20" letter-spacing="1.6" fill="#6f6458">
         Ubaté, Cundinamarca
       </text>
     </svg>`,
  )

  const logoTop = Math.round((H - logoMeta.height) / 2) - 40

  const buffer = await sharp({
    create: { width: W, height: H, channels: 3, background: IVORY },
  })
    .composite([
      // Multiply: el blanco de la foto se convierte en el marfil del fondo.
      { input: photoFaded, left: W - photoW, top: 0, blend: 'multiply' },
      { input: logo, left: 76, top: logoTop },
      { input: caption, left: 82, top: logoTop + logoMeta.height + 6 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer()

  await mkdir(PUBLIC_DIR, { recursive: true })
  await writeFile(join(PUBLIC_DIR, 'og-image.jpg'), buffer)

  return buffer.length
}

/* ── Proceso ────────────────────────────────────────────────────────────── */

async function run() {
  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  const manifest = {}
  let totalBytes = 0
  const rows = []

  for (const spec of IMAGES) {
    const input = join(SRC_DIR, spec.file)
    const meta = await sharp(input).metadata()

    // Nunca por encima del nativo.
    const widths = spec.widths.filter((w) => w <= meta.width)
    if (!widths.includes(meta.width) && spec.widths.some((w) => w > meta.width)) {
      widths.push(meta.width)
    }

    const entry = { widths: [], aspect: meta.width / meta.height, native: meta.width }

    for (const width of widths) {
      const height = Math.round(width / entry.aspect)

      const webpName = `${spec.name}-${width}.webp`
      const webpBuf = await pipeline(input, width, spec)
        .webp({ quality: spec.quality, effort: 6 })
        .toBuffer()
      await writeFile(join(OUT_DIR, webpName), webpBuf)

      entry.widths.push({ w: width, h: height })
      totalBytes += webpBuf.length
      rows.push({
        archivo: webpName,
        px: `${width}x${height}`,
        kB: +(webpBuf.length / 1024).toFixed(1),
      })
    }

    // Respaldo al ancho mayor para navegadores sin WebP.
    const widest = widths[widths.length - 1]
    const fbName = spec.alpha ? `${spec.name}.png` : `${spec.name}.jpg`
    const fbBuf = spec.alpha
      ? await pipeline(input, widest, spec).png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipeline(input, widest, spec).jpeg({ quality: spec.quality, mozjpeg: true }).toBuffer()
    await writeFile(join(OUT_DIR, fbName), fbBuf)

    entry.fallback = fbName
    entry.width = widest
    entry.height = Math.round(widest / entry.aspect)
    totalBytes += fbBuf.length
    rows.push({
      archivo: fbName,
      px: `${widest}x${entry.height}`,
      kB: +(fbBuf.length / 1024).toFixed(1),
    })

    manifest[spec.name] = entry
  }

  await writeFile(
    join(OUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  )

  const ogBytes = await buildOgImage()
  rows.push({ archivo: 'public/og-image.jpg', px: '1200x630', kB: +(ogBytes / 1024).toFixed(1) })

  console.table(rows)
  console.log(
    `\nVariantes servidas al navegador: ${(totalBytes / 1024).toFixed(1)} kB en ` +
      `${(await readdir(OUT_DIR)).length} archivos (la de Open Graph no se descarga en la visita).`,
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
