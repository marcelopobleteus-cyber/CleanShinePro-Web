import React from 'react';
import Link from '../components/Link';

export default function NotFoundPage() {
    return (
        <div className="bg-[#020617] text-white min-h-[60vh] flex items-center">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-xl py-20">
                <p className="text-emerald-400 font-bold mb-3">404</p>
                <h1 className="text-4xl font-bold mb-4">This page doesn’t exist</h1>
                <p className="text-slate-400 mb-8">The link may be old. You can get your cleaning price or go back to the home page.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/quote" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg">Get my price</Link>
                    <Link to="/" className="px-6 py-3 border border-white/20 hover:bg-white/10 font-bold rounded-lg">Home</Link>
                </div>
            </div>
        </div>
    );
}
