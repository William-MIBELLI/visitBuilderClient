import { useEffect, useState, type FC } from "react";
import type { IShop } from "../../Interfaces/Shop.type";
import {
  ChevronDown,
  EllipsisVertical,
  Phone,
  PhoneMissed,
} from "lucide-react";
import VisitTiming from "./VisitTiming";
import { useShopContext } from "../../Contexts/ShopContext";
import type { IAvailability } from "../../Interfaces/Availability.type";
import ShopPlanning from "./ShopPlanning";
import { Spinner } from "@heroui/react";

interface IProps {
  shop: IShop;
}

const ShopDetails: FC<IProps> = ({ shop }) => {
  const { fetchShopById } = useShopContext();
  const [displayPlanning, setDisplayPlanning] = useState<boolean>(false);
  const [avails, setAvails] = useState<IAvailability[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onClickPlanningHandler = async () => {
    if (displayPlanning) {
      setDisplayPlanning(false);
      return;
    }
    setLoading(true);
    const data = await fetchShopById(shop.id);
    if (data) {
      setAvails(data.availabilities);
      setDisplayPlanning(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    setAvails(null);
    setDisplayPlanning(false);
  },[shop])

  return (
    <div className="bg-white absolute bottom-4 right-4 min-w-64 overflow-hidden rounded-2xl">
      <div className="bg-bleu px-6 py-3 text-white font-semibold text-left flex items-center justify-between gap-3">
        <p>{shop.placeName}</p>
        <div className="cursor-pointer rounded-full  hover:bg-blue-900">
          <EllipsisVertical size={18} className="cursor-pointer m-1" />
        </div>
      </div>
      <div className="bg-white p-6 border-r-4 border-turquoise text-sm">
        <div className="text-gray-700 mb-2 ">
          <p>{shop.address}</p>
          <p>
            {shop.postalCode} {shop.city}
          </p>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          {shop?.phone ? (
            <>
              <Phone size={15} />
              <p>+33 {shop.phone}</p>
            </>
          ) : (
            <>
              <PhoneMissed size={10} />
              <p className="text-red-500">No phone</p>
            </>
          )}
        </div>
        <div className="my-4 text-sm">
          <VisitTiming text="Morning" isAuthorized={shop.canBeMorning} />
          <VisitTiming text="Lunchbreak" isAuthorized={shop.canBeLunchBreak} />
          <VisitTiming text="Afternoon" isAuthorized={shop.canBeAfternoon} />
        </div>
        <div
          className="flex items-center justify-end mt-3 gap-1 cursor-pointer"
          onClick={onClickPlanningHandler}
        >
          <p className="text-right text-sm text-gray-700 italic hover:underline">
            Show planning
          </p>
          <ChevronDown size={13} />
        </div>
        {loading && (
          <div className="flex items-center justify-center my-3">
            <Spinner size="md" className="text-bleu"/>
          </div>
        )}
        {displayPlanning && avails && <ShopPlanning avails={avails} />}
      </div>
    </div>
  );
};

export default ShopDetails;
