// setup-vdtm.js - Automatización Protocolo v5.4 (Router & Sitemap Fix)
import fs from 'node:fs';
import path from 'node:path';

const log = (msg) => console.log(`✅ [VDTM]  ${msg}`);

// 1. CONFIGURACIÓN TAILWIND V3 (Standard Stable)
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
`;

const postcssContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`;

fs.writeFileSync(path.join('src', 'index.css'), cssContent);
fs.writeFileSync('postcss.config.js', postcssContent);
fs.writeFileSync('tailwind.config.js', tailwindConfig);
log('Configuración Tailwind v3 (Stable) inyectada.');

// 1.5. CONFIGURACIÓN VITE (Sitemap + React + Paths)
const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.vdtm.cl',
      dynamicRoutes: ['/']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`

fs.writeFileSync('vite.config.js', viteConfigContent);
log('vite.config.js configurado con Sitemap y Alias (@).');

// 2. LIMPIEZA DE ENTRY POINT (main.jsx) - CON ROUTER
const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)`;
fs.writeFileSync(path.join('src', 'main.jsx'), mainContent);
log('src/main.jsx estandarizado con HelmetProvider y BrowserRouter.');

// 3. ESTRUCTURA CMS & COMPONENTES (Aseguramiento)
const dirs = ['src/content/blog', 'public/admin', 'public/images/uploads', 'src/components', 'functions/api'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`Directorio creado: ${dir}`);
    }
});

// 4. ARCHIVO DUMMY CMS
if (!fs.existsSync('src/content/blog/hello.md')) {
    fs.writeFileSync('src/content/blog/hello.md', '---\ntitle: "Hola VDTM"\ndate: 2026-01-01\nthumbnail: "/images/uploads/placeholder.jpg"\n---\nBienvenido.');
    log('Post dummy creado.');
}

// 5. INYECCIÓN DE SEO TÉCNICO
const robotsContent = `User-agent: *
Allow: /
Sitemap: https://www.vdtm.cl/sitemap.xml`;

const seoComponentContent = `import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, url, image }) => (
  <Helmet>
    <title>{title} | VDTM</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);`;

fs.writeFileSync('public/robots.txt', robotsContent);
fs.writeFileSync(path.join('src', 'components', 'SEO.jsx'), seoComponentContent);
log('Capa SEO (robots.txt + SEO.jsx) inyectada.');

// 6. GESTIÓN DE ENTORNO (.env.example)
const envContent = `# Configuración del Proyecto VDTM
# Copiar este archivo a .env y .env.production antes de desplegar

# Turnstile (Protección Spam)
VITE_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Resend (Emails Transaccionales)
RESEND_API_KEY=

# Cloudinary (Gestión de Medios - Opcional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
`;

fs.writeFileSync('.env.example', envContent);
log('Plantilla de variables de entorno (.env.example) generada.');

console.log("\n🚀 AUTOMATIZACIÓN v5.4 COMPLETADA. Ejecuta: npm run dev");
