import { LocalStorageDB } from "@utils/localStorageDB.utils";

export class BaseService<T> {
  private db: LocalStorageDB<T>;

  constructor(key: string) {
    this.db = new LocalStorageDB<T>(key);
  }

  getAll(): T[] {
    return this.db.getAll();
  }
}
