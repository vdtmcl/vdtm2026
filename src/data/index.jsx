import React from 'react';
import {
    Box, Activity, Layers, Triangle, Hexagon, Circle, Globe, Component,
    Command, Radio, Target, MonitorSmartphone, PenTool, BrainCircuit, Users
} from 'lucide-react';

export const DATA = {
    whatsappNumber: "56994856488",
    contactEmail: "vdtm.cl@gmail.com",
    // CORRECCIÓN CRÍTICA: 'contact' debe coincidir con el ID del Footer
    sections: ["hero", "trusted", "services", "method", "team", "blog", "contact", "footer"],

    menu: [
        { label: "Inicio", id: "hero" },
        { label: "Clientes", id: "trusted" },
        { label: "Servicios", id: "services" },
        { label: "El Método", id: "method" },
        { label: "Equipo", id: "team" },
        { label: "Blog", id: "blog" },
    ],
    trustedLogos: [
        { name: "Logo 1", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959692/VDTM_2_gbf1jc.png" },
        { name: "Logo 14", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959970/VDTM_14_d4xcpx.png" },
        { name: "Logo 3", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959693/VDTM_5_jpqqra.png" },
        { name: "Logo 2", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959693/VDTM_4_iptu37.png" },
        { name: "Logo 7", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959697/VDTM_8_dw5sda.png" },
        { name: "Logo 8", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959696/VDTM_7_ytx4c5.png" },
        { name: "Logo 11", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959699/VDTM_11_saorl2.png" },
        { name: "Logo 12", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767951700/VDTM_12_nqr64c.png" },
        { name: "Logo 13", logoUrl: "https://res.cloudinary.com/vdtm-cl/image/upload/v1767959700/VDTM_13_nnbyxq.png" }
    ],
    services: [
        {
            id: "s1",
            title: "Estrategia Digital",
            icon: <Target className="w-6 h-6" />,
            desc: "Auditoría y planificación basada en datos para conectar con tu audiencia real.",
            detailText: "Nuestra metodología de estrategia comienza con un deep-dive en la data histórica de tu organización. Utilizamos herramientas de Social Listening y análisis de competidores para identificar brechas de oportunidad. Entregamos un roadmap trimestral con KPIs claros, definiendo canales, tono y pilares de contenido que aseguran un ROI medible. No solo publicamos, construimos reputación digital.",
            detailImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=400"
        },
        {
            id: "s2",
            title: "Infraestructura Web",
            icon: <MonitorSmartphone className="w-6 h-6" />,
            desc: "Desarrollo web SSG, integraciones API y automatización de procesos.",
            detailText: "Olvídate de WordPress lentos e inseguros. Construimos sitios web estáticos (SSG) utilizando React y Astro, garantizando puntuaciones de 95+ en Google Lighthouse. Implementamos arquitecturas 'Headless' que permiten gestionar el contenido desde un CMS amigable, mientras el frontend vuela. Además, integramos tus CRMs y ERPs vía API para que la data fluya sin interrupciones.",
            detailImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200&h=400"
        },
        {
            id: "s3",
            title: "Fábrica de Contenidos",
            icon: <PenTool className="w-6 h-6" />,
            desc: "Producción audiovisual y gráfica escalable asistida por IA generativa.",
            detailText: "Combinamos la dirección de arte humana con la velocidad de Midjourney y Firefly. Esto nos permite generar variaciones de campañas A/B testing en minutos, no días. Producimos video vertical para redes, fotografía corporativa y redacción técnica, todo alineado al manual de marca de tu organización. Escalabilidad sin perder la esencia humana.",
            detailImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200&h=400"
        }
    ],
    method: [
        {
            title: "Motor de Inteligencia Artificial",
            content: "Utilizamos un stack propio de modelos de lenguaje (LLMs) ajustados para el contexto chileno. Esto nos permite automatizar el 60% de las tareas operativas (redacción base, análisis de datos, etiquetado), liberando tiempo valioso.",
            icon: <BrainCircuit className="w-5 h-5" />
        },
        {
            title: "Criterio Experto Humano",
            content: "La IA propone, el experto dispone. Nuestro equipo senior revisa, ajusta y dota de emoción a cada pieza. La empatía, el humor local y la sensibilidad cultural son capas que solo un humano puede aportar.",
            icon: <Users className="w-5 h-5" />
        },
        {
            title: "Identidad Local (V Región)",
            content: "Conocemos el ecosistema de Valparaíso y Viña del Mar. Entendemos la idiosincrasia local, los desafíos estacionales del turismo y las dinámicas empresariales de la zona portuaria.",
            icon: <Globe className="w-5 h-5" />
        }
    ],
    team: [
        {
            type: "human",
            name: "Carlos Méndez",
            role: "Director General",
            bio: "15 años liderando proyectos digitales en banca y retail. Especialista en transformación cultural y metodologías ágiles.",
            color: "bg-slate-200"
        },
        {
            type: "human",
            name: "Ana Valenzuela",
            role: "Lead Developer",
            bio: "Ingeniera Civil Informática. Full Stack Developer con foco en rendimiento web y accesibilidad (WCAG 2.1).",
            color: "bg-slate-200"
        },
        {
            type: "human",
            name: "Felipe Correa",
            role: "Director Creativo",
            bio: "Ex-Director de Arte en agencias globales. Ganador de premios de diseño por campañas de branding corporativo.",
            color: "bg-slate-200"
        },
        {
            type: "ai",
            name: "Atlas IA",
            role: "Periodista & Redacción",
            bio: "Modelo de lenguaje avanzado ajustado para redacción periodística. Capaz de generar notas de prensa y artículos SEO en segundos.",
            color: "bg-sky-100 text-sky-700"
        },
        {
            type: "ai",
            name: "Nova IA",
            role: "Trend Hunter",
            bio: "Algoritmo de monitoreo continuo. Analiza millones de puntos de datos en redes sociales para detectar tendencias emergentes antes que nadie.",
            color: "bg-purple-100 text-purple-700"
        },
        {
            type: "ai",
            name: "Iris IA",
            role: "Visual Creator",
            bio: "Motor generativo de imágenes. Crea conceptos visuales y moodboards preliminares para acelerar el proceso de diseño.",
            color: "bg-pink-100 text-pink-700"
        }
    ],
    blog: [
        {
            id: 1,
            title: "IA en el turismo de Valparaíso",
            date: "02 Ene 2026",
            cat: "Tendencias",
            image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&q=80&w=800&h=400",
            content: `
            <p>Valparaíso, con sus cerros coloridos y su laberinto de escaleras, siempre ha sido un imán para el turismo global. Pero, ¿cómo está transformando la Inteligencia Artificial la experiencia de visitar la Joya del Pacífico en 2026? 🌊🤖</p>
            
            <h3>Hiper-personalización de Rutas Patrimoniales</h3>
            <p>Atrás quedaron los días de los mapas de papel genéricos. Hoy, las aplicaciones de turismo impulsadas por IA analizan el perfil del visitante en tiempo real. ¿Eres un amante del street art o prefieres la arquitectura victoriana? 🎨</p>
            <p>Los algoritmos ahora sugieren rutas dinámicas que evitan las aglomeraciones de los cruceros y te llevan a rincones secretos que solo los locales conocen. Esto no solo mejora la experiencia del usuario, sino que ayuda a descongestionar los puntos críticos como el Cerro Alegre y Concepción, distribuyendo los beneficios económicos a otros barrios emergentes.</p>

            <h3>Chatbots que hablan "Chileno"</h3>
            <p>La barrera del idioma es cosa del pasado. Los nuevos asistentes virtuales locales no solo traducen, sino que interpretan modismos y contexto cultural. Imagina preguntar "¿Dónde está la mejor picada?" y recibir una respuesta precisa, entendiendo que buscas comida abundante, rica y a buen precio, no necesariamente un restaurante de lujo. 🍲</p>

            <h3>El Desafío de la Ética Digital</h3>
            <p>Sin embargo, no todo es color de rosa. La implementación de cámaras con IA para seguridad y conteo de flujos turísticos plantea interrogantes sobre la privacidad. En VDTM creemos que la tecnología debe servir a la comunidad sin invadirla. Es vital encontrar un equilibrio donde la innovación respete la esencia bohemia y libre del puerto. ⚓</p>

            <p>El futuro del turismo en la V Región es híbrido: una base tecnológica robusta que potencia, sin reemplazar, la calidez humana de nuestros guías y anfitriones. ¡El viaje recién comienza! 🚀</p>
            `
        },
        {
            id: 2,
            title: "SSG vs SSR: ¿Qué necesita tu empresa?",
            date: "28 Dic 2025",
            cat: "Tecnología",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800&h=400",
            content: `
            <p>En el mundo del desarrollo web moderno, elegir la arquitectura correcta puede ser la diferencia entre un sitio que vuela y uno que se arrastra. Hoy desglosamos la eterna batalla: <strong>Static Site Generation (SSG)</strong> vs <strong>Server-Side Rendering (SSR)</strong>. 💻⚡</p>

            <h3>SSG: Velocidad Pura</h3>
            <p>La Generación de Sitios Estáticos (SSG) es como tener la comida lista antes de que el cliente llegue al restaurante. Las páginas se construyen en el momento de la "compilación" (build time). Cuando un usuario entra a tu web, el servidor solo entrega archivos HTML ya listos. 🚀</p>
            <p><strong>¿Para quién es ideal?</strong></p>
            <ul>
                <li>Sitios corporativos.</li>
                <li>Landing pages de marketing.</li>
                <li>Blogs y portafolios.</li>
            </ul>
            <p>Es la opción más barata de alojar (funciona perfecto en CDNs como Cloudflare o Netlify) y la más segura, ya que no hay base de datos expuesta en tiempo real.</p>

            <h3>SSR: Dinamismo en Tiempo Real</h3>
            <p>Por otro lado, el Renderizado del Lado del Servidor (SSR) cocina el plato cada vez que alguien lo pide. El servidor procesa la solicitud, busca datos actualizados y "dibuja" la página al instante. 🍳</p>
            <p><strong>¿Cuándo usarlo?</strong></p>
            <ul>
                <li>Redes sociales o foros.</li>
                <li>Dashboards con datos en vivo.</li>
                <li>Sitios de noticias de último minuto.</li>
            </ul>

            <h3>El Veredicto VDTM</h3>
            <p>Para el 90% de las empresas en la V Región, <strong>SSG es el ganador indiscutido</strong>. Ofrece una performance inigualable, costos de mantenimiento cercanos a cero y una seguridad blindada. En VDTM utilizamos frameworks híbridos como Astro o Next.js que nos permiten obtener lo mejor de ambos mundos: velocidad estática base, con islas de interactividad dinámica donde sea necesario. 🌐💡</p>
            `
        },
        {
            id: 3,
            title: "Ciberseguridad Corporativa en 2026",
            date: "15 Dic 2025",
            cat: "Seguridad",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400",
            content: `
            <p>El perímetro de seguridad ya no existe. Con el trabajo híbrido consolidado y la nube como estándar, las murallas de fuego (firewalls) tradicionales son insuficientes. Bienvenidos a la era de la arquitectura <strong>Zero Trust</strong>. 🔒🚫</p>

            <h3>"Nunca confíes, siempre verifica"</h3>
            <p>Ese es el mantra de 2026. Ya no importa si la conexión viene desde dentro de la oficina o desde una cafetería en Viña del Mar. Cada intento de acceso a los datos de la empresa debe ser autenticado, autorizado y cifrado. 🕵️‍♂️</p>

            <h3>El factor humano: El eslabón más débil</h3>
            <p>Sorprendentemente, la mayor amenaza no son los hackers rusos con capuchas, sino un correo de phishing bien redactado. La IA generativa ha permitido a los ciberdelincuentes crear correos estafa con una gramática perfecta y un contexto aterradoramente creíble. 🎣</p>
            <p>En VDTM recomendamos:</p>
            <ol>
                <li><strong>Autenticación Multifactor (MFA) obligatoria:</strong> Sin excusas.</li>
                <li><strong>Capacitación continua:</strong> Simular ataques para entrenar al equipo.</li>
                <li><strong>Backups inmutables:</strong> La única defensa real contra el Ransomware.</li>
            </ol>

            <p>La seguridad no es un producto que compras, es un proceso que vives. Proteger los activos digitales de tu empresa es proteger su futuro. 🛡️💼</p>
            `
        },
        { id: 4, title: "Ética de la IA en Salud", date: "10 Dic 2025", cat: "Salud", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 5, title: "Estrategias First-Party Data", date: "05 Dic 2025", cat: "Marketing", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 6, title: "Automatización de Clientes", date: "01 Dic 2025", cat: "Automatización", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 7, title: "Storytelling con Datos", date: "28 Nov 2025", cat: "Contenido", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 8, title: "SEO Local Inmobiliario", date: "20 Nov 2025", cat: "SEO", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 9, title: "Video Marketing B2B", date: "15 Nov 2025", cat: "Video", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 10, title: "Comunicaciones Híbridas", date: "10 Nov 2025", cat: "RRHH", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 11, title: "Sostenibilidad Digital", date: "05 Nov 2025", cat: "Sostenibilidad", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" },
        { id: 12, title: "Email Marketing Segmentado", date: "01 Nov 2025", cat: "Estrategia", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800&h=400", content: "<p>Contenido demo...</p>" }
    ]
};
