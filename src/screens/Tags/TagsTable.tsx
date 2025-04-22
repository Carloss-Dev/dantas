import { Modal } from "@components/Modal/Modal";
import { Table } from "@components/Table/Table";
import { useTags } from "@contexts/Tags.context";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import type { ITag } from "@schemas/tags.schema";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import TagsForm from "./TagsForm";

export const TagsTable = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const { tags } = useTags();

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
        data={tags}
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
        modalControl={modal}
        setModalControl={setModal}
        title="Cadastrar Tags"
        description="Formulário para cadastro de tags"
        content={<TagsForm />}
      />
    </section>
  );
};
