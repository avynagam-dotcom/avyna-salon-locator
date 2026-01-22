'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import { useSalonesData } from '@/hooks/useSalonesData';
import { SalonWithId } from '@/lib/types';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Cargar el mapa dinámicamente para evitar problemas de SSR
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-avyna-white/50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-avyna-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-avyna-black/60 font-medium">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  // OPCIÓN 1: Archivo CSV local (prioridad)
  // Coloca tu archivo CSV en: /public/data/salones.csv
  // Formato: Latitud,Longitud,Dirección
  const localCsvPath = '/data/salones.csv';
  
  // OPCIÓN 2: URL de Google Sheets (alternativa)
  // Si prefieres usar Google Sheets, configura la URL aquí o en .env.local
  const googleSheetsUrl = process.env.NEXT_PUBLIC_CSV_URL || '';
  
  // Priorizar archivo local si no hay URL de Google Sheets configurada
  const [csvUrl] = useState<string>(
    googleSheetsUrl || localCsvPath
  );

  const { salones, loading, error } = useSalonesData({ csvUrl });

  // Convertir salones a formato con ID único
  const salonesWithId: SalonWithId[] = salones.map((salon, index) => ({
    ...salon,
    id: `salon-${salon.lat}-${salon.lng}-${index}`,
  }));

  return (
    <main className="min-h-screen flex flex-col bg-avyna-white">
      <Header />

      {/* Contenido Principal */}
      <div className="flex-1 relative w-full">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-avyna-white/95"
          >
            <div className="text-center px-4 max-w-md">
              <AlertCircle className="w-16 h-16 text-avyna-gold mx-auto mb-4" />
              <h2 className="text-xl font-bold text-avyna-black mb-2">
                Error al cargar datos
              </h2>
              <p className="text-avyna-silver mb-4 font-mono text-xs break-all">{error}</p>
              <p className="text-sm text-avyna-silver mb-2">
                Por favor, verifica que la URL del CSV sea correcta y esté accesible.
              </p>
              <p className="text-xs text-avyna-silver">
                URL intentada: <span className="font-mono break-all">{csvUrl}</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="w-full h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]">
            <Map salones={salonesWithId} loading={loading} />
          </div>
        )}
      </div>

      {/* Footer Minimalista */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full py-4 px-4 sm:px-6 lg:px-8 border-t border-avyna-silver/10 bg-avyna-white"
      >
        <div className="container mx-auto text-center">
          <p className="text-xs sm:text-sm text-avyna-silver">
            © {new Date().getFullYear()} Avyna - Distribución Exclusiva GAM
          </p>
        </div>
      </motion.footer>
    </main>
  );
}
