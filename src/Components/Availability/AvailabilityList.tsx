import type { FC } from "react";
import {
  dayNames,
  type IAvailability,
} from "../../Interfaces/Availability.type";
import { regroupAvailabilitiesByDay } from "../../Utils/Mapping";
import AvailabilityItem from "./AvailabilityItem";
import { Separator } from "@heroui/react";
import { type UseFieldArrayRemove } from "react-hook-form";

interface IProps {
  avails: IAvailability[];
  remove: UseFieldArrayRemove;
}

const AvailabilityList: FC<IProps> = ({ avails, remove }) => {
  const regrouped = regroupAvailabilitiesByDay(avails);

  const onRemoveHandler = (id: string) => {
    const index = avails.findIndex((avail) => avail.id === id);
    if (index === -1) return;
    remove(index);
  };

  return (
    <div className="flex flex-col gap-1 my-1">
      {Object.keys(regrouped).map((key) => (
        <>
          <div key={key} className="grid grid-cols-2">
            <p className="font-semibold text-sm">{dayNames[+key]}</p>
            <div className="flex flex-col">
              {regrouped[+key] &&
                regrouped[+key].map((avail) => (
                  <AvailabilityItem
                    avail={avail}
                    onRemoveHandler={onRemoveHandler}
                  />
                ))}
            </div>
          </div>
          <Separator />
        </>
      ))}
    </div>
  );
};

export default AvailabilityList;
