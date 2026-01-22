'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
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

// Crear icono personalizado en verde para salones
const createSalonIcon = () => {
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

// Crear icono azul para la ubicación del usuario
const createUserIcon = () => {
  return L.divIcon({
    className: 'user-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: #3B82F6;
        border: 4px solid #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 0 0 2px #3B82F6, 0 4px 12px rgba(59, 130, 246, 0.5);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #FFFFFF;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Componente para ajustar el mapa cuando cambian los salones
function MapBounds({ salones, userLocation }: { salones: SalonWithId[]; userLocation: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      // Si tenemos ubicación del usuario, centrar en él con zoom apropiado
      map.setView(userLocation, 15);
    } else if (salones.length > 0) {
      const bounds = L.latLngBounds(
        salones.map((salon) => [salon.lat, salon.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [salones, userLocation, map]);

  return null;
}

// Componente para el punto pulsante del usuario
function UserLocationMarker({ position }: { position: [number, number] }) {
  return (
    <>
      {/* Círculo de precisión */}
      <Circle
        center={position}
        radius={100}
        pathOptions={{
          color: '#3B82F6',
          fillColor: '#3B82F6',
          fillOpacity: 0.1,
          weight: 1,
        }}
      />
      {/* Marcador del usuario */}
      <Marker position={position} icon={createUserIcon()}>
        <Popup>
          <div className="p-2 text-center">
            <p className="font-bold text-blue-600 text-sm">📍 Tu ubicación</p>
            <p className="text-xs text-gray-500 mt-1">Estás aquí</p>
          </div>
        </Popup>
      </Marker>
    </>
  );
}

interface MapProps {
  salones: SalonWithId[];
  loading?: boolean;
}

export default function Map({ salones, loading }: MapProps) {
  const [selectedSalon, setSelectedSalon] = useState<SalonWithId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Asegurar que solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (!isMounted) return;

    setIsLocating(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setIsLocating(false);
        },
        (error) => {
          console.log('Error de geolocalización:', error.message);
          setLocationError('No pudimos obtener tu ubicación');
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );

      // También escuchar cambios de ubicación
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {},
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setLocationError('Tu navegador no soporta geolocalización');
      setIsLocating(false);
    }
  }, [isMounted]);

  const handleMarkerClick = (salon: SalonWithId) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  // Centro por defecto: Gustavo A. Madero, CDMX
  const defaultCenter: [number, number] = [19.4844, -99.1306];
  const defaultZoom = 14;

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
        {/* Indicador de ubicación */}
        {isLocating && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Obteniendo tu ubicación...
          </div>
        )}

        {/* Badge de cantidad de salones */}
        <div className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700">
          ✂️ {salones.length} salones
        </div>

        {userLocation && (
          <div className="absolute bottom-4 left-4 z-[1000] bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Tu ubicación activa
          </div>
        )}

        <MapContainer
          center={userLocation || defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%', zIndex: 1 }}
          scrollWheelZoom={true}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />

          <MapBounds salones={salones} userLocation={userLocation} />

          {/* Marcador de ubicación del usuario */}
          {userLocation && <UserLocationMarker position={userLocation} />}

          {/* Marcadores de salones */}
          {salones.map((salon, index) => (
            <Marker
              key={`${salon.lat}-${salon.lng}-${index}`}
              position={[salon.lat, salon.lng]}
              icon={createSalonIcon()}
              eventHandlers={{
                click: () => handleMarkerClick(salon),
              }}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-bold text-sm text-gray-800">
                    ✂️ {salon.direccion || 'Salón Avyna'}
                  </p>
                  <button
                    onClick={() => handleMarkerClick(salon)}
                    className="mt-2 text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
                  >
                    Cómo llegar
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
