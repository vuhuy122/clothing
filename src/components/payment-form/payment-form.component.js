import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectorCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const carttotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectorCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const res = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ amount: carttotal * 100 }),
    }).then((response) => response.json());

    const {
      paymentIntent: { client_secret },
    } = res;
    console.log("client_secret", client_secret);
    setIsProcessing(false);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser?.displayName : "Guest ",
        },
      },
    });
    if (paymentResult.error) {
      return alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Thanh toán thành công");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button
          isLoading={isProcessing}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
