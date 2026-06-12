import type { FC } from "react";
import { type IAvailability } from "../../Interfaces/Availability.type";
import { CircleMinus } from "lucide-react";

interface IProps {
  avail: IAvailability;
  onRemoveHandler: (id: string) => void;
}

const AvailabilityItem: FC<IProps> = ({ avail, onRemoveHandler }) => {
  

  return (
    <div className="flex grow justify-between text-xs  items-center">
      <p>{`${avail.openTime} - ${avail.closeTime}`}</p>
      <CircleMinus className="text-rouge cursor-pointer" size={20} onClick={() => onRemoveHandler(avail.id)} />
    </div>
  );
};

export default AvailabilityItem;
