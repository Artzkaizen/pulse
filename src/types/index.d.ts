import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

declare interface CustomFormFieldProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formschema>>;
  placeholder: string;
  label: string;
  isPasswordVisible?: boolean;
}
``;
