import { InputGroup, InputGroupInput, InputGroupSuffix, type InputProps } from "@heroui/react";
import { fetchAddressListFromAPI } from "../../Utils/AddressAPI";
import { useState, type ChangeEvent, type FC } from "react";
import type { AddressFeature } from "../../Interfaces/Address.type";
import { Check } from "lucide-react";

interface IProps extends InputProps {

}

const AddressInput: FC<IProps> = (props) => {
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
  };


  return (
    <div className="flex flex-col relative h-15 col-span-2">
      <label className="label_input" htmlFor="address">
        Address
      </label>
      <InputGroup>
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
