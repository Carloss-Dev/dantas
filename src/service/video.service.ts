import { type IVideo, videoSchema } from "@/schemas/videos.schema";
import { LocalStorageDB } from "@/utils/localStorageDB.utils";

export class VideoService {
  private db: LocalStorageDB<IVideo>;

  constructor() {
    this.db = new LocalStorageDB<IVideo>("videos");
  }

  getAll(): IVideo[] {
    return this.db.getAll();
  }

  getById(id: number): IVideo | undefined {
    return this.db.getById(id);
  }

  create(data: Omit<IVideo, "id">): void {
    const parsedData = videoSchema.omit({ id: true }).safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.create(parsedData.data);
  }

  update(id: number, data: Partial<IVideo>): void {
    const parsedData = videoSchema.partial().safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
    }

    this.db.update(id, parsedData.data);
  }

  remove(id: number): void {
    this.db.remove(id);
  }
}
