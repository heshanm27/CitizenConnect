import StripeService from "../config/stripe.config.mjs";


export const OrderpayemntHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = StripeService.webhooks.constructEvent(req.body, sig, process.env.PUBLIC_STRIPE_WEBHOOK_SECRET_KEY);
    console.log("event", event.type);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      console.log("session", session.amount_total);
      break;
    case "payment_intent.created":
      break;
    case "charge.succeeded":
      const charge = event.data.object;
      await sendOrderRecipet(charge.billing_details.name, charge.billing_details.email, charge.receipt_url);
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log("paymentIntentSucceeded", paymentIntentSucceeded);
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send("suesss");
};