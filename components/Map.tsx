'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SalonWithId } from '@/lib/types';
import SalonModal from './SalonModal';

// Fix para iconos de Leaflet en Next.js - solo ejecutar en cliente
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Crear icono personalizado en verde que destaque
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
        border: 3px solid #FFFFFF;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 16px rgba(34, 197, 94, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          transform: rotate(45deg);
          color: #FFFFFF;
          font-weight: bold;
          font-size: 18px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        ">✂</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// Componente para ajustar el mapa cuando cambian los salones
function MapBounds({ salones }: { salones: SalonWithId[] }) {
  const map = useMap();

  useEffect(() => {
    if (salones.length > 0) {
      const bounds = L.latLngBounds(
        salones.map((salon) => [salon.lat, salon.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [salones, map]);

  return null;
}

interface MapProps {
  salones: SalonWithId[];
  loading?: boolean;
}

export default function Map({ salones, loading }: MapProps) {
  const [selectedSalon, setSelectedSalon] = useState<SalonWithId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Asegurar que solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMarkerClick = (salon: SalonWithId) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  // Centro por defecto: Gustavo A. Madero, CDMX
  const defaultCenter: [number, number] = [19.4844, -99.1106];
  const defaultZoom = 13;

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-avyna-white/50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-avyna-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-avyna-black/60 font-medium">Inicializando mapa...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-avyna-white/50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-avyna-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-avyna-black/60 font-medium">Cargando salones...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full relative">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%', zIndex: 1 }}
          scrollWheelZoom={true}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />

          {salones.length > 0 && <MapBounds salones={salones} />}

          {salones.map((salon, index) => (
            <Marker
              key={`${salon.lat}-${salon.lng}-${index}`}
              position={[salon.lat, salon.lng]}
              icon={createCustomIcon()}
              eventHandlers={{
                click: () => handleMarkerClick(salon),
              }}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-medium text-sm text-avyna-black">
                    {salon.direccion || 'Salón Avyna'}
                  </p>
                  <button
                    onClick={() => handleMarkerClick(salon)}
                    className="mt-2 text-xs text-avyna-gold hover:underline"
                  >
                    Ver detalles
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <SalonModal
        salon={selectedSalon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
