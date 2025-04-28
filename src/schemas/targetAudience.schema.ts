import { z } from "zod";

export const targetAudienceSchema = z.object({
  id: z.number().optional(),
  targetAudience: z
    .string()
    .min(2, "Mínimo de 2 caracteres")
    .max(20, "Máximo de 20 caracteres"),
});

export interface ITargetAudience extends z.infer<typeof targetAudienceSchema> {}
