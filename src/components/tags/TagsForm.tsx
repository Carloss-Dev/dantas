import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Modal } from "@components/ui/Modal";
import { useTags } from "@contexts/Tags.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { type ITag, tagsSchema } from "@schemas/tags.schema";
import React from "react";
import { useForm } from "react-hook-form";

type FormType = "create" | "update";

interface ITagsFormProps {
  defaultValues?: ITag;
  type: FormType;
}

const TagsForm = ({ defaultValues, type = "create" }: ITagsFormProps) => {
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

  return (
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
            type === "create" ? handleCreate : handleUpdate
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

          <Button
            type="submit"
            className="mt-6 h-10 w-60 self-end"
            onClick={() => setModalIsActive(!modalIsActive)}
          >
            {type === "create" ? "Cadastrar" : "Atualizar"}
          </Button>
        </form>
      }
    />
  );
};

export default TagsForm;
