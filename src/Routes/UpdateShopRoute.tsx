import { Separator } from "@heroui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShopForm from "../Components/Shop/ShopForm";
import { useShopContext } from "../Contexts/ShopContext";
import type { IShop } from "../Interfaces/Shop.type";

const UpdateShopRoute = () => {
  
  const { id } = useParams();
  const { getShopDetails } = useShopContext();
  const [shop, setShop] = useState<IShop | null>();


  useEffect(() => {
    if (!id) {
      return;
    }
    const getShop = async () => {
      const shop = await getShopDetails(+id);
      setShop(shop);
    }

    getShop();
  }, [id])

  const onSubmitHandler = (data: any) => {
    console.log('DATA DANS UPDATE ROUTE : ', data);
  }
  

  return (
    <div className="bg-white flex flex-col h-full p-3">
      <div className="my-4">
        <p className="font-extrabold text-3xl text-bleu ">Update Shop <p>{shop?.placeName}</p></p>
        <p className="text-xs text-gray-500">Fields with * are required</p>

      </div>
      <Separator className="my-3 bg-turquoise"/>
      <ShopForm shop={shop} submitLabel="Update shop" submit={onSubmitHandler}/>
    </div>
  )
}

export default UpdateShopRoute