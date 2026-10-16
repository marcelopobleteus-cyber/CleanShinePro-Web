import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PAGE_LOADERS } from './pages/loaders'
import { routeFor } from './site'

// Tras publicar una version nueva, las paginas viejas ya no existen en el servidor: si una
// no carga, se recarga la pagina una vez para tomar la version nueva (sin entrar en bucle).
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem('csp_reloaded_at') || 0)
    if (Date.now() - last < 10000) return
    sessionStorage.setItem('csp_reloaded_at', String(Date.now()))
  } catch {
    return // sin sessionStorage no se puede evitar un bucle: se deja el error normal
  }
  event.preventDefault()
  window.location.reload()
})

const container = document.getElementById('root')
const app = <StrictMode><App /></StrictMode>

// El HTML ya viene armado desde la compilacion (prerender): se baja primero la pagina actual
// y despues React toma el control sin volver a dibujar nada.
const route = routeFor(new URLSearchParams(window.location.search).get('booking') ? '/quote' : window.location.pathname)
const load = PAGE_LOADERS[route.page]
const ready = load ? load().catch(() => null) : Promise.resolve()
ready.then(() => {
  if (container.hasChildNodes()) hydrateRoot(container, app)
  else createRoot(container).render(app)
})
