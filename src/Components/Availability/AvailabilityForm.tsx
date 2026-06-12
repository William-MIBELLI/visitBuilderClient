import {
  Label,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  Select,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  SelectValue,
  TimeField,
  Button,
} from "@heroui/react";
import { dayNames } from "../../Interfaces/Availability.type";
import { Plus } from "lucide-react";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAvailabilitySchema,
  type TCreateAvailavbilitySchema,
} from "../../Validation/Availability.validation";
import { Time } from "@internationalized/date";
import type { TCreateShopSChema } from "../../Validation/Shop.validation";
import AvailabilityList from "./AvailabilityList";

const AvailabilityForm = () => {
  const { control: parentControl } = useFormContext<TCreateShopSChema>();
  const { append, fields, remove } = useFieldArray({
    control: parentControl,
    name: "availabilities",
  });

  const {
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(CreateAvailabilitySchema),
    defaultValues: {
      closeTime: "",
      dayOfWeek: undefined,
      openTime: "",
    },
  });


  const onAddAvailability = (data: TCreateAvailavbilitySchema) => {
    append(data);
    reset();
  };

  return (
    <div className="flex flex-col ">

      <AvailabilityList avails={fields} remove={remove}/>

      <div className="grid grid-cols-10 col-span-2 gap-x-3 items-end">

        <Controller
          control={control}
          name="dayOfWeek"
          defaultValue={undefined}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              className="col-span-3"
              onChange={onChange}
              placeholder="Select a day"
              value={value ? value : null}
            >
              <Label className="label_input">Day</Label>
              <SelectTrigger className={error && "border-2 border-rouge"}>
                <SelectValue />
                <SelectIndicator />
              </SelectTrigger>
              <SelectPopover>
                <ListBox>
                  {dayNames.map((day, index) => (
                    <ListBoxItem key={day} id={index+1} textValue={day}>
                      <p className="text-bleu font-semibold">{day}</p>
                      <ListBoxItemIndicator className="text-turquoise" />
                    </ListBoxItem>
                  ))}
                </ListBox>
              </SelectPopover>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="openTime"
          render={({ field: { onChange, value } }) => {
            const timeValue = value
              ? new Time(
                  parseInt(value.split(":")[0]),
                  parseInt(value.split(":")[1]),
                )
              : null;

            return (
              <TimeField
                className="col-span-3"
                onChange={(value) => {
                  if (!value) return;
                  const hour = value.hour.toString().padStart(2, "0");
                  const minutes = value.minute.toString().padStart(2, "0");
                  onChange(`${hour}:${minutes}`);
                }}
                value={timeValue}
              >
                <Label className="label_input">Open Time</Label>
                <TimeField.Group>
                  <TimeField.Input>
                    {(segment) => <TimeField.Segment segment={segment} />}
                  </TimeField.Input>
                </TimeField.Group>
              </TimeField>
            );
          }}
        />

        <Controller
          control={control}
          name="closeTime"
          render={({ field: { onChange, value } }) => {
            const timeValue = value
              ? new Time(
                  parseInt(value.split(":")[0]),
                  parseInt(value.split(":")[1]),
                )
              : null;

            return (
              <TimeField
                value={timeValue}
                className="col-span-3"
                onChange={(value) => {
                  if (!value) return;
                  const hour = value.hour.toString().padStart(2, "0");
                  const minutes = value.minute.toString().padStart(2, "0");
                  onChange(`${hour}:${minutes}`);
                }}
              >
                <Label className="label_input">Close Time</Label>
                <TimeField.Group>
                  <TimeField.Input>
                    {(segment) => <TimeField.Segment segment={segment} />}
                  </TimeField.Input>
                </TimeField.Group>
              </TimeField>
            );
          }}
        />
        <Button
          isIconOnly
          className="bg-bleu"
          onClick={handleSubmit(onAddAvailability)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityForm;
