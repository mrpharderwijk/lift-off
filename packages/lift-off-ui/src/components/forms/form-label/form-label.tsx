import { formLabelClassNames } from "@/components/forms/form-label/form-label.class-names";
import { PropsWithTestId } from "@/types";
import { cn } from "@/utils";
import { VariantProps } from "class-variance-authority";
import { LabelHTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type FormLabelProps = PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement> & PropsWithTestId & VariantProps<typeof formLabelClassNames>>;

export function FormLabel({ children, htmlFor, 'data-testid': dataTestId, ...props }: FormLabelProps): ReactElement {
  const formLabelClassName = cn('form-label', formLabelClassNames({ ...props } as VariantProps<typeof formLabelClassNames>));
  return <label className={formLabelClassName} htmlFor={htmlFor} data-testid={dataTestId} {...props}>{children}</label>;
}
