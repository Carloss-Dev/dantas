import type React from "react";
import { type VariantProps, tv } from "tailwind-variants";

type ButtonType = "submit" | "button" | "reset";

const button = tv({
  base: "h-full w-full cursor-pointer rounded-sm font-bold tracking-wider duration-200 hover:scale-105 hover:tracking-widest hover:shadow-lg bg-primary text-white",

  variants: {
    color: {
      danger: "bg-red-500 text-white",
      minimal: "bg-gray-800 text-white",
    },

    variant: {
      outline:
        "bg-transparent border border-white text-white hover:bg-white hover:text-black",
    },
  },

  compoundVariants: [
    {
      variant: "outline",
      color: "danger",
      class: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    },
    {
      variant: "outline",
      color: "minimal",
      class: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
    },
  ],
});

interface IPropsButton extends VariantProps<typeof button> {
  children: React.ReactNode;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button = ({
  children,
  className,
  type = "button",
  color,
  variant,
  onClick,
}: IPropsButton) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={button({ color, variant, className })}
    >
      {children}
    </button>
  );
};
