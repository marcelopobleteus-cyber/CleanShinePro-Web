import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
