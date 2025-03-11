import { LocalStorageDB } from "@utils/localStorageDB.utils";
import { z } from "zod";

export const tagSchema = z.object({
  id: z.number().optional(),
  tag: z
    .string()
    .min(2, "Mínimo de 2 caracteres")
    .max(20, "Máximo de 20 caracteres"),
});

export type ITag = z.infer<typeof tagSchema>;

export class TagsService {
  private db: LocalStorageDB<ITag>;

  constructor() {
    this.db = new LocalStorageDB<ITag>("tags");
  }

  getAll(): ITag[] {
    return this.db.getAll();
  }

  getById(id: number): ITag | undefined {
    return this.db.getById(id);
  }

  create(data: Omit<ITag, "id">): void {
    const parsedData = tagSchema.omit({ id: true }).safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.create(parsedData.data);
  }

  update(id: number, data: Partial<ITag>): void {
    const parsedData = tagSchema.partial().safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.update(id, parsedData.data);
  }

  remove(id: number): void {
    this.db.remove(id);
  }
}
