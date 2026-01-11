import React from 'react';
import { User, Bot, ArrowRight } from 'lucide-react';

export const TeamMemberModal = ({ member }) => (
    <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className={`md:w-1/3 flex items-center justify-center ${member.color || 'bg-slate-100'}`}>
            {member.type === 'human' ? <User className="w-32 h-32 text-slate-400" /> : <Bot className={`w-32 h-32 ${member.color ? member.color.replace('bg-', 'text-').replace('100', '600') : 'text-purple-600'}`} />}
        </div>
        <div className="p-8 md:p-10 md:w-2/3 bg-white flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
                {member.type === 'human' ? <User className="w-5 h-5 text-sky-500" /> : <Bot className="w-5 h-5 text-purple-600" />}
                <span className="text-sm font-bold uppercase text-slate-400 tracking-wider">{member.type === 'human' ? 'Talento Humano' : 'Agente IA'}</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{member.name}</h3>
            <p className="text-sky-500 font-medium mb-6">{member.role}</p>
            <p className="text-slate-600 leading-relaxed text-lg">{member.bio}</p>
        </div>
    </div>
);

export const TeamCard = ({ member, onClick }) => (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className={`relative h-24 md:h-48 flex items-center justify-center overflow-hidden shrink-0 ${member.color || 'bg-slate-100'}`}>
            {member.type === 'human' ? <User className="w-10 h-10 md:w-20 md:h-20 text-slate-300" /> : <Bot className={`w-10 h-10 md:w-20 md:h-20 ${member.color ? member.color.replace('bg-', 'text-').replace('100', '600') : 'text-purple-600'}`} />}
            <div className="absolute top-1 right-1 bg-white/90 backdrop-blur p-0.5 rounded-full shadow-sm">
                {member.type === 'human' ? <User className="w-2.5 h-2.5 md:w-4 md:h-4 text-slate-700" /> : <Bot className="w-2.5 h-2.5 md:w-4 md:h-4 text-purple-700" />}
            </div>
        </div>
        <div className="p-2 md:p-4 flex-1 flex flex-col">
            <div className="mb-1 md:mb-2">
                <h4 className="font-bold text-slate-900 text-xs md:text-lg leading-tight">{member.name}</h4>
                <p className="text-[9px] md:text-xs uppercase tracking-wider font-semibold text-sky-500">{member.role}</p>
            </div>
            <button onClick={onClick} className="mt-auto text-[10px] md:text-sm text-slate-500 hover:text-sky-500 font-medium flex items-center gap-1 transition-colors pt-1.5 md:pt-4 border-t border-slate-50">
                <span className="hidden md:inline">Ver perfil</span>
                <span className="md:hidden">Perfil</span>
                <ArrowRight className="w-2.5 h-2.5" />
            </button>
        </div>
    </div>
);
