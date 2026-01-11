// fix_vdtm.js - Hotfix para Extensiones JSX y Configuración CJS
import fs from 'node:fs';
import path from 'node:path';

const log = (msg) => console.log(`🔧 [FIX] ${msg}`);

// 1. REPARAR EXTENSIÓN JSX EN DATA
// Vite no permite JSX dentro de archivos .js
const oldDataPath = path.join('src', 'data', 'index.js');
const newDataPath = path.join('src', 'data', 'index.jsx');

if (fs.existsSync(oldDataPath)) {
    fs.renameSync(oldDataPath, newDataPath);
    log('Renombrado: src/data/index.js -> index.jsx');
} else {
    log('Info: src/data/index.js no encontrado (¿ya fue renombrado?)');
}

// 2. BLINDAR CONFIGURACIÓN POSTCSS/TAILWIND (Convertir a .cjs)
// Esto soluciona el error "It looks like you're trying to use tailwindcss directly..."
const postcssContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

const tailwindContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`;

// Escribir nuevos archivos .cjs
fs.writeFileSync('postcss.config.cjs', postcssContent);
fs.writeFileSync('tailwind.config.cjs', tailwindContent);

// Eliminar archivos .js conflictivos si existen
if (fs.existsSync('postcss.config.js')) fs.unlinkSync('postcss.config.js');
if (fs.existsSync('tailwind.config.js')) fs.unlinkSync('tailwind.config.js');

log('Configuración de Tailwind/PostCSS migrada a CommonJS (.cjs) para estabilidad.');
console.log("\n✅ REPARACIÓN COMPLETADA. Intenta ejecutar 'npm run dev' nuevamente.");
