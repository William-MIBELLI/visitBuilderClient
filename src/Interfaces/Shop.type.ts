import type { IAvailability } from "./Availability.type";

export interface IShop {
  id: number;
  placeName: string;
  placeCode: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
  phone?: string;
  visitCode: string;
  visitName: string;
  lat: number;
  lng: number;
  canBeAfternoon: boolean;
  canBeLunchBreak: boolean;
  canBeMorning: boolean;
  availabilities: IAvailability[];
  createdAt: string;
  cost: number;
}

 