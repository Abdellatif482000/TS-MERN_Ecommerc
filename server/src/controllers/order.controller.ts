import { Request, Response } from "express";
import OrderServices from "../services/order.service";

class OrderController {
  static async checkout(req: Request, res: Response) {
    // console.log(req.session.userSessionData?.id);
    // const orderService = new OrderServices(req.session.userSessionData as any);
    // const checkout = await orderService.checkout(req.body.paymentMethod);
    res.status(200).send(123);
  }
}
export default OrderController;
