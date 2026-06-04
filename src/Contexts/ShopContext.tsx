import { createContext, useContext, useState, type ReactNode } from "react";
import type { IShop } from "../Interfaces/Shop.type";
import type { TAPIResonseData } from "../Interfaces/Generic.type";

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
      console.error("Can't fetch shops : ", error?.message());
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

      return data.data

    } catch (error: any) {
      console.error('Unable to fetch shop by id : ', error?.message);
      return null
    }
  }

  return {
    shops,
    fetchShops,
    createShop,
    selectedShop,
    setSelectedShop,
    fetchShopById
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