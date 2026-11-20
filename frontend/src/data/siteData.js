/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DRA. XIMENA PÁEZ — contenido editable del sitio
 * ─────────────────────────────────────────────────────────────────────────────
 *  Todo el texto, los enlaces y los datos de la landing viven en este archivo.
 *  Para actualizar la página no hace falta tocar los componentes.
 *
 *  Los comentarios marcados con TODO señalan lo que falta confirmar con el
 *  consultorio antes de publicar.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Identidad ───────────────────────────────────────────────────────────── */

export const CLINIC = {
  name: 'Dra. Ximena Páez',
  shortName: 'Ximena Páez',
  tagline: 'Odontología integral y estética',
  city: 'Ubaté',
  region: 'Cundinamarca',
  address: 'Calle 12 #4-88',
  addressFull: 'Calle 12 #4-88, Ubaté, Cundinamarca',
  phoneDisplay: '312 372 2951',
  phoneIntl: '+57 312 372 2951',
  phoneRaw: '573123722951',
  email: 'draximenapaez@gmail.com',
  instagramHandle: '@ximenapaez',

  /**
   * TODO: confirmar el horario real de atención con el consultorio.
   * Mientras no esté verificado, la sección de contacto muestra el texto
   * genérico de `SCHEDULE_NOTE` en lugar de una tabla de horarios inventada.
   */
  schedule: null,
}

/**
 * Lo que se muestra en Contacto mientras no haya un horario confirmado.
 * TODO: reemplazar por los días y las horas reales de atención.
 */
export const SCHEDULE_NOTE =
  'Escríbenos por WhatsApp y te confirmamos la disponibilidad de la semana.'

/* ── Enlaces ─────────────────────────────────────────────────────────────── */

const WA_BASE = `https://wa.me/${CLINIC.phoneRaw}`

/** Construye un enlace de WhatsApp con un mensaje propio. */
export const waLink = (message) => `${WA_BASE}?text=${encodeURIComponent(message)}`

export const LINKS = {
  whatsapp: `${WA_BASE}?text=Hola%20Dra.%20Ximena%2C%20quiero%20agendar%20una%20cita%20de%20valoraci%C3%B3n`,
  instagram: 'https://instagram.com/ximenapaez',
  tel: `tel:+${CLINIC.phoneRaw}`,
  email: `mailto:${CLINIC.email}`,
  maps: 'https://www.google.com/maps/search/?api=1&query=Calle+12+%234-88+Ubat%C3%A9+Cundinamarca',
  mapsEmbed:
    'https://www.google.com/maps?q=Calle%2012%20%234-88%2C%20Ubat%C3%A9%2C%20Cundinamarca%2C%20Colombia&hl=es&z=16&output=embed',

  /**
   * TODO: reemplazar por el enlace directo al perfil de Google Business del
   * consultorio (Google Maps › tu ficha › Compartir › Copiar vínculo).
   * Mientras tanto apunta a una búsqueda por nombre y ciudad.
   */
  googleReviews:
    'https://www.google.com/maps/search/?api=1&query=Dra.+Ximena+P%C3%A1ez+Odontolog%C3%ADa+Ubat%C3%A9',
}

/* ── Puntuación de Google ────────────────────────────────────────────────── */

/**
 * Puntuación real del perfil de Google.
 * Se deja en `null` a propósito: si no hay cifra verificada, la sección de
 * reseñas no muestra ningún número.
 *
 * TODO: poner la cifra real, p. ej. GOOGLE_RATING = 4.9
 */
export const GOOGLE_RATING = null

/**
 * Cantidad real de reseñas publicadas en Google.
 * TODO: poner el número real, p. ej. GOOGLE_REVIEW_COUNT = 87
 */
export const GOOGLE_REVIEW_COUNT = null

/* ── Navegación ──────────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'ortodoncia', label: 'Ortodoncia' },
  { id: 'consultorio', label: 'Consultorio' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'contacto', label: 'Contacto' },
]

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const HERO = {
  badge: `${CLINIC.tagline} · ${CLINIC.city}`,
  titleTop: 'Cuidamos tu',
  titleScript: 'sonrisa',
  titleBottom: 'con detalle y calidez',
  subtitle:
    'Odontología integral y estética en el corazón de Ubaté. Tratamientos planeados paso a paso, con explicaciones claras y la tranquilidad de sentirte en buenas manos.',
  primaryCta: 'Agendar cita por WhatsApp',
  secondaryCta: 'Ver especialidades',
  /** Texto alternativo de la foto del hero. */
  imageAlt:
    'Primer plano de una sonrisa con alineador transparente, tratada en el consultorio de la Dra. Ximena Páez',
}

/* ── Franja de confianza ─────────────────────────────────────────────────── */

export const TRUST = [
  {
    icon: 'heartHands',
    title: 'Atención personalizada',
    text: 'Una sola doctora acompaña tu caso de principio a fin, con tiempo para resolver tus dudas.',
  },
  {
    icon: 'shield',
    title: 'Tecnología y seguridad',
    text: 'Protocolos de bioseguridad e instrumental esterilizado en cada cita, sin excepciones.',
  },
  {
    icon: 'scan',
    title: 'Diagnóstico preciso',
    text: 'Primero entendemos tu caso; después proponemos el tratamiento y te explicamos por qué.',
  },
  {
    icon: 'sparkle',
    title: 'Resultados estéticos naturales',
    text: 'Buscamos que el resultado se vea tuyo: proporciones, color y forma en armonía con tu rostro.',
  },
]

/* ── Especialidades ──────────────────────────────────────────────────────── */

export const SERVICES = [
  {
    icon: 'endodontics',
    title: 'Endodoncia',
    text: 'Tratamiento de conductos para conservar el diente natural cuando el nervio está comprometido.',
  },
  {
    icon: 'gum',
    title: 'Periodoncia',
    text: 'Cuidado de encías y del soporte del diente: limpieza profunda, control de inflamación y mantenimiento.',
  },
  {
    icon: 'crown',
    title: 'Rehabilitación oral',
    text: 'Coronas, incrustaciones y prótesis para devolver la función y la estética de la mordida.',
  },
  {
    icon: 'implant',
    title: 'Implantes',
    text: 'Reposición de dientes ausentes con una base fija, planeada según tu estructura ósea.',
  },
  {
    icon: 'surgery',
    title: 'Cirugía',
    text: 'Procedimientos quirúrgicos orales, incluida la extracción de cordales, con manejo cuidadoso.',
  },
  {
    icon: 'braces',
    title: 'Ortodoncia y Ortopedia maxilar',
    text: 'Alineación dental y guía del crecimiento de los maxilares en niños, jóvenes y adultos.',
  },
  {
    icon: 'tooth',
    title: 'Odontología general',
    text: 'Valoración, profilaxis, resinas y control periódico: la base para que todo lo demás funcione.',
  },
]

/* ── Ortodoncia ──────────────────────────────────────────────────────────── */

export const ORTHO = {
  eyebrow: 'Bloque destacado',
  title: 'Ortodoncia para cada',
  titleScript: 'caso',
  text:
    'Trabajamos distintas técnicas porque no todas las sonrisas necesitan lo mismo. En la valoración definimos cuál se ajusta mejor a tu mordida, a tu ritmo de vida y a lo que buscas.',

  /**
   * Modalidades tal como las publica el consultorio.
   * El primer ítem aparece cortado en la pieza de Instagram de referencia:
   * dice "Ortodoncia convencional: Roth".
   */
  options: [
    { name: 'Ortodoncia convencional: Roth', text: 'Brackets metálicos con prescripción Roth, la técnica de referencia.' },
    { name: 'Ortodoncia MBT', text: 'Prescripción MBT para un control fino de la posición de cada diente.' },
    { name: 'Ortodoncia autoligado', text: 'Brackets con sistema de cierre propio, sin ligaduras elásticas.' },
    { name: 'Ortopedia maxilar', text: 'Aparatología que guía el crecimiento de los maxilares en edades tempranas.' },
    { name: 'Ortodoncia MEAW', text: 'Técnica de arcos multiloop para casos que requieren un manejo especial.' },
    { name: 'Ortodoncia estética MBT', text: 'Prescripción MBT con brackets estéticos, más discretos a la vista.' },
    { name: 'Ortodoncia estética autoligado', text: 'Autoligado en versión estética: cierre propio y brackets discretos.' },
    { name: 'Alineadores', text: 'Férulas transparentes y removibles, pensadas para pasar desapercibidas.' },
  ],

  cta: 'Consultar por ortodoncia',
}

/* ── Consultorio / Sobre la doctora ──────────────────────────────────────── */

export const CLINIC_SECTION = {
  eyebrow: 'Nuestro consultorio',
  title: 'Un espacio pensado para que estés',
  titleScript: 'tranquilo',
  text:
    'El consultorio está en la Calle 12 #4-88, en pleno Ubaté. Un espacio cálido, limpio y silencioso, con el equipo necesario para atender tu tratamiento de principio a fin.',

  points: [
    {
      icon: 'heartHands',
      title: 'Trato cercano',
      text: 'Te explicamos qué vamos a hacer, por qué y qué sigue después. Sin tecnicismos innecesarios.',
    },
    {
      icon: 'shield',
      title: 'Bioseguridad',
      text: 'Instrumental esterilizado, superficies desinfectadas y protocolos que se cumplen en cada cita.',
    },
    {
      icon: 'clock',
      title: 'Citas puntuales',
      text: 'Agenda organizada para que tu cita empiece a la hora acordada y tengas el tiempo que necesitas.',
    },
    {
      icon: 'location',
      title: 'Fácil de llegar',
      text: 'En el centro de Ubaté, a pocos pasos de la plaza principal y con parqueo cerca.',
    },
  ],

  /**
   * Bio de la doctora.
   * TODO: reemplazar por la bio real (formación, universidad, años de
   * experiencia y registro profesional). Se deja en `null` a propósito:
   * no se inventa ningún dato de su trayectoria.
   */
  doctorBio: null,

  /** Lo que se muestra mientras no haya bio verificada. */
  doctorBioFallback:
    'La Dra. Ximena Páez atiende personalmente cada caso, desde la valoración inicial hasta los controles. Su enfoque combina la odontología integral con el cuidado estético: que el tratamiento funcione bien y además se vea natural.',
}

/* ── Reseñas ─────────────────────────────────────────────────────────────── */

/**
 * TODO: REEMPLAZAR POR RESEÑAS REALES DE GOOGLE.
 *
 * Estos tres textos son ejemplos de maqueta: NO son reseñas de pacientes y no
 * deben mostrarse al cliente ni publicarse tal cual. Para traerlas de verdad:
 * Google Maps › ficha del consultorio › Reseñas › copiar texto y nombre.
 */
export const REVIEWS = [
  {
    name: 'Nombre del paciente',
    initial: 'P',
    text: 'Texto de ejemplo para la maqueta. Aquí va una reseña real de Google, con las palabras del paciente sobre su experiencia en el consultorio.',
    placeholder: true,
  },
  {
    name: 'Nombre del paciente',
    initial: 'P',
    text: 'Texto de ejemplo para la maqueta. Aquí va una segunda reseña real de Google. Lo ideal es escoger tres que hablen de cosas distintas.',
    placeholder: true,
  },
  {
    name: 'Nombre del paciente',
    initial: 'P',
    text: 'Texto de ejemplo para la maqueta. Aquí va una tercera reseña real de Google, preferiblemente sobre un tratamiento diferente al de las otras dos.',
    placeholder: true,
  },
]

export const REVIEWS_SECTION = {
  eyebrow: 'Lo que dicen los pacientes',
  title: 'Reseñas en',
  titleScript: 'Google',
  text:
    'El consultorio mantiene una excelente valoración en Google gracias a los pacientes que se han tomado el tiempo de contarlo.',
  cta: 'Ver reseñas en Google',
}

/* ── Cómo agendar ────────────────────────────────────────────────────────── */

export const STEPS = [
  {
    icon: 'chat',
    title: 'Escríbenos por WhatsApp',
    text: 'Cuéntanos qué te gustaría mejorar o qué molestia tienes. Respondemos en el día.',
  },
  {
    icon: 'calendar',
    title: 'Agendamos tu valoración',
    text: 'Elegimos juntos el día y la hora que mejor te queden, y te confirmamos la cita.',
  },
  {
    icon: 'plan',
    title: 'Definimos tu plan',
    text: 'En la cita revisamos tu caso y te presentamos las opciones de tratamiento, paso a paso.',
  },
]

export const STEPS_SECTION = {
  eyebrow: 'Así de simple',
  title: 'Cómo agendar tu',
  titleScript: 'cita',
  text: 'Tres pasos y listo. Sin formularios largos ni llamadas eternas.',
}

/* ── CTA final ───────────────────────────────────────────────────────────── */

export const FINAL_CTA = {
  title: '¿Damos el primer paso con tu',
  titleScript: 'sonrisa',
  titleEnd: '?',
  text:
    'Agenda tu cita de valoración y conversemos sobre lo que necesitas. Estamos en Ubaté, Cundinamarca.',
  primary: 'Escribir por WhatsApp',
  secondary: 'Cómo llegar',
}

/* ── Pie de página ───────────────────────────────────────────────────────── */

export const FOOTER = {
  note: 'Odontología integral y estética en Ubaté, Cundinamarca.',
  /** Aviso de que el sitio es una propuesta, no la web definitiva. */
  demo: 'Sitio de propuesta — maqueta de demostración.',
}
