import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Inserta el `<link rel="preload">` de la imagen del hero.
 *
 * Los assets salen del build con un hash en el nombre, así que la etiqueta
 * no se puede escribir a mano en `index.html`: se arma leyendo el bundle.
 */
function preloadHero() {
  return {
    name: 'preload-hero',
    apply: 'build',
    enforce: 'post',

    transformIndexHtml(html, ctx) {
      if (!ctx?.bundle) return

      const variants = Object.keys(ctx.bundle)
        .map((file) => {
          const match = file.match(/hero-(\d+)-[\w-]+\.webp$/)
          return match ? { file, width: Number(match[1]) } : null
        })
        .filter(Boolean)
        .sort((a, b) => a.width - b.width)

      if (!variants.length) return

      const srcset = variants.map((v) => `/${v.file} ${v.width}w`).join(', ')

      return [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            type: 'image/webp',
            imagesrcset: srcset,
            imagesizes: '(min-width: 981px) 58vw, 100vw',
            fetchpriority: 'high',
          },
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadHero()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
  },
})
