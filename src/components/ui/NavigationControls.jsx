import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const NavigationControls = ({ prevId, nextId, onNavigate, dark = false }) => (
    <>
        {prevId && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-24 z-30">
                <button className={`p-2 transition-all duration-300 hover:-translate-y-1 opacity-60 hover:opacity-100 ${dark ? 'text-white' : 'text-blue-600'}`} onClick={() => onNavigate(prevId)} aria-label="Subir">
                    <ChevronUp className="w-8 h-8" />
                </button>
            </div>
        )}
        {nextId && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 z-30">
                <button className={`p-2 transition-all duration-300 animate-pulse-vertical opacity-60 hover:opacity-100 ${dark ? 'text-white' : 'text-blue-600'}`} onClick={() => onNavigate(nextId)} aria-label="Bajar">
                    <ChevronDown className="w-8 h-8" />
                </button>
            </div>
        )}
        <style>{`
      @keyframes pulse-vertical { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
      .animate-pulse-vertical { animation: pulse-vertical 3s ease-in-out infinite; }
    `}</style>
    </>
);
