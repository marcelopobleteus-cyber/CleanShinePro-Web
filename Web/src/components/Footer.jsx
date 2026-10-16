import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import Link from './Link';
import { ASSOCIATE_LOGIN_URL, MASTER_LOGIN_URL } from '../config';
import { CITIES, cityPath } from '../site';

const T = {
    en: { tag: 'Exact prices, vetted local teams and a photo report after every visit. Run on CleaningIQ.', company: 'Company', about: 'About', how: 'How it works', blog: 'Guides', contact: 'Contact', privacy: 'Privacy', partners: 'For cleaning companies', join: 'Join the partner network', apply: 'Apply in 3 minutes', cities: 'House cleaning', services: 'Services', quote: 'Get my price', all: 'All service areas' },
    es: { tag: 'Precios exactos, equipos locales verificados y reporte con fotos en cada visita. Funciona con CleaningIQ.', company: 'Empresa', about: 'Nosotros', how: 'Cómo funciona', blog: 'Guías', contact: 'Contacto', privacy: 'Privacidad', partners: 'Para empresas de limpieza', join: 'Únete a la red de socios', apply: 'Postula en 3 minutos', cities: 'Limpieza de casas', services: 'Servicios', quote: 'Ver mi precio', all: 'Todas las zonas' },
};

const Footer = ({ lang = 'en' }) => {
    const t = T[lang] || T.en;
    const partners = lang === 'es' ? '/es/socios' : '/partners';
    const linkCls = 'hover:text-emerald-400 transition-colors';
    return (
        <footer className="bg-[#020617] text-white pt-16 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 mb-12">
                    <div className="col-span-2 lg:col-span-1">
                        <Link to={lang === 'es' ? '/es' : '/'} className="text-2xl font-bold font-heading">CLEANSHINE <span className="text-emerald-400">PRO</span></Link>
                        <p className="text-slate-400 text-sm leading-relaxed mt-4">{t.tag}</p>
                    </div>
                    <nav aria-label="Company">
                        <h2 className="font-bold mb-4">{t.company}</h2>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/about" className={linkCls}>{t.about}</Link></li>
                            <li><Link to="/how-it-works" className={linkCls}>{t.how}</Link></li>
                            <li><Link to="/services" className={linkCls}>{t.services}</Link></li>
                            <li><Link to="/blog" className={linkCls}>{t.blog}</Link></li>
                            <li><Link to="/contact" className={linkCls}>{t.contact}</Link></li>
                            <li><Link to="/privacy" className={linkCls}>{t.privacy}</Link></li>
                        </ul>
                    </nav>
                    <nav aria-label="Partners">
                        <h2 className="font-bold mb-4">{t.partners}</h2>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to={partners} className={linkCls}>{t.join}</Link></li>
                            <li><Link to={`${partners}#apply`} className={linkCls}>{t.apply}</Link></li>
                            <li><Link to={lang === 'es' ? '/partners' : '/es/socios'} className={linkCls}>{lang === 'es' ? 'Partner program (English)' : 'Programa de socios (español)'}</Link></li>
                        </ul>
                    </nav>
                    <nav aria-label="Cities">
                        <h2 className="font-bold mb-4">{t.cities}</h2>
                        <ul className="space-y-2 text-sm text-slate-400">
                            {CITIES.slice(0, 6).map((c) => <li key={c.slug}><Link to={cityPath(c.slug)} className={linkCls}>{c.name}, GA</Link></li>)}
                            <li><Link to="/service-areas" className={linkCls}>{t.all}</Link></li>
                        </ul>
                    </nav>
                    <div className="col-span-2 lg:col-span-1">
                        <h2 className="font-bold mb-4">{t.contact}</h2>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-2"><MapPin className="text-emerald-500 mt-0.5 shrink-0" size={16} /><span>900 Buice Lake Pkwy<br />Woodstock, GA 30188</span></li>
                            <li className="flex items-center gap-2"><Mail className="text-emerald-500 shrink-0" size={16} /><a href="mailto:contact@cleanshinepro.com" className={`${linkCls} break-all`}>contact@cleanshinepro.com</a></li>
                        </ul>
                        <Link to="/quote" className="inline-block mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold">{t.quote}</Link>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} CleanShine Pro LLC. All rights reserved.</p>
                    <p className="mt-3 text-xs">
                        Team login:{' '}
                        <a href={ASSOCIATE_LOGIN_URL} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">Partner</a>
                        {' · '}
                        <a href={MASTER_LOGIN_URL} className="text-violet-300 hover:text-violet-200 underline underline-offset-2">Master</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
