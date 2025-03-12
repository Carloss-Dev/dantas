import { type ITag, TagsService } from "@service/tags.service";

export class TagsPresenter {
  private service: TagsService;
  private reset?: (tags: ITag[]) => void;

  constructor(reset?: (tags: ITag[]) => void) {
    this.service = new TagsService();
    this.reset = reset;
  }

  loadTags(): ITag[] {
    const tags = this.service.getAll();
    // this.reset(tags);

    return tags;
  }

  addTag(tag: Omit<ITag, "id">): void {
    try {
      console.log(tag);

      this.service.create(tag);
      // this.loadTags();
    } catch (error) {
      console.error("Erro ao adicionar tag:", error);
    }
  }

  updateTag(id: number, data: Partial<ITag>): void {
    try {
      this.service.update(id, data);
      this.loadTags();
    } catch (error) {
      console.error("Erro ao atualizar tag:", error);
    }
  }

  removeTag(id: number): void {
    this.service.remove(id);
    this.loadTags();
  }

  onSubmitAdd(data: ITag): void {
    this.addTag(data);
  }
}
