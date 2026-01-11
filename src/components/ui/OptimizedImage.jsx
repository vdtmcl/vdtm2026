// src/components/ui/OptimizedImage.jsx
// Componente de imagen optimizada con Cloudinary y lazy loading

import { useState } from 'react';
import { getCloudinaryUrl, getCloudinarySrcSet, isCloudinaryConfigured } from '../../utils/cloudinary';

/**
 * Componente de imagen optimizada con soporte para Cloudinary
 * @param {string} src - URL o path de la imagen
 * @param {string} alt - Texto alternativo
 * @param {number} width - Ancho deseado
 * @param {number} height - Alto deseado
 * @param {string} className - Clases CSS adicionales
 * @param {string} objectFit - Propiedad CSS object-fit (cover, contain, etc.)
 * @param {boolean} lazy - Habilitar lazy loading (default: true)
 * @param {Object} cloudinaryOptions - Opciones adicionales para Cloudinary
 */
export const OptimizedImage = ({
    src,
    alt = '',
    width,
    height,
    className = '',
    objectFit = 'cover',
    lazy = true,
    cloudinaryOptions = {}
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Determinar si usar Cloudinary
    const useCloudinary = isCloudinaryConfigured();

    // Generar URLs optimizadas
    const optimizedSrc = useCloudinary
        ? getCloudinaryUrl(src, { width, height, fetch: src.startsWith('http'), ...cloudinaryOptions })
        : src;

    const srcSet = useCloudinary && width
        ? getCloudinarySrcSet(src, [width, width * 2, width * 3])
        : undefined;

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    // Si hay error, mostrar placeholder o imagen original
    if (hasError && !useCloudinary) {
        return (
            <div
                className={`bg-slate-200 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <span className="text-slate-400 text-xs">Imagen no disponible</span>
            </div>
        );
    }

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{
                width: (width && !className.includes('w-')) ? width : undefined,
                height: (height && !className.includes('h-')) ? height : undefined
            }}
        >
            {/* Placeholder mientras carga */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}

            {/* Imagen optimizada */}
            <img
                src={hasError && useCloudinary ? src : optimizedSrc}
                srcSet={srcSet}
                alt={alt}
                width={width}
                height={height}
                loading={lazy ? 'lazy' : 'eager'}
                decoding="async"
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{ objectFit, width: '100%', height: '100%' }}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};
