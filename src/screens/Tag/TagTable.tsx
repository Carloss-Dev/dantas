import { ConfirmModal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import { useTags } from "@/contexts/Tags.context";
import type { ITag } from "@/schemas/tags.schema";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createColumnHelper } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { TagForm } from "./TagForm";

export const TagTable = () => {
  const { tags, handleDelete } = useTags();

  function handleCancelDelete() {
    console.log("Aoba");
  }

  function handleConfirmDelete(id: number | undefined) {
    const response = handleDelete(id);

    if (response) {
      toast.success("Tag deletada com sucesso");
      return;
    }
    toast.error("Erro ao deletar tag");
  }

  const columnHelper = createColumnHelper<ITag>();

  const columns = [
    columnHelper.accessor("tag", {
      header: "Tags",
      cell: (info) => info.renderValue(),
      size: 300,
      meta: {
        filterLabel: "tag",
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        return (
          <div className="flex w-fit items-center justify-center gap-1 p-2">
            <TagForm type="update" defaultValues={row.original} />

            <ConfirmModal
              title="Tem certeza que deseja excluir?"
              content="Essa ação não pode ser desfeita!"
              onCancel={handleCancelDelete}
              onConfirm={() => handleConfirmDelete(row.original.id)}
              modalButton={
                <Icon
                  icon="pixelarticons:trash"
                  className="cursor-pointer"
                  width="2em"
                  height="2em"
                  title="Excluir registro"
                />
              }
            />
          </div>
        );
      },
    }),
  ];

  return (
    <>
      <Table
        data={tags}
        columns={columns}
        titleContent={<TagForm type="create" />}
      />
    </>
  );
};
