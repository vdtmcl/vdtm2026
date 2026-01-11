import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Reveal } from '../ui/Reveal';
import { NavigationControls } from '../ui/NavigationControls';
import { DATA } from '../../data';

export const TheMethod = ({ onNavigate }) => {
    const [openIndex, setOpenIndex] = useState(0);
    return (
        <SectionWrapper id="method">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start h-full md:h-auto overflow-y-auto md:overflow-visible pb-20 md:pb-0">
                <div className="order-1 md:order-1 sticky top-0 md:top-24 bg-slate-50 md:bg-transparent z-10 py-4 md:py-0">
                    <Reveal><SectionTitle subtitle="Filosofía VDTM" title="El Método Híbrido" /></Reveal>
                    <Reveal delay={100}><p className="text-slate-600 mb-6 leading-relaxed text-base md:text-lg">Dejamos atrás los modelos rígidos. En VDTM, nuestra filosofía se basa en la fluidez entre la potencia computacional y la sensibilidad humana.</p></Reveal>
                    <Reveal delay={200}>
                        <div className="bg-blue-50 p-4 md:p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 animate-pulse" /> ¿Por qué funciona?
                            </h4>
                            <p className="text-blue-800/80 text-xs md:text-sm">Porque elimina las tareas repetitivas que agotan a los creativos, permitiéndoles enfocarse al 100% en la estrategia de tu marca.</p>
                        </div>
                    </Reveal>
                </div>
                <div className="order-2 md:order-2 space-y-3 md:space-y-4">
                    {DATA.method.map((item, idx) => (
                        <Reveal key={idx} delay={idx * 150}>
                            <div className={`rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer group ${openIndex === idx ? 'bg-white border-blue-200 shadow-lg' : 'bg-slate-50 border-slate-200 hover:bg-white'}`} onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}>
                                <div className="flex items-center justify-between p-4 md:p-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-slate-200 text-slate-500'}`}>{item.icon}</div>
                                        <h3 className={`font-bold text-base md:text-lg transition-all duration-300 ${openIndex === idx ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600' : 'text-slate-700'}`}>{item.title}</h3>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                                </div>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-4 md:px-6 pb-4 md:pb-6 pl-16 md:pl-20"><p className="text-slate-600 leading-relaxed text-xs md:text-sm">{item.content}</p></div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
            <NavigationControls prevId="services" nextId="team" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};
