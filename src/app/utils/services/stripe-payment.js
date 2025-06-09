import { loadStripe } from "@stripe/stripe-js";
import http from "../interceptors/auth";
import { CATALOG_URL } from "../constants/constants";

export const makePayment = async (reservationId, price) => { 
    const stripe = await loadStripe("pk_test_51RXlBo2HFaPCiSAWRwP9juHa2uG34r1B73GWJZ3evw01KJhkFAX0rv2Ibx53xM1COu3twsLvxW4vg7F7L4dPUsFM00iXsIUpo6")

    const body = {
        Amount: price,
        ReservationId: reservationId
    }

    const response = await http.post(`${CATALOG_URL}/api/user-reservations/create-checkout-session`, body)

    const result = stripe.redirectToCheckout({
        sessionId:response.data.sessionId
    })

    if (result.error) { 
        console.log("Something went wrong")
    }
}