import { useForm } from "react-hook-form";
import AddressInput from "../Forms/AddressInput";
import Input from "../Forms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseShopSchema } from "../../Validation/Shop.validation";
import { Button, Checkbox, CheckboxContent, CheckboxControl, CheckboxGroup, CheckboxIndicator, Description, Label } from "@heroui/react";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import VisitCheckBoxGroup from "../Forms/VisitCheckBoxGroup";

const ShopForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BaseShopSchema),
    
  });

  useEffect(() => {
    console.log("ERRORS : ", errors);
  },[errors])

  const onSubmitHandler = (data: any) => {
    console.log("SUBMIT")
    console.log('DATA SUBMIT : ', data)
  };

  return (
    <form className="flex flex-col justify-between h-full bg-green-300  max-w-200 mx-auto" onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-5 p-4">
          <Input label="Place Name" {...register('placeName')} error={errors.placeName} />
          <Input label="Place Code"{...register('placeCode')} error={errors.placeCode} />
          <Input label="Phone" {...register('phone')} error={errors.phone}/>
          <Input label="Visit Code" {...register('visitCode')} error={errors.visitCode}/>
          <Input label="Visit Name" {...register('visitName')} error={errors.visitName} />
          <VisitCheckBoxGroup />
          <AddressInput />
          
        </div>
       
        

      </div>
      <Button fullWidth className="rounded-xl bg-bleu text-white flex items-center" type="submit">
        <p>Create Shop</p>
        <ArrowRight/>
      </Button>
    </form>
  );
};

export default ShopForm;
