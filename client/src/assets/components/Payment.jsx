import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51OUSYRBn79HJsgXVpJQKCVPf4nEWiuDntncSH2RgWv7NEQhpS5z1LSbO4UOSkKlPAfCcSfaWksGyRxaJQVXjFKoR007Ptd3SCz"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  const base = "http://localhost:3000/payment/";
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(base + "create-payment-intent", {
          amount: 10000,
        });
        console.log(response);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
}
