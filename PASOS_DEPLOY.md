# 🚀 Pasos para Publicar tu Sitio Web

## 🎯 RECOMENDACIÓN: Vercel (Mejor para Next.js)

Vercel es la plataforma creada por los desarrolladores de Next.js. Es la opción más rápida y optimizada.

---

## ⚡ OPCIÓN 1: Vercel (5 minutos) - RECOMENDADO

### Paso 1: Inicializar Git y subir a GitHub

```bash
# En la terminal, desde la carpeta del proyecto:
git init
git add .
git commit -m "Avyna Salon Locator - Initial commit"

# Crea un nuevo repositorio en GitHub.com:
# 1. Ve a github.com
# 2. Click en "+" → "New repository"
# 3. Nombre: "avyna-salon-locator"
# 4. NO marques "Initialize with README"
# 5. Click "Create repository"

# Luego ejecuta estos comandos (reemplaza TU_USUARIO):
git remote add origin https://github.com/TU_USUARIO/avyna-salon-locator.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en **"Sign Up"** → Conecta con GitHub
3. Click en **"Add New Project"**
4. Selecciona tu repositorio `avyna-salon-locator`
5. Vercel detectará Next.js automáticamente ✅
6. **NO cambies nada**, solo haz click en **"Deploy"**

### Paso 3: ¡Listo! 🎉

- Espera ~2 minutos
- Tu sitio estará en: `https://avyna-salon-locator.vercel.app`
- **Cada vez que hagas `git push`, se actualizará automáticamente**

---

## 🌐 OPCIÓN 2: Render (Alternativa)

### Paso 1: Sube a GitHub (igual que arriba)

### Paso 2: Conecta con Render

1. Ve a [render.com](https://render.com)
2. "Sign Up" → Conecta con GitHub
3. Dashboard → "New" → "Web Service"
4. Selecciona tu repositorio
5. Configuración:
   - **Name**: `avyna-salon-locator`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click "Create Web Service"

### Paso 3: ¡Listo!

- Tu sitio estará en: `https://avyna-salon-locator.onrender.com`

⚠️ **Nota**: El plan gratis de Render "duerme" después de 15 min de inactividad. La primera carga puede tardar ~30 segundos.

---

## 📊 Comparación Rápida

| Característica | Vercel | Render |
|---------------|--------|--------|
| Gratis | ✅ Sí | ✅ Sí |
| Optimizado para Next.js | ✅✅✅ | ✅ |
| Sin "sleep" | ✅ | ❌ (plan gratis) |
| Velocidad | ⚡⚡⚡ | ⚡⚡ |
| Facilidad | ⭐⭐⭐ | ⭐⭐ |

---

## 🎯 Mi Recomendación Final

**Usa Vercel** porque:
- ✅ Creado específicamente para Next.js
- ✅ Más rápido y confiable
- ✅ Sin limitaciones molestas
- ✅ Despliegue en 2 minutos

---

## 🔧 Si Necesitas Variables de Entorno

Si usas Google Sheets en lugar del archivo CSV local:

1. **En Vercel**: Settings → Environment Variables
2. Agrega: `NEXT_PUBLIC_CSV_URL` = tu URL de Google Sheets
3. Vuelve a desplegar

---

## ✅ Checklist Pre-Deploy

- [x] Proyecto compila: `npm run build` ✅
- [x] Archivo CSV en `/public/data/salones.csv` ✅
- [ ] Código subido a GitHub
- [ ] Cuenta en Vercel/Render creada

---

¿Listo? ¡Sigue los pasos de arriba y en 5 minutos tendrás tu sitio en vivo! 🚀
