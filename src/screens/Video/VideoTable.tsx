import { ConfirmModal, Table } from "@/components/ui";
import { useVideo } from "@/contexts";
import type { IVideo } from "@/schemas/videos.schema";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createColumnHelper } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { VideoForm } from "./VideoForm";

export const VideoTable = () => {
  const { videos, handleDelete } = useVideo();
  const columnHelper = createColumnHelper<IVideo>();

  function handleCancelDelete() {
    console.log("Aoba");
  }

  function handleConfirmDelete(id: number | undefined) {
    const response = handleDelete(id);

    if (response) {
      toast.success("Vídeo deletado com sucesso!");
      return;
    }
    toast.error("Erro ao deletar vídeo!");
  }

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: "Nome",
      meta: {
        filterLabel: "nome",
      },
    }),

    columnHelper.accessor((row) => row.tags.join(", "), {
      id: "tags",
      header: "Tags",
      meta: {
        filterLabel: "tag",
      },
    }),

    columnHelper.accessor((row) => row.targetAudience.join(", "), {
      id: "targetAudience",
      header: "Público alvo",
      meta: {
        filterLabel: "público alvo",
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex w-fit items-center justify-center gap-1 p-2">
          <VideoForm type="update" />
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
    <>
      <Table
        columns={columns}
        titleContent={<VideoForm type="create" />}
        data={videos}
      />
    </>
  );
};
