import React from 'react';
export const SectionWrapper = ({ id, className = "", children, dark = false }) => (
    <section id={id} className={`w-full min-h-dvh flex flex-col justify-center relative overflow-hidden snap-start ${dark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} pt-36 pb-16 md:pt-24 md:pb-12 px-4 md:px-12 ${className}`}>
        <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
            {children}
        </div>
    </section>
);
