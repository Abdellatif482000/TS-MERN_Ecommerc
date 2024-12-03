import OrderModel from "../models/order.model";
import { Request } from "express";
import { customerModel } from "../models/auth.model";
import { newOrderTypes } from "../types/order.type";

class OrderHelper {
  static async initOrderList(req: Request, userID: string) {
    const newUser = await customerModel.findOne({ _id: userID });

    const newOrderListData: newOrderTypes = {
      userID: newUser!._id as string,
      orders: [],
    };
    const newCart = new OrderModel(newOrderListData);
    return newCart;
  }
}

export default OrderHelper;
