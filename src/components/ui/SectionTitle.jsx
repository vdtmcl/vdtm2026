import React from 'react';
export const SectionTitle = ({ title, subtitle, align = "left", dark = false }) => (
    <div className={`mb-4 md:mb-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        <span className={`uppercase tracking-widest text-xs font-bold ${dark ? 'text-blue-400' : 'text-blue-600'} mb-2 block`}>{subtitle}</span>
        <h2 className={`text-2xl md:text-5xl font-bold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
        <div className={`mt-2 md:mt-4 h-1 w-20 ${dark ? 'bg-blue-500' : 'bg-blue-600'} ${align === 'center' ? 'mx-auto' : ''} rounded-full`}></div>
    </div>
);
