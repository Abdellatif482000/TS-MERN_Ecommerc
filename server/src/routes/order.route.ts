import { Router } from "express";

// ----------------------------
import OrderController from "../controllers/order.controller";
import VerifyClass from "../middelware/verifications.middelware";

// ----------------------------

const orderRoutes = Router();

orderRoutes.post(
  "/order/checkout",
  VerifyClass.verifyToken,
  OrderController.checkout
);
orderRoutes.get(
  "/order/getOrders",
  VerifyClass.verifyToken,
  OrderController.getOrders
);
orderRoutes.post(
  "/order/manageOrderStatus",
  VerifyClass.verifyToken,
  VerifyClass.verifyRole("admin"),
  OrderController.manageOrderStatus
);
orderRoutes.get(
  "/order/filterByStatus",
  VerifyClass.verifyToken,
  VerifyClass.verifyRole("admin"),
  OrderController.filterOrders
);
// orderRoutes.put("/deleteProductFromCart", VerifyClass.verifyToken, deleteProductFromCart);
// orderRoutes.put("/clearCart", VerifyClass.verifyToken, clearCart);

export default orderRoutes;
