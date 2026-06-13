import type {
  IAvailability,
  TAvailabilityByDay,
} from "../Interfaces/Availability.type";
import type { IShop } from "../Interfaces/Shop.type";
import type { TAddressSchema } from "../Validation/Address.validation";
import type {
  TBaseShopSchema,
  TVisitConstraintSchema,
} from "../Validation/Shop.validation";

export const regroupAvailabilitiesByDay = (
  avails: IAvailability[],
): TAvailabilityByDay => {
  const regrouped: TAvailabilityByDay = {};
  avails.forEach((avail) => {
    if (Object.keys(regrouped).includes((avail.dayOfWeek - 1).toString())) {
      regrouped[avail.dayOfWeek - 1].push(avail);
      return;
    }
    regrouped[avail.dayOfWeek - 1] = [avail];
  });

  return regrouped;
};

export const mapShopForZod = (shop: IShop): TBaseShopSchema => {

  console.log('SHOP DANS MAPPING : ', shop);
  const {
    address: street,
    postalCode,
    city,
    lng,
    lat,
    country,
    canBeAfternoon,
    canBeLunchBreak,
    canBeMorning,
    ...rest
  } = shop;

  const address: TAddressSchema = {
    street,
    postalCode: postalCode.toString(),
    city,
    country,
    lat,
    lng,
  };

  const constraints: TVisitConstraintSchema = {
    canBeAfternoon,
    canBeLunchBreak,
    canBeMorning,
  };

  const mappedShop: TBaseShopSchema = {
    ...rest,
    address,
    visitConstraint: constraints,
    cost: shop.cost.toString(),
    
  };

  return mappedShop;
};
