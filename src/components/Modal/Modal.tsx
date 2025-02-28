import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Dialog } from "radix-ui";
import type React from "react";

interface IPropsModal {
  modalButton?: React.ReactNode;
  title?: string;
  description?: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
}

export const Modal = ({
  modalButton,
  title,
  description,
  content,
  setActive,
  active,
}: IPropsModal) => {
  return (
    <Dialog.Root onOpenChange={setActive} open={active}>
      <Dialog.Trigger asChild>{modalButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlay-show fixed inset-0 cursor-pointer bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-content-show fixed top-1/2 left-1/2 flex max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-1.5 rounded-md border bg-white p-[25px] shadow-lg focus:outline-none">
          <Dialog.Title className="m-0 text-3xl font-bold tracking-wider text-neutral-900">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-3 text-lg text-neutral-800">
            {description}
          </Dialog.Description>

          <Dialog.Close
            asChild
            className="absolute top-1 right-1 cursor-pointer"
          >
            <Icon
              icon="line-md:close-circle-filled"
              className="text-neutral-900"
              width="24"
              height="24"
            />
          </Dialog.Close>
          {content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
