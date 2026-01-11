import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const NavigationControls = ({ prevId, nextId, onNavigate, dark = false }) => (
    <>
        {prevId && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-8 z-30">
                <button
                    className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-110 hover:bg-blue-500 animate-pulse-slow"
                    onClick={() => onNavigate(prevId)}
                    aria-label="Subir"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            </div>
        )}
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
