import type { IVideo } from "@/schemas/videos.schema";
import { VideoService } from "@/service/video.service";
import React from "react";

interface IVideoProviderProps {
  children: React.ReactNode;
}

interface IVideoContext {
  videos: IVideo[];
  setVideos: React.Dispatch<React.SetStateAction<IVideo[]>>;
  handleGetVideos: () => IVideo[];
  handleCreate: (data: IVideo) => boolean;
  handleUpdate: (data: IVideo) => boolean;
  handleDelete: (id: number | undefined) => boolean;
}

const VideoContext = React.createContext<IVideoContext | undefined>(undefined);

export const VideoProvider = ({ children }: IVideoProviderProps) => {
  const [videos, setVideos] = React.useState<IVideo[]>([]);
  const videoServiceInstance = new VideoService();

  React.useEffect(() => {
    handleGetVideos();
  }, []);

  function handleGetVideos(): IVideo[] {
    const currentVideos = videoServiceInstance.getAll();

    setVideos(currentVideos);

    return currentVideos;
  }

  function handleCreate(data: IVideo): boolean {
    try {
      videoServiceInstance.create(data);
      handleGetVideos();
      return true;
    } catch (error) {
      console.error("Erro no handleCreate:", error);
      return false;
    }
  }

  function handleUpdate(data: IVideo): boolean {
    try {
      const { id, ...rest } = data;

      if (id) {
        videoServiceInstance.update(id, rest);
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
        videoServiceInstance.remove(id);
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
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        handleCreate,
        handleDelete,
        handleGetVideos,
        handleUpdate,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = React.useContext(VideoContext);

  if (!context) {
    throw new Error("useVideo deve ser usado dentro de um <VideoProvider>");
  }
  return context;
};
