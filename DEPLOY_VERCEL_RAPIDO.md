# ⚡ Desplegar en Vercel - 5 Minutos

## 🎯 Vercel es la MEJOR opción para Next.js

### Paso 1: Sube a GitHub (2 min)
```bash
# Si no tienes git inicializado:
git init
git add .
git commit -m "Avyna Salon Locator"

# Crea un repo en GitHub.com (nuevo repositorio)
# Luego ejecuta:
git remote add origin https://github.com/TU_USUARIO/avyna-salon-locator.git
git branch -M main
git push -u origin main
```

### Paso 2: Conecta con Vercel (2 min)
1. Ve a [vercel.com](https://vercel.com)
2. "Sign Up" → Conecta con GitHub
3. "Add New Project"
4. Selecciona tu repositorio `avyna-salon-locator`
5. Vercel detecta Next.js automáticamente ✅
6. Haz clic en **"Deploy"**

### Paso 3: ¡Listo! (1 min)
- Espera ~2 minutos mientras construye
- Tu sitio estará en: `https://avyna-salon-locator.vercel.app`
- **Cada `git push` actualiza automáticamente** 🚀

---

## 🔧 Configuración Adicional (Opcional)

### Variables de Entorno (si usas Google Sheets):
1. En Vercel: Settings → Environment Variables
2. Agrega: `NEXT_PUBLIC_CSV_URL` = tu URL

### Dominio Personalizado:
1. Settings → Domains
2. Agrega tu dominio (ej: `avyna.com`)
3. Sigue las instrucciones de DNS

---

## ✅ Ventajas de Vercel:
- ✅ **100% Gratis** para proyectos personales
- ✅ **Sin "sleep"** - siempre activo
- ✅ **HTTPS automático**
- ✅ **CDN global** - carga rápida mundial
- ✅ **Despliegue automático** con cada push
- ✅ **Optimizado para Next.js** (creado por los mismos de Next.js)

---

## 🚀 Siguiente Push = Actualización Automática

Cada vez que hagas cambios:
```bash
git add .
git commit -m "Actualización"
git push
```
¡Vercel desplegará automáticamente! 🎉
