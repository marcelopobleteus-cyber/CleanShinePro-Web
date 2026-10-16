/* eslint-disable react-refresh/only-export-components -- archivo del prerender, no se usa en el navegador */
// Prerender: arma el HTML de cada pagina en la compilacion para que Google lea el contenido, el titulo
// y los datos estructurados sin ejecutar JavaScript. Lo usa scripts/prerender.mjs.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPage from './pages/BlogPage';
import LocalServicePage from './pages/LocalServicePage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES, NOT_FOUND, SITE_URL, BUSINESS, CITIES, cityPath } from './site';
import { HOME_FAQ, PARTNER_FAQ } from './content/faq';
import { POSTS } from './content/posts';

export { ROUTES, NOT_FOUND, SITE_URL };

// Mismas paginas que App.jsx carga con React.lazy, pero ya importadas: el HTML sale completo y en linea
const PAGES = {
    booking: BookingPage, services: ServicesPage, process: HowItWorksPage, partners: PartnersPage, contact: ContactPage,
    'service-areas': ServiceAreasPage, about: AboutPage, privacy: PrivacyPage, blog: BlogPage, city: LocalServicePage,
    post: BlogPostPage, notfound: NotFoundPage,
};

export async function render(url) {
    return renderToString(<App initialPath={url} pages={PAGES} />);
}

const AREA = CITIES.map((c) => ({ '@type': 'City', name: `${c.name}, GA` }));

const business = () => ({
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/logo.png`,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: BUSINESS.street, addressLocality: BUSINESS.city, addressRegion: BUSINESS.region, postalCode: BUSINESS.zip, addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.lat, longitude: BUSINESS.lng },
    areaServed: AREA,
    knowsLanguage: ['en', 'es'],
    makesOffer: ['Recurring house cleaning', 'Deep cleaning', 'Move-in and move-out cleaning', 'Short-term rental turnover cleaning', 'Office cleaning', 'Post-construction cleaning']
        .map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
});

const faqLd = (items) => ({ '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const crumbs = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` })) });

// Datos estructurados (JSON-LD) por pagina
export function structuredData(route) {
    const graph = [];
    if (route.page === 'home') {
        graph.push(business(), { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: BUSINESS.name, inLanguage: route.lang }, faqLd(HOME_FAQ[route.lang] || HOME_FAQ.en));
    } else if (route.page === 'partners') {
        graph.push(business(), faqLd(PARTNER_FAQ[route.lang] || PARTNER_FAQ.en),
            crumbs([['Home', route.lang === 'es' ? '/es' : '/'], [route.lang === 'es' ? 'Socios' : 'Partners', route.path]]));
    } else if (route.page === 'city') {
        const c = CITIES.find((x) => x.slug === route.city);
        graph.push({
            '@type': 'Service', name: `House cleaning in ${c.name}, GA`, serviceType: 'House cleaning',
            provider: { '@id': `${SITE_URL}/#business` }, areaServed: { '@type': 'City', name: `${c.name}, GA` },
            url: `${SITE_URL}${cityPath(c.slug)}`,
        }, business(), crumbs([['Home', '/'], ['Service areas', '/service-areas'], [`${c.name}, GA`, cityPath(c.slug)]]));
    } else if (route.page === 'post') {
        const p = POSTS.find((x) => x.slug === route.post);
        graph.push({
            '@type': 'Article', headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date, inLanguage: p.lang,
            author: { '@type': 'Organization', name: BUSINESS.name, url: SITE_URL }, publisher: { '@id': `${SITE_URL}/#business` },
            mainEntityOfPage: `${SITE_URL}${route.path}`,
        }, crumbs([['Home', '/'], ['Guides', '/blog'], [p.title, route.path]]));
    } else if (route.page === 'services') {
        graph.push(business(), crumbs([['Home', '/'], ['Services', '/services']]));
    } else if (!route.noindex) {
        graph.push(crumbs([['Home', '/'], [route.title.split(' | ')[0], route.path]]));
    }
    return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null;
}
