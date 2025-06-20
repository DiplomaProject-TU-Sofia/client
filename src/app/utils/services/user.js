import { CATALOG_URL } from "../constants/constants";
import http from "../interceptors/auth";
import { makePayment } from "./stripe-payment";

export const makeReservation = async (
  serviceId,
  saloonId,
  workerId,
  date,
  startTime,
  continueWithoutPayment,
  selectedService
) => {
  try {
    const response = await http.post(`${CATALOG_URL}/api/user-reservations`, {
      ServiceId: serviceId,
      SaloonId: saloonId,
      WorkerId: workerId,
      StartTime: `${date}T${startTime}`,
    });

    if (!continueWithoutPayment) { 
      makePayment(response.data , selectedService[0].price )
    }
  } catch (error) {
    console.log(error);
  }
};

