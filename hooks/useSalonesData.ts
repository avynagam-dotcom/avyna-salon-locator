import { useState, useEffect } from 'react';
import { Salon } from '@/lib/types';

// Importar PapaParse solo en el cliente
let Papa: any;
if (typeof window !== 'undefined') {
  Papa = require('papaparse');
}

interface UseSalonesDataProps {
  csvUrl: string;
}

interface UseSalonesDataReturn {
  salones: Salon[];
  loading: boolean;
  error: string | null;
}

export function useSalonesData({ csvUrl }: UseSalonesDataProps): UseSalonesDataReturn {
  const [salones, setSalones] = useState<Salon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') {
      return;
    }

    if (!csvUrl) {
      setError('URL de CSV no proporcionada');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`Error al cargar datos: ${response.statusText} (${response.status})`);
        }

        const csvText = await response.text();
        
        if (!csvText || csvText.trim().length === 0) {
          throw new Error('El archivo CSV está vacío');
        }

        // Validar que PapaParse esté disponible (solo en cliente)
        if (typeof window === 'undefined' || typeof Papa === 'undefined' || !Papa?.parse) {
          throw new Error('PapaParse no está disponible en este entorno');
        }

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header: string) => header.trim(),
          complete: (results: Papa.ParseResult<any>) => {
            try {
              const parsedSalones: Salon[] = [];

              if (!results || !results.data || !Array.isArray(results.data)) {
                throw new Error('Formato de CSV inválido: no se encontraron datos');
              }

              results.data.forEach((row: any, index: number) => {
                // Validar que la fila sea un objeto válido
                if (!row || typeof row !== 'object' || Array.isArray(row)) {
                  console.warn(`Fila ${index} inválida, saltando...`);
                  return;
                }
                let lat: number | null = null;
                let lng: number | null = null;
                let direccion: string | undefined = undefined;

                // Buscar columna de coordenadas combinadas (formato: "lat, lng")
                const coordenadasKey = Object.keys(row).find(
                  (key) => key.toLowerCase().includes('coordenada')
                );

                if (coordenadasKey && row[coordenadasKey]) {
                  // Parsear coordenadas en formato "lat, lng" o "lat,lng" (puede tener comillas)
                  let coordenadasStr = String(row[coordenadasKey]).trim();
                  // Remover comillas si las hay
                  coordenadasStr = coordenadasStr.replace(/^["']|["']$/g, '');
                  const coordenadasMatch = coordenadasStr.match(/(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/);
                  
                  if (coordenadasMatch) {
                    lat = parseFloat(coordenadasMatch[1]);
                    lng = parseFloat(coordenadasMatch[2]);
                  } else {
                    console.warn('No se pudo parsear coordenadas:', coordenadasStr);
                  }
                } else {
                  // Buscar columnas separadas de latitud y longitud (case-insensitive)
                  const latKey = Object.keys(row).find(
                    (key) => key.toLowerCase().includes('lat') || key.toLowerCase().includes('latitude')
                  );
                  const lngKey = Object.keys(row).find(
                    (key) => key.toLowerCase().includes('lng') || 
                            key.toLowerCase().includes('lon') || 
                            key.toLowerCase().includes('longitude')
                  );

                  if (latKey && lngKey) {
                    lat = parseFloat(row[latKey]);
                    lng = parseFloat(row[lngKey]);
                  }
                }

                // Buscar columna de dirección
                const direccionKey = Object.keys(row).find(
                  (key) => key.toLowerCase().includes('direccion') || 
                          key.toLowerCase().includes('dirección') ||
                          key.toLowerCase().includes('address')
                );

                if (direccionKey) {
                  direccion = row[direccionKey];
                }

                // Validar y agregar salón (ignorar columna "Clienta" o "Nombre" según requisitos)
                if (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) {
                  parsedSalones.push({
                    lat,
                    lng,
                    direccion,
                  });
                }
              });

              setSalones(parsedSalones);
              setLoading(false);
            } catch (parseError) {
              setError('Error al procesar los datos CSV');
              setLoading(false);
              console.error('Error parsing CSV:', parseError);
            }
          },
          error: (error: any) => {
            const errorMessage = error?.message || error?.toString() || 'Error desconocido al parsear CSV';
            setError(`Error al parsear CSV: ${errorMessage}`);
            setLoading(false);
            console.error('PapaParse error:', error);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  return { salones, loading, error };
}
