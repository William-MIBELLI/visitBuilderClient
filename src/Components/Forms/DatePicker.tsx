import {
  Label,
  DateField,
  Calendar,
  DatePicker as DP,
  type DateValue,
} from "@heroui/react";
import {
  CalendarDate, type CalendarDateTime,
  type ZonedDateTime
} from "@internationalized/date";
import { useEffect, useState, type FC } from "react";
import type { FieldError } from "react-hook-form";

interface IProps {
  label: string;
  onChange: (value?: string) => void;
  error?: FieldError;
  value: string | undefined;
}

const DatePicker: FC<IProps> = ({ label, onChange, error, value }) => {
  const [val, setVal] = useState<DateValue | null>(null);

  const onChangeHandler = (
    value: CalendarDate | CalendarDateTime | ZonedDateTime | null,
  ) => {
    setVal(value);
    onChange(value?.toString());
  };

  useEffect(() => {
    if (!value) return;
    const date = new Date(value);
    const dateValue = new CalendarDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    onChange(dateValue.toString());
  }, [value]);

  return (
    <div className="flex  flex-col gap-4">
      <DP name="date" value={val} onChange={onChangeHandler}>
        <Label className="label_input">{label}</Label>
        <DateField.Group fullWidth>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DP.Trigger>
              <DP.TriggerIndicator />
            </DP.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DP.Popover>
          <Calendar aria-label="Event date">
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({ year }) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DP.Popover>
        {error && <p className="error_input">{error.message}</p>}
      </DP>
    </div>
  );
};

export default DatePicker;
