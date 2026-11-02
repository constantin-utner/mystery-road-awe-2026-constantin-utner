import type { ReactNode } from "react";

type SelectFieldProps = {
  name: string;
  label: string;
  hideLabel?: boolean;
  children: ReactNode;
};

export function SelectField({
  name,
  label,
  hideLabel = false,
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
      <select id={name} name={name}>
        {children}
      </select>
    </>
  );
}
