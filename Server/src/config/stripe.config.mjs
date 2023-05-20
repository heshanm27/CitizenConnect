import Stripe from "stripe";

const stripe = new Stripe("sk_test_51N9h3EKb3rzSPSmMTNiPXVzeHlvNUVC2DMN3F69gKiftMoJEIEbnM57aCppbQoro4rp93L2p4czylnggaqPicdus00qMurv0WQ", {
  apiVersion: "2022-11-15",
});

export default stripe;