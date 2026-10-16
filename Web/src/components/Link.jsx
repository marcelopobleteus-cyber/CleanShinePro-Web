import React from 'react';
import { navigate } from '../lib/router';

// Enlace real (<a href>) para que Google pueda seguirlo, pero que cambia de pagina sin recargar.
export default function Link({ to, children, className, onClick, ...rest }) {
    const handle = (e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (!to || /^(https?:|mailto:|tel:)/.test(to) || to.startsWith('#')) return;
        e.preventDefault();
        navigate(to);
    };
    return <a href={to} className={className} onClick={handle} {...rest}>{children}</a>;
}
