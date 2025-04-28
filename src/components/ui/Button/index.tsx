import type { MouseEventHandler, ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";

type ButtonType = "submit" | "button" | "reset";

const button = tv({
	base: "h-full w-full cursor-pointer rounded-sm font-bold tracking-wider text-white duration-200 hover:scale-105 hover:tracking-widest hover:shadow-lg bg bg-primary",

	variants: {
		variant: {
			danger: "bg-red-500",
		},
	},
});

interface IPropsButton extends VariantProps<typeof button> {
	children: ReactNode;
	type?: ButtonType;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export const Button = ({
	children,
	className,
	type = "button",
	variant,
	onClick,
}: IPropsButton) => {
	return (
		<div className={`${className}`}>
			<button onClick={onClick} type={type} className={button({ variant })}>
				{children}
			</button>
		</div>
	);
};
