// Fecha corta de un articulo (siempre en UTC para que el HTML del prerender y el navegador coincidan)
export const fmt = (d, lang) => new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
