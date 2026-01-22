# 🚀 Desplegar en Render - Guía Rápida

## Pasos para Render:

### 1. Sube tu código a GitHub
```bash
git init
git add .
git commit -m "Avyna Salon Locator - Ready for Render"
git remote add origin https://github.com/TU_USUARIO/avyna-salon-locator.git
git branch -M main
git push -u origin main
```

### 2. Crea cuenta en Render
- Ve a [render.com](https://render.com)
- Regístrate con GitHub (gratis)

### 3. Crea un nuevo Web Service
1. Dashboard → "New" → "Web Service"
2. Conecta tu repositorio de GitHub
3. Configuración:
   - **Name**: `avyna-salon-locator`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (gratis)

### 4. Variables de Entorno (opcional)
Si usas Google Sheets, agrega:
- Key: `NEXT_PUBLIC_CSV_URL`
- Value: tu URL de Google Sheets

### 5. ¡Despliega!
- Haz clic en "Create Web Service"
- Render construirá y desplegará automáticamente
- Tu URL será: `https://avyna-salon-locator.onrender.com`

## ⚠️ Nota sobre el Plan Gratis de Render:
- El servicio se "duerme" después de 15 minutos de inactividad
- La primera carga puede tardar ~30 segundos (wake-up time)
- Para producción seria, considera el plan Starter ($7/mes)

---

## 🆚 Comparación: Render vs Vercel

### Render:
- ✅ Gratis (con limitaciones)
- ✅ Fácil de usar
- ⚠️ Se "duerme" después de 15 min (plan gratis)
- ⚠️ Primera carga lenta

### Vercel (Recomendado):
- ✅ Gratis sin limitaciones
- ✅ Optimizado para Next.js
- ✅ Despliegue más rápido
- ✅ Sin "sleep" en plan gratis
- ✅ CDN global incluido

---

**Mi recomendación: Vercel para este proyecto** 🎯
