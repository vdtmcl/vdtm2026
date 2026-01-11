import React from 'react';
import { User, Bot, ArrowRight } from 'lucide-react';

export const TeamMemberModal = ({ member }) => (
    <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className={`md:w-1/3 flex items-center justify-center ${member.color || 'bg-slate-100'}`}>
            {member.type === 'human' ? <User className="w-32 h-32 text-slate-400" /> : <Bot className={`w-32 h-32 ${member.color ? member.color.replace('bg-', 'text-').replace('100', '600') : 'text-purple-600'}`} />}
        </div>
        <div className="p-8 md:p-10 md:w-2/3 bg-white flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
                {member.type === 'human' ? <User className="w-5 h-5 text-blue-600" /> : <Bot className="w-5 h-5 text-purple-600" />}
                <span className="text-sm font-bold uppercase text-slate-400 tracking-wider">{member.type === 'human' ? 'Talento Humano' : 'Agente IA'}</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{member.name}</h3>
            <p className="text-blue-600 font-medium mb-6">{member.role}</p>
            <p className="text-slate-600 leading-relaxed text-lg">{member.bio}</p>
        </div>
    </div>
);

export const TeamCard = ({ member, onClick }) => (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className={`relative h-32 md:h-48 flex items-center justify-center overflow-hidden shrink-0 ${member.color || 'bg-slate-100'}`}>
            {member.type === 'human' ? <User className="w-12 h-12 md:w-20 md:h-20 text-slate-300" /> : <Bot className={`w-12 h-12 md:w-20 md:h-20 ${member.color ? member.color.replace('bg-', 'text-').replace('100', '600') : 'text-purple-600'}`} />}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1 rounded-full shadow-sm">
                {member.type === 'human' ? <User className="w-3 h-3 md:w-4 md:h-4 text-slate-700" /> : <Bot className="w-3 h-3 md:w-4 md:h-4 text-purple-700" />}
            </div>
        </div>
        <div className="p-3 md:p-4 flex-1 flex flex-col">
            <div className="mb-2">
                <h4 className="font-bold text-slate-900 text-sm md:text-lg leading-tight">{member.name}</h4>
                <p className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-blue-600">{member.role}</p>
            </div>
            <button onClick={onClick} className="mt-auto text-xs md:text-sm text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors pt-2 md:pt-4 border-t border-slate-50">
                Ver perfil <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    </div>
);
