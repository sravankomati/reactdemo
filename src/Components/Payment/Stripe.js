import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import StripePay from "./StripePay";

export default function Stripe() {
  const stripePromise = loadStripe("pk_test_F5UFRy9rcym7iLRTtaH55jGu");

  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripePay />
      </Elements>
    </div>
  );
}
