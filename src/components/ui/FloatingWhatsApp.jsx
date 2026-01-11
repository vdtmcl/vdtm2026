import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DATA } from '../../data';

export const FloatingWhatsApp = () => (
    <a href={`https://wa.me/${DATA.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-30 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl shadow-green-500/30 transition-all hover:scale-110 flex items-center justify-center animate-pulse-subtle" aria-label="WhatsApp">
        <MessageCircle className="w-8 h-8 fill-current" />
        <style>{`
      @keyframes pulse-subtle { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } }
      .animate-pulse-subtle { animation: pulse-subtle 2s infinite; }
    `}</style>
    </a>
);
