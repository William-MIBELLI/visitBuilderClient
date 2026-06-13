import ShopForm from "../Components/Shop/ShopForm";
import { Separator } from "@heroui/react";

const CreateShopRoute = () => {

  // const { id } = useParams();
  // const { getShopDetails } = useShopContext();
  // const [shop, setShop] = useState<IShop | null>();
  // const [isCreation, setIscreation] = useState<boolean>(false);


  // useEffect(() => {
  //   if (!id) {
  //     setIscreation(true);
  //     return;
  //   }
  //   const getShop = async () => {
  //     const shop = await getShopDetails(+id);
  //     setShop(shop);
  //     setIscreation(false);
  //   }

  //   getShop();
  // }, [id])

  const onSubmitHandler = (data: any) => {

  }
  

  return (
    <div className="bg-white flex flex-col h-full p-3">
      <div className="my-4">
        <p className="font-extrabold text-3xl text-bleu ">Create a new Shop</p>
        <p className="text-xs text-gray-500">Fields with * are required</p>

      </div>
      <Separator className="my-3 bg-turquoise"/>
      <ShopForm submitLabel="Create shop" submit={onSubmitHandler}/>
    </div>
  )
}

export default CreateShopRoute