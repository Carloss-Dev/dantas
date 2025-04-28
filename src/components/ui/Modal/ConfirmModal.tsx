import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Dialog } from "radix-ui";
import React from "react";
import { Button } from "../Button";

interface IPropsConfirmModal {
	modalButton?: React.ReactNode;
	title?: string;
	description?: string;
	content?: React.ReactNode;
	modalControl?: boolean;
	setModalControl?: React.Dispatch<React.SetStateAction<boolean>>;
	onCancel: () => void;
	onConfirm: () => void;
}

export const ConfirmModal = ({
	modalButton,
	title,
	description,
	content,
	setModalControl = undefined,
	onCancel,
	onConfirm,
	modalControl = undefined,
}: IPropsConfirmModal) => {
	const [isActive, setIsActive] = React.useState<boolean>(false);

	function cancelDelete() {
		onCancel();
		setIsActive(false);
	}

	function confirmDelete() {
		onConfirm();
	}

	return (
		<Dialog.Root
			onOpenChange={setModalControl ?? setIsActive}
			open={modalControl ?? isActive}
		>
			<Dialog.Trigger asChild>{modalButton}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-overlay-show fixed inset-0 cursor-pointer bg-black/50" />
				<Dialog.Content className="data-[state=open]:animate-content-show fixed top-1/2 left-1/2 flex max-h-[85vh] w-fit max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-1.5 rounded-md border bg-white p-[25px] shadow-lg focus:outline-none">
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
					<p className="mb-3 text-lg text-neutral-800">{content}</p>

					<div className="flex justify-end gap-4 mt-3">
						<Button className="w-30 h-10" onClick={cancelDelete}>
							Cancelar
						</Button>
						<Button
							variant="danger"
							className="w-30 h-10"
							onClick={confirmDelete}
						>
							Confirmar
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
