import {
  Label,
  TextField,
  InputGroup,
  InputGroupSuffix,
  InputGroupInput,
  type InputGroupInputProps,
} from "@heroui/react";
import { X } from "lucide-react";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { TShopCreationKey } from "../../Validation/Shop.validation";

interface IProps extends InputGroupInputProps {
  label: string;
  name: TShopCreationKey;
}

const Input: FC<IProps> = ({ label, children, name, ...rest }) => {
  const { placeholder } = rest;
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <TextField>
          <Label className="label_input">{label}</Label>
          <InputGroup className={error ? "ring-rouge" : "ring-bleu"}>
            <InputGroupInput
              placeholder={placeholder}
              {...rest}
              ref={ref}
              value={value ?? ""}
              onChange={onChange}
            />
            <InputGroupSuffix>
              {error && <X className="text-rouge" size={15} />}
            </InputGroupSuffix>
          </InputGroup>
          <p className="error_input">{error?.message}</p>
        </TextField>
      )}
    />
  );
};
export default Input;
