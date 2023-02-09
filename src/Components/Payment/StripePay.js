import React from "react";
import axios from "axios";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Form } from "react-bootstrap";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "black" },
      "::placeholder": { color: "black" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "black",
    },
  },
};
export default function StripePay() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Create a paymentMethod variable and pass a type of card, so that your application can accept card for payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log(id);
        //   const response = await axios.post("http://localhost:4000/payment", {
        //     amount: 1000,
        //     id,
        //   });

        //   if (response.data.success) {
        //     console.log("Successful Payment");
        //     setSuccess(true);
        //   }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div className='FormRow'>
            <CardNumberElement options={CARD_OPTIONS} />
          </div>
        </Form.Group>
        <Form.Group>
          <div className='FormRow'>
            <CardExpiryElement options={CARD_OPTIONS} />
          </div>
        </Form.Group>
        <Form.Group>
          <div className='FormRow'>
            <CardCvcElement options={CARD_OPTIONS} />
          </div>
        </Form.Group>
        <button>MAKE PAYMENT</button>
      </Form>
    </div>
  );
}
