# 🚀 Guía de Deployment - Avyna Localizador de Salones

Esta guía te ayudará a publicar tu landing page en internet. Tienes varias opciones, desde la más sencilla hasta opciones más avanzadas.

---

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de:

1. ✅ El proyecto funciona correctamente en local (`npm run dev`)
2. ✅ El archivo CSV está en `/public/data/salones.csv`
3. ✅ Has probado todas las funcionalidades

---

## 🌟 OPCIÓN 1: Vercel (RECOMENDADO - Más Fácil)

Vercel es la plataforma creada por los mismos desarrolladores de Next.js. Es la opción más sencilla y rápida.

### Pasos:

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub, GitLab o email

2. **Subir tu código a GitHub** (si no lo has hecho):
   ```bash
   # Inicializar git (si no lo has hecho)
   git init
   git add .
   git commit -m "Initial commit - Avyna Salon Locator"
   
   # Crear repositorio en GitHub y luego:
   git remote add origin https://github.com/TU_USUARIO/avyna-salon-locator.git
   git branch -M main
   git push -u origin main
   ```

3. **Conectar con Vercel**:
   - En Vercel, haz clic en "Add New Project"
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js
   - Haz clic en "Deploy"

4. **Configurar variables de entorno** (si usas Google Sheets):
   - En la configuración del proyecto en Vercel
   - Ve a "Settings" > "Environment Variables"
   - Agrega: `NEXT_PUBLIC_CSV_URL` con tu URL de Google Sheets

5. **¡Listo!** 
   - Vercel te dará una URL como: `https://tu-proyecto.vercel.app`
   - Cada vez que hagas `git push`, se desplegará automáticamente

### Ventajas:
- ✅ Gratis para proyectos personales
- ✅ Despliegue automático con cada push
- ✅ HTTPS incluido
- ✅ CDN global
- ✅ Optimizado para Next.js

---

## 🌐 OPCIÓN 2: Netlify

Netlify es otra excelente opción, muy similar a Vercel.

### Pasos:

1. **Crear cuenta en Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate con GitHub

2. **Conectar repositorio**:
   - "Add new site" > "Import an existing project"
   - Conecta tu repositorio de GitHub
   - Configuración automática:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **Variables de entorno** (si usas Google Sheets):
   - Site settings > Environment variables
   - Agrega: `NEXT_PUBLIC_CSV_URL`

4. **¡Listo!**
   - URL: `https://tu-proyecto.netlify.app`

---

## 🖥️ OPCIÓN 3: Servidor Propio (VPS)

Si prefieres tener control total sobre el servidor.

### Pasos:

1. **Contratar un VPS** (DigitalOcean, Linode, AWS EC2, etc.)

2. **Configurar el servidor**:
   ```bash
   # Instalar Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Instalar PM2 (gestor de procesos)
   sudo npm install -g pm2
   
   # Clonar tu repositorio
   git clone https://github.com/TU_USUARIO/avyna-salon-locator.git
   cd avyna-salon-locator
   
   # Instalar dependencias
   npm install
   
   # Construir el proyecto
   npm run build
   
   # Iniciar con PM2
   pm2 start npm --name "avyna" -- start
   pm2 save
   pm2 startup
   ```

3. **Configurar Nginx** (opcional, para dominio personalizado):
   ```nginx
   server {
       listen 80;
       server_name tudominio.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Configurar SSL con Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d tudominio.com
   ```

---

## 📝 Checklist Pre-Deployment

Antes de desplegar, verifica:

- [ ] El proyecto compila sin errores: `npm run build`
- [ ] El archivo CSV está en `/public/data/salones.csv`
- [ ] Has probado todas las funcionalidades localmente
- [ ] El logo se ve correctamente
- [ ] Los pines verdes se muestran en el mapa
- [ ] Los botones de navegación funcionan
- [ ] El diseño es responsive (móvil y desktop)

---

## 🔧 Comandos Útiles

```bash
# Probar build de producción localmente
npm run build
npm start

# Verificar que no hay errores
npm run lint

# Ver tamaño del build
npm run build
# Revisa la salida para ver el tamaño de los archivos
```

---

## 🌍 Dominio Personalizado

Si quieres usar tu propio dominio (ej: `avyna.com`):

### En Vercel:
1. Ve a Project Settings > Domains
2. Agrega tu dominio
3. Sigue las instrucciones para configurar DNS

### En Netlify:
1. Site settings > Domain management
2. Agrega tu dominio
3. Configura los registros DNS según las instrucciones

---

## 📊 Recomendación Final

**Para este proyecto, recomiendo Vercel porque:**
- ✅ Es gratis
- ✅ Configuración automática de Next.js
- ✅ Despliegue en menos de 2 minutos
- ✅ SSL/HTTPS incluido
- ✅ Actualizaciones automáticas con cada push

---

## 🆘 Troubleshooting

### Error: "Module not found"
- Asegúrate de que todas las dependencias estén en `package.json`
- Ejecuta `npm install` antes de hacer build

### El mapa no se muestra
- Verifica que el archivo CSV esté en `/public/data/salones.csv`
- Revisa la consola del navegador para errores

### Build falla
- Ejecuta `npm run build` localmente para ver el error
- Verifica que no haya errores de TypeScript: `npm run lint`

---

¿Necesitas ayuda con algún paso específico? ¡Avísame!
