import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Reveal } from '../ui/Reveal';
import { NavigationControls } from '../ui/NavigationControls';
import { OptimizedImage } from '../ui/OptimizedImage';
import { DATA } from '../../data';

export const Services = ({ onNavigate }) => {
    const [openServiceId, setOpenServiceId] = useState(null);
    const toggleService = (id) => setOpenServiceId(openServiceId === id ? null : id);
    const activeService = DATA.services.find(s => s.id === openServiceId);
    return (
        <SectionWrapper id="services" dark className="bg-slate-900">
            <Reveal><SectionTitle dark align="center" subtitle="Soluciones Integrales" title="Líneas de Servicio" /></Reveal>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-8 h-full md:h-auto overflow-y-auto md:overflow-visible no-scrollbar pb-20 md:pb-0">
                {DATA.services.map((svc, idx) => (
                    <Reveal key={idx} delay={idx * 100}>
                        <div className={`bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300 cursor-pointer hover:border-blue-500/50 flex flex-col md:block ${openServiceId === svc.id ? 'ring-2 ring-blue-500 bg-slate-750 flex-grow md:flex-grow-0' : 'flex-grow md:flex-grow-0'}`} onClick={() => toggleService(svc.id)}>
                            <div className="p-3 md:p-8 flex flex-col h-full">
                                <div className="flex items-center gap-4 md:block mb-2 md:mb-6">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-colors shrink-0 ${openServiceId === svc.id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400'}`}>
                                        {svc.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white">{svc.title}</h3>
                                </div>
                                <p className={`text-slate-400 text-xs md:text-sm leading-relaxed mb-2 md:mb-6 flex-grow ${openServiceId === svc.id ? 'hidden md:block' : 'block'}`}>{svc.desc}</p>
                                <div className={`md:hidden overflow-hidden transition-all duration-500 ${openServiceId === svc.id ? 'max-h-[500px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-slate-300 text-xs leading-relaxed border-t border-slate-700 pt-2">{svc.detailText}</p>
                                </div>
                                <div className="text-blue-400 text-xs md:text-sm font-semibold flex items-center gap-2 hover:text-blue-300 mt-auto">
                                    {openServiceId === svc.id ? 'Cerrar' : 'Ver detalles'}
                                    {openServiceId === svc.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            <div className={`hidden md:block transition-all duration-700 ease-in-out overflow-hidden ${openServiceId ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {activeService && (
                    <div className="w-full bg-slate-800 rounded-2xl border border-slate-700 p-8 md:p-10 shadow-2xl relative mt-8">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800 border-t border-l border-slate-700 rotate-45"></div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">{activeService.icon} {activeService.title}</h4>
                                <p className="text-slate-300 leading-relaxed text-lg">{activeService.detailText}</p>
                            </div>
                            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg h-64 md:h-auto">
                                <OptimizedImage
                                    src={activeService.detailImage}
                                    alt={activeService.title}
                                    width={600}
                                    height={400}
                                    cloudinaryOptions={{ crop: 'fill', quality: 'auto', format: 'auto' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <NavigationControls prevId="trusted" nextId="method" onNavigate={onNavigate} dark />
        </SectionWrapper>
    );
};
