import z from "zod";
import { BaseAvailabilitySchema, CreateAvailabilitySchema } from "./Availability.validation";

export const BaseShopSchema = z.object({
  id: z.number(),
  placeName: z.string().nonempty(),
  placeCode: z.string().nonempty(),
  address: z.string().nonempty(),
  postalCode: z.string().regex(/^[0-9]{5}$/),
  city: z.string().nonempty(),
  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/)
    .optional(),
  visitCode: z.string().nonempty(),
  visitName: z.string().nonempty(),
  lat: z.number(),
  lng: z.number(),
  canBeAfternoon: z.boolean(),
  canBeLunchBreak: z.boolean(),
  canBeMorning: z.boolean(),
  createdAt: z.iso.date(),
  startTime: z.iso.date().optional(),
  endTime: z.iso.date().optional(),
  availabilities: z.array(BaseAvailabilitySchema),
});

export type TBaseShopSchema = z.infer<typeof BaseShopSchema>;

export const CreateShopSchema = BaseShopSchema.omit({
  id: true,
  availabilities: true,
  createdAt: true
}).extend({ availabilities: z.array(CreateAvailabilitySchema) });

export type TCreateShopSChema = z.infer<typeof CreateShopSchema>;
