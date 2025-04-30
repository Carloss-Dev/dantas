import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { useTags, useTargetAudience, useVideo } from "@/contexts";
import { type IVideo, videoSchema } from "@/schemas/videos.schema";
import type { FormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IVideoFormProps {
  defaultValues?: IVideo;
  type: FormType;
}

export const VideoForm = ({ defaultValues, type }: IVideoFormProps) => {
  const [modalIsActive, setModalIsActive] = React.useState<boolean>(false);
  const { handleCreate, handleUpdate } = useVideo();
  const { tags } = useTags();
  const { targetAudiences } = useTargetAudience();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IVideo>({
    defaultValues,
    resolver: zodResolver(videoSchema),
  });

  const handleTagsChange = (selectedTags: string[]) => {
    setValue("tags", [...selectedTags]);
  };

  const handleTargetChange = (selectedTags: string[]) => {
    setValue("targetAudience", [...selectedTags]);
  };

  function onSubmitCreate(data: IVideo) {
    const response = handleCreate(data);
    if (response) {
      reset();
      setModalIsActive(false);
      toast.success("Vídeo cadastrado com sucesso!");
      return;
    }
    toast.error("Erro ao cadastrar vídeo");
  }

  function onSubmitUpdate(data: IVideo) {
    const response = handleUpdate(data);

    if (response) {
      reset();
      setModalIsActive(false);
      toast.success("Vídeo atualizado com sucesso!");

      return;
    }
    toast.error("Erro ao atualizar vídeo");
  }

  return (
    <Modal
      title={type === "create" ? "Cadastrar novo vídeo" : "Atualizar vídeo"}
      description={`Formulário para ${type === "create" ? "cadastro" : "atualização"} de vídeo`}
      modalControl={modalIsActive}
      setModalControl={setModalIsActive}
      modalButton={
        type === "create" ? (
          <button
            className="block cursor-pointer font-bold tracking-wider text-neutral-500 underline"
            title="Cadastrar novo registro"
          >
            Cadastrar Novo
          </button>
        ) : (
          <Icon
            icon="lucide:edit"
            width="2em"
            height="2em"
            className="cursor-pointer"
            title="Editar registro"
          />
        )
      }
      content={
        <form
          onSubmit={handleSubmit(
            type === "create" ? onSubmitCreate : onSubmitUpdate
          )}
          className="flex w-[700px] flex-col justify-center gap-4"
        >
          <div className="flex flex-row gap-5">
            <Input
              label="URL"
              type="text"
              id="url"
              required
              register={register}
              errors={errors?.url}
              placeholder="Digite um URL válida"
              className="w-full"
              {...register("url")}
            />
            <Input
              label="Nome do vídeo"
              type="text"
              id="name"
              required
              register={register}
              errors={errors?.name}
              placeholder="Digite"
              className="w-full"
              {...register("name")}
            />
          </div>
          <MultiSelect
            maxVisibleItems={6}
            label="Tags"
            required
            placeholder="Selecione uma tag"
            errors={errors.tags?.message}
            onChange={handleTagsChange}
            options={tags.map(({ tag }) => tag)}
          />
          <MultiSelect
            maxVisibleItems={6}
            label="Público alvo"
            placeholder="Selecione um público alvo"
            required
            errors={errors.targetAudience?.message}
            onChange={handleTargetChange}
            options={targetAudiences.map(
              ({ targetAudience }) => targetAudience
            )}
          />

          <Button type="submit" className="mt-6 h-10 w-60 self-end">
            {type === "create" ? "Cadastrar" : "Atualizar"}
          </Button>
        </form>
      }
    />
  );
};
