import { Table } from "@components/ui/Table";
import { useTags } from "@contexts/Tags.context";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import type { ITag } from "@schemas/tags.schema";
import { createColumnHelper } from "@tanstack/react-table";
import TagsForm from "./TagsForm";

export const TagsTable = () => {
  const { tags } = useTags();

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
      cell: ({ row }) => {
        console.log(row.original);

        return (
          <div className="flex w-fit items-center justify-center gap-1 p-2">
            <TagsForm type="update" defaultValues={row.original} />
            <Icon
              icon="pixelarticons:trash"
              className="cursor-pointer"
              width="2em"
              height="2em"
              title="Excluir registro"
              data-action="remove"
            />
          </div>
        );
      },
    }),
  ];

  return (
    <section className="col-span-12 flex flex-col items-center justify-center gap-3 pt-6">
      <Table
        data={tags}
        columns={columns}
        titleContent={<TagsForm type="create" />}
      />
    </section>
  );
};
