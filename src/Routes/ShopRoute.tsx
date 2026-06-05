import { useParams } from "react-router-dom"
import { useShopContext } from "../Contexts/ShopContext";
import { useEffect, useState } from "react";
import type { IShop } from "../Interfaces/Shop.type";
import ShopForm from "../Components/Shop/ShopForm";

const ShopRoute = () => {

  const { id } = useParams();
  const { getShopDetails } = useShopContext();
  const [shop, setShop] = useState<IShop | null>();
  const [isCreation, setIscreation] = useState<boolean>(false);


  useEffect(() => {
    if (!id) {
      setIscreation(true);
      return;
    }
    const getShop = async () => {
      const shop = await getShopDetails(+id);
      setShop(shop);
      setIscreation(false);
    }

    getShop();
  }, [id])
  

  return (
    <div>
      <h1>PARAMS</h1>
      <ShopForm/>
    </div>
  )
}

export default ShopRoute