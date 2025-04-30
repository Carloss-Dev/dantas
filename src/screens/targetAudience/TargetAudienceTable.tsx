import { ConfirmModal, Table } from "@/components/ui";
import { useTargetAudience } from "@/contexts";
import type { ITargetAudience } from "@/schemas/targetAudience.schema";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createColumnHelper } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { TargetAudienceForm } from "./TargetAudienceForm";

export const TargetAudienceTable = () => {
  const { targetAudiences, handleDelete } = useTargetAudience();

  function handleCancelDelete() {
    console.log("Aoba");
  }

  function handleConfirmDelete(id: number | undefined) {
    const response = handleDelete(id);

    if (response) {
      toast.success("Público alvo deletado com sucesso");
      return;
    }
    toast.error("Erro ao deletar público alvo");
  }

  const columnHelper = createColumnHelper<ITargetAudience>();

  const columns = [
    columnHelper.accessor("targetAudience", {
      header: "Público alvo",
      cell: (info) => info.renderValue(),
      meta: {
        filterLabel: "público alvo",
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex w-fit items-center justify-center gap-1 p-2">
          <TargetAudienceForm type="update" />
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
      ),
    }),
  ];

  return (
    <section className="col-span-12 flex flex-col items-center justify-center gap-3 pt-6">
      <Table
        data={targetAudiences}
        columns={columns}
        titleContent={<TargetAudienceForm type="create" />}
      />
    </section>
  );
};
