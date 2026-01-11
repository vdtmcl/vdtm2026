import React, { useRef, useEffect } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { NavigationControls } from '../ui/NavigationControls';
import { OptimizedImage } from '../ui/OptimizedImage';
import { DATA } from '../../data';

export const TrustedBy = ({ onNavigate }) => {
    const marqueeRef = useRef(null);
    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // Buscar la animación del marquee
        const getAnim = () => marquee.querySelector('.animate-marquee')?.getAnimations()[0];

        const handleMouseEnter = () => {
            const anim = getAnim();
            if (anim) {
                // Desaceleración suave usando animate() para el playbackRate si fuera posible, 
                // pero updatePlaybackRate es instantáneo. Para suavizar, usamos un pequeño intervalo o requestAnimationFrame.
                let currentRate = anim.playbackRate;
                const targetRate = 0.05;
                const step = () => {
                    if (currentRate > targetRate) {
                        currentRate -= 0.05;
                        if (currentRate < targetRate) currentRate = targetRate;
                        anim.updatePlaybackRate(currentRate);
                        requestAnimationFrame(step);
                    }
                };
                requestAnimationFrame(step);
            }
        };

        const handleMouseLeave = () => {
            const anim = getAnim();
            if (anim) {
                let currentRate = anim.playbackRate;
                const targetRate = 1;
                const step = () => {
                    if (currentRate < targetRate) {
                        currentRate += 0.05;
                        if (currentRate > targetRate) currentRate = targetRate;
                        anim.updatePlaybackRate(currentRate);
                        requestAnimationFrame(step);
                    }
                };
                requestAnimationFrame(step);
            }
        };
        marquee.addEventListener('mouseenter', handleMouseEnter);
        marquee.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            marquee.removeEventListener('mouseenter', handleMouseEnter);
            marquee.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <SectionWrapper id="trusted" className="bg-slate-50">
            <div className="flex flex-col h-full justify-center">
                <div className="text-center mb-8 md:mb-16">
                    <span className="uppercase tracking-widest text-xs font-bold text-blue-600 mb-2 block">Experiencia Comprobada</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Han confiado en nosotros</h3>
                </div>
                <div ref={marqueeRef} className="relative flex mb-8 md:mb-16 py-8 cursor-default overflow-x-hidden">
                    <div className="flex gap-8 md:gap-10 animate-marquee whitespace-nowrap items-center">
                        {[...DATA.trustedLogos, ...DATA.trustedLogos].map((logo, i) => (
                            <div key={i} className="flex items-center justify-center flex-shrink-0 px-4 w-[200px] h-[200px]">
                                <OptimizedImage
                                    src={logo.logoUrl}
                                    alt={logo.name}
                                    width={200}
                                    height={200}
                                    objectFit="contain"
                                    cloudinaryOptions={{ quality: 'auto', format: 'auto' }}
                                    className="h-full w-full block"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-5xl mx-auto px-0 w-full">
                    {[
                        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600&h=400",
                        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400",
                        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=400"
                    ].map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden shadow-lg aspect-square md:aspect-video hover:scale-105 transition-transform duration-500">
                            <OptimizedImage
                                src={img}
                                alt="Galería"
                                width={600}
                                height={400}
                                cloudinaryOptions={{ crop: 'fill', quality: 'auto', format: 'auto' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
       .animate-marquee { animation: marquee 80s linear infinite; }
      `}</style>
            <NavigationControls prevId="hero" nextId="services" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};
