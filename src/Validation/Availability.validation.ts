import z from "zod";

export const BaseAvailabilitySchema = z.object({
  id: z.number(),
  dayOfWeekd: z.number().gte(1).lte(7),
  openTime: z.iso.time(),
  closeTime: z.iso.time()
});

export type TBaseAvailaibilitySchema = z.infer<typeof BaseAvailabilitySchema>;

export const CreateAvailabilitySchema = BaseAvailabilitySchema.omit({ id: true });

export type TCreateAvailavbilitySchema = z.infer<typeof CreateAvailabilitySchema>;