import type { FC } from "react";
import type { IAvailability } from "../../Interfaces/Availability.type";
import { Separator } from "@heroui/react";

interface IProps {
  avails: IAvailability[];
}
const ShopPlanning: FC<IProps> = ({ avails }) => {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const regroupedByDay: { [Key: number]: IAvailability[] } = {};

  avails.forEach((avail) => {
    if (Object.keys(regroupedByDay).includes((avail.dayOfWeek - 1).toString())) {
      regroupedByDay[avail.dayOfWeek - 1].push(avail);
      return;
    }
    regroupedByDay[avail.dayOfWeek - 1] = [avail];
  });

  return (
    <div>
      <Separator className="my-3" />
      <div className="flex flex-col gap-2">
        {dayNames.map((name, index) => (
          <div key={index} className="flex items-center justify-between text-sm min-h-9">
            <p className="font-semibold">{name}</p>
            <div >
              {regroupedByDay[index] && regroupedByDay[index].length > 0 ? (
                regroupedByDay[index].map((avail) => (
                  <p key={avail.id} className="text-right text-xs">
                    {avail.openTime} - {avail.closeTime}
                  </p>
                ))
              ) : (
                <p className="text-xs text-red-500 text-right font-semibold">Closed.</p>
              )}

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ShopPlanning;
