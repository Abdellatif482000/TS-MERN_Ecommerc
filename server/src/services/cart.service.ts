import CartModel from "../models/cart.model";
import { customerModel } from "../models/auth.model";
import { CartItem, newCartTypes } from "../types/cart.type";
import { Request } from "express";
import mongoose from "mongoose";
import ProductService from "./product.service";
import cartRoutes from "../routes/cart.route";
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
        productName: targetProduct.productName,
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
  async changeAmount(prodID: string, changeAction: string) {
    console.log(1);
    const targetCart = await this.getCart();
    const targetCartItems = targetCart.items;
    // --- check existence of prod in cart items ---
    const itemInCart = targetCartItems.find(
      (item: any) => item.productId === prodID
    );
    // --- check inventory -----
    const productService = new ProductService(prodID);
    const targetProduct: any = await productService.getSingleProduct();

    if (itemInCart) {
      if (changeAction === "increase") {
        if (targetProduct.inventory === 0) {
          return {
            massage: "out of stock",
            targetCart: targetCart,
            inventory: targetProduct.inventory,
            amountInCart: itemInCart.totalAmount,
            price: targetProduct.price,
            productTotalPrice: itemInCart.productTotalPrice,
            totalCartPrice: targetCart.totalCartPrice,
          };
        } else {
          // ----- increase product -----
          itemInCart.totalAmount += 1; // increase by one
          // recalculate total price of product in cart
          itemInCart.productTotalPrice =
            targetProduct.price * itemInCart.totalAmount;
          let calculatedTotalCartPrice = targetCart.items.reduce(
            (accumulator: number, item: any) => {
              return accumulator + item.productTotalPrice;
            },
            0
          );
          targetCart.totalCartPrice = calculatedTotalCartPrice;
          targetProduct.inventory -= 1; // decrease inventory by one

          console.log(
            `----------------------- \n Amount ${itemInCart.totalAmount} * Price ${targetProduct.price} = total ${itemInCart.productTotalPrice} \n -------------------------`
          );

          return {
            massage: "product increased by one",
            targetCart: targetCart,
            targetProduct: targetProduct,
            inventory: targetProduct.inventory,
            amountInCart: itemInCart.totalAmount,
            price: targetProduct.price,
            productTotalPrice: itemInCart.productTotalPrice,
            totalCartPrice: targetCart.totalCartPrice,
          };
        }
      } else if (changeAction === "decrease") {
        if (itemInCart.totalAmount === 1) {
          return { massage: "cart can't contain 0 amount of product" };
        } else {
          itemInCart.totalAmount -= 1; // decrease product by 1
          // recalculate total price of product in cart
          itemInCart.productTotalPrice =
            targetProduct.price * itemInCart.totalAmount;
          let totalCartPrice = targetCart.items.reduce(
            (accumulator: number, item: any) => {
              return accumulator + item.productTotalPrice;
            },
            0
          );
          targetCart.totalCartPrice = totalCartPrice;
          targetProduct.inventory += 1; // increase invnetory by one
          return {
            massage: "product decreased by one",
            targetCart: targetCart,
            targetProduct: targetProduct,

            inventory: targetProduct.inventory,
            amountInCart: itemInCart.totalAmount,
            price: targetProduct.price,
            productTotalPrice: itemInCart.productTotalPrice,
            totalCartPrice: targetCart.totalCartPrice,
          };
        }
      }
    }
  }
  async deleteProduct(prodID: string) {
    const targetCart = await this.getCart();
    const targetCartItems = targetCart.items;
    // --- check existence of prod in cart items ---
    const itemInCart = targetCartItems.find(
      (item: any) => item.productId === prodID
    );
    // ----- pull item from cart -------
    if (itemInCart) {
      await CartModel.updateOne(
        { id: targetCart.id },
        { $pull: { items: { productId: prodID } } }
      );
      // ---- return item to invnetory ----
      let calculatedTotalCartPrice = targetCart.items.reduce(
        (accumulator: number, item: any) => {
          return accumulator + item.productTotalPrice;
        },
        0
      );
      // --- recalculate total cart price -----
      targetCart.totalCartPrice =
        calculatedTotalCartPrice - itemInCart.productTotalPrice;
    } else {
      return { message: "item does't exist in cart", targetCart };
    }
    return { message: "item deleted from cart", targetCart };
  }
  async clearCart() {
    const targetCart = await this.getCart();
    const targetCartItems = targetCart.items;

    const emptyCart = !targetCartItems.length
      ? { message: "Cart is Empty" }
      : null;
    if (!emptyCart) {
      targetCartItems.splice(0, targetCartItems.length);
      return targetCart;
    }
  }
}

export default CartServices;
