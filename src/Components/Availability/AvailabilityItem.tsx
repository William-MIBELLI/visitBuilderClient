import type { FC } from "react";
import { type IAvailability } from "../../Interfaces/Availability.type";
import { CircleMinus } from "lucide-react";

interface IProps {
  avail: IAvailability;
}

const AvailabilityItem: FC<IProps> = ({  avail }) => {
  return (
    <div className="grid grid-cols-2 justify-between text-xs  items-center">
      {/* <p >{dayNames[+avail.dayOfWeek - 1]}</p> */}
      <p>{`${avail.openTime} - ${avail.closeTime}`}</p>
      <CircleMinus className="text-rouge cursor-pointer" size={20} />
    </div>
  );
};

export default AvailabilityItem;
