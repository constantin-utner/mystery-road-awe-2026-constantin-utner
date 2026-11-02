import type { ReactNode } from "react";

type SelectFieldProps = {
  name: string;
  label: string;
  hideLabel?: boolean;
  defaultValue?: string;
  children: ReactNode;
};

export function SelectField({
  name,
  label,
  hideLabel = false,
  defaultValue,
  children,
}: SelectFieldProps) {
  return (
    <>
      <label
        htmlFor={name}
        className={hideLabel ? "visually-hidden" : undefined}
      >
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue}>
        {children}
      </select>
    </>
  );
}
