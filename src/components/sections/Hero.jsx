import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Reveal } from '../ui/Reveal';
import { WordRotator } from '../ui/WordRotator';
import { Button } from '../ui/Button';
import { NavigationControls } from '../ui/NavigationControls';

export const Hero = ({ onContactClick, onNavigate }) => (
    <SectionWrapper id="hero" className="pt-36 md:pt-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent hidden md:block"></div>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-20 h-full">
            <Reveal className="space-y-6 text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                    <Zap className="w-3 h-3" /> En todo Valparaíso & Viña del Mar
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight" aria-label="Agencia de Comunicación Digital para Organizaciones">
                    Agencia de <br /> Comunicación Digital <br /> para <WordRotator />
                </h1>
                <div className="lg:hidden relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-slate-900 my-6 mx-auto w-[50%] md:w-[70%]">
                    <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/Zz32k1w8G5Y?autoplay=1&mute=1&loop=1&playlist=Zz32k1w8G5Y&controls=0&showinfo=0&rel=0&modestbranding=1" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed">
                    Modernizamos tu comunicación digital, somos un equipo de profesionales potenciados por Inteligencia Artificial.
                </p>
                <div className="flex flex-row gap-4 justify-center lg:justify-start w-full md:w-auto">
                    <Button onClick={onContactClick} icon={ChevronRight} className="flex-1 md:flex-none">Hablemos</Button>
                    <Button variant="secondary" onClick={() => onNavigate('services')} className="flex-1 md:flex-none">Ver Servicios</Button>
                </div>
            </Reveal>
            <Reveal delay={200} className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 aspect-video w-full bg-slate-900">
                    <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/Zz32k1w8G5Y?autoplay=1&mute=1&loop=1&playlist=Zz32k1w8G5Y&controls=0&showinfo=0&rel=0&modestbranding=1" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </Reveal>
        </div>
        <NavigationControls nextId="trusted" onNavigate={onNavigate} />
    </SectionWrapper>
);
