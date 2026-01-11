import React from 'react';
export const Button = ({ children, variant = "primary", onClick, className = "", icon: Icon }) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-2xl px-6 py-3 md:px-8 md:py-4 cursor-pointer active:scale-95 text-sm md:text-base hover:scale-105";
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white shadow-lg shadow-blue-500/30",
        secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-blue-300",
        outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
        ghost: "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 px-4 py-2"
    };
    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
            {Icon && <Icon className="ml-2 w-5 h-5" />}
        </button>
    );
};
