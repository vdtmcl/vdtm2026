// src/components/StructuredData.jsx
// Componente para datos estructurados JSON-LD dinámicos

import { Helmet } from 'react-helmet-async';

/**
 * Componente para agregar datos estructurados JSON-LD
 * @param {Object} data - Objeto con los datos estructurados
 */
export const StructuredData = ({ data }) => {
    if (!data) return null;

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(data)}
            </script>
        </Helmet>
    );
};

/**
 * Genera datos estructurados para un artículo de blog
 */
export const generateArticleStructuredData = (post) => {
    if (!post) return null;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": `${post.cat} - ${post.title}`,
        "image": post.image,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Organization",
            "name": "VDTM"
        },
        "publisher": {
            "@type": "Organization",
            "name": "VDTM",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.vdtm.cl/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.vdtm.cl/blog/${post.id}`
        }
    };
};

/**
 * Genera datos estructurados para una persona del equipo
 */
export const generatePersonStructuredData = (member) => {
    if (!member) return null;

    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
        "worksFor": {
            "@type": "Organization",
            "name": "VDTM"
        }
    };
};

/**
 * Genera datos estructurados para la organización
 */
export const generateOrganizationStructuredData = () => {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VDTM",
        "url": "https://www.vdtm.cl",
        "logo": "https://www.vdtm.cl/logo.png",
        "description": "Agencia de estrategia digital, desarrollo web y producción de contenidos asistida por IA",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Valparaíso y Viña del Mar",
            "addressRegion": "Región de Valparaíso",
            "addressCountry": "CL"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "vdtm.cl@gmail.com",
            "contactType": "customer service",
            "availableLanguage": "Spanish"
        }
    };
};
