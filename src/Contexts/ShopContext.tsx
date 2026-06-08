import { createContext, useContext, useState, type ReactNode } from "react";
import type { IShop } from "../Interfaces/Shop.type";
import type { TAPIResonseData } from "../Interfaces/Generic.type";
import { toast } from "@heroui/react";

const useShopContextValue = () => {

  const [shops, setShops] = useState<IShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<IShop | null>(null);
  
  const fetchShops = async () => {

    const url = import.meta.env.VITE_API_URL + "/shops";

    try {

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data: TAPIResonseData<IShop[]> = await response.json();

      if (data.errors !== null || data.status !== "success") {
        throw new Error(data.errors);
      }

      console.log('DATA : ', data);
      setShops(data.data);

    } catch (error: any) {
      toast.danger("Can't fetch shops : ", error?.message);
    }
  }

  const createShop = () => {

  }

  const fetchShopById = async (id: number): Promise<IShop | null> => {
    try {
      const url = import.meta.env.VITE_API_URL + `/shops/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data: TAPIResonseData<IShop> = await response.json();

      if (data.status !== 'success' || data.errors) {
        throw new Error(data.errors);
      }

      console.log("SHOP DETAILS : ", data)

      const { data: shopData } = data;
      
      const mapped = shops.map(shop => {
        if (shop.id === shopData.id) {
          return shopData;
        }
        return shop;
      })

      setShops(mapped);

      return shopData;

    } catch (error: any) {
      toast.danger('Unable to fetch shop by id : ', error?.message);
      return null
    }
  }

  const deleteShop = async (id: number): Promise<boolean> => {
    try {
      const url = import.meta.env.VITE_API_URL + "/shops/" + id;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.status !== 204) {
        throw new Error(response.status + ' ' + response.statusText);
      }

      const filtered = shops.filter(shop => shop.id !== id);
      setShops(filtered);
      setSelectedShop(null);

      return true;
    } catch (error: any) {
      toast.danger('Unable to delete this shop : ', error?.message)
      // console.error('Unable to delete this shop : ', error?.message);
      return false;
    }
  }

  const getShopDetails = async (id: number): Promise<IShop | null> => {

    const shop = shops.find(s => s.id === id);

    if (!shop) {
      toast.danger(`No Shop with the id ${id}`);
      return null
    }

    if (shop.availabilities.length > 0) {
      return shop;
    }

    const shopDetails = await fetchShopById(id);

    return shopDetails;
  }

  return {
    shops,
    fetchShops,
    createShop,
    selectedShop,
    setSelectedShop,
    deleteShop,
    getShopDetails
  };
}

type TShopContext = ReturnType<typeof useShopContextValue >;

const ShopContext = createContext<TShopContext>({} as TShopContext);

export const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  
  const value = useShopContextValue();

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export const useShopContext = () => useContext(ShopContext);