import type { ITargetAudience } from "@/schemas/targetAudience.schema";
import { TargetAudienceService } from "@/service/targetAudience.service";
import React from "react";

interface ITargetAudienceProviderProps {
  children: React.ReactNode;
}

interface ITargetAudienceContext {
  targetAudiences: ITargetAudience[];
  setTargetAudiences: React.Dispatch<React.SetStateAction<ITargetAudience[]>>;
  handleGetVideos: () => ITargetAudience[];
  handleCreate: (data: ITargetAudience) => boolean;
  handleUpdate: (data: ITargetAudience) => boolean;
  handleDelete: (id: number | undefined) => boolean;
}

const TargetAudienceContext = React.createContext<
  ITargetAudienceContext | undefined
>(undefined);

export const TargetAudienceProvider = ({
  children,
}: ITargetAudienceProviderProps) => {
  const [targetAudiences, setTargetAudiences] = React.useState<
    ITargetAudience[]
  >([]);

  const targetAudienceServiceInstance = new TargetAudienceService();

  React.useEffect(() => {
    handleGetVideos();
  }, []);

  function handleGetVideos(): ITargetAudience[] {
    const currentTargetAudiences = targetAudienceServiceInstance.getAll();

    setTargetAudiences(currentTargetAudiences);

    return currentTargetAudiences;
  }

  function handleCreate(data: ITargetAudience): boolean {
    try {
      targetAudienceServiceInstance.create(data);
      handleGetVideos();
      return true;
    } catch (error) {
      console.error("Erro no handleCreate:", error);
      return false;
    }
  }

  function handleUpdate(data: ITargetAudience): boolean {
    try {
      const { id, ...rest } = data;

      if (id) {
        targetAudienceServiceInstance.update(id, rest);
        handleGetVideos();
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
        targetAudienceServiceInstance.remove(id);
        handleGetVideos();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no handleDelete:", error);
      return false;
    }
  }

  return (
    <TargetAudienceContext.Provider
      value={{
        targetAudiences,
        setTargetAudiences,
        handleCreate,
        handleDelete,
        handleGetVideos,
        handleUpdate,
      }}
    >
      {children}
    </TargetAudienceContext.Provider>
  );
};

export const useTargetAudience = () => {
  const context = React.useContext(TargetAudienceContext);

  if (!context) {
    throw new Error(
      "useTargetAudience deve ser usado dentro de um <VideoProvider>"
    );
  }
  return context;
};
