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

export default function App() {
  const containerRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);

  const openContact = () => setIsContactOpen(true);
  const handleContactFromBlog = () => { setSelectedPost(null); setTimeout(openContact, 300); };
  const isModalOpen = !!selectedPost || !!selectedMember || isContactOpen;

  // Motor de Scroll Optimizado
  const smoothScrollTo = (target, duration = 1500) => {
    const container = containerRef.current;
    if (!container || isScrolling) return;

    let targetTop;
    if (typeof target === 'string') {
      const el = document.getElementById(target);
      if (!el) {
        console.warn(`[VDTM Scroll] No se encontró la sección: ${target}`);
        return;
      }
      targetTop = el.offsetTop;
      const newIndex = DATA.sections.indexOf(target);
      if (newIndex !== -1) setCurrentSectionIndex(newIndex);
    } else {
      targetTop = target;
    }

    setIsScrolling(true);
    const start = container.scrollTop;
    const distance = targetTop - start;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const ease = (t, b, c, d) => {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      };
      container.scrollTop = ease(timeElapsed, start, distance, duration);
      if (timeElapsed < duration) requestAnimationFrame(animation);
      else setIsScrolling(false);
    };
    requestAnimationFrame(animation);
  };

  const handleNavigate = (id) => smoothScrollTo(id);

  const handleScrollMovement = (direction, container) => {
    if (isScrolling || isModalOpen) return;

    const currentSectionId = DATA.sections[currentSectionIndex];
    const currentSectionEl = document.getElementById(currentSectionId);

    if (!currentSectionEl) return;

    const sectionBottom = currentSectionEl.offsetTop + currentSectionEl.offsetHeight;
    const viewportBottom = container.scrollTop + container.clientHeight;
    const isLongSection = currentSectionEl.offsetHeight > container.clientHeight;
    const atBottom = viewportBottom >= sectionBottom - 5;
    const atTop = container.scrollTop <= currentSectionEl.offsetTop + 5;

    if (direction === 'down') {
      if (isLongSection && !atBottom) {
        const targetScroll = sectionBottom - container.clientHeight;
        smoothScrollTo(targetScroll);
        return;
      }
      if (currentSectionIndex < DATA.sections.length - 1) {
        smoothScrollTo(DATA.sections[currentSectionIndex + 1]);
      }
    } else if (direction === 'up') {
      if (isLongSection && !atTop) {
        smoothScrollTo(currentSectionEl.offsetTop);
        return;
      }
      if (currentSectionIndex > 0) {
        smoothScrollTo(DATA.sections[currentSectionIndex - 1]);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (isModalOpen) return;
      e.preventDefault();
      handleScrollMovement(e.deltaY > 0 ? 'down' : 'up', container);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isModalOpen) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      if (Math.abs(diff) > 30) {
        handleScrollMovement(diff > 0 ? 'down' : 'up', container);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSectionIndex, isScrolling, isModalOpen]);

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

  return (
    <div ref={containerRef} className="font-sans text-slate-900 antialiased selection:bg-blue-200 selection:text-blue-900 h-screen overflow-hidden">
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
      {isContactOpen && <ModalWrapper onClose={() => setIsContactOpen(false)}><ContactForm /></ModalWrapper>}
    </div>
  );
}
