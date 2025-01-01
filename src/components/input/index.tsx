"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({
  name,
  placeholder,
  register,
  type,
  error,
  rules,
}: InputProps) => {
  return (
    <>
      <input
        className="h-11 w-full rounded-md border-2 px-2"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </>
  );
};

export default Input;
