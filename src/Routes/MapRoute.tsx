import { useEffect } from "react";
import MapDisplayer from "../Components/Map/MapDisplayer"
import { useShopContext } from "../Contexts/ShopContext"

const MapRoute = () => {

  const { fetchShops, shops } = useShopContext();

  useEffect(() => {
    if (shops.length === 0) {
      fetchShops()
    }
  },[])

  return (
    <MapDisplayer shops={shops} />
  )
}

export default MapRoute