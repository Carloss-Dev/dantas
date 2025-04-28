import { Input } from "@/components/ui/Input";
import { Icon } from "@iconify-icon/react";
import { Popover, Separator, Tooltip } from "radix-ui";
import React from "react";

interface IMultiSelectProps {
  label?: string;
  options?: string[];
  required?: boolean;
  errors?: string;
  placeholder?: string;
  maxVisibleItems?: number;
  onChange?: (selected: string[]) => void;
}

export const MultiSelect = ({
  options,
  placeholder = "Selecione...",
  onChange,
  maxVisibleItems = 3,
  label,
  required,
  errors,
}: IMultiSelectProps) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    onChange?.(selected);
  }, [onChange, selected]);

  function toggleSelection(option: string) {
    const newSelection = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    setSelected(newSelection);

    onChange?.(newSelection);
  }

  function removeAllSelected() {
    setSelected([]);
    onChange?.(selected);
  }

  const visibleTags = selected.slice(0, maxVisibleItems);
  const hiddenTagsCount = selected.length - visibleTags.length;

  return (
    <div
      className={`${label ? "h-[74px]" : "h-11"} flex w-full flex-col gap-1`}
    >
      {label && (
        <p className="text-md inline-flex h-fit justify-between font-bold tracking-wider">
          <span
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e: React.KeyboardEvent) =>
              e.key === "Enter" && setIsOpen(!isOpen)
            }
          >
            {label} {required && <span className="text-red-500">*</span>}
          </span>
          {errors && (
            <span className="block self-end text-sm text-red-500">
              {errors}
            </span>
          )}
        </p>
      )}
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger className="data-[state=open]:border-primary flex h-full w-full cursor-pointer items-center justify-between rounded-md border border-neutral-500 p-2 text-sm shadow-sm transition-all duration-100">
          <div className="flex flex-wrap gap-2">
            {visibleTags.length > 0 ? (
              visibleTags.map((tag) => (
                <div
                  key={tag}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-500 bg-gray-200 py-1 ps-3 pe-1 transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <span className="max-w-12 overflow-hidden text-sm overflow-ellipsis whitespace-nowrap">
                    {tag}
                  </span>
                  <Icon
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleSelection(tag);
                    }}
                    icon="material-symbols:close"
                    className="rounded-full p-1 text-sm text-gray-600 hover:bg-gray-300"
                  />
                </div>
              ))
            ) : (
              <span className="text-base text-gray-500">{placeholder}</span>
            )}
            {hiddenTagsCount > 0 && (
              <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-600">
                      +{hiddenTagsCount}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side="top"
                    align="center"
                    className="flex w-60 max-w-60 flex-wrap gap-2 rounded-md bg-white p-2 text-sm text-black shadow-md"
                  >
                    {selected.slice(maxVisibleItems).map((tag) => (
                      <div
                        key={tag}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-500 bg-gray-100 py-1 ps-3 pe-1 transition-all duration-200 hover:scale-105 hover:shadow-md"
                      >
                        <span className="max-w-12 overflow-hidden text-sm overflow-ellipsis whitespace-nowrap">
                          {tag}
                        </span>
                        <Icon
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            toggleSelection(tag);
                          }}
                          icon="material-symbols:close"
                          className="rounded-full p-1 text-sm text-gray-600 hover:bg-gray-300"
                        />
                      </div>
                    ))}
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </div>
          <Icon
            icon="ep:arrow-down-bold"
            className="cursor-pointer text-lg text-gray-500"
          />
        </Popover.Trigger>
        <Popover.Content
          align="start"
          side="bottom"
          className="z-50 w-56 rounded-md border border-neutral-500 bg-white p-2 shadow-lg"
        >
          <Input
            type="text"
            value={query}
            id="search"
            placeholder="Buscar..."
            className="h-10 text-sm"
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="mt-2 max-h-40 overflow-y-auto">
            {filteredOptions && filteredOptions.length > 0 ? (
              filteredOptions?.map((option) => (
                <li
                  key={option}
                  className="hover:text-primary hover:bg-primary/20 flex cursor-pointer items-start gap-2 rounded-md p-2 text-sm"
                  onClick={() => toggleSelection(option)}
                  onKeyDown={(e: React.KeyboardEvent) =>
                    e.key === "Enter" && toggleSelection(option)
                  }
                >
                  <input
                    type="checkbox"
                    id={option}
                    checked={selected.includes(option)}
                    onChange={() => toggleSelection(option)}
                    className="text-primary h-5 w-5 cursor-pointer rounded border border-gray-400 focus:ring-0"
                  />
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500">
                Nenhuma opção encontrada
              </li>
            )}
          </ul>
          <Separator.Root
            orientation="vertical"
            decorative
            className="my-1 h-px w-full bg-gray-400"
          />

          <div className="flex h-fit w-full gap-1">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-300"
            >
              Fechar
            </button>

            {selected.length > 0 && (
              <>
                <Separator.Root
                  orientation="vertical"
                  decorative
                  className="h-5 w-px self-center bg-gray-400"
                />
                <button
                  onClick={removeAllSelected}
                  className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-300"
                >
                  Limpar
                </button>
              </>
            )}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
