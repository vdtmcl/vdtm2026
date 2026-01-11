import React from 'react';
import { X } from 'lucide-react';

export const ModalWrapper = ({ children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} onWheel={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-20 text-slate-800 shadow-sm">
                <X className="w-6 h-6" />
            </button>
            {children}
        </div>
    </div>
);
