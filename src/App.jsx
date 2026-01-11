import React, { useRef, useState, useEffect } from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { TrustedBy } from './components/sections/TrustedBy';
import { Services } from './components/sections/Services';
import { TheMethod } from './components/sections/TheMethod';
import { Team } from './components/sections/Team';
import { BlogPreview } from './components/sections/BlogPreview';
import { RobustFooter } from './components/sections/Footer';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { ModalWrapper } from './components/ui/ModalWrapper';
import { ContactForm } from './components/ContactForm';
import { TeamMemberModal } from './components/modules/TeamModules';
import { BlogPostContent } from './components/modules/BlogModules';
import { SEO } from './components/SEO';
import { StructuredData, generateArticleStructuredData, generatePersonStructuredData, generateOrganizationStructuredData } from './components/StructuredData';
import { DATA } from './data';

import Lenis from 'lenis';

export default function App() {
  const containerRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const openContact = () => setIsContactOpen(true);
  const handleContactFromBlog = () => { setSelectedPost(null); setTimeout(openContact, 300); };
  const isModalOpen = !!selectedPost || !!selectedMember || isContactOpen;

  // Inicializar Lenis para Scroll Suave
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Navegación suave a secciones
  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Escuchar teclas de dirección para navegación
    const handleKeyDown = (e) => {
      // Ignorar si hay un input activo
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = DATA.sections.indexOf(DATA.sections[currentSectionIndex]);
        if (currentIndex < DATA.sections.length - 1) {
          handleNavigate(DATA.sections[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = DATA.sections.indexOf(DATA.sections[currentSectionIndex]);
        if (currentIndex > 0) {
          handleNavigate(DATA.sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex]);

  useEffect(() => {
    // Observador para actualizar la sección activa basándose en el scroll real
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detectar cuando la sección está en la parte superior/central
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = DATA.sections.indexOf(entry.target.id);
          if (index !== -1) {
            setCurrentSectionIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones definidas en DATA.sections
    DATA.sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // SEO dinámico basado en contenido actual
  const getCurrentSEO = () => {
    if (selectedPost) {
      return {
        title: selectedPost.title,
        description: `${selectedPost.cat} - ${selectedPost.title}. Lee más sobre estrategia digital y tecnología en VDTM.`,
        url: `/blog/${selectedPost.id}`,
        image: selectedPost.image,
        keywords: `VDTM, ${selectedPost.cat}, estrategia digital, tecnología, blog`
      };
    }
    if (selectedMember) {
      return {
        title: `${selectedMember.name} - ${selectedMember.role}`,
        description: `${selectedMember.name}, ${selectedMember.role} en VDTM. ${selectedMember.bio}`,
        url: `/equipo/${selectedMember.name.toLowerCase().replace(/\s+/g, '-')}`,
        image: 'https://www.vdtm.cl/og-image.jpg',
        keywords: `VDTM, equipo, ${selectedMember.role}, ${selectedMember.name}`
      };
    }
    // SEO por defecto para la página principal
    return {
      title: 'VDTM - Estrategia Digital y Desarrollo Web',
      description: 'Agencia de estrategia digital, desarrollo web y producción de contenidos asistida por IA. Especialistas en transformación digital para empresas de Valparaíso y Viña del Mar.',
      url: '/',
      image: 'https://www.vdtm.cl/og-image.jpg',
      keywords: 'VDTM, estrategia digital, desarrollo web, marketing digital, Valparaíso, Viña del Mar, transformación digital, IA, inteligencia artificial'
    };
  };

  const currentSEO = getCurrentSEO();

  // Generar datos estructurados dinámicos
  const getStructuredData = () => {
    if (selectedPost) {
      return generateArticleStructuredData(selectedPost);
    }
    if (selectedMember) {
      return generatePersonStructuredData(selectedMember);
    }
    return generateOrganizationStructuredData();
  };

  const structuredData = getStructuredData();

  // Imágenes para el carrusel del formulario de contacto
  const teamImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=1200",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=1200",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=1200",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800&h=1200"
  ];

  return (
    <div ref={containerRef} className="font-sans text-slate-900 antialiased selection:bg-blue-200 selection:text-blue-900 min-h-screen">
      <SEO {...currentSEO} />
      <StructuredData data={structuredData} />
      <Header currentSection={currentSectionIndex} onContactClick={openContact} onNavigate={handleNavigate} />
      <main>
        <Hero onContactClick={openContact} onNavigate={handleNavigate} />
        <TrustedBy onNavigate={handleNavigate} />
        <Services onNavigate={handleNavigate} />
        <TheMethod onNavigate={handleNavigate} />
        <Team onMemberClick={setSelectedMember} onNavigate={handleNavigate} />
        <BlogPreview onPostClick={setSelectedPost} onNavigate={handleNavigate} />
      </main>

      {/* El Footer renderiza internamente el ID="contact" que ahora coincide con DATA.sections */}
      <RobustFooter onNavigate={handleNavigate} />

      <FloatingWhatsApp />

      {selectedPost && <ModalWrapper onClose={() => setSelectedPost(null)}><BlogPostContent post={selectedPost} onContactClick={handleContactFromBlog} /></ModalWrapper>}
      {selectedMember && <ModalWrapper onClose={() => setSelectedMember(null)}><TeamMemberModal member={selectedMember} /></ModalWrapper>}

      {/* Modal de Contacto con Carrusel */}
      {isContactOpen && (
        <ModalWrapper onClose={() => setIsContactOpen(false)}>
          <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Carrusel de Imágenes (Solo visible en desktop/tablet) */}
            <div className="hidden md:block w-1/3 relative overflow-hidden bg-slate-900">
              <div className="absolute inset-0 animate-carousel-vertical">
                {teamImages.map((img, index) => (
                  <div key={index} className="h-full w-full relative">
                    <img src={img} alt="Equipo VDTM" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                ))}
                {/* Duplicar para efecto infinito */}
                {teamImages.map((img, index) => (
                  <div key={`dup-${index}`} className="h-full w-full relative">
                    <img src={img} alt="Equipo VDTM" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white text-lg font-bold leading-tight">Construyendo el futuro digital de la V Región.</p>
              </div>
            </div>

            {/* Formulario */}
            <div className="flex-1 p-2 md:p-0">
              <ContactForm />
            </div>
          </div>
          <style>{`
            @keyframes carousel-vertical {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            .animate-carousel-vertical {
              display: flex;
              flex-direction: column;
              height: 100%;
              animation: carousel-vertical 20s linear infinite;
            }
            /* Ajustar altura contenedora para que el carrusel funcione */
            .animate-carousel-vertical > div {
               flex-shrink: 0;
               height: 100%; 
            }
          `}</style>
        </ModalWrapper>
      )}
    </div>
  );
}
