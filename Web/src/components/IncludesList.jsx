import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { textOf } from '../content/serviceIncludes';

// Lista "What's included" con cambio de idioma EN / ES (la web va en ingles; la lista tambien en espanol)
export default function IncludesList({ items, title = true, className = '', itemClass = 'text-slate-300' }) {
    const [lang, setLang] = useState('en');
    const list = (items || []).map((i) => textOf(i, lang)).filter(Boolean);
    if (!list.length) return null;
    return (
        <div className={className}>
            <div className="flex items-center justify-between gap-2 mb-3">
                {title ? <span className="text-xs font-black uppercase tracking-widest text-emerald-400">{lang === 'es' ? 'Qué incluye' : "What's included"}</span> : <span />}
                <div className="flex gap-1" role="group" aria-label="Language">
                    {['en', 'es'].map((l) => (
                        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={`px-2 py-0.5 rounded text-[10px] font-black ${lang === l ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 hover:text-white'}`}>{l.toUpperCase()}</button>
                    ))}
                </div>
            </div>
            <ul className="space-y-2" lang={lang}>
                {list.map((t, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${itemClass}`}>
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{t}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
