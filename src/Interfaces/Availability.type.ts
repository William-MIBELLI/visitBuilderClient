export interface IAvailability {
  id: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type TDayName = typeof dayNames[number];

export type TAvailabilityByDay = { [Key: number]: IAvailability[] };
