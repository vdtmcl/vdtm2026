# 🚀 Guía de Despliegue - Cloudflare Pages

## FASE 9: Despliegue Comercial VDTM 2026

Esta guía te llevará paso a paso para desplegar el proyecto en Cloudflare Pages.

---

## 📋 Requisitos Previos

1. **Cuenta de Cloudflare** (gratuita)
2. **Repositorio Git** (GitHub, GitLab o Bitbucket)
3. **Variables de Entorno** preparadas (ver sección Variables de Entorno)

---

## 🔧 Paso 1: Preparar el Repositorio

### 1.1. Verificar que el proyecto esté listo

```bash
# Verificar que el build funciona localmente
npm run build

# Verificar que el preview funciona
npm run preview
```

### 1.2. Commit y Push al repositorio

```bash
git add .
git commit -m "Preparación para despliegue en Cloudflare Pages"
git push origin main
```

---

## ☁️ Paso 2: Conectar con Cloudflare Pages

### 2.1. Acceder a Cloudflare Pages

1. Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navega a **Pages** en el menú lateral
3. Haz clic en **Create a project**
4. Selecciona **Connect to Git**

### 2.2. Conectar el repositorio

1. Autoriza Cloudflare para acceder a tu repositorio (GitHub/GitLab/Bitbucket)
2. Selecciona el repositorio `vdtm-web`
3. Haz clic en **Begin setup**

### 2.3. Configurar el Build

**Configuración del Build:**
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (raíz del proyecto)

### 2.4. Variables de Entorno

Haz clic en **Environment variables** y agrega las siguientes variables:

#### Variables Requeridas para Producción:

```
VITE_TURNSTILE_SITE_KEY=tu_site_key_de_turnstile
TURNSTILE_SECRET_KEY=tu_secret_key_de_turnstile
RESEND_API_KEY=tu_api_key_de_resend
```

#### Variables Requeridas para Decap CMS (OAuth GitHub):

```
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
```

#### Variables Opcionales (Cloudinary):

```
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**⚠️ IMPORTANTE:** 
- `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `GITHUB_CLIENT_SECRET` son **secretas** y solo se usan en el servidor (functions)
- Las variables que empiezan con `VITE_` son públicas y se incluyen en el bundle del cliente

### 2.5. Configurar OAuth de GitHub para Decap CMS

Para que Decap CMS funcione con autenticación OAuth, necesitas:

1. **Crear una OAuth App en GitHub:**
   - Ve a [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
   - Haz clic en **New OAuth App**
   - **Application name:** `VDTM CMS`
   - **Homepage URL:** `https://www.vdtm.cl`
   - **Authorization callback URL:** `https://vdtm-web.pages.dev/oauth/callback`
   - Haz clic en **Register application**
   - Copia el **Client ID** y genera un **Client Secret**

2. **Agregar las variables de entorno en Cloudflare Pages:**
   - `GITHUB_CLIENT_ID`: El Client ID de tu OAuth App
   - `GITHUB_CLIENT_SECRET`: El Client Secret de tu OAuth App

3. **Verificar la configuración:**
   - El archivo `public/admin/config.yml` ya está configurado con:
     - `backend.name: github`
     - `backend.repo: vdtmcl/vdtm-web`
     - `backend.base_url: https://vdtm-web.pages.dev`
   - Los endpoints OAuth están en `functions/oauth/authorize.js` y `functions/oauth/callback.js`

### 2.6. Finalizar configuración

1. Haz clic en **Save and Deploy**
2. Espera a que el build se complete (2-5 minutos)

---

## 🌐 Paso 3: Configurar Dominio Personalizado

### 3.1. Agregar dominio

1. En la página del proyecto, ve a **Custom domains**
2. Haz clic en **Set up a custom domain**
3. Ingresa tu dominio: `www.vdtm.cl`
4. Cloudflare configurará automáticamente los registros DNS

### 3.2. Verificar SSL

- Cloudflare activa SSL automáticamente
- Espera 1-2 minutos para que el certificado se genere
- Verifica que el sitio cargue con `https://`

---

## ✅ Paso 4: Validación Final

### Checklist de Validación:

- [ ] El sitio carga correctamente en `https://www.vdtm.cl`
- [ ] SSL está activo (candado verde en el navegador)
- [ ] El formulario de contacto funciona (requiere variables de entorno)
- [ ] Las imágenes se cargan correctamente
- [ ] El sitemap es accesible: `https://www.vdtm.cl/sitemap.xml`
- [ ] robots.txt es accesible: `https://www.vdtm.cl/robots.txt`
- [ ] Las metaetiquetas SEO están presentes (inspeccionar con DevTools)
- [ ] Decap CMS funciona: `https://www.vdtm.cl/admin/index.html` (requiere OAuth configurado)

### Verificar Funcionalidades:

1. **Formulario de Contacto:**
   - Abre el formulario
   - Completa los campos
   - Verifica que Turnstile se carga
   - Envía un mensaje de prueba

2. **SEO:**
   - Inspecciona el `<head>` del HTML
   - Verifica metaetiquetas Open Graph
   - Verifica datos estructurados JSON-LD

3. **Decap CMS:**
   - Accede a `https://www.vdtm.cl/admin/index.html`
   - Verifica que la autenticación OAuth funcione
   - Prueba crear/editar un post del blog

4. **Performance:**
   - Ejecuta Lighthouse en Chrome DevTools
   - Verifica puntuación SEO (debe ser > 90)

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` a la rama `main`, Cloudflare Pages:
1. Detectará el cambio automáticamente
2. Ejecutará el build
3. Desplegará la nueva versión
4. Mantendrá las versiones anteriores disponibles

### Despliegue Manual (si es necesario):

1. Ve a **Deployments** en Cloudflare Pages
2. Haz clic en los tres puntos de un deployment anterior
3. Selecciona **Retry deployment**

---

## 🐛 Solución de Problemas

### Build Falla

1. Verifica los logs en Cloudflare Pages
2. Ejecuta `npm run build` localmente para reproducir el error
3. Verifica que todas las dependencias estén en `package.json`

### Variables de Entorno No Funcionan

1. Verifica que las variables estén configuradas en **Environment variables**
2. Asegúrate de que las variables secretas NO empiecen con `VITE_`
3. Reinicia el deployment después de agregar variables

### El Sitio No Carga

1. Verifica que el dominio esté configurado correctamente
2. Espera 5-10 minutos para propagación DNS
3. Verifica los registros DNS en Cloudflare

### Functions No Funcionan

1. Verifica que `functions/api/submit.js` esté en el repositorio
2. Verifica que las variables `TURNSTILE_SECRET_KEY` y `RESEND_API_KEY` estén configuradas
3. Revisa los logs de Functions en Cloudflare Dashboard

### Decap CMS No Autentica

1. Verifica que `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET` estén configuradas en Cloudflare Pages
2. Verifica que la URL de callback en GitHub OAuth App sea: `https://vdtm-web.pages.dev/oauth/callback`
3. Verifica que los archivos `functions/oauth/authorize.js` y `functions/oauth/callback.js` estén en el repositorio
4. Revisa la consola del navegador para ver errores de autenticación
5. Verifica que el repositorio `vdtmcl/vdtm-web` exista y sea accesible

---

## 📚 Recursos Adicionales

- [Documentación Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Configuración de Variables de Entorno](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)

---

## ✨ ¡Despliegue Completado!

Una vez completados estos pasos, tu sitio estará en producción con:
- ✅ SSL activo
- ✅ CDN global de Cloudflare
- ✅ Functions serverless
- ✅ Despliegue automático desde Git

**Estado:** 🟢 **FASE 9 COMPLETADA**
