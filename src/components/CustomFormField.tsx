import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CustomFormFieldProps } from "@/types";

const CustomFormField = ({
  name,
  label,
  control,
  placeholder,
  isPasswordVisible,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-item">
          <div className="flex w-full flex-col gap-1 rounded-lg bg-secondary p-2 ring-2 ring-secondary focus-within:bg-primary-foreground focus-within:ring-primary">
            <FormLabel className="text-xs capitalize text-destructive">
              {label} *
            </FormLabel>
            <FormControl>
              <Input
                className={cn(
                  "flex h-6 w-full gap-6 rounded-none border-0 bg-transparent p-0 text-black outline-none ring-0 focus-within:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
                placeholder={placeholder}
                {...field}
                type={
                  name === "password" && isPasswordVisible
                    ? "text"
                    : name === "password"
                      ? "password"
                      : "text"
                }
                value={field.value || ""}
                onChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
