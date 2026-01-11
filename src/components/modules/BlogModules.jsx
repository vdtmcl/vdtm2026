import React from 'react';
import { Clock, Users, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { OptimizedImage } from '../ui/OptimizedImage';

export const BlogPostContent = ({ post, onContactClick }) => {
    if (!post) return null;
    return (
        <div>
            <div className="relative w-full h-56 md:h-80">
                <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={320}
                    className="absolute inset-0"
                    cloudinaryOptions={{ crop: 'fill', quality: 'auto', format: 'auto' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6 md:p-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg">{post.cat}</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2">{post.title}</h2>
                    </div>
                </div>
            </div>
            <div className="p-6 md:p-12 max-w-3xl mx-auto">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Equipo VDTM</span>
                </div>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">¿Quieres aplicar esto en tu organización?</h4>
                    <Button onClick={onContactClick} icon={MessageCircle}>Solicitar Asesoría</Button>
                </div>
            </div>
        </div>
    );
};
