import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Modal } from "@components/Modal/Modal";
import { MultiSelect } from "@components/MultiSelect/MultiSelect";
import { Table } from "@components/Table/Table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

const videoSchema = z.object({
  id: z.number().optional(),
  url: z.string().url({ message: "Url inválida" }),
  name: z.string().min(1, { message: "Digite um nome para o vídeo" }),
  tags: z.string().array().min(1, { message: "Deve conter no mínimo 1 tag" }),
  targetAudience: z
    .array(string())
    .min(1, { message: "Deve conter no mínimo 1 público alvo" }),
});

interface IVideoFormData extends z.infer<typeof videoSchema> {}

export const VideoTable = () => {
  const columnHelper = createColumnHelper<IVideoFormData>();
  const [modal, setModal] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IVideoFormData>({
    resolver: zodResolver(videoSchema),
  });

  React.useEffect(() => {
    if (!modal) {
      reset();
    }
  }, [modal, reset]);

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: "Nome",
    }),

    columnHelper.accessor((row) => row.tags.join(", "), {
      id: "tags",
      header: "Tags",
    }),
    columnHelper.accessor((row) => row.targetAudience.join(", "), {
      id: "targetAudience",
      header: "Público alvo",
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex w-fit items-center justify-center gap-1 p-2">
          <Icon
            icon="lucide:edit"
            width="2em"
            height="2em"
            className="cursor-pointer"
            title="Editar registro"
            data-action="update"
          />
          <Icon
            icon="pixelarticons:trash"
            width="2em"
            height="2em"
            className="cursor-pointer"
            title="Excluir registro"
            data-action="remove"
          />
        </div>
      ),
    }),
  ];

  function onSubmit(data: IVideoFormData) {
    console.log(data);
  }

  const handleTagsChange = (selectedTags: string[]) => {
    setValue("tags", [...selectedTags]);
  };

  const handleTargetChange = (selectedTags: string[]) => {
    setValue("targetAudience", [...selectedTags]);
  };

  return (
    <section className="col-span-12 flex flex-col items-center justify-center gap-3 pt-6">
      <Table
        columns={columns}
        titleContent={
          <button
            onClick={() => setModal(true)}
            onKeyDown={(e: React.KeyboardEvent) =>
              (e.key === "Enter" || e.key === " ") && setModal(true)
            }
            className="mb-3 block cursor-pointer font-bold tracking-wider text-neutral-500 underline"
            title="Cadastrar novo registro"
          >
            Cadastrar novo
          </button>
        }
      />
      <Modal
        active={modal}
        setActive={setModal}
        title="Cadastrar Vídeo"
        description="Formulário para cadastro de vídeo"
        content={
          <form
            onSubmit={handleSubmit(onSubmit)}
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
              options={[
                "Aoba",
                "aoba2",
                "aoba3",
                "aoba65",
                "aoba90",
                "aoda9ud",
                "aiougbdoasiud",
                "aiougbdoasiudadasd",
                "aiougbdoasiuddsadasd",
                "aiougbdoasiudadadas",
                "aiougbdoasiudasdadas",
                "aiougbdoasiuddasdsa",
              ]}
            />
            <MultiSelect
              maxVisibleItems={6}
              label="Público alvo"
              placeholder="Selecione um público alvo"
              required
              errors={errors.targetAudience?.message}
              onChange={handleTargetChange}
              options={[
                "Aoba",
                "aoba2",
                "aoba3",
                "aoba65",
                "aoba90",
                "aoda9ud",
                "aiougbdoasiud",
                "aiougbdoasiudadasd",
                "aiougbdoasiuddsadasd",
                "aiougbdoasiudadadas",
                "aiougbdoasiudasdadas",
                "aiougbdoasiuddasdsa",
              ]}
            />

            <Button type="submit" className="mt-6 h-10 w-60 self-end">
              Cadastrar
            </Button>
          </form>
        }
      />
    </section>
  );
};
