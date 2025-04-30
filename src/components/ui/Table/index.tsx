import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
  type ColumnDef,
  type RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { toast } from "react-toastify";
import { TableFilterPopover } from "../Popover/";

declare module "@tanstack/table-core" {
  // @ts-ignore: usados indiretamente pela tipagem genérica de ColumnMeta
  // biome-ignore lint: Os parâametros TData e TValue são generics
  interface ColumnMeta<TData extends RowData, TValue> {
    filterLabel: string;
  }
}

interface IPropsTable<T> {
  data?: T[];
  columns: ColumnDef<T, string>[];
  titleContent?: React.ReactNode;
}

interface IStatePagination {
  pageIndex: number;
  pageSize: number;
}

export const Table = <T,>({ columns, data, titleContent }: IPropsTable<T>) => {
  const [pagination, setPagination] = React.useState<IStatePagination>({
    pageIndex: 0,
    pageSize: 5,
  });

  const tableColumns = React.useMemo(() => (columns ? columns : []), [columns]);

  const tableData = React.useMemo(
    () => (data && data.length > 0 ? data : []),
    [data]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      pagination,
    },
  });

  function clearFilters() {
    table.resetColumnFilters();
    toast.success("Filtros limpos!");
  }

  return (
    <section className="h-fit w-fit rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between pb-5">
        <button
          aria-label="Remover Filtro"
          className="flex w-30 cursor-pointer justify-center gap-3 self-end rounded border border-gray-300 p-0.5 duration-100 hover:shadow-[inset_0_35px_35px_#f3f4f6]"
          onClick={clearFilters}
        >
          <Icon icon="mdi:filter-off-outline" width="24" height="24" />{" "}
          <span>Limpar</span>
        </button>
        {titleContent && <div className="flex items-end">{titleContent}</div>}
      </div>
      <div className="h-[410px] min-w-96 overflow-hidden rounded-lg border border-gray-300">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-gray-300 px-4 py-3 text-left text-lg font-bold tracking-wide text-gray-600"
                  >
                    <div className="flex w-full items-center gap-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {header.column.columnDef.meta?.filterLabel && (
                        <TableFilterPopover column={header.column} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 transition-colors hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-md px-4 py-3 whitespace-nowrap text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between pt-5">
        <div>
          <p className="font-bold text-neutral-600">
            Página {table.getState().pagination.pageIndex + 1} de{"  "}
            {table.getPageCount()}{" "}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="group flex items-center justify-center disabled:text-neutral-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            title="Ir uma página para a esquerda"
          >
            <Icon
              icon="ep:arrow-left-bold"
              width="2em"
              height="2em"
              className="cursor-pointer text-neutral-800 group-disabled:text-neutral-600"
            />
          </button>

          <button
            className="group flex items-center justify-center disabled:text-neutral-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            title="Ir uma página para a direita"
          >
            <Icon
              icon="ep:arrow-right-bold"
              width="2em"
              height="2em"
              className="cursor-pointer text-neutral-800 group-disabled:text-neutral-600"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
