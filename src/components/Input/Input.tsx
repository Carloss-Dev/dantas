import type React from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputType = "text" | "password" | "email";

interface IPropsInput<T extends FieldValues> {
  id?: string;
  name?: Path<T> | string;
  label?: string;
  type: InputType;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
  register?: UseFormRegister<T>;
  errors?: FieldError;
  icon?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = <T extends FieldValues>({
  id,
  label,
  placeholder,
  name,
  type,
  className,
  disabled,
  required,
  register,
  errors,
  icon,
  value,
  onChange,
}: IPropsInput<T>) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-md inline-flex justify-between font-bold tracking-wider"
        >
          <span>
            {label} {required && <span className="text-red-500"> * </span>}
          </span>
          {errors && (
            <span className="block self-end text-sm text-red-500">
              {errors.message}
            </span>
          )}
        </label>
      )}
      <div className="relative h-11 w-full">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          {...(register
            ? register(name as Path<T>, { required })
            : { name, onChange })}
          className={`focus:border-primary ease absolute h-full w-full rounded-sm border-1 border-neutral-500 p-3 text-base outline-0 transition-all duration-100 focus:shadow-md ${icon && "pr-12"} `}
        />

        {icon && (
          <div className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
