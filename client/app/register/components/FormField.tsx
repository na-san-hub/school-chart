import { ReactNode } from "react";

type FieldType =
  | "text"
  | "email"
  | "password"
  | "select"
  | "radio"
  | "checkbox";

interface FormFieldProps {
  id?: string;
  label: string;
  type: FieldType;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({
  id,
  label,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
