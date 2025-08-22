import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function PaymentPage() {
  return (
    <div>
      <h2>Pay with Card</h2>
      <PaymentElement />
    </div>
  );
}
