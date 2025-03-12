import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Modal } from "@components/Modal/Modal";
import { Table } from "@components/Table/Table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { TagsPresenter } from "@presenter/tags.presenter";
import { type ITag, tagSchema } from "@service/tags.service";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useForm } from "react-hook-form";

export const TagsTable = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const presenter = new TagsPresenter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITag>({
    resolver: zodResolver(tagSchema),
  });

  // function onSubmit(data: ITag) {
  //   if (formAction === "create") {
  //     localDB.create(data);
  //   }

  //   if (formAction === "update" && data.id) {
  //     localDB.update(data.id, data);
  //   }

  //   formAction = "create";
  //   reset();
  //   setModal(false);
  // }

  // function handleActions(e: React.MouseEvent, id: number | undefined) {
  //   if (e.currentTarget instanceof HTMLElement) {
  //     const method = e.currentTarget.dataset.action;

  //     if (id) {
  //       switch (method) {
  //         case "update": {
  //           const data = localDB.getById(id);
  //           console.log(data);

  //           setModal(true);
  //           reset(data);
  //           formAction = "update";
  //           break;
  //         }
  //         case "remove":
  //           localDB.remove(id);
  //           break;

  //         default:
  //           console.log("Erro");
  //           break;
  //       }
  //       refreshTags();
  //     }
  //   }
  // }

  const columnHelper = createColumnHelper<ITag>();

  const columns = [
    columnHelper.accessor("tag", {
      header: "Tags",
      cell: (info) => info.renderValue(),
      size: 300,
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
            // onClick={(e: React.MouseEvent) => handleActions(e, row.original.id)}
          />
          <Icon
            icon="pixelarticons:trash"
            className="cursor-pointer"
            width="2em"
            height="2em"
            title="Excluir registro"
            data-action="remove"
            // onClick={(e: React.MouseEvent) => handleActions(e, row.original.id)}
          />
        </div>
      ),
    }),
  ];

  return (
    <section className="col-span-12 flex flex-col items-center justify-center gap-3 pt-6">
      <Table
        data={presenter.loadTags()}
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
            {" "}
            Cadastrar novo{" "}
          </button>
        }
      />
      <Modal
        active={modal}
        setActive={setModal}
        title="Cadastrar Tags"
        description="Formulário para cadastro de tags"
        content={
          <form
            onSubmit={handleSubmit(presenter.onSubmitAdd)}
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
              Cadastrar
            </Button>
          </form>
        }
      />
    </section>
  );
};
