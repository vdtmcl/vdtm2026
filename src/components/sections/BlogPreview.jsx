import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock, Users } from 'lucide-react';
import { DATA } from '../../data';
import { SectionWrapper } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { NavigationControls } from '../ui/NavigationControls';
import { OptimizedImage } from '../ui/OptimizedImage';

export const BlogPreview = ({ onPostClick, onNavigate }) => {
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setVisiblePosts(4);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleShowMore = () => {
        setVisiblePosts(prev => prev + (isMobile ? 4 : 6));
    };

    return (
        <SectionWrapper id="blog" className="bg-white">
            <Reveal>
                <div className="flex justify-between items-end mb-4 md:mb-8">
                    <SectionTitle subtitle="Actualidad" title="Blog & Insights" />
                </div>
            </Reveal>

            {/* Grid: 2 en movil, 3 en Tablet (md) y Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 pb-10 md:pb-0">
                {DATA.blog.slice(0, visiblePosts).map((post, i) => (
                    <Reveal key={post.id} delay={i % 3 * 200}>
                        <article
                            className="flex flex-col group cursor-pointer h-full border border-slate-100 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-slate-50 overflow-hidden"
                            onClick={() => onPostClick(post)}
                        >
                            <div className="w-full h-24 md:h-40 bg-slate-200 overflow-hidden shrink-0 relative">
                                <OptimizedImage
                                    src={post.image}
                                    alt={post.title}
                                    width={400}
                                    height={160}
                                    className="group-hover:scale-105 transition-transform duration-500"
                                    cloudinaryOptions={{ crop: 'fill', quality: 'auto', format: 'auto' }}
                                />
                            </div>
                            <div className="flex-1 flex flex-col p-3 md:p-4">
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 mb-1 md:mb-2">
                                    <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">{post.cat}</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xs md:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>

            {visiblePosts < DATA.blog.length && (
                <div className="flex justify-center pb-20 md:pb-0">
                    <Button variant="secondary" onClick={handleShowMore} icon={ChevronDown}>Ver más</Button>
                </div>
            )}

            {/* Apuntamos al ID 'contact' corregido en DATA */}
            <NavigationControls prevId="team" nextId="contact" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};
