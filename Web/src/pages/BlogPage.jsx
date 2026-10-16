import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from '../components/Link';
import { POSTS } from '../content/posts';
import { fmt } from '../lib/dates';


export default function BlogPage() {
    return (
        <div className="bg-[#020617] text-white">
            <header className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-4xl">
                <p className="inline-flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4"><BookOpen className="w-4 h-4" /> Guides</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Cleaning guides for Georgia homes and businesses</h1>
                <p className="text-slate-400 text-lg">Real prices, checklists and practical advice, with sources.</p>
            </header>
            <section className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
                <ul className="space-y-5">
                    {POSTS.map((p) => (
                        <li key={p.slug}>
                            <Link to={`/blog/${p.slug}`} className="block bg-[#0B1121] border border-white/5 hover:border-emerald-500/40 rounded-2xl p-6 group" hrefLang={p.lang}>
                                <p className="text-xs text-slate-500 mb-2"><span className="text-emerald-400 font-bold uppercase tracking-wider">{p.category}</span> · {fmt(p.date, p.lang)}</p>
                                <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-emerald-300">{p.title}</h2>
                                <p className="text-slate-400 mb-3">{p.description}</p>
                                <span className="inline-flex items-center gap-1 text-emerald-300 text-sm font-semibold">{p.lang === 'es' ? 'Leer' : 'Read'} <ArrowRight className="w-4 h-4" /></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

