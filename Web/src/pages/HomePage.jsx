import React, { useState } from 'react';
import { ArrowRight, BadgeDollarSign, Camera, Users, MapPin, Home, Sparkles, Truck, CalendarClock, Building2, HardHat, Cpu, ShieldCheck, Check, Handshake, Languages } from 'lucide-react';
import Link from '../components/Link';
import { navigate } from '../lib/router';
import { HOME_FAQ } from '../content/faq';
import Faq from '../components/Faq';

const C = {
    en: {
        badge: 'Exact price online · No surprises at the door',
        h1a: 'House & office cleaning in Cobb & North Atlanta,',
        h1b: 'priced below the local average.',
        sub: 'Get your exact price in about a minute from your address. A vetted, insured local team does the work, checks in by GPS and sends you a photo report when it is done.',
        zipLabel: 'Your ZIP code', zipPh: 'e.g. 30101', zipBtn: 'See my exact price', zipErr: 'Enter a 5-digit ZIP code',
        partnerLink: 'Own a cleaning company? Join our partner network',
        reportTag: 'Example of a visit report', reportTitle: 'Standard clean · 3 bed / 2 bath', reportIn: 'Checked in 9:02 AM · GPS verified', reportOut: 'Checked out 11:48 AM', reportPhotos: '12 before & after photos', reportRate: 'Rate this visit',
        promisesTitle: 'Three promises we can actually keep',
        promisesSub: 'Most complaints about cleaning services come down to two things: the price changes, or nobody shows up. We built the company around fixing both.',
        promises: [
            { icon: BadgeDollarSign, title: 'The price you see is the price you pay', text: 'Your quote comes from public property records for your address, not a guess over the phone. If the home is different from what was booked, we tell you before we start and you decide.' },
            { icon: Users, title: 'A backup team, not a single cleaner', text: 'We work with several vetted local cleaning companies. If one can’t make it, another one covers, so a sick day doesn’t cancel your cleaning. Missed a spot? Tell us within 24 hours and we re-clean it free.' },
            { icon: Camera, title: 'Proof of every visit', text: 'Teams check in and out by GPS and take before-and-after photos. You see them in your client portal, rate the visit and approve any extra before it is charged.' },
        ],
        priceTitle: 'Why our prices are lower',
        priceText1: 'Every quote is set 5% below the average price local competitors charge for the same service, home size, frequency and ZIP code. In the Atlanta area a standard cleaning averages $130 to $252 per visit (Angi, 2026).',
        priceText2: 'We can do it because CleaningIQ, our own software, automates the quoting, scheduling, dispatch and billing that usually needs a full office. The savings go to your price and to fair pay for the people who clean.',
        priceCta: 'Get my price',
        priceSource: 'Source: Angi, “How Much Does House Cleaning Cost in Atlanta,” 2026 data.',
        servicesTitle: 'What we clean',
        services: [
            { icon: Home, title: 'Recurring house cleaning', text: 'Weekly, biweekly or monthly. Recurring plans cost less per visit.' },
            { icon: Sparkles, title: 'Deep cleaning', text: 'Baseboards, inside appliances, grout and the spots a regular clean skips.' },
            { icon: Truck, title: 'Move-in / move-out', text: 'Empty-home cleaning with a photo report you can show your landlord.' },
            { icon: CalendarClock, title: 'Short-term rentals', text: 'Turnovers between guests, with photos of every room.' },
            { icon: Building2, title: 'Offices & commercial', text: 'Small offices, clinics and retail. Visit logs with time and photos.' },
            { icon: HardHat, title: 'Post-construction', text: 'Fine dust, stickers and residue removed before move-in.' },
        ],
        servicesCta: 'See all services',
        stepsTitle: 'How it works',
        steps: [
            { n: '1', title: 'Get your exact price', text: 'Enter your address and choose the service. Size and rooms are pre-filled from public records.' },
            { n: '2', title: 'Pick a date', text: 'Book online. Recurring visits are confirmed with you two days before each one.' },
            { n: '3', title: 'A local team cleans', text: 'A vetted partner company near you gets the job, checks in by GPS and follows the checklist.' },
            { n: '4', title: 'See the report and rate it', text: 'Photos, check-in and check-out times in your portal. Not right? We fix it.' },
        ],
        techTitle: 'Run on CleaningIQ',
        techSub: 'CleanShine Pro is the first company running on CleaningIQ, a cleaning-business platform built in Georgia. It does the busywork with automation and AI, and a person on our team approves anything that matters.',
        tech: [
            { icon: Cpu, title: 'AI pricing engine', text: 'Reads property data for your address and the local market, and prices every job the same way, online or by phone.' },
            { icon: MapPin, title: 'Smart dispatch', text: 'Offers each job to the qualified partner teams that cover your ZIP. The first to accept gets it.' },
            { icon: Camera, title: 'GPS check-in & photos', text: 'The team app records arrival, departure, photos and any extras you approve.' },
            { icon: ShieldCheck, title: 'Client portal', text: 'Your services, photos, statement and ratings in one private link.' },
            { icon: Languages, title: 'English & Spanish', text: 'Our site, our team and our partner network work in both languages.' },
            { icon: Check, title: 'People approve, machines prepare', text: 'Nothing important goes out without a person on our team approving it.' },
        ],
        techCta: 'See how it works',
        partnerTitle: 'Own a cleaning company in Georgia?',
        partnerText: 'We bring the customers, the price and the billing. You clean and keep 70% to 80% of every job, paid weekly. You see each job and your pay before you accept it.',
        partnerCta: 'See the partner program',
        faqTitle: 'Questions people ask',
        finalTitle: 'Ready to see your price?',
        finalText: 'It takes about a minute and you don’t have to talk to anyone.',
        finalCta: 'Get my exact price',
    },
    es: {
        badge: 'Precio exacto en línea · Sin sorpresas en la puerta',
        h1a: 'Limpieza de casas y oficinas en Cobb y el norte de Atlanta,',
        h1b: 'con precios bajo el promedio local.',
        sub: 'Ve tu precio exacto en un minuto con tu dirección. Un equipo local verificado y con seguro hace el trabajo, registra su llegada por GPS y te manda un reporte con fotos al terminar.',
        zipLabel: 'Tu código postal (ZIP)', zipPh: 'ej. 30101', zipBtn: 'Ver mi precio exacto', zipErr: 'Escribe un ZIP de 5 dígitos',
        partnerLink: '¿Tienes una empresa de limpieza? Únete a nuestra red de socios',
        reportTag: 'Ejemplo de reporte de visita', reportTitle: 'Limpieza estándar · 3 dorm. / 2 baños', reportIn: 'Llegada 9:02 a. m. · GPS verificado', reportOut: 'Salida 11:48 a. m.', reportPhotos: '12 fotos de antes y después', reportRate: 'Califica la visita',
        promisesTitle: 'Tres promesas que sí podemos cumplir',
        promisesSub: 'Casi todas las quejas sobre servicios de limpieza se reducen a dos: el precio cambia o nadie llega. Armamos la empresa para resolver las dos.',
        promises: [
            { icon: BadgeDollarSign, title: 'El precio que ves es el que pagas', text: 'Tu cotización sale de los registros públicos de tu dirección, no de un cálculo por teléfono. Si la casa no coincide con lo reservado, te avisamos antes de empezar y tú decides.' },
            { icon: Users, title: 'Un equipo de respaldo, no un solo limpiador', text: 'Trabajamos con varias empresas locales verificadas. Si una no puede, otra cubre, y un día de enfermedad no cancela tu limpieza. ¿Quedó algo? Avísanos en 24 horas y lo volvemos a limpiar gratis.' },
            { icon: Camera, title: 'Prueba de cada visita', text: 'Los equipos registran llegada y salida por GPS y toman fotos de antes y después. Las ves en tu portal, calificas la visita y apruebas cualquier extra antes de que se cobre.' },
        ],
        priceTitle: 'Por qué nuestros precios son más bajos',
        priceText1: 'Cada cotización queda 5 % bajo el precio promedio que cobra la competencia local por el mismo servicio, tamaño, frecuencia y código postal. En el área de Atlanta una limpieza estándar cuesta en promedio entre $130 y $252 por visita (Angi, 2026).',
        priceText2: 'Lo logramos porque CleaningIQ, nuestro propio software, automatiza la cotización, la agenda, el envío de trabajos y el cobro que normalmente requieren una oficina completa. Ese ahorro va a tu precio y a un pago justo para quien limpia.',
        priceCta: 'Ver mi precio',
        priceSource: 'Fuente: Angi, “How Much Does House Cleaning Cost in Atlanta”, datos 2026.',
        servicesTitle: 'Qué limpiamos',
        services: [
            { icon: Home, title: 'Limpieza recurrente', text: 'Semanal, quincenal o mensual. Los planes cuestan menos por visita.' },
            { icon: Sparkles, title: 'Limpieza profunda', text: 'Zócalos, dentro de electrodomésticos, juntas y lo que una limpieza normal no toca.' },
            { icon: Truck, title: 'Mudanza (entrada o salida)', text: 'Casa vacía con reporte de fotos para mostrarle al arrendador.' },
            { icon: CalendarClock, title: 'Alquileres de corto plazo', text: 'Cambio entre huéspedes con fotos de cada cuarto.' },
            { icon: Building2, title: 'Oficinas y comercios', text: 'Oficinas chicas, consultorios y locales. Registro de cada visita con hora y fotos.' },
            { icon: HardHat, title: 'Post-obra', text: 'Polvo fino, etiquetas y residuos antes de mudarte.' },
        ],
        servicesCta: 'Ver todos los servicios',
        stepsTitle: 'Cómo funciona',
        steps: [
            { n: '1', title: 'Ve tu precio exacto', text: 'Escribe tu dirección y elige el servicio. Tamaño y cuartos se completan con registros públicos.' },
            { n: '2', title: 'Elige la fecha', text: 'Reserva en línea. Las visitas recurrentes se confirman contigo dos días antes.' },
            { n: '3', title: 'Un equipo local limpia', text: 'Una empresa socia verificada cerca de ti recibe el trabajo, registra su llegada por GPS y sigue la lista.' },
            { n: '4', title: 'Mira el reporte y califica', text: 'Fotos y horas de llegada y salida en tu portal. ¿No quedó bien? Lo arreglamos.' },
        ],
        techTitle: 'Funciona con CleaningIQ',
        techSub: 'CleanShine Pro es la primera empresa que opera con CleaningIQ, una plataforma para empresas de limpieza hecha en Georgia. Automatiza el trabajo repetitivo con IA, y una persona de nuestro equipo aprueba todo lo importante.',
        tech: [
            { icon: Cpu, title: 'Motor de precios con IA', text: 'Lee los datos de la propiedad y del mercado local, y cotiza igual en línea o por teléfono.' },
            { icon: MapPin, title: 'Envío inteligente', text: 'Ofrece cada trabajo a los equipos socios calificados que cubren tu ZIP. El primero que acepta lo hace.' },
            { icon: Camera, title: 'GPS y fotos', text: 'La app del equipo registra llegada, salida, fotos y los extras que tú apruebas.' },
            { icon: ShieldCheck, title: 'Portal del cliente', text: 'Tus servicios, fotos, estado de cuenta y calificaciones en un enlace privado.' },
            { icon: Languages, title: 'Inglés y español', text: 'El sitio, el equipo y la red de socios trabajan en los dos idiomas.' },
            { icon: Check, title: 'Las personas aprueban, la máquina prepara', text: 'Nada importante sale sin que una persona del equipo lo apruebe.' },
        ],
        techCta: 'Ver cómo funciona',
        partnerTitle: '¿Tienes una empresa de limpieza en Georgia?',
        partnerText: 'Nosotros traemos los clientes, el precio y el cobro. Tú limpias y te quedas con 70 % a 80 % de cada trabajo, con pago semanal. Ves cada trabajo y tu pago antes de aceptarlo.',
        partnerCta: 'Ver el programa de socios',
        faqTitle: 'Preguntas frecuentes',
        finalTitle: '¿Listo para ver tu precio?',
        finalText: 'Toma un minuto y no tienes que hablar con nadie.',
        finalCta: 'Ver mi precio exacto',
    },
};

function ZipQuote({ c, id = 'hero-zip', dark = true }) {
    const [zip, setZip] = useState('');
    const [err, setErr] = useState('');
    const submit = (e) => {
        e.preventDefault();
        if (!/^\d{5}$/.test(zip.trim())) { setErr(c.zipErr); return; }
        navigate(`/quote?zip=${zip.trim()}`);
    };
    return (
        <form onSubmit={submit} className="w-full max-w-xl" noValidate>
            <label htmlFor={id} className={`block text-xs font-bold uppercase tracking-widest mb-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.zipLabel}</label>
            <div className="flex flex-col sm:flex-row gap-3">
                <input id={id} inputMode="numeric" autoComplete="postal-code" maxLength={5} value={zip}
                    onChange={(e) => { setZip(e.target.value.replace(/\D/g, '')); setErr(''); }}
                    placeholder={c.zipPh}
                    className="flex-1 bg-white text-charcoal rounded-lg px-4 py-4 text-lg font-semibold outline-none focus:ring-4 focus:ring-emerald-500/40" />
                <button type="submit" className="px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg">
                    {c.zipBtn} <ArrowRight className="w-5 h-5" />
                </button>
            </div>
            {err && <p className="text-amber-300 text-sm mt-2" role="alert">{err}</p>}
        </form>
    );
}

export default function HomePage({ lang = 'en' }) {
    const c = C[lang] || C.en;
    const partnersTo = lang === 'es' ? '/es/socios' : '/partners';
    return (
        <>
            {/* Hero */}
            <section className="relative bg-[#020617] text-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[120px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center py-14 md:py-24">
                    <div>
                        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-6">
                            <BadgeDollarSign className="w-4 h-4" /> {c.badge}
                        </p>
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08] mb-6 font-heading">
                            <span className="text-white">{c.h1a}</span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{c.h1b}</span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">{c.sub}</p>
                        <ZipQuote c={c} />
                        <Link to={partnersTo} className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                            <Handshake className="w-4 h-4" /> {c.partnerLink} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Ejemplo de reporte de visita (ilustrativo) */}
                    <div className="relative" aria-label={c.reportTag}>
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B1121]">
                            <img src="/img/cleaning-crew.webp" alt="" width="800" height="500" className="w-full h-56 md:h-72 object-cover opacity-80" />
                            <div className="p-5 space-y-3">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">{c.reportTag}</p>
                                <p className="font-bold text-white">{c.reportTitle}</p>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> {c.reportIn}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {c.reportOut}</li>
                                    <li className="flex items-center gap-2"><Camera className="w-4 h-4 text-emerald-400" /> {c.reportPhotos}</li>
                                </ul>
                                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                                    <span className="text-slate-400">{c.reportRate}</span>
                                    <span className="text-amber-400 tracking-widest" aria-hidden="true">☆☆☆☆☆</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promesas */}
            <section className="py-20 bg-[#050B1A] border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.promisesTitle}</h2>
                        <p className="text-slate-400 text-lg">{c.promisesSub}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {c.promises.map(({ icon: Icon, title, text }) => (
                            <article key={title} className="bg-[#0B1121] border border-white/5 rounded-2xl p-7">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5"><Icon className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                                <p className="text-slate-400 leading-relaxed">{text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Precio */}
            <section className="py-20 bg-[#020617]">
                <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{c.priceTitle}</h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-4">{c.priceText1}</p>
                        <p className="text-slate-400 leading-relaxed mb-8">{c.priceText2}</p>
                        <Link to="/quote" className="inline-flex items-center gap-2 px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg">{c.priceCta} <ArrowRight className="w-5 h-5" /></Link>
                        <p className="text-xs text-slate-500 mt-6">{c.priceSource}</p>
                    </div>
                    <div className="bg-[#0B1121] border border-white/10 rounded-2xl p-8">
                        <div className="space-y-5">
                            {[
                                { label: lang === 'es' ? 'Promedio de la competencia local' : 'Local competitor average', w: '100%', cls: 'bg-slate-600' },
                                { label: lang === 'es' ? 'Precio CleanShine Pro' : 'CleanShine Pro price', w: '95%', cls: 'bg-emerald-500' },
                            ].map((b) => (
                                <div key={b.label}>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-slate-300">{b.label}</span><span className="text-white font-bold">{b.w === '100%' ? '100' : '95'}</span></div>
                                    <div className="h-4 rounded-full bg-white/5"><div className={`h-4 rounded-full ${b.cls}`} style={{ width: b.w }} /></div>
                                </div>
                            ))}
                            <p className="text-sm text-slate-500">{lang === 'es' ? 'Mismo servicio, mismo tamaño, misma frecuencia y mismo código postal. Índice: promedio local = 100.' : 'Same service, same home size, same frequency, same ZIP code. Index: local average = 100.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-20 bg-[#050B1A] border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{c.servicesTitle}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {c.services.map(({ icon: Icon, title, text }) => (
                            <Link key={title} to="/quote" className="group bg-[#0B1121] border border-white/5 hover:border-emerald-500/40 rounded-2xl p-6 transition-colors">
                                <Icon className="w-7 h-7 text-emerald-400 mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300">{title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                            </Link>
                        ))}
                    </div>
                    <Link to="/services" className="inline-flex items-center gap-2 mt-8 text-emerald-300 font-semibold hover:text-emerald-200">{c.servicesCta} <ArrowRight className="w-4 h-4" /></Link>
                </div>
            </section>

            {/* Pasos */}
            <section className="py-20 bg-[#020617]">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{c.stepsTitle}</h2>
                    <ol className="grid md:grid-cols-4 gap-5">
                        {c.steps.map((s) => (
                            <li key={s.n} className="bg-[#0B1121] border border-white/5 rounded-2xl p-6">
                                <span className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mb-4">{s.n}</span>
                                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Tecnologia */}
            <section className="py-20 bg-gradient-to-b from-[#0A1630] to-[#020617] border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-violet-300 mb-3">CleaningIQ</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.techTitle}</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">{c.techSub}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {c.tech.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <Icon className="w-6 h-6 text-violet-300 mb-3" />
                                <h3 className="font-bold text-white mb-2">{title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/how-it-works" className="inline-flex items-center gap-2 mt-8 text-violet-300 font-semibold hover:text-violet-200">{c.techCta} <ArrowRight className="w-4 h-4" /></Link>
                </div>
            </section>

            {/* Socios */}
            <section className="py-20 bg-[#020617]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-[#0A2E5C] p-8 md:p-12 grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.partnerTitle}</h2>
                            <p className="text-emerald-50 text-lg leading-relaxed">{c.partnerText}</p>
                        </div>
                        <div className="md:text-right">
                            <Link to={partnersTo} className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#0A2E5C] font-bold rounded-lg hover:bg-emerald-50">{c.partnerCta} <ArrowRight className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preguntas */}
            <section className="py-20 bg-[#050B1A] border-t border-white/5">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{c.faqTitle}</h2>
                    <Faq items={HOME_FAQ[lang] || HOME_FAQ.en} />
                </div>
            </section>

            {/* Final */}
            <section className="py-20 bg-[#020617]">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.finalTitle}</h2>
                    <p className="text-slate-400 mb-8 text-lg">{c.finalText}</p>
                    <div className="flex justify-center"><ZipQuote id="final-zip" c={{ ...c, zipBtn: c.finalCta }} /></div>
                </div>
            </section>
        </>
    );
}

