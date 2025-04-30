import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import type { Column } from "@tanstack/react-table";
import React from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { CustomPopover } from "./CustomPopover";

interface ITableFilterPopoverProps<T> {
  column: Column<T, unknown>;
}

export const TableFilterPopover = <T,>({
  column,
}: ITableFilterPopoverProps<T>) => {
  const [value, setValue] = React.useState<string>(
    (column.getFilterValue() ?? "") as string
  );

  return (
    <CustomPopover
      triggerButton={
        <button
          className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-200"
          aria-label="Abrir Filtro"
        >
          {column.getFilterValue() ? (
            <Icon icon="flowbite:filter-solid" width="24" height="24" />
          ) : (
            <Icon icon="flowbite:filter-outline" width="24" height="24" />
          )}
        </button>
      }
      content={
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            className="h-8"
            placeholder={`Pesquisar por ${(column.columnDef.meta?.filterLabel as string).toLowerCase()}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="inline-flex items-center gap-4">
            <Button
              variant="outline"
              color="minimal"
              aria-label="Remover Filtro"
              className="flex h-7 w-30 justify-center gap-3 p-0.5"
              onClick={() => {
                setValue("");
                column.setFilterValue("");
              }}
            >
              <Icon icon="mdi:filter-off" width="24" height="24" />{" "}
              <span>Limpar</span>
            </Button>

            <Button
              className="h-7 w-30 self-end"
              color="minimal"
              onClick={() => column.setFilterValue(value)}
            >
              Aplicar
            </Button>
          </div>
        </div>
      }
    />
  );
};
