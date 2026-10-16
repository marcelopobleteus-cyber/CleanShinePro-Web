// De donde llego la visita (UTM de campañas, referido, pagina de entrada). Se guarda la primera vez en la sesion
// y se manda con cada lead a CleaningIQ (web-lead), que lo limpia y lo convierte en el canal del lead.
// Asi el area de Marketing de CleaningIQ puede contar cuantos leads y ventas trajo cada campaña (utm_campaign).

const KEY = 'csp_attribution_v1';
const FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref', 'gclid', 'fbclid'];

export function captureAttribution() {
    if (typeof window === 'undefined') return;
    try {
        if (sessionStorage.getItem(KEY)) return;
        const q = new URLSearchParams(window.location.search);
        const data = {};
        for (const f of FIELDS) { const v = q.get(f); if (v) data[f] = v.slice(0, 100); }
        data.referrer = document.referrer ? document.referrer.slice(0, 200) : '';
        data.landing = window.location.pathname.slice(0, 120);
        sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch { /* sin sessionStorage no se guarda: el lead sigue entrando como directo */ }
}

export function getAttribution() {
    if (typeof window === 'undefined') return undefined;
    try {
        const raw = sessionStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : { landing: window.location.pathname };
    } catch {
        return undefined;
    }
}
