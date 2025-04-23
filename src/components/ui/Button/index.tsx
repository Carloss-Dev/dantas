import type React from "react";

type ButtonType = "submit" | "button" | "reset";

interface IPropsButton {
  children: React.ReactNode;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button = ({
  children,
  className,
  type,
  onClick,
}: IPropsButton) => {
  return (
    <div className={` ${className}`}>
      <button
        onClick={onClick}
        type={type ? type : "button"}
        className="bg-primary h-full w-full cursor-pointer rounded-sm font-bold tracking-wider text-white duration-200 hover:scale-105 hover:tracking-widest hover:shadow-lg"
      >
        {children}
      </button>
    </div>
  );
};
