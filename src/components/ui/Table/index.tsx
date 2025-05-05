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
  style?: React.CSSProperties;
}

interface IStatePagination {
  pageIndex: number;
  pageSize: number;
}

export const Table = <T,>({
  columns,
  data,
  titleContent,
  style,
}: IPropsTable<T>) => {
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
    <section
      className="w-3/4 rounded-lg border border-gray-200 bg-white p-2 sm:p-4"
      style={style}
    >
      <div className="h-10 min-h-[40px] w-full">
        {titleContent && titleContent}
      </div>

      <header className="flex items-center justify-between border-x border-t border-gray-300 p-3">
        <button
          aria-label="Remover Filtro"
          className="flex w-30 cursor-pointer justify-center gap-3 self-end rounded border border-gray-300 p-0.5 text-sm duration-100 hover:shadow-[inset_0_35px_35px_#f3f4f6] sm:text-base"
          onClick={clearFilters}
        >
          <Icon icon="mdi:filter-off-outline" width="20" height="20" />
          <span>Limpar</span>
        </button>
      </header>

      <div className="h-full w-full overflow-x-auto">
        <table className="h-full w-full border-collapse">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4 sm:text-base"
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {header.column.columnDef.meta?.filterLabel && (
                          <TableFilterPopover column={header.column} />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="h-4 transition-colors hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="h-4 truncate border border-gray-300 px-2 py-3 text-sm text-gray-700 sm:px-3 sm:text-base"
                      style={{
                        maxWidth: cell.column.columnDef.size,
                        width: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col items-center justify-between gap-2 pt-3 sm:flex-row sm:gap-0 sm:pt-5">
        <div>
          <p className="text-sm font-bold text-neutral-600 sm:text-base">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <button
            className="group flex items-center justify-center disabled:text-neutral-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            title="Ir uma página para a esquerda"
          >
            <Icon
              icon="ep:arrow-left-bold"
              width="1.5em"
              height="1.5em"
              className="cursor-pointer text-neutral-800 group-disabled:text-neutral-600"
            />
          </button>

          <button
            className="flex items-center justify-center disabled:text-neutral-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            title="Ir uma página para a direita"
          >
            <Icon
              icon="ep:arrow-right-bold"
              width="1.5em"
              height="1.5em"
              className="cursor-pointer text-neutral-800 group-disabled:text-neutral-600"
            />
          </button>
        </div>
      </footer>
    </section>
  );
};
