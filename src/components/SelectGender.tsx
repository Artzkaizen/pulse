import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGenderFieldProps } from "@/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const SelectGenderField = ({
  name,
  label,
  options,
  control,
  placeholder,
  className,
}: SelectGenderFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="flex w-full flex-col gap-1 rounded-lg bg-secondary p-2 ring-2 ring-secondary focus-within:bg-primary-foreground focus-within:ring-primary">
            <FormLabel className="text-xs capitalize text-destructive">
              {label}
            </FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className={className}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map(({ value, name }) => (
                      <SelectItem key={value} value={value}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectGenderField;
