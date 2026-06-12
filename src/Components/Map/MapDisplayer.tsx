import {
  Map, useMap
} from "@vis.gl/react-google-maps";
import type { IShop } from "../../Interfaces/Shop.type";
import { useEffect, useRef, useState, type FC } from "react";
import { MarkerClusterer, type Marker } from "@googlemaps/markerclusterer";
import ShopMarker from "./ShopMarker";
import { useShopContext } from "../../Contexts/ShopContext";
import ShopDetails from "./ShopDetails";

interface IProps {
  shops: IShop[];
}

const MapDisplayer: FC<IProps> = ({ shops }) => {
  const map = useMap();
  const { selectedShop } = useShopContext();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      }
      const newMarkers = { ...prev };
      delete newMarkers[key];
      return newMarkers;
    });
  };

  return (
    <div className="size-full relative">
      <Map
        defaultZoom={11}
        defaultCenter={{ lat: 48.868429, lng: 2.347439 }}
        mapId={import.meta.env.VITE_MAP_ID}
      >
        {shops &&
          shops.map((shop) => (
            <ShopMarker key={shop.id} shop={shop}/>
          ))}
      </Map>
      {
        selectedShop && (
          <ShopDetails shop={selectedShop}/>
        )
      }
    </div>
  );
};

export default MapDisplayer;
