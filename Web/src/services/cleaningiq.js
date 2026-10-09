// CleaningIQ (Supabase): precio oficial, leads, reservas y contacto de CleanShine Pro
export const CLEANINGIQ_ORG_ID = '879e3b3b-e3b0-44e3-947c-fcf4ada8a16e'; // CleanShine Pro
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function callCleaningIQ(name, body) {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}`, apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify(body)
    });
    let data = null;
    try { data = await res.json(); } catch { /* respuesta sin JSON */ }
    if (!res.ok) throw new Error(data?.error || 'Service temporarily unavailable. Please try again.');
    return data;
}

// Extras de la empresa (catalogo Add-ons de CleaningIQ) que se muestran en linea, con su precio
export async function getAddons(orgId = CLEANINGIQ_ORG_ID) {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/public_addons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}`, apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ p_org: orgId })
    });
    if (!res.ok) throw new Error('Add-ons unavailable');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}
