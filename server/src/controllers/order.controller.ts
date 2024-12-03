import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// -----------------------------------------
dotenv.config();

const MONGO_URI: any = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
});
// -----------------------------------------
import CartModel from "../models/cart.model";
import OrderModel from "../models/order.model";

import { getCookieValue } from "../middelware/getCookieValue.middelware";
// -----------------------------------------

export const confirmOrder = async (req: Request, res: Response) => {
  const { paymentMethod } = req.body;

  // ------------------------------
  const cookieFromHeadrs: any = req.headers.cookie;
  const userData: string | any = getCookieValue(cookieFromHeadrs, "userData");
  const userDataObj = JSON.parse(userData);

  const targetCart: object | any = await CartModel.findOne({
    user: userDataObj.customerID,
  });

  const targetOrderList: object | any = await OrderModel.findOne({
    user: userDataObj.customerID,
  });

  // ------------------------------
  let orderDetails = {
    cartSummary: targetCart.items,
    totalPrice: targetCart.totalCartPrice,
    shippingAddress: userDataObj.address,
    phoneNum: userDataObj.phoneNum,
    paymentMethod: paymentMethod,
    orderStatus: "pending",
  };

  if (targetCart.items.length !== 0) {
    if (paymentMethod === "cashOnDelivery") {
      orderDetails.orderStatus = "processing";
    }
    targetOrderList.orders.push(orderDetails);

    await targetOrderList.save().then((order: any) => {
      console.log(order);

      targetCart.items.splice(0, targetCart.items.length);
      targetCart.save();

      res.status(200).json({
        massage: "order placed",
        orderDetails: orderDetails,
        orderList: order,
      });
    });
  } else {
    res.status(200).json({ massage: "UR Cart is empty" });
  }

  // ------------------------------
};

export const getOrders = async (req: Request, res: Response) => {
  const cookieFromHeadrs: any = req.headers.cookie;
  const userData: string | any = getCookieValue(cookieFromHeadrs, "userData");
  const userDataObj = JSON.parse(userData);

  const targetOrderList: object | any = await OrderModel.findOne({
    user: userDataObj.customerID,
  });
  res.status(200).send({ ordersList: targetOrderList });
};
export const manageOrderStatus = async (req: Request, res: Response) => {
  const { user, orderID, currentStatus, newStatus } = req.body;

  const targetOrderList: object | any = await OrderModel.findOne({
    user: user,
  });

  const ordersByStatus = targetOrderList.orders.filter(
    (order: any) => order.orderStatus === currentStatus
  );
  const selectedOrder = ordersByStatus.find((order: any) =>
    order.orderID.equals(new mongoose.Types.ObjectId(orderID))
  );
  console.log(selectedOrder);

  if (currentStatus === "pending" && newStatus !== "processing") {
    console.log("can't swap form pending to anthing except processing");
    res.status(200).send({
      massage: "can't swap form pending to anthing except processing",
    });
  } else if (currentStatus === "processing" && newStatus !== "shipped") {
    console.log("can't swap form processing to anthing except shipped");
    res.status(200).send({
      massage: "can't swap form processing to anthing except shipped",
    });
  } else if (currentStatus === "shipped" && newStatus !== "delivered") {
    console.log("can't swap form shipped to anthing except delivered");
    res.status(200).send({
      massage: "can't swap form shipped to anthing except delivered",
    });
  } else {
    selectedOrder.orderStatus = newStatus;
    targetOrderList.save().then((order: any) => {
      console.log(order);
      res.status(200).send({ order: order });
    });
  }
};
