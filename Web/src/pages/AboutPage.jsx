import React from 'react';
import { ArrowRight, Handshake, Cpu, Users, MapPin } from 'lucide-react';
import Link from '../components/Link';
import { CITIES, cityPath } from '../site';

const VALUES = [
    { icon: Users, t: 'Fair to customers', d: 'One exact price, set below the local average, and no surprises at the door. If something was missed, we come back.' },
    { icon: Handshake, t: 'Fair to the people who clean', d: 'Partner companies keep 70% to 80% of every job, see their pay before they accept and get paid every week. No fees to join.' },
    { icon: Cpu, t: 'Technology that does the busywork', d: 'CleaningIQ handles quoting, scheduling, dispatch and billing so our team can spend its time on service and quality.' },
];

export default function AboutPage() {
    return (
        <div className="bg-[#020617] text-white">
            <header className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">About <span className="text-emerald-400">CleanShine Pro</span></h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    CleanShine Pro is a cleaning company based in Woodstock, Georgia. We don’t try to hire and manage every cleaner ourselves. Instead, we work with a network of vetted local cleaning companies and give them what is hardest for a small business to get: steady customers, a fair price and someone else handling the billing.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                    Every job runs on CleaningIQ, software we built for this model. It prices each job from public property data and the local market, sends it to the right partner team, records the visit with GPS and photos, and closes each partner’s pay every week. A person on our team approves anything important.
                </p>
            </header>

            <section className="bg-[#050B1A] border-y border-white/5 py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h2 className="text-3xl font-bold mb-8">What we stand for</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {VALUES.map(({ icon: Icon, t, d }) => (
                            <div key={t} className="bg-[#0B1121] border border-white/5 rounded-2xl p-6">
                                <Icon className="w-6 h-6 text-emerald-400 mb-3" />
                                <h3 className="font-bold text-lg mb-2">{t}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Where we work</h2>
                        <p className="text-slate-400 mb-5">We start in Georgia and grow city by city as partner companies join.</p>
                        <div className="flex flex-wrap gap-2">
                            {CITIES.map((c) => <Link key={c.slug} to={cityPath(c.slug)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white"><MapPin className="w-4 h-4 text-emerald-400" />{c.name}</Link>)}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Link to="/quote" className="flex items-center justify-between bg-emerald-700/20 border border-emerald-500/30 rounded-2xl p-6 hover:bg-emerald-700/30">
                            <span><span className="block font-bold text-lg">Need a cleaning?</span><span className="text-slate-300 text-sm">See your exact price online.</span></span><ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/partners" className="flex items-center justify-between bg-violet-700/20 border border-violet-400/30 rounded-2xl p-6 hover:bg-violet-700/30">
                            <span><span className="block font-bold text-lg">Run a cleaning company?</span><span className="text-slate-300 text-sm">Join the partner network.</span></span><ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="text-sm text-slate-500">CleanShine Pro LLC · 900 Buice Lake Pkwy, Woodstock, GA 30188 · contact@cleanshinepro.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
