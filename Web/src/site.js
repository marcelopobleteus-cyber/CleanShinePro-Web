import { POSTS } from './content/posts';

// Mapa del sitio: cada pagina tiene su URL, su titulo y su descripcion (SEO).
// Lo usan el navegador (App.jsx), el prerender (scripts/prerender.mjs) y el sitemap.

export const SITE_URL = 'https://cleanshinepro.com';
export const BUSINESS = {
    name: 'CleanShine Pro',
    legalName: 'CleanShine Pro LLC',
    email: 'contact@cleanshinepro.com',
    street: '900 Buice Lake Pkwy',
    city: 'Woodstock',
    region: 'GA',
    zip: '30188',
    lat: 34.1015,
    lng: -84.5194,
};

// Ciudades con pagina propia. ZIP reales de cada ciudad; "near" = ciudades vecinas para enlazar entre paginas.
export const CITIES = [
    { slug: 'woodstock', name: 'Woodstock', county: 'Cherokee County', zips: ['30188', '30189'], near: ['canton', 'acworth', 'roswell'],
        note: 'Many Woodstock homes are newer two-story builds, so we price by real square footage from public records instead of a flat bedroom rate.' },
    { slug: 'acworth', name: 'Acworth', county: 'Cobb & Cherokee County', zips: ['30101', '30102'], near: ['kennesaw', 'woodstock', 'cartersville'],
        note: 'From lake-area homes to new subdivisions, Acworth gets the same exact online price and the same photo report as every other city we serve.' },
    { slug: 'kennesaw', name: 'Kennesaw', county: 'Cobb County', zips: ['30144', '30152'], near: ['acworth', 'marietta', 'woodstock'],
        note: 'Kennesaw has a lot of rentals and student housing, so move-in and move-out cleaning with a photo report for the deposit is one of our most requested services here.' },
    { slug: 'marietta', name: 'Marietta', county: 'Cobb County', zips: ['30060', '30062', '30064', '30066', '30067', '30068'], near: ['kennesaw', 'smyrna', 'roswell'],
        note: 'Marietta mixes historic homes near the Square with large suburban houses; our quote asks for floors and square footage so older homes are priced fairly.' },
    { slug: 'canton', name: 'Canton', county: 'Cherokee County', zips: ['30114', '30115'], near: ['woodstock', 'cartersville', 'alpharetta'],
        note: 'Canton is growing fast, and post-construction and move-in cleaning for new homes are a big part of what local teams do here.' },
    { slug: 'smyrna', name: 'Smyrna', county: 'Cobb County', zips: ['30080', '30082'], near: ['marietta', 'kennesaw', 'roswell'],
        note: 'Smyrna has many townhomes and apartments close to the city, and recurring biweekly plans are the most popular way to keep them under control.' },
    { slug: 'roswell', name: 'Roswell', county: 'Fulton County', zips: ['30075', '30076'], near: ['alpharetta', 'marietta', 'woodstock'],
        note: 'Roswell homes tend to be larger, so the quote checks baths and square footage to size the team and the time correctly.' },
    { slug: 'alpharetta', name: 'Alpharetta', county: 'Fulton County', zips: ['30004', '30005', '30009', '30022'], near: ['roswell', 'canton', 'woodstock'],
        note: 'Alpharetta has a lot of offices next to homes, so we handle both house cleaning and small-office cleaning with the same team standards.' },
    { slug: 'cartersville', name: 'Cartersville', county: 'Bartow County', zips: ['30120', '30121'], near: ['acworth', 'canton', 'kennesaw'],
        note: 'Cartersville prices follow the local market, which is lower than in-town Atlanta; our online quote reflects that automatically.' },
];

export const cityPath = (slug) => `/house-cleaning-${slug}-ga`;

const BASE_ROUTES = [
    { path: '/', page: 'home', lang: 'en', alt: '/es',
        title: 'House & Office Cleaning in Cobb & North Atlanta | CleanShine Pro',
        description: 'Exact cleaning price online in about a minute, set below the local average. Vetted, insured local teams and a photo report after every visit. Woodstock, Acworth, Kennesaw, Marietta.' },
    { path: '/es', page: 'home', lang: 'es', alt: '/',
        title: 'Limpieza de casas y oficinas en Cobb y el norte de Atlanta | CleanShine Pro',
        description: 'Precio exacto en línea en un minuto, por debajo del promedio local. Equipos locales verificados y con seguro, y reporte con fotos en cada visita. Atendemos en inglés y español.' },
    { path: '/quote', page: 'booking', lang: 'en',
        title: 'Get Your Exact Cleaning Price Online | CleanShine Pro',
        description: 'Enter your address and get the exact price for house, deep, move-out or office cleaning in about a minute. No phone call, no surprises at the door.' },
    { path: '/services', page: 'services', lang: 'en',
        title: 'Cleaning Services: Recurring, Deep, Move-Out, Office | CleanShine Pro',
        description: 'Recurring house cleaning, deep cleaning, move-in/move-out, short-term rental turnovers, office and post-construction cleaning in Cobb, Cherokee and North Fulton.' },
    { path: '/how-it-works', page: 'process', lang: 'en',
        title: 'How It Works: AI-Priced, Photo-Verified Cleaning | CleanShine Pro',
        description: 'See how CleanShine Pro prices from public property data, sends a vetted local team, checks them in by GPS and sends you a photo report. Powered by CleaningIQ.' },
    { path: '/partners', page: 'partners', lang: 'en', alt: '/es/socios',
        title: 'Cleaning Company Partner Program in Georgia | Get More Clients | CleanShine Pro',
        description: 'Own a cleaning company in Georgia? We bring the customers, the price and the billing; you clean and keep 70–80% of every job. See each job and your pay before you accept. Apply in 3 minutes.' },
    { path: '/es/socios', page: 'partners', lang: 'es', alt: '/partners',
        title: 'Programa de socios para empresas de limpieza en Georgia | CleanShine Pro',
        description: '¿Tienes una empresa de limpieza en Georgia? Nosotros traemos los clientes, el precio y el cobro; tú limpias y te quedas con 70 % a 80 % de cada trabajo. Postula en 3 minutos.' },
    { path: '/service-areas', page: 'service-areas', lang: 'en',
        title: 'Service Areas: Cobb, Cherokee, North Fulton & Bartow | CleanShine Pro',
        description: 'House and office cleaning in Woodstock, Acworth, Kennesaw, Marietta, Canton, Smyrna, Roswell, Alpharetta and Cartersville, GA. Check your ZIP and get your price online.' },
    { path: '/about', page: 'about', lang: 'en',
        title: 'About CleanShine Pro | A Local Cleaning Network Run on CleaningIQ',
        description: 'CleanShine Pro is a Georgia cleaning company that works with vetted local partner companies and runs every job on CleaningIQ: exact pricing, GPS check-in and photo reports.' },
    { path: '/contact', page: 'contact', lang: 'en',
        title: 'Contact CleanShine Pro | Cleaning in Woodstock, Acworth & Marietta',
        description: 'Questions about a cleaning, an office contract or our partner program? Send us a message in English or Spanish and our team will get back to you.' },
    { path: '/blog', page: 'blog', lang: 'en',
        title: 'Cleaning Tips & Guides | CleanShine Pro Blog',
        description: 'Practical cleaning guides for Georgia homes and offices: what a deep clean includes, how to get your deposit back and how much cleaning costs.' },
    { path: '/privacy', page: 'privacy', lang: 'en', noindex: false,
        title: 'Privacy Policy | CleanShine Pro',
        description: 'How CleanShine Pro collects, uses and protects the information you share when you request a quote, book a cleaning or apply as a partner.' },
];

const CITY_ROUTES = CITIES.map((c) => ({
    path: cityPath(c.slug), page: 'city', city: c.slug, lang: 'en',
    title: `House Cleaning ${c.name}, GA | Exact Price Online | CleanShine Pro`,
    description: `House, deep, move-out and office cleaning in ${c.name}, GA (${c.zips.join(', ')}). Exact price online, vetted insured local teams and a photo report after every visit.`,
}));

const POST_ROUTES = POSTS.map((p) => ({
    path: `/blog/${p.slug}`, page: 'post', post: p.slug, lang: p.lang, type: 'article', date: p.date,
    title: `${p.title} | CleanShine Pro`, description: p.description,
}));

export const ROUTES = [...BASE_ROUTES, ...CITY_ROUTES, ...POST_ROUTES];
export const NOT_FOUND = { path: '/404', page: 'notfound', lang: 'en', noindex: true,
    title: 'Page not found | CleanShine Pro', description: 'This page does not exist. Get your cleaning price online or go back to the home page.' };

// Rutas viejas o alias que llevan a la pagina correcta
const ALIASES = { '/process': '/how-it-works', '/booking': '/quote', '/get-quote': '/quote', '/socios': '/es/socios', '/partner': '/partners', '/become-a-partner': '/partners' };

export function normalizePath(pathname) {
    let p = (pathname || '/').split(/[?#]/)[0];
    if (p.length > 1) p = p.replace(/\/+$/, '');
    return ALIASES[p] || p || '/';
}

export function routeFor(pathname) {
    const p = normalizePath(pathname);
    return ROUTES.find((r) => r.path === p) || NOT_FOUND;
}

// Clave de pagina -> URL (para los componentes que todavia llaman onNavigate('services'))
export function pathForPage(page, lang = 'en') {
    if (CITIES.some((c) => c.slug === page)) return cityPath(page);
    const exact = ROUTES.find((r) => r.page === page && r.lang === lang);
    const any = ROUTES.find((r) => r.page === page);
    return (exact || any || ROUTES[0]).path;
}
