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
import { type FC } from "react";

interface IProps {
  onChange: (constraint: TVisitConstraintSchema | undefined) => void;
  value: TVisitConstraintSchema
}

const VisitCheckBoxGroup: FC<IProps> = ({ onChange, value }) => {

  const onChangeHandler = (key: TvisitConstraintKey, isSelected: boolean) => {
    const newConstraints: TVisitConstraintSchema = { ...value, [key]: isSelected };
    onChange(newConstraints);
  };

  return (
    <div className="flex flex-col ">
      <label className="label_input text-xs" htmlFor="checkbox_group">
        Visit constraints
      </label>
      <div id="checkbox_group" className="flex justify-evenly gap-3 grow">
        <Checkbox
          isSelected={value?.canBeMorning}
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
          isSelected={value?.canBeLunchBreak}
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
          isSelected={value?.canBeAfternoon}
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
