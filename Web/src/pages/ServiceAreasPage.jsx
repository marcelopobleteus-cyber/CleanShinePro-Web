import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from '../components/Link';
import { CITIES, cityPath } from '../site';

const ServiceAreasPage = () => (
    <div className="bg-[#020617] text-white">
        <header className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Where we <span className="text-emerald-400">clean</span></h1>
            <p className="text-slate-300 text-lg">
                Homes and offices in Cobb, Cherokee, North Fulton and Bartow counties, Georgia. We are growing across the Atlanta metro as new partner companies join the network. The quote confirms coverage for your exact address.
            </p>
        </header>
        <section className="container mx-auto px-4 md:px-6 pb-16 max-w-5xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CITIES.map((c) => (
                    <Link key={c.slug} to={cityPath(c.slug)} className="bg-[#0B1121] border border-white/5 hover:border-emerald-500/40 rounded-2xl p-6 group">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center"><MapPin className="w-5 h-5" /></span>
                            <div>
                                <h2 className="text-lg font-bold group-hover:text-emerald-300">{c.name}, GA</h2>
                                <p className="text-xs text-slate-500">{c.county}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {c.zips.map((z) => <span key={z} className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">{z}</span>)}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-10 text-center">
                <Link to="/quote" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg">Check my address and price <ArrowRight className="w-5 h-5" /></Link>
            </div>
        </section>
    </div>
);

export default ServiceAreasPage;
