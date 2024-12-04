import CartModel from "../models/cart.model";
import { customerModel } from "../models/auth.model";
import { newCartTypes } from "../types/cart.type";
import { Request } from "express";
import mongoose from "mongoose";
import OrderModel from "../models/order.model";
import { newOrderTypes } from "../types/order.type";
import CartServices from "./cart.service";
import { stat } from "fs";

class OrderServices {
  // userID: string;
  userData: any;

  constructor(userData = null) {
    // this.userID = userID;
    this.userData = userData;
  }

  async initOrdelist() {
    const newOrderlistData: newOrderTypes = {
      userID: this.userData.id,
      orders: [],
    };
    const newOrderlist = new OrderModel(newOrderlistData);
    return newOrderlist;
  }
  async getOrderlist() {
    const targetOrderlist: object | any = await OrderModel.findOne({
      userID: this.userData.id,
    });

    return targetOrderlist;
  }
  async checkout(paymentMethod: string) {
    const cartService = await new CartServices(this.userData.id);
    const targetCart = await cartService.getCart();
    const targetOrderList = await this.getOrderlist();

    let orderDetails = {
      cartSummary: targetCart.items,
      totalPrice: targetCart.totalCartPrice,
      shippingAddress: this.userData.address
        ? this.userData.address
        : "address not provided",
      phoneNum: this.userData.phoneNum
        ? this.userData.phoneNum
        : "phoneNum not provided",
      paymentMethod: paymentMethod,
      orderStatus: "pending",
    };

    if (targetCart.items.length) {
      if (paymentMethod === "cashOnDelivery") {
        orderDetails.orderStatus = "processing";
      }
    }
    targetOrderList.orders.push(orderDetails);
    targetCart.items.splice(0, targetCart.items.length);

    // return targetOrderList;
    return { cart: targetCart, orderlist: targetOrderList };
  }
  async filterOrdersByStatus(status: string) {
    const foundOrders: object | any = await OrderModel.find({
      "orders.orderStatus": status,
    });
    const ordersByStatus = await foundOrders.flatMap((list: any) =>
      list.orders.filter((order: any) => order.orderStatus === status)
    );

    return ordersByStatus;
  }
  async getOrderByID(orderID: string) {
    const foundOrderlist: any = await OrderModel.findOne({
      "orders.orderID": orderID,
    });

    return foundOrderlist;
  }

  async manageOrderStatus(orderID: string, newStatus: string) {
    const targetOrderlist = await this.getOrderByID(orderID);
    const orderByID: any = targetOrderlist.orders.find(
      (order: any) => order.orderID.toString() === orderID
    );
    if (orderByID.orderStatus === "pending" && newStatus !== "processing") {
      return {
        massage: "can't swap form pending to anthing except processing",
      };
    } else if (
      orderByID.orderStatus === "processing" &&
      newStatus !== "shipped"
    ) {
      return {
        massage: "can't swap form processing to anthing except shipped",
      };
    } else if (
      orderByID.orderStatus === "shipped" &&
      newStatus !== "delivered"
    ) {
      return {
        massage: "can't swap form shipped to anthing except delivered",
      };
    } else {
      orderByID.orderStatus = newStatus;
      return targetOrderlist;
    }
  }
}

export default OrderServices;
