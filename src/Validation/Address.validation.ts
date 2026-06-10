import z from "zod";

export const AddressSchema = z.object({
  street: z.string().nonempty(),
  postalCode: z.string().regex(/^[0-9]{5}$/),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  lat: z.number(),
  lng: z.number(),
});

export type TAddressSchema = z.infer<typeof AddressSchema>;