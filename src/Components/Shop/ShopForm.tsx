import { Controller, FormProvider, useForm } from "react-hook-form";
import AddressInput from "../Forms/AddressInput";
import Input from "../Forms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateShopSchema
} from "../../Validation/Shop.validation";
import { Button, Spinner } from "@heroui/react";
import { useEffect, useState, type FC } from "react";
import { ArrowRight } from "lucide-react";
import VisitCheckBoxGroup from "../Forms/VisitCheckBoxGroup";
import FormDivider from "../Forms/FormDivider";
import { useShopContext } from "../../Contexts/ShopContext";
import DatePicker from "../Forms/DatePicker";
import AvailabilityForm from "../Availability/AvailabilityForm";
import type { IShop } from "../../Interfaces/Shop.type";
import { mapShopForZod } from "../../Utils/Mapping";

interface IProps {
  shop?: IShop | null;
}

const ShopForm: FC<IProps> = ({ shop }) => {
  const { createShop } = useShopContext();
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(CreateShopSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = methods;

  useEffect(() => {
    if (!shop) return;
    reset(mapShopForZod(shop));
  }, [shop, reset]);

  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    const newShop = await createShop(data);
    console.log("NEW SHOP", newShop);
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col justify-between h-full  max-w-250 mx-auto"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="grid  grid-cols-2 gap-y-3 gap-x-5">
            
            {/* INFO */}
            <FormDivider label="Infos" />
            <Input label="Place Name" name="placeName" />
            <Input label="Place Code" name="placeCode" />
            <Input label="Phone" name="phone" />
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <AddressInput onChange={onChange} val={value} />
              )}
            />

            {/* VISIT */}
            <FormDivider label="Visit" />
            <Input label="Visit Code" name="visitCode" />
            <Input label="Visit Name" name="visitName" />
            <Controller
              control={control}
              name="visitConstraint"
              render={({ field: { onChange, value } }) => (
                <VisitCheckBoxGroup onChange={onChange} value={value} />
              )}
            />
            <Input type="number" label="Cost" name="cost" />
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value }, formState: { errors } }) => (
                <DatePicker
                  label="Start Date"
                  onChange={onChange}
                  error={errors.startDate}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="End date"
                  onChange={onChange}
                  error={errors.endDate}
                  value={value}
                />
              )}
            />
          </div>

          {/* AVAILABILITIES */}
          <div>
            <FormDivider label="Availabilities" />
            <AvailabilityForm />
          </div>
        </div>
        <Button
          fullWidth
          className="rounded-xl bg-bleu text-white flex items-center"
          type="submit"
          isPending={loading}
        >
          <p>Create Shop</p>
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner size="sm" color="current" />
            </div>
          ) : (
            <ArrowRight />
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ShopForm;
