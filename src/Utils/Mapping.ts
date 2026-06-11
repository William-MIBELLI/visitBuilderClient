import type { IAvailability, TAvailabilityByDay } from "../Interfaces/Availability.type";


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

  console.log('REGROUPED UTILS : ', regrouped);
  return regrouped;
};
