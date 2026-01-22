# Avyna - Localizador de Salones

Landing page premium para localizar salones autorizados Avyna en la Alcaldía Gustavo A. Madero (CDMX).

## 🚀 Características

- **Mapa Interactivo**: Visualización elegante de salones usando React-Leaflet
- **Diseño Premium**: Estética minimalista con colores dorados, plata, blanco y negro
- **Mobile-First**: Diseño completamente responsive
- **Integración CSV**: Consumo de datos desde Google Sheets en formato CSV
- **Navegación**: Botones directos para Google Maps y Waze
- **Animaciones**: Transiciones suaves con Framer Motion

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura la URL del Google Sheets:
   - Abre `.env.local` (crea el archivo si no existe)
   - Agrega la variable:
   ```
   NEXT_PUBLIC_CSV_URL=https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv&gid=0
   ```

   **Nota**: Para obtener la URL de exportación CSV de Google Sheets:
   - Abre tu Google Sheet
   - Ve a "Archivo" > "Compartir" > "Publicar en la web"
   - Selecciona "Valores separados por comas (.csv)"
   - Copia la URL generada

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Formato de Datos CSV

El CSV debe contener al menos las siguientes columnas:
- **Latitud** (o "Lat", "latitude")
- **Longitud** (o "Lng", "Lon", "longitude")
- **Dirección** (opcional, pero recomendado)

**IMPORTANTE**: La columna "Nombre" será ignorada según los requisitos. Solo se utilizan las coordenadas para ubicar los pines en el mapa.

Ejemplo de CSV:
```csv
Latitud,Longitud,Dirección
19.4844,-99.1106,Calle Ejemplo 123, Col. Ejemplo
19.4850,-99.1110,Av. Principal 456, Col. Centro
```

## 🎨 Personalización

### Colores
Los colores están definidos en `tailwind.config.ts`:
- `avyna-gold`: #D4AF37
- `avyna-silver`: #C0C0C0
- `avyna-black`: #0A0A0A
- `avyna-white`: #FAFAFA

### Componentes Principales
- `components/Header.tsx`: Header con branding Avyna
- `components/Map.tsx`: Componente del mapa interactivo
- `components/SalonModal.tsx`: Modal con información del salón
- `hooks/useSalonesData.ts`: Hook para cargar datos CSV

## 📱 Responsive Design

El diseño está optimizado para:
- **Mobile**: Vista vertical con modal en la parte inferior
- **Tablet**: Layout adaptativo
- **Desktop**: Modal centrado con mejor aprovechamiento del espacio

## 🚢 Producción

Para crear una build de producción:

```bash
npm run build
npm start
```

## 📝 Notas Técnicas

- El mapa usa OpenStreetMap como proveedor de tiles
- Los iconos de marcadores son personalizados con gradientes dorado/plata
- El componente Map se carga dinámicamente para evitar problemas de SSR
- Los datos se cargan una vez al montar el componente

## 🔧 Troubleshooting

### El mapa no se muestra
- Verifica que la URL del CSV sea accesible públicamente
- Asegúrate de que Leaflet CSS esté cargado correctamente

### Los marcadores no aparecen
- Verifica que las columnas de latitud y longitud tengan nombres reconocibles
- Revisa la consola del navegador para errores de parsing

### Error de CORS
- Asegúrate de que el Google Sheet esté configurado como "Público" o usa un proxy CORS

## 📄 Licencia

Proyecto privado para Avyna - Distribución Exclusiva GAM
