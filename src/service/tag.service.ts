import { type ITag, tagsSchema } from "@/schemas/tags.schema";
import { LocalStorageDB } from "@/utils/localStorageDB.utils";

export class TagService {
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
    const parsedData = tagsSchema.omit({ id: true }).safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.create(parsedData.data);
  }

  update(id: number, data: Partial<ITag>): void {
    const parsedData = tagsSchema.partial().safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.update(id, parsedData.data);
  }

  remove(id: number): void {
    this.db.remove(id);
  }
}
