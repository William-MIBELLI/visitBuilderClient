import {
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxContent,
  Label,
} from "@heroui/react";
import type {
  TvisitConstraintKey,
  TVisitConstraintSchema,
} from "../../Validation/Shop.validation";
import { useState, type FC } from "react";

interface IProps {
  onChange: (constraint: TVisitConstraintSchema | undefined) => void;
}

const VisitCheckBoxGroup: FC<IProps> = ({ onChange }) => {
  const [constraints, setConstraints] = useState<TVisitConstraintSchema>({
    canBeAfternoon: false,
    canBeLunchBreak: false,
    canBeMorning: false,
  });

  const onChangeHandler = (key: TvisitConstraintKey, isSelected: boolean) => {
    const newConstraints: TVisitConstraintSchema = { ...constraints, [key]: isSelected };
    setConstraints(newConstraints);
    onChange(newConstraints);
  };

  return (
    <div className="flex flex-col ">
      <label className="label_input text-xs" htmlFor="checkbox_group">
        Visit constraints
      </label>
      <div id="checkbox_group" className="flex justify-evenly gap-3 grow">
        <Checkbox
          value="morning"
          onChange={(isSelected) => onChangeHandler("canBeMorning", isSelected)}
        >
          <CheckboxControl color="green">
            <CheckboxIndicator color="red" />
          </CheckboxControl>
          <CheckboxContent>
            <Label className="label_input">Morning</Label>
          </CheckboxContent>
        </Checkbox>

        <Checkbox
          value="lunchbreak"
          onChange={(isSelected) =>
            onChangeHandler("canBeLunchBreak", isSelected)
          }
        >
          <CheckboxControl>
            <CheckboxIndicator />
          </CheckboxControl>
          <CheckboxContent>
            <Label className="label_input">Lunchbreak</Label>
          </CheckboxContent>
        </Checkbox>

        <Checkbox
          value="afternoon"
          onChange={(isSelected) =>
            onChangeHandler("canBeAfternoon", isSelected)
          }
        >
          <CheckboxControl>
            <CheckboxIndicator />
          </CheckboxControl>
          <CheckboxContent>
            <Label className="label_input">afternoon</Label>
          </CheckboxContent>
        </Checkbox>
      </div>
    </div>
  );
};

export default VisitCheckBoxGroup;
