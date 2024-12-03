import { Router } from "express";

// ----------------------------
import CartController from "../controllers/cart.controller";
import VerifyClass from "../middelware/verifications.middelware";
// ----------------------------

const cartRoutes = Router();

cartRoutes.post(
  "/cart/addToCart",
  VerifyClass.verifyToken,
  CartController.addToCart
);
cartRoutes.put(
  "/cart/changeAmount",
  VerifyClass.verifyToken,
  CartController.changeAmount
);
cartRoutes.get(
  "/cart/getCart",
  VerifyClass.verifyToken,
  CartController.getCart
);
cartRoutes.put(
  "/cart/clearCart",
  VerifyClass.verifyToken,
  CartController.clearCart
);
cartRoutes.put(
  "/cart/deleteProductFromCart",
  VerifyClass.verifyToken,
  CartController.deleteProduct
);

export default cartRoutes;
