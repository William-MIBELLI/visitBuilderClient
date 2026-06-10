import { Controller, useForm } from "react-hook-form";
import AddressInput from "../Forms/AddressInput";
import Input from "../Forms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateShopSchema } from "../../Validation/Shop.validation";
import { Button, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import VisitCheckBoxGroup from "../Forms/VisitCheckBoxGroup";
import FormDivider from "../Forms/FormDivider";
import AddAvailabilityButton from "../Forms/AddAvailabilityButton";
import { useShopContext } from "../../Contexts/ShopContext";
import DatePicker from "../Forms/DatePicker";

const ShopForm = () => {
  const { createShop } = useShopContext();
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(CreateShopSchema),
    defaultValues: {
      availabilities: [],
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods;

  useEffect(() => {
    console.log("ERRORS : ", errors);
  }, [errors]);

  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    const newShop = await createShop(data);
    console.log('NEW SHOP', newShop);
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col justify-between h-full  max-w-200 mx-auto"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-5">
          <FormDivider label="Infos" />
          <Input
            label="Place Name"
            {...register("placeName")}
            error={errors.placeName}
          />
          <Input
            label="Place Code"
            {...register("placeCode")}
            error={errors.placeCode}
          />
          <Input label="Phone" {...register("phone")} error={errors.phone} />
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange } }) => (
              <AddressInput onChange={onChange} />
            )}
          />
          <FormDivider label="Visit" />
          <Input
            label="Visit Code"
            {...register("visitCode")}
            error={errors.visitCode}
          />
          <Input
            label="Visit Name"
            {...register("visitName")}
            error={errors.visitName}
          />
          <Controller
            control={control}
            name="visitConstraint"
            render={({ field: { onChange } }) => (
              <VisitCheckBoxGroup onChange={onChange} />
            )}
          />
          <Input
            type="number"
            label="Cost"
            {...register("cost", { setValueAs: (value) => +value })}
            error={errors.cost}
          />
          <Controller
            control={control}
            name="startDate"
            render={({ field: { onChange }, formState: { errors } }) => (
              <DatePicker label="Start Date" onChange={onChange} error={errors.startDate} />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange } }) => (
              <DatePicker label="End date" onChange={onChange} error={errors.endDate} />
            )}
          />

          <FormDivider label="Availabilities" />
          <AddAvailabilityButton />
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
  );
};

export default ShopForm;
