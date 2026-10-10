import React, { useEffect, useId, useRef, useState } from 'react';
import { LogIn, ChevronDown, Users, ShieldCheck } from 'lucide-react';
import { ASSOCIATE_LOGIN_URL, MASTER_LOGIN_URL } from '../config';

// Acceso al sistema desde la portada: dos entradas con color propio para no confundirlas.
//  Asociado (azul y verde de CleanShine): el equipo de la empresa
//  Master (morado de CleaningIQ): administrador de todas las cuentas
export default function TeamLogin({ t }) {
    const [open, setOpen] = useState(false);
    const root = useRef(null);
    const button = useRef(null);
    const menuId = useId();

    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); button.current?.focus(); } };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    }, [open]);

    return (
        <div ref={root} className="relative">
            <button
                ref={button}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={t.navLogin}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors"
            >
                <LogIn size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{t.navLogin}</span>
                <ChevronDown size={14} aria-hidden="true" className={`hidden sm:block transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div id={menuId} role="menu" aria-label={t.loginTitle}
                    className="absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden z-[70]">
                    <p className="px-4 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{t.loginTitle}</p>
                    <a role="menuitem" href={ASSOCIATE_LOGIN_URL}
                        className="flex items-start gap-3 px-4 py-3 text-white hover:brightness-110 transition"
                        style={{ background: 'linear-gradient(90deg, #0b2f63, #1f9d55)' }}>
                        <Users size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>
                            <span className="block text-sm font-bold">{t.loginAssociate}</span>
                            <span className="block text-xs text-white/80">{t.loginAssociateSub}</span>
                        </span>
                    </a>
                    <a role="menuitem" href={MASTER_LOGIN_URL}
                        className="flex items-start gap-3 px-4 py-3 text-white hover:brightness-110 transition"
                        style={{ background: 'linear-gradient(90deg, #2e1065, #5b21b6)' }}>
                        <ShieldCheck size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>
                            <span className="block text-sm font-bold">{t.loginMaster}</span>
                            <span className="block text-xs text-white/80">{t.loginMasterSub}</span>
                        </span>
                    </a>
                </div>
            )}
        </div>
    );
}
