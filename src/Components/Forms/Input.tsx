import {
  Label,
  TextField,
  InputGroup,
  InputGroupSuffix,
  InputGroupInput,
  type InputGroupInputProps,
} from "@heroui/react";
import { X } from "lucide-react";
import type { FC, ReactNode } from "react";
import { type FieldError } from "react-hook-form";

interface IProps extends InputGroupInputProps {
  label: string;
  children?: ReactNode;
  error?: FieldError;
}

const Input: FC<IProps> = ({ label, children, error, ...rest }) => {
  const { placeholder } = rest;

  return (
    <TextField>
      <Label className="label_input">{label}</Label>
      <InputGroup className={error ? "ring-rouge" : "ring-bleu"}>
        <InputGroupInput placeholder={placeholder} {...rest} />
        <InputGroupSuffix>
          {error && <X className="text-rouge" size={15} />}
        </InputGroupSuffix>
      </InputGroup>
      <p className="error_input">
        {error?.message}
      </p>
    </TextField>
  );
};

export default Input;
