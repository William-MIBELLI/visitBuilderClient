import { useEffect, type Dispatch, type FC } from "react";
import type { IShop } from "../../Interfaces/Shop.type";
import {
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { EllipsisVertical, Phone, PhoneMissed } from "lucide-react";
import { useShopContext } from "../../Contexts/ShopContext";

interface IProps {
  shop: IShop;
}

const ShopMarker: FC<IProps> = ({ shop }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { selectedShop, setSelectedShop } = useShopContext();

  const onClickHandler = (e: google.maps.MapMouseEvent) => {
    if (!selectedShop || selectedShop?.id !== shop.id) {
      setSelectedShop(shop);
      return;
    }
    setSelectedShop(null);
  };

  return (
    <AdvancedMarker
      key={shop.id}
      position={{ lat: shop.lat, lng: shop.lng }}
      ref={markerRef}
      onClick={onClickHandler}
    >
      {!selectedShop || selectedShop.id !== shop.id ? (
        <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
      ) : (
        <Pin background={"red"} glyphColor={"#000"} borderColor={"#000"} />
      )}
    </AdvancedMarker>
  );
};

export default ShopMarker;
