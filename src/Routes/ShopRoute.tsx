import { useParams } from "react-router-dom"
import { useShopContext } from "../Contexts/ShopContext";
import { useEffect, useState } from "react";
import type { IShop } from "../Interfaces/Shop.type";
import ShopForm from "../Components/Shop/ShopForm";
import { Separator } from "@heroui/react";

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
    <div className="bg-white flex flex-col h-full p-3">
      <div className="my-4">
        <p className="font-extrabold text-3xl text-bleu ">Create a new Shop</p>
        <p className="text-xs text-gray-500">Fields with * are required</p>

      </div>
      <Separator className="my-3 bg-turquoise"/>
      <ShopForm shop={shop}/>
    </div>
  )
}

export default ShopRoute