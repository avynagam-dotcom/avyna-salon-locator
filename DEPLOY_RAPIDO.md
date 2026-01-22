# ⚡ Despliegue Rápido - 3 Pasos

## 🎯 Opción Más Rápida: Vercel (5 minutos)

### Paso 1: Sube tu código a GitHub
```bash
# Si no tienes git inicializado:
git init
git add .
git commit -m "Avyna Salon Locator - Ready to deploy"

# Crea un repositorio en GitHub.com y luego:
git remote add origin https://github.com/TU_USUARIO/avyna-salon-locator.git
git branch -M main
git push -u origin main
```

### Paso 2: Conecta con Vercel
1. Ve a [vercel.com](https://vercel.com) y regístrate (gratis)
2. Haz clic en "Add New Project"
3. Conecta tu repositorio de GitHub
4. Vercel detectará Next.js automáticamente
5. Haz clic en "Deploy"

### Paso 3: ¡Listo! 🎉
- Tu sitio estará en: `https://tu-proyecto.vercel.app`
- Cada vez que hagas `git push`, se actualizará automáticamente

---

## 📋 Checklist Antes de Desplegar

- [x] ✅ Proyecto compila: `npm run build` (ya verificado)
- [ ] Archivo CSV en `/public/data/salones.csv` (verificar)
- [ ] Código subido a GitHub
- [ ] Cuenta en Vercel creada

---

## 🔗 URLs Útiles

- **Vercel**: https://vercel.com
- **GitHub**: https://github.com
- **Netlify** (alternativa): https://netlify.com

---

## 💡 Tips

- Vercel es **gratis** para proyectos personales
- Incluye **HTTPS automático**
- **Despliegue automático** con cada push
- Puedes agregar un **dominio personalizado** después

---

¿Listo para desplegar? ¡Solo sigue los 3 pasos de arriba! 🚀
