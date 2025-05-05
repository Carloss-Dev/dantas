import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useTags } from "@/contexts/Tags.context";
import { type ITag, tagsSchema } from "@/schemas/tags.schema";
import type { FormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ITagFormProps {
  defaultValues?: ITag;
  type: FormType;
}

export const TagForm = ({ defaultValues, type = "create" }: ITagFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITag>({
    defaultValues,
    resolver: zodResolver(tagsSchema),
  });

  const [modalIsActive, setModalIsActive] = React.useState<boolean>(false);

  const { handleCreate, handleUpdate } = useTags();

  function onSubmitCreate(data: ITag) {
    const response = handleCreate(data);

    if (response) {
      setModalIsActive(false);
      toast.success("Tag Criada com sucesso!");

      return;
    }

    toast.error("Erro ao criar tag");
  }

  function onSubmitUpdate(data: ITag) {
    const response = handleUpdate(data);

    if (response) {
      setModalIsActive(false);
      toast.success("Tag atualizada com sucesso!");

      return;
    }
    toast.error("Erro ao atualizar tag");
  }

  return (
    <>
      <Modal
        modalControl={modalIsActive}
        setModalControl={setModalIsActive}
        title={type === "create" ? "Cadastrar nova tag" : "Atualizar tag"}
        description={`Formulário para ${type === "create" ? "cadastro" : "atualização"} de tags`}
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
              width="24"
              height="24"
              className="cursor-pointer"
              title="Editar registro"
              style={{
                minWidth: "24px",
                minHeight: "24px",
              }}
            />
          )
        }
        content={
          <form
            onSubmit={handleSubmit(
              type === "create" ? onSubmitCreate : onSubmitUpdate
            )}
            className="flex flex-col justify-center gap-4"
          >
            <div className="flex w-96 flex-col">
              <Input
                label="Tag"
                type="text"
                id="tag"
                required
                register={register}
                errors={errors?.tag}
                placeholder="Digite a Tag"
                className="w-full"
                {...register("tag")}
              />
            </div>

            <Button type="submit" className="mt-6 h-10 w-60 self-end">
              {type === "create" ? "Cadastrar" : "Atualizar"}
            </Button>
          </form>
        }
      />
    </>
  );
};
