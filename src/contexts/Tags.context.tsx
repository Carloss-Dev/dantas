import type { ITag } from "@schemas/tags.schema";
import { TagsService } from "@service/tags.service";
import React from "react";

interface ITagsContext {
  handleGetTags: () => ITag[];
  onSubmit: (data: ITag) => void;
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
    return tagsServiceInstance.getAll();
  }

  function onSubmit(data: ITag) {
    console.log(data);
  }

  return (
    <TagsContext.Provider value={{ onSubmit, handleGetTags, tags, setTags }}>
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
