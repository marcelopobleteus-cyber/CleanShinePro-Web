import React, { useState } from 'react';
import { ArrowRight, Handshake, Wallet, CalendarCheck, BadgeDollarSign, Smartphone, MapPin, Camera, FileText, ShieldCheck, ClipboardCheck, Check, X, Loader2, CheckCircle2, Languages } from 'lucide-react';
import Link from '../components/Link';
import Faq from '../components/Faq';
import { PARTNER_FAQ } from '../content/faq';
import { PARTNER_APPLY_SLUG } from '../config';
import { getAttribution } from '../lib/attribution';

// Debe coincidir con supabase/functions/_shared/partner_apply.ts (CleaningIQ): el servidor solo acepta estos valores
const SERVICE_VALUES = ['Standard cleaning', 'Deep cleaning', 'Move-in / move-out', 'Airbnb / short-term rental', 'Office / commercial', 'Post-construction'];
const COMPANY = 'CleanShine Pro LLC';

const C = {
    en: {
        badge: 'Partner program · Georgia',
        h1a: 'We bring the customers.', h1b: 'You do the cleaning.',
        sub: 'Join the CleanShine Pro partner network. Get cleaning jobs near you with the price and your pay shown before you accept, keep 70% to 80% of every job and get paid every week. No fee to join.',
        apply: 'Apply in 3 minutes', how: 'See how it works',
        stats: [
            { icon: BadgeDollarSign, big: '70–80%', small: 'of every job is yours' },
            { icon: Wallet, big: 'Weekly', small: 'pay by direct deposit' },
            { icon: Handshake, big: '$0', small: 'to join, app free at the start' },
            { icon: CalendarCheck, big: 'You choose', small: 'which jobs to accept' },
        ],
        splitTitle: 'Who does what',
        weTitle: 'CleanShine Pro does', youTitle: 'Your company does',
        we: ['Finds the customers (website, ads, real-estate leads, phone)', 'Quotes the price with CleaningIQ', 'Books the date and confirms with the customer', 'Collects the payment and handles refunds', 'Customer service, complaints and reviews'],
        you: ['Accept the jobs that fit your schedule', 'Clean to our checklist and standards', 'Check in and out in the app, with photos', 'Keep your insurance and documents current'],
        stepsTitle: 'How it works',
        steps: [
            { t: 'Apply', d: 'Three minutes, from your phone. Tell us your ZIP codes, services and team size.' },
            { t: 'Quick call & documents', d: 'We review your application, talk for 15 minutes and you upload your W-9 and insurance certificate.' },
            { t: 'Sign online', d: 'Read and sign the partner agreement in English or Spanish, from the app.' },
            { t: 'Set your area', d: 'Choose your ZIP codes or a radius from your address. You only see jobs there.' },
            { t: 'Accept jobs', d: 'Each offer shows the address area, date, scope, price and your pay. First to accept gets it.' },
            { t: 'Clean & report', d: 'Check in by GPS, follow the checklist, take photos, check out. Extras need the customer’s approval.' },
            { t: 'Get paid weekly', d: 'Statement every Monday, payment that same week, 1099 at year end.' },
        ],
        tableTitle: 'What you earn, by type of job',
        tableSub: 'Your share is a percentage of the job price and depends on the type of job. You always see the dollar amount before you accept.',
        th: ['Type of job', 'Your share', 'Example job price', 'You receive'],
        rows: [
            ['Recurring home cleaning (weekly, biweekly, monthly)', '80%', '$167', '$133.60'],
            ['One-time standard home cleaning', '78%', '$197', '$153.66'],
            ['Deep cleaning, move-in/out, post-construction', '75%', '$341', '$255.75'],
            ['Recurring commercial (service contract)', '75%', '$152', '$114.00'],
            ['One-time commercial', '70%', '$874', '$611.80'],
        ],
        tableNote: 'Examples for a 3-bedroom home in Acworth and a 4-hour office visit. Real prices depend on the home, the service and the ZIP code. Tips are 100% yours. Percentages are set in the partner agreement and never change on a job you already accepted.',
        appTitle: 'The tools come included',
        appSub: 'Every partner gets the CleaningIQ team app free at the start, with a comfortable period before any fee.',
        app: [
            { icon: Smartphone, t: 'Job offers on your phone', d: 'Accept or pass in one tap.' },
            { icon: MapPin, t: 'Route & access notes', d: 'Address, parking, gate codes and pets.' },
            { icon: ClipboardCheck, t: 'Checklist per service', d: 'Standard, deep, move-out, office.' },
            { icon: Camera, t: 'GPS check-in & photos', d: 'Proof of every visit, no arguments.' },
            { icon: Wallet, t: 'Earnings & statements', d: 'Every job, extra and tip, by week.' },
            { icon: FileText, t: 'Documents in one place', d: 'Agreement, W-9, insurance and reminders.' },
        ],
        compareTitle: 'Better than buying leads',
        compareCols: ['', 'Lead websites', 'Franchises', 'CleanShine Pro network'],
        compareRows: [
            ['Cost to start', 'Pay per lead, win or lose', 'Franchise fee', '$0'],
            ['Ongoing cost', 'More leads, more cost', 'Monthly royalties', 'A share of jobs you complete'],
            ['Who sells and quotes', 'You', 'Shared', 'We do'],
            ['Who collects payment', 'You', 'Usually them', 'We do'],
            ['Can you keep your own clients', 'Yes', 'Often restricted', 'Yes'],
        ],
        reqTitle: 'What you need',
        req: ['A registered cleaning business in Georgia (LLC or similar)', 'General liability insurance', 'A W-9 for your business', 'A smartphone for the team app', 'At least one person who can communicate with customers in English (Spanish is a plus)'],
        faqTitle: 'Partner questions',
        formTitle: 'Apply to join the network',
        formSub: 'It takes about 3 minutes. A person on our team reviews every application; nothing is sent automatically.',
        f: { company: 'Company name', contact: 'Your name', email: 'Email', phone: 'Phone', zips: 'ZIP codes you serve', zipsHelp: 'Separate with commas, e.g. 30101, 30144, 30188', services: 'Services you offer', years: 'Years in business', team: 'People on your team', insured: 'We have general liability insurance', w9: 'We can provide a W-9', license: 'We have a business license', ref: 'Who referred you? (optional)', msg: 'Anything else? (optional)', submit: 'Send my application', sending: 'Sending…' },
        consent: `Yes, ${COMPANY} may contact me by email and phone about becoming a cleaning partner. I can opt out at any time. Consent is not a condition of applying.`,
        okTitle: 'Application received', okText: 'Thank you. Our team will review it and contact you within 2 business days.', okSched: 'Want to talk sooner? Book a 15-minute call', okNot: 'To work with the network you will need liability insurance and a W-9. We saved your application and will contact you.',
        err: 'Could not send your application. Please try again or write to contact@cleanshinepro.com.',
        serviceLabels: SERVICE_VALUES,
    },
    es: {
        badge: 'Programa de socios · Georgia',
        h1a: 'Nosotros traemos los clientes.', h1b: 'Tú haces la limpieza.',
        sub: 'Únete a la red de socios de CleanShine Pro. Recibe trabajos de limpieza cerca de ti con el precio y tu pago a la vista antes de aceptar, quédate con 70 % a 80 % de cada trabajo y cobra cada semana. Sin costo de entrada.',
        apply: 'Postula en 3 minutos', how: 'Ver cómo funciona',
        stats: [
            { icon: BadgeDollarSign, big: '70–80 %', small: 'de cada trabajo es tuyo' },
            { icon: Wallet, big: 'Semanal', small: 'pago por depósito directo' },
            { icon: Handshake, big: '$0', small: 'para entrar, app gratis al inicio' },
            { icon: CalendarCheck, big: 'Tú eliges', small: 'qué trabajos aceptar' },
        ],
        splitTitle: 'Quién hace qué',
        weTitle: 'CleanShine Pro se encarga de', youTitle: 'Tu empresa se encarga de',
        we: ['Conseguir los clientes (web, anuncios, inmobiliarias, teléfono)', 'Cotizar el precio con CleaningIQ', 'Agendar la fecha y confirmarla con el cliente', 'Cobrar y manejar reembolsos', 'Atención al cliente, reclamos y reseñas'],
        you: ['Aceptar los trabajos que te convienen', 'Limpiar según nuestra lista y estándares', 'Registrar llegada y salida en la app, con fotos', 'Mantener tu seguro y documentos al día'],
        stepsTitle: 'Cómo funciona',
        steps: [
            { t: 'Postula', d: 'Tres minutos, desde tu celular. Cuéntanos tus códigos postales, servicios y tamaño del equipo.' },
            { t: 'Llamada y documentos', d: 'Revisamos tu solicitud, hablamos 15 minutos y subes tu W-9 y tu certificado de seguro.' },
            { t: 'Firma en línea', d: 'Lee y firma el contrato de socio en inglés o español, desde la app.' },
            { t: 'Define tu zona', d: 'Elige tus códigos postales o un radio desde tu dirección. Solo ves trabajos ahí.' },
            { t: 'Acepta trabajos', d: 'Cada oferta muestra la zona, fecha, alcance, precio y tu pago. El primero que acepta lo hace.' },
            { t: 'Limpia y reporta', d: 'Registra la llegada por GPS, sigue la lista, toma fotos y registra la salida. Los extras necesitan la aprobación del cliente.' },
            { t: 'Cobra cada semana', d: 'Estado de cuenta cada lunes, pago esa misma semana y 1099 a fin de año.' },
        ],
        tableTitle: 'Cuánto ganas, según el tipo de trabajo',
        tableSub: 'Tu parte es un porcentaje del precio del trabajo y depende del tipo de trabajo. Siempre ves el monto en dólares antes de aceptar.',
        th: ['Tipo de trabajo', 'Tu parte', 'Precio de ejemplo', 'Recibes'],
        rows: [
            ['Limpieza recurrente de casa (semanal, quincenal, mensual)', '80 %', '$167', '$133.60'],
            ['Limpieza estándar única', '78 %', '$197', '$153.66'],
            ['Profunda, mudanza y post-obra', '75 %', '$341', '$255.75'],
            ['Comercial recurrente (contrato de servicio)', '75 %', '$152', '$114.00'],
            ['Comercial puntual', '70 %', '$874', '$611.80'],
        ],
        tableNote: 'Ejemplos para una casa de 3 dormitorios en Acworth y una visita de oficina de 4 horas. El precio real depende de la casa, el servicio y el código postal. Las propinas son 100 % tuyas. Los porcentajes están en el contrato de socio y nunca cambian en un trabajo que ya aceptaste.',
        appTitle: 'Las herramientas vienen incluidas',
        appSub: 'Cada socio recibe la app de equipo de CleaningIQ gratis al inicio, con un periodo cómodo antes de cualquier cuota.',
        app: [
            { icon: Smartphone, t: 'Ofertas en tu celular', d: 'Acepta o pasa con un toque.' },
            { icon: MapPin, t: 'Ruta y notas de acceso', d: 'Dirección, estacionamiento, códigos y mascotas.' },
            { icon: ClipboardCheck, t: 'Lista por servicio', d: 'Estándar, profunda, mudanza, oficina.' },
            { icon: Camera, t: 'GPS y fotos', d: 'Prueba de cada visita, sin discusiones.' },
            { icon: Wallet, t: 'Ganancias y estados de cuenta', d: 'Cada trabajo, extra y propina, por semana.' },
            { icon: FileText, t: 'Documentos en un lugar', d: 'Contrato, W-9, seguro y recordatorios.' },
        ],
        compareTitle: 'Mejor que comprar leads',
        compareCols: ['', 'Sitios de leads', 'Franquicias', 'Red CleanShine Pro'],
        compareRows: [
            ['Costo para empezar', 'Pagas cada lead, ganes o no', 'Cuota de franquicia', '$0'],
            ['Costo mensual', 'Más leads, más costo', 'Regalías mensuales', 'Una parte de los trabajos que completas'],
            ['Quién vende y cotiza', 'Tú', 'Compartido', 'Nosotros'],
            ['Quién cobra', 'Tú', 'Normalmente ellos', 'Nosotros'],
            ['Puedes seguir con tus clientes', 'Sí', 'A menudo restringido', 'Sí'],
        ],
        reqTitle: 'Qué necesitas',
        req: ['Una empresa de limpieza registrada en Georgia (LLC o similar)', 'Seguro de responsabilidad civil', 'Un W-9 de tu empresa', 'Un celular para la app del equipo', 'Al menos una persona que pueda comunicarse con clientes en inglés (el español suma)'],
        faqTitle: 'Preguntas de socios',
        formTitle: 'Postula para entrar a la red',
        formSub: 'Toma unos 3 minutos. Una persona de nuestro equipo revisa cada solicitud; nada se envía de forma automática.',
        f: { company: 'Nombre de la empresa', contact: 'Tu nombre', email: 'Correo', phone: 'Teléfono', zips: 'Códigos postales que cubres', zipsHelp: 'Sepáralos con comas, ej. 30101, 30144, 30188', services: 'Servicios que ofreces', years: 'Años en el negocio', team: 'Personas en tu equipo', insured: 'Tenemos seguro de responsabilidad civil', w9: 'Podemos entregar un W-9', license: 'Tenemos licencia comercial', ref: '¿Quién te recomendó? (opcional)', msg: '¿Algo más? (opcional)', submit: 'Enviar mi solicitud', sending: 'Enviando…' },
        consent: `Sí, ${COMPANY} puede contactarme por correo y teléfono sobre ser socio de limpieza. Puedo darme de baja en cualquier momento. El consentimiento no es condición para postular.`,
        okTitle: 'Solicitud recibida', okText: 'Gracias. Nuestro equipo la revisará y te contactará dentro de 2 días hábiles.', okSched: '¿Quieres hablar antes? Agenda una llamada de 15 minutos', okNot: 'Para trabajar con la red necesitas seguro de responsabilidad civil y un W-9. Guardamos tu solicitud y te contactaremos.',
        err: 'No se pudo enviar tu solicitud. Inténtalo otra vez o escribe a contact@cleanshinepro.com.',
        serviceLabels: ['Limpieza estándar', 'Limpieza profunda', 'Mudanza (entrada o salida)', 'Airbnb / alquiler corto', 'Oficina / comercial', 'Post-obra'],
    },
};

const EMPTY = { company_name: '', contact_name: '', email: '', phone: '', zips: '', services: [], years_in_business: '', team_size: '', insured: false, can_provide_w9: false, has_license: false, referred_by: '', message: '', consent: false, website_url: '' };
const input = 'w-full bg-[#020617] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 outline-none';
const label = 'block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2';

function ApplyForm({ c, lang }) {
    const [form, setForm] = useState(EMPTY);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(null);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
    const toggle = (s) => setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setBusy(true);
        try {
            const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
            const payload = { action: 'apply', slug: PARTNER_APPLY_SLUG, ...form, message: lang === 'es' ? `[Applied in Spanish] ${form.message}`.trim() : form.message, attribution: getAttribution() };
            const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/partner-apply`, {
                method: 'POST', headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` }, body: JSON.stringify(payload),
            });
            const body = await res.json().catch(() => ({}));
            if (res.ok) { setDone(body); if (window.va) window.va('event', { name: 'partner_application' }); }
            else setError(body?.error || c.err);
        } catch {
            setError(c.err);
        } finally {
            setBusy(false);
        }
    };

    if (done) {
        return (
            <div className="bg-[#0B1121] border border-emerald-500/30 rounded-2xl p-8 text-center" role="status">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">{c.okTitle}</h3>
                <p className="text-slate-300 mb-4">{done.qualified === false ? c.okNot : c.okText}</p>
                {done.scheduling_url && <a href={done.scheduling_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg">{c.okSched} <ArrowRight className="w-4 h-4" /></a>}
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="bg-[#0B1121] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            {/* Campo trampa para robots: oculto para las personas */}
            <div className="hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website_url} onChange={set('website_url')} /></label></div>
            <div className="grid md:grid-cols-2 gap-5">
                <div><label className={label} htmlFor="pa-company">{c.f.company}</label><input id="pa-company" required className={input} value={form.company_name} onChange={set('company_name')} autoComplete="organization" /></div>
                <div><label className={label} htmlFor="pa-contact">{c.f.contact}</label><input id="pa-contact" required className={input} value={form.contact_name} onChange={set('contact_name')} autoComplete="name" /></div>
                <div><label className={label} htmlFor="pa-email">{c.f.email}</label><input id="pa-email" required type="email" className={input} value={form.email} onChange={set('email')} autoComplete="email" /></div>
                <div><label className={label} htmlFor="pa-phone">{c.f.phone}</label><input id="pa-phone" required type="tel" className={input} value={form.phone} onChange={set('phone')} autoComplete="tel" /></div>
            </div>
            <div>
                <label className={label} htmlFor="pa-zips">{c.f.zips}</label>
                <input id="pa-zips" required className={input} value={form.zips} onChange={set('zips')} inputMode="numeric" placeholder="30101, 30144" />
                <p className="text-xs text-slate-500 mt-1">{c.f.zipsHelp}</p>
            </div>
            <fieldset>
                <legend className={label}>{c.f.services}</legend>
                <div className="grid sm:grid-cols-2 gap-2">
                    {SERVICE_VALUES.map((s, i) => (
                        <label key={s} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer text-sm ${form.services.includes(s) ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-white/10 text-slate-300'}`}>
                            <input type="checkbox" className="accent-emerald-500" checked={form.services.includes(s)} onChange={() => toggle(s)} /> {c.serviceLabels[i]}
                        </label>
                    ))}
                </div>
            </fieldset>
            <div className="grid grid-cols-2 gap-5">
                <div><label className={label} htmlFor="pa-years">{c.f.years}</label><input id="pa-years" required type="number" min="0" max="80" className={input} value={form.years_in_business} onChange={set('years_in_business')} /></div>
                <div><label className={label} htmlFor="pa-team">{c.f.team}</label><input id="pa-team" required type="number" min="1" max="500" className={input} value={form.team_size} onChange={set('team_size')} /></div>
            </div>
            <div className="space-y-2">
                {[['insured', c.f.insured], ['can_provide_w9', c.f.w9], ['has_license', c.f.license]].map(([k, l]) => (
                    <label key={k} className="flex items-center gap-3 text-slate-300 text-sm cursor-pointer"><input type="checkbox" className="w-5 h-5 accent-emerald-500" checked={form[k]} onChange={set(k)} /> {l}</label>
                ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <div><label className={label} htmlFor="pa-ref">{c.f.ref}</label><input id="pa-ref" className={input} value={form.referred_by} onChange={set('referred_by')} /></div>
                <div><label className={label} htmlFor="pa-msg">{c.f.msg}</label><input id="pa-msg" className={input} value={form.message} onChange={set('message')} /></div>
            </div>
            <label className="flex items-start gap-3 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" required className="w-5 h-5 mt-0.5 accent-emerald-500" checked={form.consent} onChange={set('consent')} />
                <span>{c.consent}</span>
            </label>
            {error && <p className="text-amber-300 text-sm" role="alert">{error}</p>}
            <button type="submit" disabled={busy} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                {busy ? <><Loader2 className="w-5 h-5 animate-spin" /> {c.f.sending}</> : <>{c.f.submit} <ArrowRight className="w-5 h-5" /></>}
            </button>
        </form>
    );
}

export default function PartnersPage({ lang = 'en' }) {
    const c = C[lang] || C.en;
    const otherLang = lang === 'es' ? { to: '/partners', label: 'Read in English' } : { to: '/es/socios', label: 'Leer en español' };
    return (
        <div className="bg-[#020617] text-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"><div className="absolute top-[-30%] right-[-10%] w-[70%] h-[80%] bg-emerald-800/20 rounded-full blur-[140px]" /></div>
                <div className="container mx-auto px-4 md:px-6 relative py-14 md:py-24 max-w-5xl">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-wider uppercase"><Handshake className="w-4 h-4" /> {c.badge}</p>
                        <Link to={otherLang.to} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"><Languages className="w-4 h-4" /> {otherLang.label}</Link>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6 font-heading">{c.h1a}<br /><span className="text-emerald-400">{c.h1b}</span></h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">{c.sub}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#apply" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg inline-flex items-center justify-center gap-2">{c.apply} <ArrowRight className="w-5 h-5" /></a>
                        <a href="#how" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-lg inline-flex items-center justify-center">{c.how}</a>
                    </div>
                    <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        {c.stats.map(({ icon: Icon, big, small }) => (
                            <div key={small} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <Icon className="w-5 h-5 text-emerald-400 mb-2" />
                                <dt className="text-2xl font-bold text-white">{big}</dt>
                                <dd className="text-sm text-slate-400">{small}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Quien hace que */}
            <section className="py-16 bg-[#050B1A] border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">{c.splitTitle}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[[c.weTitle, c.we, 'text-violet-300'], [c.youTitle, c.you, 'text-emerald-300']].map(([title, items, cls]) => (
                            <div key={title} className="bg-[#0B1121] border border-white/5 rounded-2xl p-7">
                                <h3 className={`text-lg font-bold mb-4 ${cls}`}>{title}</h3>
                                <ul className="space-y-3">{items.map((x) => <li key={x} className="flex gap-3 text-slate-300"><Check className={`w-5 h-5 shrink-0 mt-0.5 ${cls}`} />{x}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pasos */}
            <section id="how" className="py-16 scroll-mt-24">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">{c.stepsTitle}</h2>
                    <ol className="space-y-4">
                        {c.steps.map((s, i) => (
                            <li key={s.t} className="flex gap-5 bg-[#0B1121] border border-white/5 rounded-2xl p-5">
                                <span className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                                <div><h3 className="font-bold text-white text-lg">{s.t}</h3><p className="text-slate-400">{s.d}</p></div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Comisiones */}
            <section className="py-16 bg-[#050B1A] border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{c.tableTitle}</h2>
                    <p className="text-slate-400 mb-8 max-w-3xl">{c.tableSub}</p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full text-left text-sm min-w-[640px]">
                            <thead className="bg-white/5 text-slate-300"><tr>{c.th.map((h) => <th key={h} scope="col" className="px-5 py-4 font-bold">{h}</th>)}</tr></thead>
                            <tbody>
                                {c.rows.map((r) => (
                                    <tr key={r[0]} className="border-t border-white/5">
                                        <th scope="row" className="px-5 py-4 font-medium text-white">{r[0]}</th>
                                        <td className="px-5 py-4 text-emerald-300 font-bold text-base">{r[1]}</td>
                                        <td className="px-5 py-4 text-slate-300">{r[2]}</td>
                                        <td className="px-5 py-4 text-white font-bold">{r[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 max-w-3xl">{c.tableNote}</p>
                </div>
            </section>

            {/* Herramientas */}
            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{c.appTitle}</h2>
                    <p className="text-slate-400 mb-8">{c.appSub}</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {c.app.map(({ icon: Icon, t, d }) => (
                            <div key={t} className="bg-[#0B1121] border border-white/5 rounded-2xl p-5"><Icon className="w-6 h-6 text-violet-300 mb-3" /><h3 className="font-bold text-white">{t}</h3><p className="text-slate-400 text-sm">{d}</p></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparacion */}
            <section className="py-16 bg-[#050B1A] border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">{c.compareTitle}</h2>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full text-left text-sm min-w-[640px]">
                            <thead className="bg-white/5"><tr>{c.compareCols.map((h, i) => <th key={i} scope="col" className={`px-5 py-4 font-bold ${i === 3 ? 'text-emerald-300' : 'text-slate-300'}`}>{h}</th>)}</tr></thead>
                            <tbody>
                                {c.compareRows.map((r) => (
                                    <tr key={r[0]} className="border-t border-white/5">
                                        <th scope="row" className="px-5 py-4 text-white font-medium">{r[0]}</th>
                                        <td className="px-5 py-4 text-slate-400">{r[1]}</td>
                                        <td className="px-5 py-4 text-slate-400">{r[2]}</td>
                                        <td className="px-5 py-4 text-white font-bold bg-emerald-500/5">{r[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Requisitos + formulario */}
            <section id="apply" className="py-16 scroll-mt-24">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
                    <div>
                        <h2 className="text-3xl font-bold mb-5">{c.reqTitle}</h2>
                        <ul className="space-y-3 mb-8">{c.req.map((x) => <li key={x} className="flex gap-3 text-slate-300"><ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />{x}</li>)}</ul>
                        <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-slate-400">
                            <X className="w-4 h-4 inline mr-1 text-slate-500" />{lang === 'es' ? 'Sin cuota de inscripción, sin compra de leads y la app gratis al inicio.' : 'No sign-up fee, no buying leads, and the app is free at the start.'}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{c.formTitle}</h2>
                        <p className="text-slate-400 mb-6">{c.formSub}</p>
                        <ApplyForm c={c} lang={lang} />
                    </div>
                </div>
            </section>

            {/* Preguntas */}
            <section className="py-16 bg-[#050B1A] border-t border-white/5">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">{c.faqTitle}</h2>
                    <Faq items={PARTNER_FAQ[lang] || PARTNER_FAQ.en} />
                </div>
            </section>
        </div>
    );
}
