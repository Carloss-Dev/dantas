import { Table } from "@components/Table/Table";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createColumnHelper } from "@tanstack/react-table";
import { string, z } from "zod";

const videoSchema = z.object({
  id: z.number().optional(),
  url: z.string().url({ message: "Url inválida" }),
  name: z.string({ message: "Digite um nome para o vídeo" }),
  tags: z.array(string()).nonempty({ message: "Selecione ao menos 1 tag" }),
  targetAudience: z
    .array(string())
    .nonempty({ message: "Selecione ao menos 1 público alvo" }),
});

interface IVideoFormData extends z.infer<typeof videoSchema> {}

export const VideoTable = () => {
  const columnHelper = createColumnHelper<IVideoFormData>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: "Nome",
    }),
    columnHelper.accessor((row) => row.url, {
      id: "url",
      header: "URL",
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

  return (
    <section className="col-span-12 flex flex-col items-center justify-center gap-3 pt-6">
      <Table columns={columns} />
    </section>
  );
};
