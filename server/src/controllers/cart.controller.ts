import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// ------------------------------------
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import OrderModel from "../models/order.model";
import { newCartTypes } from "../types/cart.type";
import CartServices from "../services/cart.service";
// ------------------------------------
class CartController {
  static async addToCart(req: Request, res: Response) {
    try {
      const cartService = new CartServices(req.session.userSessionData!.id);
      const newToCart: any = await cartService.checkInventoryAndddToCart(
        req.body.prodID
      );
      newToCart.cart ? await newToCart.cart.save() : null;
      newToCart.product ? await newToCart.product.save() : null;

      res.status(200).json(newToCart);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  static async getCart(req: Request, res: Response) {
    const cartService = new CartServices(req.session.userSessionData!.id);
    const foundCart: any = await cartService.getCart();
    res.status(200).json({ message: "Cart Found", cart: foundCart });
  }
  static async changeAmount(req: Request, res: Response) {
    const cartService = new CartServices(req.session.userSessionData!.id);
    const updatedCart = await cartService.changeAmount(
      req.body.prodID,
      req.body.changeAction
    );
    if (
      updatedCart?.massage === "product increased by one" ||
      updatedCart?.massage === "product decreased by one"
    ) {
      updatedCart.targetCart.save();
      updatedCart.targetProduct.save();
    }
    res.status(200).send(updatedCart);
  }
  static async deleteProduct(req: Request, res: Response) {
    const cartService = new CartServices(req.session.userSessionData!.id);
    const cartAfterProduct: any = await cartService.deleteProduct(
      req.body.prodID
    );
    res.status(200).send(cartAfterProduct);
    console.log(cartAfterProduct);
  }
  static async clearCart(req: Request, res: Response) {
    const cartService = new CartServices(req.session.userSessionData!.id);
    const foundCart: any = await cartService.clearCart();
    const clearedCart = await foundCart.save();
    res.status(200).json({ message: "Cart cleared", cart: clearedCart });
  }
}

export default CartController;
