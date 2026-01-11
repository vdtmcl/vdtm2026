import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUp } from 'lucide-react';

export const NavigationControls = ({ prevId, nextId, onNavigate, dark = false }) => (
    <>
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
            {/* Ir al Inicio (Primer bloque) - Siempre visible si no estamos en el hero */}
            {prevId && (
                <button
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-40 hover:opacity-100 ${dark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
                    onClick={() => onNavigate('hero')}
                    aria-label="Ir al inicio"
                    title="Ir al inicio"
                >
                    <ChevronsUp className="w-5 h-5" />
                </button>
            )}

            {/* Subir un bloque */}
            {prevId && (
                <button
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-40 hover:opacity-100 ${dark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
                    onClick={() => onNavigate(prevId)}
                    aria-label="Subir"
                    title="Sección anterior"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}

            {/* Bajar un bloque */}
            {nextId && (
                <button
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-40 hover:opacity-100 ${dark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
                    onClick={() => onNavigate(nextId)}
                    aria-label="Bajar"
                    title="Siguiente sección"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            )}
        </div>
    </>
);
