import { InputGroup, InputGroupInput, InputGroupSuffix, type InputProps } from "@heroui/react";
import { fetchAddressListFromAPI } from "../../Utils/AddressAPI";
import { useState, type ChangeEvent, type FC } from "react";
import type { AddressFeature } from "../../Interfaces/Address.type";
import { Check } from "lucide-react";
import type { TAddressSchema } from "../../Validation/Address.validation";

interface IProps  {
  onChange: (address: TAddressSchema | undefined) => void
}



const AddressInput: FC<IProps> = ({ onChange }) => {
  const [list, setList] = useState<AddressFeature[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressFeature | null>(
    null,
  );
  const [value, setValue] = useState<string>("");

  const onAddressChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedAddress(null);
    const query = e.target.value;
    setValue(query);
    if (query.length <= 3) {
      setList(null);
      return;
    }
    const data = await fetchAddressListFromAPI(query);

    setList(data);
  };
  
  const onSelectHandler = (address: AddressFeature) => {
    setSelectedAddress(address);
    setValue(address.properties.label);
    const ad: TAddressSchema = {
      city: address.properties.city,
      country: "France",
      lat: address.geometry.coordinates[1],
      lng: address.geometry.coordinates[0],
      postalCode: address.properties.postcode,
      street: address.properties.name
    }
    onChange(ad);
  };


  return (
    <div className="flex flex-col relative h-15">
      <label className="label_input" htmlFor="address">
        Address
      </label>
      <InputGroup className="ring-bleu">
        <InputGroupInput
          value={value}
          onChange={onAddressChange}
          placeholder="Start typing address, then select on the list"
          
        />
        {
          selectedAddress && (
            <InputGroupSuffix>
              <Check color="green" size={15}/>
            </InputGroupSuffix>
          )
        }
      </InputGroup>
      {list && !selectedAddress && (
        <div className="absolute top-15 bg-white flex flex-col rounded-xl gap-2 text-sm max-h-40 overflow-y-auto overflow-x-hidden">
          {list.map((address) => (
            <div
              className="p-2 hover:bg-turquoise hover:text-white cursor-pointer"
              onClick={() => onSelectHandler(address)}
            >
              {address.properties.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInput;
