import { cn } from "@/lib/utils";
import React from "react";

function Input({
  id,
  name,
  type,
  label,
  placeholder,
  className,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
      />
    </div>
  );
}

export { Input };
