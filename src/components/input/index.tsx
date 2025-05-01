"use client";
import type { UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  typeInput?: "input" | "textarea";
}

export function Input({
  placeholder,
  type,
  name,
  register,
  error,
  className,
  typeInput = "input",
}: InputProps) {
  const commonProps = {
    className: `w-full border-2 border-gray-200 rounded-md p-2 h-11 px-2 ${className || ""}`,
    placeholder,
    id: name,
    ...register(name),
  };

  return (
    <>
      {typeInput === "textarea" ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && <span className="text-red-500 text-sm my-1">{error}</span>}
    </>
  );
}
