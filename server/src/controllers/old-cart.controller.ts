import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// ------------------------------------
import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import { getCookieValue } from "../middelware/getCookieValue.middelware";

// ------------------------------------

export const addToCart = async (req: Request, res: Response) => {
  const { productID } = req.body;

  // ------------------------------
  const cookieFromHeadrs: any = req.headers.cookie;
  const userData: string | any = getCookieValue(cookieFromHeadrs, "userData");
  const userDataObj = JSON.parse(userData);
  // ------------------------------

  // ------------------------------
  const targetProdcut: object | any = await ProductModel.findOne({
    _id: productID,
  });
  const targetCart: object | any = await CartModel.findOne({
    userID: userDataObj.customerID,
  });

  const existingItem = targetCart.items.find(
    (item: any) => item.productId === productID
  );
  // ------------------------------
  if (targetProdcut.inventory === 0) {
    res.status(300).send({ massage: "out of stock" });
  } else {
    if (existingItem) {
      res.status(200).send({ massage: "this product exist in cart" });
      console.log("this product exist in cart");
    } else {
      const newItem = {
        productId: productID,
        productDetails: targetProdcut,
        totalAmount: 1,
        productTotalPrice: targetProdcut.price * 1,
      };
      targetProdcut.inventory -= 1;
      let totalCartPrice = targetCart.items.reduce(
        (accumulator: number, item: any) => {
          return accumulator + item.productTotalPrice;
        },
        0
      );

      targetCart.totalCartPrice = targetProdcut.price + totalCartPrice;

      targetCart.items.push(newItem);

      Promise.all([targetCart.save(), targetProdcut.save()])
        .then(([updatedCart, updatedProdcut]) => {
          console.log("updatedCart: ", updatedCart);
          console.log("updatedProdcut: ", updatedProdcut);
          res.status(200).send({ cart: updatedCart, prodcut: updatedProdcut });
        })
        .catch((err: any) => {
          console.error("Error saving updated cart:", err);
          console.log("---------------------------------");
          res.status(500).send({ error: "Error saving cart or product." });
        });
    }
  }
};
export const changeAmount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { productID, changeAction } = req.body;

  // ------------------------------
  const cookieFromHeadrs: any = req.headers.cookie;
  const userData: string | any = getCookieValue(cookieFromHeadrs, "userData");
  const userDataObj = JSON.parse(userData);
  // ------------------------------

  // ------------------------------
  const targetProdcut: object | any = await ProductModel.findOne({
    _id: productID,
  });
  const targetCart: object | any = await CartModel.findOne({
    user: userDataObj.customerID,
  });
  const existingItem = targetCart.items.find(
    (item: any) => item.productId === productID
  );
  // ------------------------------
  if (existingItem) {
    if (changeAction === "increase") {
      if (targetProdcut.inventory === 0) {
        return res.status(300).send({
          massage: "out of stock",
          inventory: targetProdcut.inventory,
          amountInCart: existingItem.totalAmount,
          price: targetProdcut.price,
          productTotalPrice: existingItem.productTotalPrice,
          totalCartPrice: targetCart.totalCartPrice,
        });
      } else {
        existingItem.totalAmount += 1;
        existingItem.productTotalPrice =
          targetProdcut.price * existingItem.totalAmount;

        let totalCartPrice = targetCart.items.reduce(
          (accumulator: number, item: any) => {
            return accumulator + item.productTotalPrice;
          },
          0
        );

        targetCart.totalCartPrice = totalCartPrice;

        // ------------------------
        console.log(
          `----------------------- \n Amount ${existingItem.totalAmount} * Price ${targetProdcut.price} = total ${existingItem.productTotalPrice} \n -------------------------`
        );

        // ------------------------
        targetProdcut.inventory -= 1;
      }
    } else if (changeAction === "decrease") {
      if (existingItem.totalAmount === 1) {
        return res
          .status(200)
          .send({ massage: "cart can't contain 0 amount of product" });
      } else {
        existingItem.totalAmount -= 1;
        existingItem.productTotalPrice =
          targetProdcut.price * existingItem.totalAmount;
        let totalCartPrice = targetCart.items.reduce(
          (accumulator: number, item: any) => {
            return accumulator + item.productTotalPrice;
          },
          0
        );

        targetCart.totalCartPrice = totalCartPrice;
        // ------------------------
        console.log(
          `----------------------- \n Amount ${existingItem.totalAmount} * Price ${targetProdcut.price} = total ${existingItem.productTotalPrice} \n -------------------------`
        );
        // ------------------------

        targetProdcut.inventory += 1;
      }
    }
    Promise.all([targetCart.save(), targetProdcut.save()])
      .then(([updatedCart, updatedProdcut]) => {
        // res.status(200).send({ cart: updatedCart, prodcut: updatedProdcut });
        console.log(`cart: ${updatedCart}, prodcut: ${updatedProdcut}`);
        res.status(200).send({
          inventory: updatedProdcut.inventory,
          amountInCart: existingItem.totalAmount,
          price: updatedProdcut.price,
          productTotalPrice: existingItem.productTotalPrice,
          totalCartPrice: targetCart.totalCartPrice,
        });
      })
      .catch((err: any) => {
        console.error("Error saving updated cart:", err);
        console.log("---------------------------------");
        res.status(500).send({ error: "Error saving cart or product." });
      });
  } else {
    res.send({ massage: "product not exist in cart" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  // console.log(req.body.userID);

  CartModel.findOne({ user: req.body.user }).then((cart: any) => {
    console.log("Cart: ", cart, "\n", "--------------------", "\n");
    return res.status(302).json({ massage: "Cart found", data: cart });
  });
};

export const deleteProductFromCart = async (req: Request, res: Response) => {
  const { productID } = req.body;
  // ----------------
  const cookieFromHeadrs: any = req.headers.cookie;
  const userData: string | any = getCookieValue(cookieFromHeadrs, "userData");
  const userDataObj = JSON.parse(userData);
  // ----------------

  const targetCart: object | any = await CartModel.findOne({
    user: userDataObj.customerID,
  });
  // console.log(trargetCart);

  const existingItem = targetCart.items.find(
    (item: any) => item.productId === productID
  );

  if (existingItem) {
    await CartModel.updateOne(
      { _id: targetCart._id },
      { $pull: { items: { productId: productID } } }
    );

    let totalCartPrice = targetCart.items.reduce(
      (accumulator: number, item: any) => {
        return accumulator + item.productTotalPrice;
      },
      0
    );

    targetCart.totalCartPrice = totalCartPrice - existingItem.productTotalPrice;

    await targetCart
      .save()
      .then(async (cart: any) => {
        console.log(cart);
        res.status(200).send({ massage: "Product Deleted", cart: cart });
      })
      .catch((err: any) => {
        console.log(err);
        res.send({ err: err });
      });
  } else {
    targetCart
      .save()
      .then((cart: any) => {
        console.log(cart);
        res.status(200).send({ cart: "product not exist" });
      })
      .catch((err: any) => {
        console.log(err);
        res.send({ err: err });
      });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const { productID } = req.body;
  // ----------------
  const cookieFromHeadrs: any = req.headers.cookie;
  const userData: string | any = getCookieValue(cookieFromHeadrs, "userData");
  const userDataObj = JSON.parse(userData);
  // ----------------

  const targetCart: object | any = await CartModel.findOne({
    userID: userDataObj.customerID,
  });
  // console.log(trargetCart);

  const cartItems = targetCart.items;
  if (cartItems.length === 0) {
    console.log("cleard");
    res.send({ massage: "cleard" });
  } else {
    cartItems.splice(0, cartItems.length);
    targetCart
      .save()
      .then((cart: any) => {
        console.log(cart);
        res.status(200).send({ "deleted cart": cart });
      })
      .catch((err: any) => {
        console.log(err);
        res.send({ err: err });
      });
  }
};
