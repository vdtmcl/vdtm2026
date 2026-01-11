import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUp } from 'lucide-react';

export const NavigationControls = ({ prevId, nextId, onNavigate, dark = false }) => (
    <>
        {/* Flechas para Subir (Discretas, abajo a la derecha) */}
        {prevId && (
            <div className="absolute right-8 bottom-8 z-30 flex flex-col gap-3 items-center">

                {/* Ir al Inicio (Primer bloque) */}
                <button
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100 ${dark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
                    onClick={() => onNavigate('home')}
                    aria-label="Ir al inicio"
                    title="Ir al inicio"
                >
                    <ChevronsUp className="w-6 h-6" />
                </button>

                {/* Subir un bloque */}
                <button
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100 ${dark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}
                    onClick={() => onNavigate(prevId)}
                    aria-label="Subir"
                    title="Sección anterior"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            </div>
        )}

        {/* Flecha para Bajar (Círculo Azul Palpitante, Centrada) */}
        {nextId && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 z-30">
                <button
                    className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-110 hover:bg-blue-500 animate-pulse-slow"
                    onClick={() => onNavigate(nextId)}
                    aria-label="Bajar"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>
        )}
        <style>{`
      @keyframes pulse-slow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
        50% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
      }
      .animate-pulse-slow { animation: pulse-slow 3s infinite; }
    `}</style>
    </>
);
