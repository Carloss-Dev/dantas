import { Button, Input, Modal } from "@/components/ui";
import { useTargetAudience } from "@/contexts/TargetAudience.context";
import {
  type ITargetAudience,
  targetAudienceSchema,
} from "@/schemas/targetAudience.schema";
import type { FormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ITargetAudienceFormProps {
  defaultValues?: ITargetAudience;
  type: FormType;
}

export const TargetAudienceForm = ({
  type,
  defaultValues,
}: ITargetAudienceFormProps) => {
  const [modalIsActive, setModalIsActive] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITargetAudience>({
    defaultValues,
    resolver: zodResolver(targetAudienceSchema),
  });

  const { handleCreate, handleUpdate } = useTargetAudience();

  function onSubmitCreate(data: ITargetAudience) {
    const response = handleCreate(data);

    if (response) {
      setModalIsActive(false);
      reset();
      toast.success("Público alvo cadastrado com sucesso!");
      return;
    }

    toast.error("Erro ao cadastrar Público alvo!");
  }

  function onSubmitUpdate(data: ITargetAudience) {
    const response = handleUpdate(data);

    if (response) {
      setModalIsActive(false);
      toast.success("Público alvo atualizado com sucesso!");

      return;
    }
    toast.error("Erro ao atualizar Público alvo!");
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
              className="mb-3 block cursor-pointer font-bold tracking-wider text-neutral-500 underline"
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
            className="flex flex-col justify-center gap-4"
          >
            <div className="flex w-96 flex-col">
              <Input
                label="Tag"
                type="text"
                id="tag"
                required
                register={register}
                errors={errors?.targetAudience}
                placeholder="Digite a Tag"
                className="w-full"
                {...register("targetAudience")}
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
