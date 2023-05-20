import Stripe from "stripe";
import { changeOrderPaidStatus, sendOrderRecipet } from "../service/certification.service.mjs";

const stripe = new Stripe("sk_test_51N9h3EKb3rzSPSmMTNiPXVzeHlvNUVC2DMN3F69gKiftMoJEIEbnM57aCppbQoro4rp93L2p4czylnggaqPicdus00qMurv0WQ", {
  apiVersion: "2022-11-15",
});

export const OrderpayemntHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig,"whsec_3205213e1de36c49df4bc8118c111a55694bb1af680feaf85ec2adaffe4bc895");
    console.log("event", event.type);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      await changeOrderPaidStatus(session.metadata?.orderId);
      break;
    case "payment_intent.created":
      break;
    case "charge.succeeded":
      const charge = event.data.object;
      await sendOrderRecipet(charge.billing_details?.email, charge?.receipt_url);
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send("suesss");
};
