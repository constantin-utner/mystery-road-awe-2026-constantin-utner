import type { ReactNode } from "react";

type SelectFieldProps = {
  name: string;
  label: string;
  hideLabel?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

export function SelectField({
  name,
  label,
  hideLabel = false,
  value,
  onValueChange,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onValueChange?.(event.currentTarget.value)}
      >
        {children}
      </select>
    </>
  );
}
