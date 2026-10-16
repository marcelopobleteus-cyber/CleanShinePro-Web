// Despues de `vite build`: genera un HTML por pagina (contenido, titulo, descripcion, canonical, hreflang,
// Open Graph y JSON-LD), mas sitemap.xml, robots.txt y 404.html. Asi Google ve cada pagina completa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const { render, structuredData, ROUTES, NOT_FOUND, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const today = new Date().toISOString().slice(0, 10);

function head(route) {
    const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    const tags = [
        `<title>${esc(route.title)}</title>`,
        `<meta name="description" content="${esc(route.description)}" />`,
        route.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
        `<meta property="og:type" content="${route.type === 'article' ? 'article' : 'website'}" />`,
        `<meta property="og:site_name" content="CleanShine Pro" />`,
        `<meta property="og:title" content="${esc(route.title)}" />`,
        `<meta property="og:description" content="${esc(route.description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
        `<meta property="og:locale" content="${route.lang === 'es' ? 'es_US' : 'en_US'}" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
    ];
    if (route.alt) {
        const self = route.lang;
        const other = self === 'es' ? 'en' : 'es';
        tags.push(`<link rel="alternate" hreflang="${self}" href="${url}" />`);
        tags.push(`<link rel="alternate" hreflang="${other}" href="${SITE_URL}${route.alt}" />`);
        tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${self === 'en' ? route.path : route.alt}" />`);
    }
    const ld = structuredData(route);
    if (ld) tags.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
    return tags.join('\n    ');
}

function page(route, html) {
    // Reemplazos con funcion: el texto trae signos "$" (precios) que .replace interpretaria como patrones
    return template
        .replace(/<html lang="[^"]*">/, () => `<html lang="${route.lang}">`)
        .replace(/<title>[\s\S]*?<\/title>\s*/, () => '')
        .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, () => '')
        .replace('</head>', () => `    ${head(route)}\n  </head>`)
        .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
}

let count = 0;
for (const route of ROUTES) {
    const html = await render(route.path);
    // /partners -> partners.html (Vercel cleanUrls lo sirve en /partners sin barra ni .html)
    const file = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.path.slice(1)}.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page(route, html));
    count++;
}
fs.writeFileSync(path.join(dist, '404.html'), page(NOT_FOUND, await render(NOT_FOUND.path)));

const urls = ROUTES.filter((r) => !r.noindex).map((r) => {
    const loc = `${SITE_URL}${r.path === '/' ? '/' : r.path}`;
    const alt = r.alt ? `\n    <xhtml:link rel="alternate" hreflang="${r.lang}" href="${loc}"/>\n    <xhtml:link rel="alternate" hreflang="${r.lang === 'es' ? 'en' : 'es'}" href="${SITE_URL}${r.alt}"/>` : '';
    const pri = r.page === 'home' || r.page === 'partners' || r.page === 'booking' ? '1.0' : r.page === 'city' ? '0.8' : '0.6';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${r.date || today}</lastmod>\n    <priority>${pri}</priority>${alt}\n  </url>`;
});
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerender: ${count} pages + 404, sitemap with ${urls.length} URLs`);
