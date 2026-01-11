import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { ContactForm } from '../ContactForm';
import { SectionWrapper } from '../ui/SectionWrapper';
import { NavigationControls } from '../ui/NavigationControls';

export const RobustFooter = ({ onNavigate }) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkRes = () => setIsDesktop(window.innerWidth >= 1024);
        checkRes();
        window.addEventListener('resize', checkRes);
        return () => window.removeEventListener('resize', checkRes);
    }, []);

    const ContactInfo = () => (
        <div className="space-y-6 md:space-y-8">
            <div>
                <span className="text-blue-400 font-semibold tracking-wider text-xs md:sm uppercase">
                    Potencia tu impacto digital
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-3 md:mb-4 leading-tight">
                    Impulsa tu visión
                </h2>
                <p className="text-slate-400 text-sm md:text-lg max-w-md leading-relaxed">
                    La tecnología avanza, tu comunicación también debería. Analicemos juntos cómo la Inteligencia Artificial puede potenciar tus objetivos hoy.
                </p>
            </div>

            <div className="space-y-4 md:space-y-6">
                {[
                    { Icon: MapPin, title: "Ubicación", content: "Valparaíso & Viña del Mar, Chile" },
                    { Icon: Mail, title: "Email", content: "vdtm.cl@gmail.com", isLink: true, href: "mailto:vdtm.cl@gmail.com" },
                    { Icon: Phone, title: "WhatsApp", content: "+56 9 9485 6488", isLink: true, href: "https://wa.me/56994856488" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 md:space-x-4">
                        <div className="p-2 md:p-3 bg-slate-800 rounded-lg text-blue-400">
                            <item.Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm md:text-lg">{item.title}</h4>
                            {item.isLink ? (
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm md:text-base hover:text-white transition-colors">
                                    {item.content}
                                </a>
                            ) : (
                                <p className="text-slate-400 text-sm md:text-base">{item.content}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex space-x-4 pt-2">
                {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                    <a key={i} href="#" className="p-2 md:p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-all text-slate-300 hover:text-white">
                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                ))}
            </div>
        </div>
    );

    const BottomBar = () => (
        <div className="border-t border-slate-800 mt-12 md:mt-20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs md:sm px-4">
            <p>© 2026 VDTM Web. Todos los derechos reservados.</p>
            <div className="flex space-x-4 md:space-x-6 mt-3 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <SectionWrapper id="contact" dark={true} className="relative">
                <div className="grid grid-cols-2 gap-12 items-center">
                    <ContactInfo />
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 rounded-full transform translate-x-10 translate-y-10"></div>
                        <ContactForm />
                    </div>
                </div>
                <BottomBar />
                <NavigationControls prevId="blog" onNavigate={onNavigate} dark={true} />
            </SectionWrapper>
        );
    }

    return (
        <div className="contents">
            {/* Pantalla 1: Formulario solamente (Móvil) */}
            <SectionWrapper id="contact" dark={true} className="!justify-center !pt-10 !pb-4 h-dvh overflow-hidden">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-full max-w-[90%] sm:max-w-sm">
                        <ContactForm dark={true} />
                    </div>
                </div>
                <NavigationControls prevId="blog" nextId="footer" onNavigate={onNavigate} dark={true} />
            </SectionWrapper>

            {/* Pantalla 2: Info + Pie de página (Móvil) */}
            <SectionWrapper id="footer" dark={true} className="!justify-between !pt-20 !pb-10 min-h-dvh">
                <div className="flex flex-col justify-center flex-grow py-8 max-w-sm mx-auto w-full">
                    <ContactInfo />
                </div>
                <BottomBar />
                <NavigationControls prevId="contact" onNavigate={onNavigate} dark={true} />
            </SectionWrapper>
        </div>
    );
};
