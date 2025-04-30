import { Popover } from "radix-ui";
import type React from "react";

interface ICustomPopover {
  content?: React.ReactNode;
  triggerButton?: React.ReactNode;
}

export const CustomPopover = ({ content, triggerButton }: ICustomPopover) => (
  <Popover.Root>
    <Popover.Trigger asChild>{triggerButton}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        side="right"
        className="flex items-center justify-center rounded border border-gray-300 bg-white p-2.5 shadow-xl"
      >
        {content}
        <Popover.Arrow className="fill-gray-300" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
