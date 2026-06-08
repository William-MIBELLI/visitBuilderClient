import {
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxContent,
  Label,
} from "@heroui/react";

const VisitCheckBoxGroup = () => {
  return (
    <div className="flex flex-col ">
      <label className="label_input text-xs" htmlFor="checkbox_group">
        Visit constraints
      </label>
      <div id="checkbox_group" className="flex justify-evenly gap-3 grow">
        <Checkbox value="morning">
          <CheckboxControl>
            <CheckboxIndicator/>
          </CheckboxControl>
          <CheckboxContent>
            <Label className="label_input">Morning</Label>
          </CheckboxContent>
        </Checkbox>
        <Checkbox value="lunchbreak">
          <CheckboxControl>
            <CheckboxIndicator />
          </CheckboxControl>
          <CheckboxContent>
            <Label className="label_input">Lunchbreak</Label>
          </CheckboxContent>
        </Checkbox>
        <Checkbox value="afternoon">
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
