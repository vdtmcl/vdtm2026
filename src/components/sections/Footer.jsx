import React from 'react';
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { ContactForm } from '../ContactForm'; // Importamos el componente blindado
import { NavigationControls } from '../ui/NavigationControls';

export const RobustFooter = ({ onNavigate }) => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10 relative" id="contact">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* COLUMNA IZQUIERDA: Información y Contexto */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">
                                Potencia tu impacto digital
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 leading-tight">
                                Impulsa tu visión
                            </h2>
                            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                                La tecnología avanza, tu comunicación también debería. Analicemos juntos cómo la Inteligencia Artificial puede potenciar tus objetivos hoy.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-blue-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Ubicación</h4>
                                    <p className="text-slate-400">Valparaíso & Viña del Mar, Chile</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-blue-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Email</h4>
                                    <a href="mailto:vdtm.cl@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                                        vdtm.cl@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-blue-400">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">WhatsApp</h4>
                                    <a href="https://wa.me/56994856488" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                        +56 9 9485 6488
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-all text-slate-300 hover:text-white">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: El Formulario Blindado (Tarjeta Blanca) */}
                    <div className="relative">
                        {/* Decoración de fondo para resaltar el formulario */}
                        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 rounded-full transform translate-x-10 translate-y-10"></div>

                        {/* Renderizamos el componente único */}
                        <div className="relative">
                            <ContactForm />
                        </div>
                    </div>

                </div>

                {/* BARRA INFERIOR */}
                <div className="border-t border-slate-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>© 2026 VDTM Web. Todos los derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
            <NavigationControls prevId="blog" onNavigate={onNavigate} dark={true} />
        </footer>
    );
};
