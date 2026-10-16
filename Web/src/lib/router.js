// Enrutador minimo con URLs reales (sin dependencias). App escucha el evento y cambia de pagina.
import { normalizePath } from '../site';

const EVENT = 'csp:navigate';

export function navigate(to, { replace = false } = {}) {
    if (typeof window === 'undefined') return;
    const [beforeHash, hash = ''] = String(to).split('#');
    const [path, query = ''] = beforeHash.split('?');
    const target = path ? normalizePath(path) : window.location.pathname;
    const url = target + (query ? `?${query}` : '') + (hash ? `#${hash}` : '');
    if (url === window.location.pathname + window.location.search + window.location.hash) { scrollToHash(); return; }
    if (replace) window.history.replaceState({}, '', url); else window.history.pushState({}, '', url);
    window.dispatchEvent(new Event(EVENT));
}

// Despues de cambiar de pagina: arriba, o a la seccion del #ancla cuando ya esta dibujada
export function scrollToHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) { window.scrollTo(0, 0); return; }
    let tries = 0;
    const go = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (tries++ < 20) setTimeout(go, 100);
    };
    go();
}

export function onNavigate(fn) {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(EVENT, fn);
    window.addEventListener('popstate', fn);
    return () => { window.removeEventListener(EVENT, fn); window.removeEventListener('popstate', fn); };
}
