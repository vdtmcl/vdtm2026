// src/utils/cloudinary.js
// Utilidad para generar URLs optimizadas de Cloudinary

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Genera una URL optimizada de Cloudinary para una imagen
 * @param {string} imagePath - Ruta de la imagen (puede ser URL completa o path relativo)
 * @param {Object} options - Opciones de transformación
 * @param {number} options.width - Ancho deseado
 * @param {number} options.height - Alto deseado
 * @param {string} options.crop - Modo de recorte (fill, fit, scale, etc.)
 * @param {number} options.quality - Calidad de compresión (1-100, auto por defecto)
 * @param {string} options.format - Formato de salida (auto, webp, avif, jpg, png)
 * @param {boolean} options.fetch - Si la imagen es una URL externa, usar fetch
 * @returns {string} URL optimizada de Cloudinary o URL original si Cloudinary no está configurado
 */
export const getCloudinaryUrl = (imagePath, options = {}) => {
    // Si Cloudinary no está configurado, retornar URL original
    if (!CLOUDINARY_CLOUD_NAME) {
        return imagePath;
    }

    const {
        width,
        height,
        crop = 'fill',
        quality = 'auto',
        format = 'auto',
        fetch = false
    } = options;

    // Si la imagen ya es una URL de Cloudinary, retornarla directamente
    if (imagePath.includes('cloudinary.com')) {
        return imagePath;
    }

    // Construir transformaciones
    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);

    const transformString = transformations.join(',');

    // Si es una URL externa, usar fetch
    const imageSource = fetch && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))
        ? `fetch:${imagePath}`
        : imagePath;

    // Construir URL de Cloudinary
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const url = transformString
        ? `${baseUrl}/${transformString}/${imageSource}`
        : `${baseUrl}/${imageSource}`;

    return url;
};

/**
 * Genera un srcset para imágenes responsivas
 * @param {string} imagePath - Ruta de la imagen
 * @param {Array<number>} widths - Array de anchos para diferentes breakpoints
 * @returns {string} String srcset para usar en el atributo srcset
 */
export const getCloudinarySrcSet = (imagePath, widths = [400, 800, 1200, 1600]) => {
    if (!CLOUDINARY_CLOUD_NAME) {
        return '';
    }

    return widths
        .map(width => `${getCloudinaryUrl(imagePath, { width, crop: 'fill', format: 'auto', quality: 'auto' })} ${width}w`)
        .join(', ');
};

/**
 * Componente helper para obtener la URL base de Cloudinary
 */
export const isCloudinaryConfigured = () => {
    return !!CLOUDINARY_CLOUD_NAME;
};
