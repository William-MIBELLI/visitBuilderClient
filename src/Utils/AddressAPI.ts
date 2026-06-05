import { toast } from "@heroui/react";
import type {
  AddressApiResponse,
  AddressFeature,
} from "../Interfaces/Address.type";

export const fetchAddressListFromAPI = async (
  query: string,
): Promise<AddressFeature[] | null> => {
  try {
    const url = `https://data.geopf.fr/geocodage/search?q=${query}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status !== 200) {
      throw new Error(`${response.status} : ${response.statusText}`);
    }
    const { features }: AddressApiResponse = await response.json();

    return features;
  } catch (error: any) {
    toast.danger("Unable to retrieve address : ", error?.message);
    return null;
  }
};
