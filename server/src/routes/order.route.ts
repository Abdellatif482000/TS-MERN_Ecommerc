import { Router } from "express";

// ----------------------------
import {
  confirmOrder,
  getOrders,
  manageOrderStatus,
} from "../controllers/order.controller";
import VerifyClass from "../middelware/verifications.middelware";

// ----------------------------

const orderRoutes = Router();

orderRoutes.post("/confirmOrder", VerifyClass.verifyToken, confirmOrder);
orderRoutes.get("/getOrders", VerifyClass.verifyToken, getOrders);
orderRoutes.post(
  "/manageOrderStatus",
  VerifyClass.verifyToken,
  // VerifyClass.verifyRoleAdmin,
  manageOrderStatus
);
// orderRoutes.put("/deleteProductFromCart", VerifyClass.verifyToken, deleteProductFromCart);
// orderRoutes.put("/clearCart", VerifyClass.verifyToken, clearCart);

export default orderRoutes;
