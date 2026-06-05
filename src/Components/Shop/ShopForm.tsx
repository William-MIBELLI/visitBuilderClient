import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import AddressInput from "../Forms/AddressInput";

const ShopForm = () => {

  const { handleSubmit, register, formState: { errors } } = useForm();
  
  const onSubmitHandler = () => {

  }

 

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="flex flex-col">
          <label className="label_input" htmlFor="placeName"> The Place Name</label>
          <Input id="placeName" placeholder="Intermarché..."/>
        </div>
        <div className="flex flex-col">
          <label className="label_input" htmlFor="placeCode"> The Place Code</label>
          <Input id="placeCode" placeholder="20098..."/>
        </div>
        <AddressInput/>


      </div>
    </form>
  )
}

export default ShopForm