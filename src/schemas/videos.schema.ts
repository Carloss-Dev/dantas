import { string, z } from "zod";

export const videoSchema = z.object({
  id: z.number().optional(),
  url: z.string().url({ message: "Url inválida" }),
  name: z.string().min(1, { message: "Digite um nome para o vídeo" }),
  tags: z.string().array().min(1, { message: "Deve conter no mínimo 1 tag" }),
  targetAudience: z
    .array(string())
    .min(1, { message: "Deve conter no mínimo 1 público alvo" }),
});

export interface IVideo extends z.infer<typeof videoSchema> {}
