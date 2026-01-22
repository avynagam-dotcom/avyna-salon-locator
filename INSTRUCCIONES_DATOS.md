# 📍 Instrucciones para Agregar Coordenadas de Salones

Tienes **DOS OPCIONES** para proporcionar los datos de los salones:

---

## 🗂️ OPCIÓN 1: Archivo CSV Local (Recomendado para desarrollo)

### Ubicación del archivo:
```
/public/data/salones.csv
```

### Formato del archivo:
El archivo debe tener al menos estas columnas:
- **Latitud** (o "Lat", "latitude")
- **Longitud** (o "Lng", "Lon", "longitude")
- **Dirección** (opcional, pero recomendado)

### Ejemplo de contenido:
```csv
Latitud,Longitud,Dirección
19.4844,-99.1106,Calle Ejemplo 123, Col. Ejemplo, Gustavo A. Madero, CDMX
19.4850,-99.1110,Av. Principal 456, Col. Centro, Gustavo A. Madero, CDMX
19.4860,-99.1120,Boulevard Norte 789, Col. Industrial, Gustavo A. Madero, CDMX
```

### Ventajas:
- ✅ Fácil de editar localmente
- ✅ No requiere configuración adicional
- ✅ Funciona inmediatamente

### Pasos:
1. Edita el archivo `/public/data/salones.csv`
2. Agrega tus coordenadas en el formato indicado
3. Guarda el archivo
4. Recarga la página

---

## 🌐 OPCIÓN 2: Google Sheets (Recomendado para producción)

### Configuración:

1. **Crea o abre tu Google Sheet** con las coordenadas:
   - Columna 1: Latitud
   - Columna 2: Longitud
   - Columna 3: Dirección (opcional)

2. **Publica el Sheet como CSV**:
   - Ve a "Archivo" > "Compartir" > "Publicar en la web"
   - Selecciona la pestaña que contiene tus datos
   - En "Formato", selecciona "Valores separados por comas (.csv)"
   - Haz clic en "Publicar"
   - Copia la URL generada

3. **Configura la URL**:
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Agrega la línea:
     ```
     NEXT_PUBLIC_CSV_URL=https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv&gid=0
     ```
   - Reemplaza `TU_SHEET_ID` con el ID de tu Google Sheet

### Ventajas:
- ✅ Actualizaciones en tiempo real
- ✅ No necesitas redeployar para cambiar datos
- ✅ Puedes compartir el Sheet con tu equipo

---

## 📋 Formato de Columnas Soportadas

El sistema busca automáticamente las columnas usando estos nombres (no importa mayúsculas/minúsculas):

### Latitud:
- `Latitud`
- `Lat`
- `Latitude`

### Longitud:
- `Longitud`
- `Lng`
- `Lon`
- `Longitude`

### Dirección:
- `Dirección`
- `Direccion`
- `Address`

### ⚠️ IMPORTANTE:
- La columna **"Nombre"** será **IGNORADA** según los requisitos
- Solo se utilizan las **coordenadas** para ubicar los pines en el mapa
- La dirección es opcional pero recomendada para mostrar en el modal

---

## 🔍 Verificar que Funciona

1. Ejecuta el proyecto: `npm run dev`
2. Abre http://localhost:3000
3. Deberías ver los pines en el mapa
4. Si hay errores, revisa la consola del navegador

---

## 💡 Recomendación

- **Para desarrollo/pruebas**: Usa el archivo CSV local (`/public/data/salones.csv`)
- **Para producción**: Usa Google Sheets para facilitar las actualizaciones
