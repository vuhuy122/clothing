import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.REACT_APP_API_STRIPE_PUBLISHABLE_KEY
);
