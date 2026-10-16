import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Menu, X, Phone } from 'lucide-react';
import Footer from './components/Footer';
import TeamLogin from './components/TeamLogin';
import Link from './components/Link';
import HomePage from './pages/HomePage';
import { BUSINESS_PHONE } from './config';
import { routeFor, pathForPage } from './site';
import { navigate, onNavigate, scrollToHash } from './lib/router';
import { captureAttribution } from './lib/attribution';
import { PAGE_LOADERS } from './pages/loaders';

const PAGES = Object.fromEntries(Object.entries(PAGE_LOADERS).map(([k, load]) => [k, lazy(load)]));

const PageLoading = () => <div className="min-h-[60vh]" aria-busy="true" />;

const NAV = {
  en: { home: 'Home', services: 'Services', how: 'How it works', partners: 'For cleaning companies', areas: 'Service areas', contact: 'Contact', quote: 'Get my price', login: 'Team login',
    loginTitle: 'Sign in to the system', loginAssociate: 'Partner', loginAssociateSub: 'CleanShine Pro partner portal', loginMaster: 'Master', loginMasterSub: 'CleaningIQ · all accounts' },
  es: { home: 'Inicio', services: 'Servicios', how: 'Cómo funciona', partners: 'Para empresas de limpieza', areas: 'Zonas', contact: 'Contacto', quote: 'Ver mi precio', login: 'Acceso equipo',
    loginTitle: 'Entrar al sistema', loginAssociate: 'Socio', loginAssociateSub: 'Portal de socios de CleanShine Pro', loginMaster: 'Master', loginMasterSub: 'CleaningIQ · todas las cuentas' },
};

function currentUrl(initialPath) {
  if (typeof window === 'undefined') return initialPath || '/';
  // Al volver de Stripe Checkout (?booking=...) se abre la reserva
  if (new URLSearchParams(window.location.search).get('booking')) return '/quote';
  return window.location.pathname;
}

// `pages` permite al prerender usar las paginas ya cargadas (sin React.lazy)
function App({ initialPath, pages = PAGES }) {
  const [path, setPath] = useState(() => currentUrl(initialPath));
  const [menuOpen, setMenuOpen] = useState(false);
  const route = routeFor(path);
  const lang = route.lang === 'es' ? 'es' : 'en';
  const t = NAV[lang];

  useEffect(() => {
    captureAttribution();
    return onNavigate(() => {
      setPath(window.location.pathname);
      setMenuOpen(false);
      scrollToHash();
    });
  }, []);

  // Titulo y descripcion de cada pagina al navegar dentro del sitio (el HTML inicial ya los trae del prerender)
  useEffect(() => {
    document.title = route.title;
    document.documentElement.lang = lang;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', route.description);
  }, [route, lang]);

  // El cotizador es la pagina que mas importa: se descarga en segundo plano
  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
    idle(() => { PAGE_LOADERS.booking().catch(() => {}); });
  }, []);

  // Compatibilidad con componentes que llaman onNavigate('services')
  const goPage = (page) => navigate(pathForPage(page, lang));

  const renderPage = () => {
    if (route.page === 'home') return <HomePage lang={lang} />;
    const Page = pages[route.page] || pages.notfound;
    return <Page onNavigate={goPage} lang={lang} city={route.city} post={route.post} />;
  };

  const links = [
    { to: lang === 'es' ? '/es' : '/', label: t.home, page: 'home' },
    { to: '/services', label: t.services, page: 'services' },
    { to: '/how-it-works', label: t.how, page: 'process' },
    { to: '/service-areas', label: t.areas, page: 'service-areas' },
    { to: '/contact', label: t.contact, page: 'contact' },
  ];
  const partnersTo = lang === 'es' ? '/es/socios' : '/partners';
  const langTo = route.alt || (lang === 'es' ? '/' : '/es');

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      {BUSINESS_PHONE && (
        <div className="md:hidden fixed bottom-6 right-6 z-[60]">
          <a href={`tel:${BUSINESS_PHONE}`} aria-label="Call CleanShine Pro" className="flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <Phone className="w-6 h-6" />
          </a>
        </div>
      )}

      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-4" aria-label="Main">
          <Link to={lang === 'es' ? '/es' : '/'} className="flex items-center shrink-0" aria-label="CleanShine Pro home">
            <img src="/logo.png" alt="CleanShine Pro" width="160" height="64" className="h-14 md:h-16 w-auto object-contain" />
          </Link>

          <div className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`hover:text-emerald-600 transition-colors ${route.page === l.page ? 'text-emerald-600 font-bold' : ''}`}>{l.label}</Link>
            ))}
            <Link to={partnersTo} className={`px-3 py-1.5 rounded-full border border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 font-semibold ${route.page === 'partners' ? 'bg-emerald-50' : ''}`}>{t.partners}</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to={langTo} className="text-xs font-bold px-2 py-1 rounded border border-gray-200 text-slate-500 hover:text-emerald-600" hrefLang={lang === 'es' ? 'en' : 'es'}>
              {lang === 'es' ? 'EN' : 'ES'}
            </Link>
            {BUSINESS_PHONE && <a href={`tel:${BUSINESS_PHONE}`} className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-700 whitespace-nowrap"><Phone className="w-4 h-4" aria-hidden="true" />(470) 492-1093</a>}
            <div className="hidden md:block"><TeamLogin t={{ navLogin: t.login, loginTitle: t.loginTitle, loginAssociate: t.loginAssociate, loginAssociateSub: t.loginAssociateSub, loginMaster: t.loginMaster, loginMasterSub: t.loginMasterSub }} /></div>
            <Link to="/quote" className="hidden sm:inline-block px-5 py-2.5 bg-[#0A2E5C] hover:bg-[#020617] text-white text-sm font-semibold rounded-full transition-all shadow-md">{t.quote}</Link>
            <button type="button" className="xl:hidden p-2 text-slate-700" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="py-3 px-2 text-slate-700 font-medium border-b border-gray-100">{l.label}</Link>
              ))}
              <Link to={partnersTo} className="py-3 px-2 text-emerald-700 font-bold border-b border-gray-100">{t.partners}</Link>
              <Link to="/quote" className="mt-3 py-3 text-center bg-emerald-600 text-white font-bold rounded-xl">{t.quote}</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Suspense fallback={<PageLoading />}>
          {renderPage()}
        </Suspense>
      </main>

      <Footer lang={lang} />
      <Analytics />
    </div>
  );
}

export default App;
