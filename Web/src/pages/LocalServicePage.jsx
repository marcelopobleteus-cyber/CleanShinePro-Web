import React from 'react';
import { MapPin, ArrowRight, Home, Sparkles, Truck, Building2, Check } from 'lucide-react';
import Link from '../components/Link';
import { CITIES, cityPath } from '../site';

const SERVICES = [
    { icon: Home, t: 'Recurring house cleaning', d: 'Weekly, biweekly or monthly, with the same checklist every visit.' },
    { icon: Sparkles, t: 'Deep cleaning', d: 'Baseboards, inside appliances, grout and detail work.' },
    { icon: Truck, t: 'Move-in / move-out', d: 'Empty-home cleaning with a photo report for your deposit.' },
    { icon: Building2, t: 'Office cleaning', d: 'Small offices, clinics and retail, with a log of every visit.' },
];

export default function LocalServicePage({ city }) {
    const c = CITIES.find((x) => x.slug === city) || CITIES[0];
    const near = c.near.map((s) => CITIES.find((x) => x.slug === s)).filter(Boolean);
    return (
        <div className="bg-[#020617] text-white">
            <header className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-5xl">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
                    <MapPin className="w-4 h-4" /> {c.name}, GA · {c.county}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading leading-tight">House cleaning in {c.name}, GA <span className="text-emerald-400">with an exact price online</span></h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
                    CleanShine Pro cleans homes and offices in {c.name} with vetted local partner teams. Enter your address to see your exact price in about a minute. It is set 5% below what local competitors charge for the same service, and every visit ends with a photo report in your client portal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/quote" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg inline-flex items-center justify-center gap-2">Get my price in {c.name} <ArrowRight className="w-5 h-5" /></Link>
                    <Link to="/services" className="px-8 py-4 border border-white/20 hover:bg-white/10 font-bold rounded-lg inline-flex items-center justify-center">See services</Link>
                </div>
            </header>

            <section className="bg-[#050B1A] border-y border-white/5 py-14">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Cleaning in {c.name}</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">{c.note}</p>
                        <p className="text-slate-400 leading-relaxed">ZIP codes we cover in {c.name}: <span className="text-white font-semibold">{c.zips.join(', ')}</span>. Not sure about your street? The quote checks coverage for your exact address.</p>
                    </div>
                    <ul className="space-y-3">
                        {['Exact price from your address, no surprises at the door', 'Vetted local team with its own liability insurance', 'GPS check-in, check-out and before-and-after photos', 'Free re-clean if you tell us within 24 hours', 'English and Spanish'].map((x) => (
                            <li key={x} className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />{x}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-14">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">Services in {c.name}</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {SERVICES.map(({ icon: Icon, t, d }) => (
                            <Link key={t} to="/quote" className="bg-[#0B1121] border border-white/5 hover:border-emerald-500/40 rounded-2xl p-6">
                                <Icon className="w-6 h-6 text-emerald-400 mb-3" />
                                <h3 className="font-bold text-lg mb-1">{t} in {c.name}</h3>
                                <p className="text-slate-400 text-sm">{d}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#050B1A] border-t border-white/5 py-14">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-xl font-bold mb-3">Nearby cities</h2>
                        <div className="flex flex-wrap gap-3">
                            {near.map((n) => <Link key={n.slug} to={cityPath(n.slug)} className="px-4 py-2 rounded-full border border-white/15 text-slate-300 hover:text-white hover:border-emerald-500/50">House cleaning {n.name}</Link>)}
                            <Link to="/service-areas" className="px-4 py-2 rounded-full border border-white/15 text-slate-300 hover:text-white">All areas</Link>
                        </div>
                    </div>
                    <div className="bg-[#0B1121] border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-2">Own a cleaning company in {c.name}?</h2>
                        <p className="text-slate-400 text-sm mb-4">We send jobs in {c.county} to local partner companies. You keep 70% to 80% of every job, paid weekly.</p>
                        <Link to="/partners" className="inline-flex items-center gap-2 text-emerald-300 font-semibold">Join the partner network <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
