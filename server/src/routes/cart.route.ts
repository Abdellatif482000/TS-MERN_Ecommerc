import { Router } from "express";

// ----------------------------
import CartClass from "../controllers/cart.controller";
import VerifyClass from "../middelware/verifications.middelware";
// ----------------------------

const cartRoutes = Router();

cartRoutes.post("/addToCart", VerifyClass.verifyToken, CartClass.addToCart);
// cartRoutes.put("/changeAmount", VerifyClass.verifyToken, changeAmount);
// cartRoutes.get("/getCart", VerifyClass.verifyToken, getCart);
// cartRoutes.put(
// "/deleteProductFromCart",
// VerifyClass.verifyToken,
// deleteProductFromCart
// );
// cartRoutes.put("/clearCart", VerifyClass.verifyToken, clearCart);

export default cartRoutes;
