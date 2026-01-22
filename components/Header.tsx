'use client';

import { motion } from 'framer-motion';
import AvynaLogo from './AvynaLogo';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full bg-avyna-white border-b border-avyna-silver/20 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo y Nombre Avyna */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center sm:items-start"
          >
            <AvynaLogo size="md" />
            <p className="text-xs sm:text-sm text-avyna-silver font-light mt-1">
              Distribución Exclusiva GAM
            </p>
          </motion.div>

          {/* Badge de Distribución */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="px-4 py-2 bg-gradient-to-r from-avyna-gold/10 to-avyna-silver/10 border border-avyna-gold/30 rounded-full"
          >
            <p className="text-xs sm:text-sm font-medium text-avyna-black">
              Alcaldía Gustavo A. Madero
            </p>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
