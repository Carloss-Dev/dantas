import type { ITag } from "@/schemas/tags.schema";
import { TagService } from "@/service/tag.service";
import React from "react";

interface ITagsContext {
  handleGetTags: () => ITag[];
  handleCreate: (data: ITag) => boolean;
  handleUpdate: (data: ITag) => boolean;
  handleDelete: (id: number | undefined) => boolean;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

interface ITagsContextProviderProps {
  children: React.ReactNode;
}

const TagsContext = React.createContext<ITagsContext | undefined>(undefined);

export const TagsProvider = ({ children }: ITagsContextProviderProps) => {
  const [tags, setTags] = React.useState<ITag[]>([]);
  const tagServiceInstance = new TagService();

  React.useEffect(() => {
    handleGetTags();
  }, []);

  function handleGetTags(): ITag[] {
    const currentTags = tagServiceInstance.getAll();

    setTags(currentTags);

    return tags;
  }

  function handleCreate(data: ITag): boolean {
    try {
      tagServiceInstance.create(data);
      handleGetTags();
      return true;
    } catch (error) {
      console.error("Erro no handleCreate:", error);
      return false;
    }
  }

  function handleUpdate(data: ITag): boolean {
    try {
      const { id, ...rest } = data;

      if (id) {
        tagServiceInstance.update(id, rest);
        handleGetTags();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no handleCreate:", error);
      return false;
    }
  }

  function handleDelete(id: number | undefined) {
    try {
      if (id) {
        tagServiceInstance.remove(id);
        handleGetTags();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no handleDelete:", error);
      return false;
    }
  }

  return (
    <TagsContext.Provider
      value={{
        handleCreate,
        handleUpdate,
        handleDelete,
        handleGetTags,
        tags,
        setTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = React.useContext(TagsContext);

  if (!context) {
    throw new Error("useTags deve ser usado dentro de um <TagsProvider>");
  }
  return context;
};
