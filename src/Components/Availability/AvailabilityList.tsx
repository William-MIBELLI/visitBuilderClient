import type { FC } from "react";
import { dayNames, type IAvailability } from "../../Interfaces/Availability.type";
import { regroupAvailabilitiesByDay } from "../../Utils/Mapping";
import AvailabilityItem from "./AvailabilityItem";
import { Separator } from "@heroui/react";

interface IProps {
  avails: IAvailability[];
}

const AvailabilityList: FC<IProps> = ({ avails }) => {

  const regrouped = regroupAvailabilitiesByDay(avails);

  console.log('AVAILS : ', avails);
  return (
    <div className="flex flex-col gap-1 my-1">
      {
        Object.keys(regrouped).map(key => (
          <>
          <div key={key} className="grid grid-cols-3">
            <p className="font-semibold text-sm">
              {dayNames[+key]}
            </p>
            <div className="flex flex-col">
              {
                regrouped[+key] && regrouped[+key].map(avail => (
                  <AvailabilityItem avail={avail}/>
                ))
              }

            </div>
          </div>
            <Separator/>
          </>
        ))
      }
    </div>
  )
}

export default AvailabilityList