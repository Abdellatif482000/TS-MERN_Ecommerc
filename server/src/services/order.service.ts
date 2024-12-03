import CartModel from "../models/cart.model";
import { customerModel } from "../models/auth.model";
import { newCartTypes } from "../types/cart.type";
import { Request } from "express";
import mongoose from "mongoose";
import OrderModel from "../models/order.model";
import { newOrderTypes } from "../types/order.type";

class OrderServices {
  userID: any;

  constructor(userID = "") {
    this.userID = userID;
  }

  async initOrdelist() {
    const newOrderlistData: newOrderTypes = {
      userID: this.userID,
      orders: [],
    };
    const newOrderlist = new OrderModel(newOrderlistData);
    return newOrderlist;
  }
  async getOrderlist() {
    const targetOrderlist: object | any = await OrderModel.findOne({
      userID: this.userID,
    });
    return targetOrderlist;
  }
}

export default OrderServices;
