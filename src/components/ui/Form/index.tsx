import type React from "react";

interface IPropsForm {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

export const Form = ({ children, className, onSubmit }: IPropsForm) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`h-fit w-fit rounded-md border p-3.5 shadow-md ${className} flex flex-col gap-4`}
    >
      {children}
    </form>
  );
};
