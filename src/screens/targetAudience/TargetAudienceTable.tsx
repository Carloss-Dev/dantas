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
      size: 100,
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
                width="24"
                height="24"
                title="Excluir registro"
                style={{
                  minWidth: "24px",
                  minHeight: "24px",
                }}
              />
            }
          />
        </div>
      ),
    }),
  ];

  return (
    <>
      <Table
        data={targetAudiences}
        columns={columns}
        style={{ width: "400px" }}
        titleContent={<TargetAudienceForm type="create" />}
      />
    </>
  );
};
