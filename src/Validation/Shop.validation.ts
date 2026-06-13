import z from "zod";
import {
  BaseAvailabilitySchema,
  CreateAvailabilitySchema,
} from "./Availability.validation";
import { AddressSchema } from "./Address.validation";

export const VisitConstraintSchema = z.object({
  canBeAfternoon: z.boolean(),
  canBeLunchBreak: z.boolean(),
  canBeMorning: z.boolean(),
});

export type TVisitConstraintSchema = z.infer<typeof VisitConstraintSchema>;

export type TvisitConstraintKey = keyof TVisitConstraintSchema;

export const BaseShopSchema = z.object({
  id: z.number(),
  placeName: z.string().nonempty(),
  placeCode: z.string().nonempty(),
  address: AddressSchema,
  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/)
    .optional()
    .or(z.literal("")),
  visitCode: z.string().nonempty(),
  visitName: z.string().nonempty(),
  visitConstraint: VisitConstraintSchema,
  createdAt: z.iso.date(),
  startDate: z.iso.date().nullable(),
  endDate: z.iso.date().nullable(),
  cost: z.string().regex(/\d/g),
  availabilities: z.array(BaseAvailabilitySchema),
});

export type TBaseShopSchema = z.infer<typeof BaseShopSchema>;

export const CreateShopSchema = BaseShopSchema.omit({
  id: true,
  availabilities: true,
  createdAt: true,
})
  .extend({ availabilities: z.array(CreateAvailabilitySchema) })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (startDate && endDate) {
      if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
        ctx.addIssue({
          code: "custom",
          message: "The Start date must precede the End date.",
          path: ["startDate"],
        });
      }
    }
  });

export type TCreateShopSChema = z.infer<typeof CreateShopSchema>;

export type TShopCreationKey = keyof TCreateShopSChema;
