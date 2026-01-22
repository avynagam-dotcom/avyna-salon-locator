'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { SalonWithId } from '@/lib/types';

interface SalonModalProps {
  salon: SalonWithId | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SalonModal({ salon, isOpen, onClose }: SalonModalProps) {
  if (!salon) return null;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${salon.lat},${salon.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openWaze = () => {
    const url = `https://waze.com/ul?ll=${salon.lat},${salon.lng}&navigate=yes`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-avyna-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md w-full bg-avyna-white rounded-2xl shadow-2xl z-50 border border-avyna-silver/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-avyna-silver/10 transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-avyna-black" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-avyna-gold/20 to-avyna-silver/20 rounded-full">
                <MapPin className="w-8 h-8 text-avyna-gold" />
              </div>

              {/* Dirección o Coordenadas */}
              <div className="mb-6 text-center">
                {salon.direccion ? (
                  <>
                    <p className="text-sm text-avyna-silver mb-2">Dirección</p>
                    <p className="text-base sm:text-lg font-medium text-avyna-black leading-relaxed">
                      {salon.direccion}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-avyna-silver mb-2">Ubicación</p>
                    <p className="text-base sm:text-lg font-medium text-avyna-black leading-relaxed">
                      {salon.lat.toFixed(6)}, {salon.lng.toFixed(6)}
                    </p>
                  </>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Google Maps */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openGoogleMaps}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-avyna-black text-avyna-white rounded-xl font-medium hover:bg-avyna-black/90 transition-colors shadow-lg"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>

                {/* Waze */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWaze}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-avyna-gold to-avyna-gold/90 text-avyna-black rounded-xl font-medium hover:from-avyna-gold/90 hover:to-avyna-gold/80 transition-all shadow-lg"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Waze</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
