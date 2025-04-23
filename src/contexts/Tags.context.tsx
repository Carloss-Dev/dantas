import type { ITag } from "@schemas/tags.schema";
import { TagsService } from "@service/tags.service";
import React from "react";

interface ITagsContext {
  handleGetTags: () => ITag[];
  handleCreate: (data: ITag) => void;
  handleUpdate: (data: ITag) => void;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

interface ITagsContextProviderProps {
  children: React.ReactNode;
}

const TagsContext = React.createContext<ITagsContext | undefined>(undefined);

export const TagsProvider = ({ children }: ITagsContextProviderProps) => {
  const [tags, setTags] = React.useState<ITag[]>([]);
  const tagsServiceInstance = new TagsService();

  React.useEffect(() => {
    handleGetTags();
  }, []);

  function handleGetTags() {
    const currentTags = tagsServiceInstance.getAll();

    setTags(currentTags);

    return tags;
  }

  function handleCreate(data: ITag) {
    tagsServiceInstance.create(data);
  }

  function handleUpdate(data: ITag) {
    console.log(data);
  }

  return (
    <TagsContext.Provider
      value={{ handleCreate, handleUpdate, handleGetTags, tags, setTags }}
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
