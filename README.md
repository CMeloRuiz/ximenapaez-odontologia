# Dra. Ximena Páez — Odontología integral y estética

Landing page de **propuesta comercial** para el consultorio de la Dra. Ximena Páez,
en Ubaté, Cundinamarca.

React 18 + Vite, CSS puro. Sin frameworks de estilos ni librerías de animación:
las animaciones son CSS + `IntersectionObserver`, y los iconos son SVG propios.

```
ximena-odontologa/
├── assets-ximena/       originales que me pasaste (no se tocan)
├── frontend/            el sitio
│   ├── images/          copias de trabajo de los originales
│   ├── public/          favicon, og-image, robots.txt
│   ├── scripts/         build-logo.mjs · build-images.mjs
│   └── src/
│       ├── assets/      logoPaths.js (generado) e img/ (generado)
│       ├── components/  un .jsx + un .css por componente
│       ├── data/        siteData.js  ← TODO el contenido editable
│       ├── hooks/       useReveal, useScrollValue, useActiveSection, …
│       └── styles/      variables.css · base.css · animations.css
└── README.md
```

No hay carpeta `backend/`: la página es estática y no la necesita.

---

## Correr en local

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Compilar:

```bash
npm run build      # genera frontend/dist
npm run preview    # sirve el build
```

### Scripts de assets

Solo hay que correrlos si cambian las imágenes de origen; lo que generan ya
está versionado.

| Script | Qué hace |
|---|---|
| `npm run logo` | Vectoriza `images/logo.png` con potrace → `src/assets/logoPaths.js` y los favicons. |
| `npm run images` | Genera las variantes WebP responsive y la imagen de Open Graph. |

---

## Desplegar en Render (Static Site)

1. **New → Static Site** y conecta el repositorio.
2. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. Create Static Site.

No hace falta regla de *rewrite*: es una sola página con anclas, y un catch-all
a `index.html` rompería `robots.txt`.

En el repo hay un `render.yaml` con esa misma configuración, por si prefieres
crear el servicio como Blueprint.

---

## ⚠️ Antes de mostrárselo al cliente

Todo lo editable está en **`frontend/src/data/siteData.js`**, marcado con `TODO`.

| Qué | Dónde | Estado |
|---|---|---|
| **Reseñas reales de Google** | `REVIEWS` | ❌ Las tres tarjetas son de maqueta (van en cursiva y gris para que se note). Hay que pegar texto y nombre de tres reseñas reales y quitar `placeholder: true`. |
| **Calificación de Google** | `GOOGLE_RATING`, `GOOGLE_REVIEW_COUNT` | ❌ En `null`. Mientras sigan en `null` **no se muestra ningún número**. Al poner la cifra real aparece el bloque con la nota y las estrellas. |
| **Enlace al perfil de Google** | `LINKS.googleReviews` | ⚠️ Apunta a una búsqueda por nombre + ciudad. Reemplazar por el enlace directo de la ficha (Google Maps › tu ficha › Compartir › Copiar vínculo). |
| **Fotos del consultorio** | `src/components/Clinic.jsx` | ⚠️ Hay una placa decorativa con el monograma en lugar de fotos. Ver «Qué falta en mejor calidad». |
| **Bio de la doctora** | `CLINIC_SECTION.doctorBio` | ⚠️ En `null`; se muestra un texto genérico. No inventé formación, universidad, años de experiencia ni registro profesional. |
| **Horario de atención** | `CLINIC.schedule`, `SCHEDULE_NOTE` | ⚠️ En `null`; se muestra «escríbenos y te confirmamos la disponibilidad». |

### Cuando deje de ser una demo

1. Quitar `<meta name="robots" content="noindex, nofollow">` (y el de `googlebot`)
   de `frontend/index.html`.
2. Quitar el `Disallow: /` de `frontend/public/robots.txt`.
3. Borrar `FOOTER.demo` en `siteData.js` (la línea «Sitio de propuesta — maqueta
   de demostración» del pie).
4. Poner el dominio real en las metas `og:` si se quiere URL absoluta.

---

## Notas técnicas

### El logo

El original (`logo.png`) mide **227x148 px** y viene con fondo blanco: usado tal
cual se ve pixelado y arrastra una caja blanca sobre el marfil del sitio.

Probé las dos rutas que planteaste y me quedé con la **vectorización**, que da
un resultado claramente mejor: quitar el fondo del bitmap y reescalarlo deja los
trazos blandos a cualquier tamaño, mientras que las curvas son nítidas siempre.

`npm run logo` amplía 8x con lanczos, binariza, traza con potrace y separa los
subtrazos en tres grupos por su caja contenedora:

- **monograma** → favicon, marca de agua y el lockup del navbar;
- **firma** «Ximena Páez»;
- **bajada** «Odontología integral y estética» → **se descarta**: a 227 px de
  ancho esas letras miden 4 px de alto y el trazo sale como manchas. En el sitio
  se escribe como texto real, que además es nítido, accesible y seleccionable.

El logo va **inline como `<svg>`** con `fill: currentColor`, así que se recolorea
por CSS (dorado ↔ champagne) con transición suave, nunca lleva fondo propio y no
pesa una petición extra. La pieza completa del pie se compone trasladando las dos
partes, sin repetir los `path` (eso ahorró ~25 kB gzip en el bundle).

### El hero

La foto se funde con el fondo con `mix-blend-mode: multiply` + dos máscaras en
degradado. El fondo del original es blanco puro y uniforme (comprobado: 255,255,255),
así que multiplicado por el marfil devuelve exactamente el marfil y el rectángulo
desaparece.

Un detalle que importa si se toca el hero: **ningún ancestro de la imagen puede
crear un contexto de apilamiento** (`transform`, `opacity`, `filter`, `z-index`
numérico). Si lo hiciera, el grupo quedaría aislado, la mezcla dejaría de ver el
fondo de la sección y volvería a aparecer el recuadro blanco. Por eso el parallax
y la animación de entrada van sobre la propia imagen, con las propiedades
independientes `translate` y `scale` en vez de dos `transform` que competirían.

### Las imágenes

`npm run images` **nunca genera un ancho por encima del nativo**: ampliar una foto
no añade detalle, solo peso. Las variantes se sirven con `<picture>` + `srcset` +
`sizes`, todas con `width`/`height` para que no haya saltos de maquetación.

Las capturas de Instagram (`images/ref-*.png`, ~300x420 px) se usaron **solo como
referencia** de color y de contenido; no se publican y no entran en el build.

---

## Medición

`npm run build` compila sin errores ni warnings.

**Lighthouse 12** sobre el build de producción:

| | Móvil | Escritorio |
|---|---|---|
| Rendimiento | **92** | **99** |
| Accesibilidad | **100** | **100** |
| Buenas prácticas | **100** | **100** |
| SEO | 66 | 66 |

El SEO bajo es **intencional**: la única auditoría que falla es `is-crawlable`,
por el `noindex, nofollow` que está puesto a propósito mientras sea una demo.
Al quitarlo sube a 100.

Métricas en móvil (Moto G Power emulado, 4G lento): FCP 2.6 s · LCP 2.8 s ·
TBT 0 ms · CLS 0.

**Peso transferido en la primera visita (móvil): 200.7 kB**

| Recurso | Peticiones | kB |
|---|---|---|
| Fuentes (Google Fonts) | 3 | 90.4 |
| JS | 1 | 73.0 |
| Imágenes | 1 | 14.6 |
| CSS | 2 | 9.9 |
| HTML | 1 | 1.8 |

Las variantes del hero pesan 5.2 / 14.4 / 27.1 / 59.9 kB (480 / 760 / 1040 / 1345 px);
en móvil se descarga la de 760 px. Muy por debajo del objetivo de 200 kB para el
hero y de 120 kB para el resto.

---

## Qué falta en mejor calidad

Para dejarlo listo del todo necesito que me pases:

1. **Fotos reales del consultorio**, mínimo 1600 px de ancho y sin textos encima:
   la recepción con el letrero dorado sobre el mármol, y el box de atención.
   Las capturas de Instagram que tengo (~300x420 px) se ven pixeladas a cualquier
   tamaño útil, así que en «Nuestro consultorio» puse una placa decorativa con el
   monograma. Cuando lleguen: añádelas a `frontend/images/`, decláralas en
   `scripts/build-images.mjs`, corre `npm run images` y cambia la placa por
   `<Img name="consultorio" … />` (hay un `TODO` con los pasos en `Clinic.jsx`).
2. **Una foto de la Dra. Ximena**, si quiere aparecer en «Sobre la doctora».
3. **El logo en vector** (`.ai`, `.svg`, `.eps` o `.pdf`), si lo tiene el
   diseñador. La vectorización quedó muy buena, pero el original es el original —
   y con él la bajada «Odontología integral y estética» podría ir también en
   vector en vez de como texto.
4. **Su bio**: formación, universidad, años de experiencia, registro profesional.
5. **El horario de atención.**
6. **El enlace de su ficha de Google**, su calificación y tres reseñas reales.
