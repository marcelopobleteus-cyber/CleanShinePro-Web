import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from '../components/Link';
import { POSTS } from '../content/posts';
import { fmt } from '../lib/dates';
import NotFoundPage from './NotFoundPage';

const CTA = {
    quote: { title: 'See your exact price', text: 'Enter your address and get your price in about a minute, set 5% below the local average.', to: '/quote', btn: 'Get my price' },
    partners: { title: 'Run a cleaning company in Georgia?', text: 'We bring the customers and handle the billing. You keep 70% to 80% of every job, paid weekly.', to: '/partners', btn: 'See the partner program' },
    socios: { title: '¿Tienes una empresa de limpieza en Georgia?', text: 'Nosotros traemos los clientes y cobramos. Tú te quedas con 70 % a 80 % de cada trabajo, con pago semanal.', to: '/es/socios', btn: 'Ver el programa de socios' },
};

function Block({ b }) {
    if (b.h2) return <h2 className="text-2xl font-bold mt-10 mb-4">{b.h2}</h2>;
    if (b.p) return <p className="text-slate-300 leading-relaxed mb-4 text-lg">{b.p}</p>;
    if (b.ul) return <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>;
    if (b.table) {
        return (
            <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
                <table className="w-full text-sm text-left min-w-[520px]">
                    <thead className="bg-white/5"><tr>{b.table.head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-bold text-slate-200">{h}</th>)}</tr></thead>
                    <tbody>{b.table.rows.map((r) => <tr key={r[0]} className="border-t border-white/5">{r.map((c, i) => i === 0 ? <th key={i} scope="row" className="px-4 py-3 text-white font-medium">{c}</th> : <td key={i} className="px-4 py-3 text-slate-300">{c}</td>)}</tr>)}</tbody>
                </table>
            </div>
        );
    }
    if (b.cta) {
        const c = CTA[b.cta];
        return (
            <aside className="my-10 bg-emerald-700/20 border border-emerald-500/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-2">{c.title}</h2>
                <p className="text-slate-300 mb-4">{c.text}</p>
                <Link to={c.to} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg">{c.btn} <ArrowRight className="w-4 h-4" /></Link>
            </aside>
        );
    }
    return null;
}

export default function BlogPostPage({ post: slug }) {
    const post = POSTS.find((p) => p.slug === slug);
    if (!post) return <NotFoundPage />;
    const es = post.lang === 'es';
    return (
        <article className="bg-[#020617] text-white" lang={post.lang}>
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-3xl">
                <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-8"><ArrowLeft className="w-4 h-4" /> {es ? 'Todas las guías' : 'All guides'}</Link>
                <p className="text-xs text-slate-500 mb-3"><span className="text-emerald-400 font-bold uppercase tracking-wider">{post.category}</span> · {fmt(post.date, post.lang)}</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
                {post.body.map((b, i) => <Block key={i} b={b} />)}
                {post.sources?.length > 0 && (
                    <footer className="mt-12 pt-6 border-t border-white/10">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">{es ? 'Fuentes' : 'Sources'}</h2>
                        <ul className="space-y-2 text-sm">{post.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">{s.label}</a></li>)}</ul>
                    </footer>
                )}
            </div>
        </article>
    );
}
