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
class CartClass {
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
}

export default CartClass;
