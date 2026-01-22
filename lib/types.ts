export interface Salon {
  lat: number;
  lng: number;
  direccion?: string;
  [key: string]: any; // Para otras columnas que puedan existir
}

export interface SalonWithId extends Salon {
  id: string;
}
