import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Preguntas plegables (la primera abierta)
export default function Faq({ items }) {
    const [open, setOpen] = useState(0);
    return (
        <div className="space-y-3">
            {items.map((f, i) => (
                <div key={i} className="bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden">
                    <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                        className="w-full flex justify-between items-center gap-4 p-5 text-left hover:bg-white/5">
                        <h3 className="text-white font-bold text-base">{f.q}</h3>
                        <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={open === i ? 'px-5 pb-5 text-slate-400 leading-relaxed' : 'hidden'}>{f.a}</div>
                </div>
            ))}
        </div>
    );
}
