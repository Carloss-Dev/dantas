import { z } from "zod";

export const tagsSchema = z.object({
  id: z.number().optional(),
  tag: z
    .string()
    .min(2, "Mínimo de 2 caracteres")
    .max(20, "Máximo de 20 caracteres"),
});

export interface ITag extends z.infer<typeof tagsSchema> {}
