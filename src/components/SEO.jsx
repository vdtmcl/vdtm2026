import { Helmet } from 'react-helmet-async';

export const SEO = ({
    title = 'VDTM - Estrategia Digital y Desarrollo Web',
    description = 'Agencia de estrategia digital, desarrollo web y producción de contenidos asistida por IA. Especialistas en transformación digital para empresas de Valparaíso y Viña del Mar.',
    url = 'https://www.vdtm.cl',
    image = 'https://www.vdtm.cl/og-image.jpg',
    type = 'website',
    keywords,
    author = 'VDTM',
    locale = 'es_CL'
}) => {
    const fullTitle = title.includes('VDTM') ? title : `${title} | VDTM`;
    const fullUrl = url.startsWith('http') ? url : `https://www.vdtm.cl${url}`;
    const fullImage = image.startsWith('http') ? image : `https://www.vdtm.cl${image}`;

    return (
        <Helmet>
            {/* Metaetiquetas básicas */}
            <title key="title">{fullTitle}</title>
            <meta key="description" name="description" content={description} />
            {keywords && <meta key="keywords" name="keywords" content={keywords} />}
            <meta key="author" name="author" content={author} />
            <meta key="robots" name="robots" content="index, follow" />
            <meta key="language" name="language" content="Spanish" />
            <meta key="revisit-after" name="revisit-after" content="7 days" />

            {/* Open Graph / Facebook */}
            <meta key="og:type" property="og:type" name="og:type" content={type} />
            <meta key="og:title" property="og:title" name="og:title" content={fullTitle} />
            <meta key="og:description" property="og:description" name="og:description" content={description} />
            <meta key="og:image" property="og:image" name="og:image" content={fullImage} />
            <meta key="og:url" property="og:url" name="og:url" content={fullUrl} />
            <meta key="og:site_name" property="og:site_name" name="og:site_name" content="VDTM" />
            <meta key="og:locale" property="og:locale" name="og:locale" content={locale} />

            {/* Twitter Card */}
            <meta key="tw:card" name="twitter:card" content="summary_large_image" />
            <meta key="tw:title" name="twitter:title" content={fullTitle} />
            <meta key="tw:description" name="twitter:description" content={description} />
            <meta key="tw:image" name="twitter:image" content={fullImage} />

            {/* Canonical URL */}
            <link key="canonical" rel="canonical" href={fullUrl} />
        </Helmet>
    );
};
