export interface IAvailability {
  id: number;
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