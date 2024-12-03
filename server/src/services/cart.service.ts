import CartModel from "../models/cart.model";
import { customerModel } from "../models/auth.model";
import { CartItem, newCartTypes } from "../types/cart.type";
import { Request } from "express";
import mongoose from "mongoose";
import ProductService from "./product.service";
ProductService;

class CartServices {
  userID: any;

  constructor(userID = "") {
    this.userID = userID;
  }

  async initCart() {
    const newCartData: newCartTypes = {
      userID: this.userID,
      items: [],
      totalCartPrice: 0,
    };
    const cartModel = new CartModel(newCartData);

    return cartModel;
  }
  async getCart() {
    const targetCart: object | any = await CartModel.findOne({
      userID: this.userID,
    });
    return targetCart;
  }

  async checkInventoryAndddToCart(prodID: string) {
    const productService = new ProductService(prodID);

    const targetCart = await this.getCart();
    const targetCartItems = targetCart.items;
    const targetProduct: any = await productService.getSingleProduct();

    const targetProductInventory = targetProduct.inventory;
    // --- check empty Inventory ---
    const emptyInventory =
      targetProductInventory === 0 ? { massage: "out of stock" } : null;

    // --- check existence of prod in cart items ---
    const itemInCart = targetCartItems.find(
      (item: any) => item.productId === prodID
    );
    const itemExist = itemInCart
      ? { massage: "this product exist in cart" }
      : null;

    if (!emptyInventory && !itemExist) {
      // ---- new item ----
      const newItem: CartItem = {
        productId: prodID,
        productDetails: targetProduct,
        totalAmount: 1,
        productTotalPrice: targetProduct.price * 1,
      };
      console.log(
        `>>> prod before save ${targetProduct.productName} inventory =  ${targetProduct.inventory}`
      );
      targetProduct.inventory -= 1; // -1 from inventory
      console.log(
        `>>> prod after save ${targetProduct.productName} inventory =  ${targetProduct.inventory}`
      );
      // ---- sum prices of products in cart ----
      let totalCartPrice = targetCartItems.reduce(
        (accumulator: number, item: any) => {
          return accumulator + item.productTotalPrice;
        },
        0
      );
      targetCart.totalCartPrice = targetProduct.price + totalCartPrice; // set total price in cart

      targetCart.items.push(newItem); // push item in cart items list

      return { cart: targetCart, product: targetProduct };
    } else {
      // return emptyInventory || itemExist;
      if (emptyInventory) return emptyInventory;
      if (itemExist) return "item Exist in cart";
    }
  }
}

export default CartServices;
