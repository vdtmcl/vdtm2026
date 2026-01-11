# VDTM Web - Protocolo VDTM 2026

Sitio web corporativo desarrollado siguiendo el Protocolo Maestro de Despliegue Web VDTM 2026 (v5.6).

## 🚀 Stack Tecnológico

- **React 18** - Biblioteca UI
- **Vite 7** - Build tool y dev server
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **React Router** - Enrutamiento
- **Cloudflare Pages** - Hosting y CDN
- **Resend** - Emails transaccionales
- **Cloudflare Turnstile** - Protección anti-spam
- **Decap CMS** - CMS headless

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🏗️ Estructura del Proyecto

```
vdtm-web/
├── functions/
│   └── api/
│       └── submit.js          # Cloudflare Pages Function (backend)
├── public/
│   ├── admin/                  # Decap CMS
│   ├── images/                 # Assets estáticos
│   ├── _redirects              # Cloudflare Pages SPA redirects
│   └── robots.txt              # SEO
├── src/
│   ├── components/
│   │   ├── sections/           # Secciones principales
│   │   ├── ui/                 # Componentes UI reutilizables
│   │   └── modules/            # Módulos específicos
│   ├── data/                   # Datos estáticos
│   ├── utils/                  # Utilidades
│   ├── App.jsx                 # Componente principal
│   └── main.jsx                # Entry point
└── vite.config.js              # Configuración Vite
```

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Turnstile (Protección Spam)
VITE_TURNSTILE_SITE_KEY=tu_site_key
TURNSTILE_SECRET_KEY=tu_secret_key

# Resend (Emails Transaccionales)
RESEND_API_KEY=tu_api_key

# Cloudinary (Opcional - Optimización de Imágenes)
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**Nota:** Las variables que empiezan con `VITE_` son públicas y se incluyen en el bundle del cliente.

## 🌐 Despliegue

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones detalladas de despliegue en Cloudflare Pages.

### Resumen Rápido:

1. Conecta tu repositorio a Cloudflare Pages
2. Configura las variables de entorno
3. Cloudflare Pages desplegará automáticamente en cada push

## 📋 Fases Completadas

- ✅ **FASE 0:** Definición y Generación de Brief Técnico
- ✅ **FASE 1:** Ingesta y Refactorización Modular
- ✅ **FASE 2:** Instalación del Entorno Blindado
- ✅ **FASE 3:** Automatización del Core
- ✅ **FASE 4:** Motor de Contenidos (Decap CMS)
- ✅ **FASE 5:** Formularios Blindados
- ✅ **FASE 6:** Backend Serverless
- ✅ **FASE 7:** Optimización de Medios
- ✅ **FASE 8:** Optimización SEO Obligatoria
- ✅ **FASE 9:** Despliegue Comercial

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecuta ESLint

## 📝 Características Principales

- **SPA (Single Page Application)** con scroll suave entre secciones
- **Formulario de contacto** con validación Zod y protección Turnstile
- **Backend serverless** con Cloudflare Pages Functions
- **SEO optimizado** con metaetiquetas dinámicas y datos estructurados
- **Optimización de imágenes** con Cloudinary (opcional)
- **CMS headless** con Decap CMS
- **Responsive design** mobile-first

## 🔗 Enlaces Útiles

- [Documentación Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Documentación Vite](https://vite.dev/)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación React](https://react.dev/)

## 📄 Licencia

Proyecto privado - VDTM 2026
