import mongoose, { Schema } from "mongoose";

const orderSchema: mongoose.Schema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orders: [
    {
      orderID: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      cartSummary: { type: Array },
      shippingAddress: { type: String },
      phoneNum: { type: Number },
      paymentMethod: {
        type: String,
        // validate: {
        //   validator: function (value: any) {
        //     const allowedValues = ["cashOnDelivery", "payByCard", "fawryPay"];
        //     return allowedValues.includes(value);
        //   },
        //   message: (props: any) =>
        //     `${props.value} is not a valid status! Only "cashOnDelivery", "payByCard", "fawryPay" are allowed.`,
        // },
      },
      orderStatus: {
        type: String,
        // validate: {
        //   validator: function (value: any) {
        //     const allowedValues = [
        //       "pending",
        //       "processing",
        //       "shipped",
        //       "delivered",
        //     ];
        //     return allowedValues.includes(value);
        //   },
        //   message: (props: any) =>
        //     `${props.value} is not a valid status! Only "pending",
        //       "processing",
        //       "shipped",
        //       "delivered", are allowed.`,
        // },
      },
      totalPrice: { type: Number },
    },
  ],
});
const OrderModel = mongoose.model("Orders", orderSchema);

export default OrderModel;
