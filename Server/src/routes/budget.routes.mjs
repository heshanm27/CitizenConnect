import express from "express";

const Router = express.Router();

//default routes
Router.route("/").get(getAllOrderList).post(addOrder);
Router.route("/user").get(getOneUserOrderHistory);
Router.route("/live").get(getLiveOrder);
Router.route("/history").get(getOrderHistory);
//paramterized routes
Router.route("/:id").get(getOneOrder).patch(patchOrderStatus).delete(deleteOrder);

export default Router;
