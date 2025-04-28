import {
  type ITargetAudience,
  targetAudienceSchema,
} from "@/schemas/targetAudience.schema";
import { LocalStorageDB } from "@/utils/localStorageDB.utils";

export class TargetAudienceService {
  private db: LocalStorageDB<ITargetAudience>;

  constructor() {
    this.db = new LocalStorageDB<ITargetAudience>("targetAudience");
  }

  getAll(): ITargetAudience[] {
    return this.db.getAll();
  }

  getById(id: number): ITargetAudience | undefined {
    return this.db.getById(id);
  }

  create(data: Omit<ITargetAudience, "id">): void {
    const parsedData = targetAudienceSchema.omit({ id: true }).safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.create(parsedData.data);
  }

  update(id: number, data: Partial<ITargetAudience>): void {
    const parsedData = targetAudienceSchema.partial().safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.update(id, parsedData.data);
  }

  remove(id: number): void {
    this.db.remove(id);
  }
}
