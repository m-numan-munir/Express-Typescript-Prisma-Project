import { z } from "zod";

export const AddressSchema = z.object({
  listOne: z.string(),
  listTwo: z.string().optional(), // Previously nullable was used but now optional is used
  pincode: z.string().length(4),
  country: z.string(),
  city: z.string(),
});
