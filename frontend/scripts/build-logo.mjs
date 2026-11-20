/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Vectorizador del logo  ·  npm run logo
 * ─────────────────────────────────────────────────────────────────────────────
 *  El original (`images/logo.png`) mide 227x148 px y viene con fondo blanco:
 *  usado tal cual se ve pixelado en cualquier pantalla moderna y arrastra una
 *  caja blanca sobre el marfil del sitio.
 *
 *  Este script lo convierte en curvas:
 *
 *    1. Reescala 8x con lanczos3 y suaviza el dentado del original.
 *    2. Traza el bitmap con potrace (umbral 205) y obtiene un unico `path`.
 *    3. Separa los subtrazos en tres grupos por su caja contenedora:
 *         - monograma  -> el anillo y los dos lazos de arriba
 *         - firma      -> "Ximena Paez"
 *         - bajada     -> "Odontologia integral y estetica"
 *       La bajada se DESCARTA: a 227 px de ancho esas letras miden 4 px de
 *       alto y el trazo sale como manchas. En el sitio se escribe como texto
 *       real (nitido, accesible y seleccionable) en `BrandLogo`.
 *    4. Escribe `src/assets/logoPaths.js` con los paths normalizados a un
 *       viewBox ajustado, y los favicons en `public/`.
 *
 *  Al quedar como `path` con `fill="currentColor"`, el logo se recolorea por
 *  CSS (dorado / champagne) con transicion suave y nunca lleva fondo propio.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import potrace from 'potrace'
import sharp from 'sharp'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..')
const SRC = join(ROOT, 'images', 'logo.png')
const TMP = join(ROOT, 'images', '.logo-prep.png')

/** Ampliacion previa al trazado: mas pixeles, curvas mas fieles. */
const SCALE = 8
/** Umbral de binarizado (0-255). El dorado del logo ronda el 160. */
const THRESHOLD = 205

/** Banda vertical (en el espacio ya escalado) donde vive la bajada de texto. */
const SUBLINE = { top: 745, bottom: 840, maxHeight: 100 }
/** El monograma es todo lo que queda arriba a la derecha del lienzo. */
const MARK = { minX: 650, maxY: 560 }

/* ── 1. Preparacion del bitmap ──────────────────────────────────────────── */

async function prepare() {
  const { width } = await sharp(SRC).metadata()

  await sharp(SRC)
    // El PNG original es opaco, pero si llegara con alfa lo aplanamos a blanco
    // para que potrace no interprete la transparencia como tinta.
    .flatten({ background: '#ffffff' })
    .resize({ width: Math.round(width * SCALE), kernel: sharp.kernel.lanczos3 })
    .greyscale()
    .normalise()
    // Un desenfoque minimo redondea la escalera del original: sin el, las
    // curvas salen con microfacetas visibles al ampliar.
    .blur(0.6)
    .png()
    .toFile(TMP)
}

/* ── 2. Trazado ─────────────────────────────────────────────────────────── */

function trace(file) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      file,
      {
        threshold: THRESHOLD,
        turdSize: 6, // descarta motas sueltas del original
        alphaMax: 1, // esquinas redondeadas: es una firma manuscrita
        optCurve: true,
        optTolerance: 0.2,
        background: 'transparent',
      },
      (err, svg) => (err ? reject(err) : resolve(svg)),
    )
  })
}

/* ── 3. Separacion por grupos ───────────────────────────────────────────── */

/** Caja contenedora aproximada de un subtrazo (puntos de control incluidos). */
function bbox(sub) {
  const nums = sub.match(/-?\d+(?:\.\d+)?/g).map(Number)
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity

  for (let i = 0; i < nums.length; i += 2) {
    x0 = Math.min(x0, nums[i])
    x1 = Math.max(x1, nums[i])
    y0 = Math.min(y0, nums[i + 1])
    y1 = Math.max(y1, nums[i + 1])
  }

  return { x0, y0, x1, y1 }
}

/**
 * Reescribe un subtrazo desplazandolo al origen y redondeando coordenadas.
 *
 * Se redondea al entero: el lienzo trazado mide ~1500 unidades de ancho, asi
 * que una unidad es el 0,07 % de la pieza. A tamanos de pantalla ese error no
 * llega ni a una decima de pixel, y quitar los decimales recorta un tercio
 * del peso del `path`.
 */
function normalise(sub, dx, dy) {
  let i = 0
  return sub.replace(/-?\d+(?:\.\d+)?/g, (n) =>
    String(Math.round(Number(n) - (i++ % 2 === 0 ? dx : dy))),
  )
}

/** Une subtrazos en un `d` con viewBox ajustado al contenido. */
function assemble(subs, pad = 6) {
  const boxes = subs.map(bbox)
  const x0 = Math.round(Math.min(...boxes.map((b) => b.x0)) - pad)
  const y0 = Math.round(Math.min(...boxes.map((b) => b.y0)) - pad)
  const x1 = Math.round(Math.max(...boxes.map((b) => b.x1)) + pad)
  const y1 = Math.round(Math.max(...boxes.map((b) => b.y1)) + pad)

  return {
    d: subs.map((s) => normalise(s, x0, y0)).join(' '),
    width: x1 - x0,
    height: y1 - y0,
    // Origen dentro del lienzo trazado: sirve para recomponer la pieza
    // completa sin repetir los `path`.
    x0,
    y0,
  }
}

/* ── 4. Salida ──────────────────────────────────────────────────────────── */

async function run() {
  await prepare()
  const svg = await trace(TMP)
  await unlink(TMP)

  const d = svg.match(/ d="([^"]+)"/)[1]
  const subs = d
    .split(/(?=M )/)
    .map((s) => s.trim())
    .filter(Boolean)

  const kept = []
  const markSubs = []
  const signSubs = []
  let dropped = 0

  for (const sub of subs) {
    const b = bbox(sub)

    // Bajada de texto: trazos bajos, cortos y dentro de la banda.
    const isSubline =
      b.y0 >= SUBLINE.top && b.y1 <= SUBLINE.bottom && b.y1 - b.y0 <= SUBLINE.maxHeight

    if (isSubline) {
      dropped++
      continue
    }

    kept.push(sub)
    if (b.x0 >= MARK.minX && b.y1 <= MARK.maxY) markSubs.push(sub)
    else signSubs.push(sub)
  }

  const mark = assemble(markSubs, 10)
  const sign = assemble(signSubs)

  /**
   * La pieza completa es exactamente el monograma mas la firma, asi que en
   * vez de repetir los `path` (serian ~50 kB de mas en el bundle) solo se
   * guarda el lienzo y el desplazamiento de cada pieza dentro de el.
   */
  const boxes = kept.map(bbox)
  const fx0 = Math.round(Math.min(...boxes.map((b) => b.x0)) - 6)
  const fy0 = Math.round(Math.min(...boxes.map((b) => b.y0)) - 6)

  const full = {
    width: Math.round(Math.max(...boxes.map((b) => b.x1)) + 6) - fx0,
    height: Math.round(Math.max(...boxes.map((b) => b.y1)) + 6) - fy0,
    markAt: [mark.x0 - fx0, mark.y0 - fy0],
    signAt: [sign.x0 - fx0, sign.y0 - fy0],
  }

  const strip = ({ d, width, height }) => ({ d, width, height })

  const header = [
    '/**',
    ' * Trazos del logo, generados por `npm run logo` desde `images/logo.png`.',
    ' * NO editar a mano: se sobreescriben al volver a correr el script.',
    ' *',
    ' * `LOGO_MARK`  el monograma (favicon, adornos, lockup del navbar).',
    ' * `LOGO_SIGN`  la firma "Ximena Paez".',
    ' * `LOGO_FULL`  el lienzo de la pieza completa y donde va cada parte:',
    ' *              se dibuja componiendo las dos anteriores, sin repetir',
    ' *              los `path`.',
    ' *',
    ' * La bajada "Odontologia integral y estetica" se escribe como texto real',
    ' * en `BrandLogo`: a la resolucion del original no se vectoriza legible.',
    ' */',
    '',
  ].join('\n')

  await writeFile(
    join(ROOT, 'src', 'assets', 'logoPaths.js'),
    `${header}export const LOGO_MARK = ${JSON.stringify(strip(mark), null, 2)}\n\n` +
      `export const LOGO_SIGN = ${JSON.stringify(strip(sign), null, 2)}\n\n` +
      `export const LOGO_FULL = ${JSON.stringify(full, null, 2)}\n`,
    'utf8',
  )

  /* Favicons: el monograma solo, en dorado, sobre fondo transparente. */
  await mkdir(join(ROOT, 'public'), { recursive: true })

  const faviconSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mark.width} ${mark.height}">` +
    `<path fill="#A67C3D" fill-rule="evenodd" d="${mark.d}"/></svg>`

  await writeFile(join(ROOT, 'public', 'favicon.svg'), faviconSvg, 'utf8')

  // PNG de respaldo (Safari antiguo, pantalla de inicio). Se dibuja con
  // margen para que el monograma no toque el borde del icono.
  const side = 180
  const inner = Math.round(side * 0.78)
  const gap = Math.round((side - inner) / 2)

  const png = await sharp(Buffer.from(faviconSvg), { density: 600 })
    .resize({ width: inner, height: inner, fit: 'contain', background: '#ffffff00' })
    .extend({
      top: gap,
      bottom: side - inner - gap,
      left: gap,
      right: side - inner - gap,
      background: '#ffffff00',
    })
    .png()
    .toBuffer()

  await writeFile(join(ROOT, 'public', 'favicon.png'), png)

  console.log(`Logo vectorizado desde ${SCALE}x, umbral ${THRESHOLD}`)
  console.table([
    {
      pieza: 'monograma',
      subtrazos: markSubs.length,
      viewBox: `${mark.width}x${mark.height}`,
      kB: +(mark.d.length / 1024).toFixed(1),
    },
    {
      pieza: 'firma',
      subtrazos: signSubs.length,
      viewBox: `${sign.width}x${sign.height}`,
      kB: +(sign.d.length / 1024).toFixed(1),
    },
    {
      pieza: 'completo (compuesto)',
      subtrazos: kept.length,
      viewBox: `${full.width}x${full.height}`,
      kB: 0,
    },
    { pieza: 'bajada (descartada)', subtrazos: dropped, viewBox: '-', kB: 0 },
  ])
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
