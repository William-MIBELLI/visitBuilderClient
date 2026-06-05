// Type principal de la réponse de l'API
export interface AddressApiResponse {
  type: "FeatureCollection";
  features: AddressFeature[];
  query: string;
}

// Représentation d'un élément (une adresse trouvée)
export interface AddressFeature {
  type: "Feature";
  geometry: Geometry;
  properties: AddressProperties;
}

// Les coordonnées géographiques (format GeoJSON standard)
export interface Geometry {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

// Les détails spécifiques de l'adresse
export interface AddressProperties {
  label: string;
  score: number;
  housenumber?: string;
  id: string;
  banId?: string;
  name: string;
  postcode: string;
  citycode: string;
  oldcitycode?: string; // Optionnel (présent dans l'exemple de Lille)
  x: number;
  y: number;
  city: string;
  oldcity?: string; // Optionnel (présent dans l'exemple de Lille)
  context: string;
  type: string; // Ex: "housenumber", "street", "locality", "municipality"
  importance: number;
  depcode: string;
  street?: string;
  _type: string; // Généralement "address"
}