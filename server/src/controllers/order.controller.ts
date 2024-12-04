import { Request, Response } from "express";
import OrderServices from "../services/order.service";

class OrderController {
  static async checkout(req: Request, res: Response) {
    const orderService = new OrderServices(req.session.userSessionData as any);
    const checkout = await orderService.checkout(req.body.paymentMethod);
    checkout.cart.save();
    checkout.orderlist.save();
    res.status(200).send(checkout);
  }
  static async getOrders(req: Request, res: Response) {
    const orderService = new OrderServices(req.session.userSessionData as any);
    const foundOrders = await orderService.getOrderlist();
    res.status(200).send(foundOrders);
  }
  static async filterOrders(req: Request, res: Response) {
    const orderService = new OrderServices(req.session.userSessionData as any);
    const orderByStatus = await orderService.filterOrdersByStatus(
      req.body.status
    );

    res.status(200).send(orderByStatus);
  }
  static async manageOrderStatus(req: Request, res: Response) {
    const orderService = new OrderServices(req.session.userSessionData as any);
    const foundOrder = await orderService.manageOrderStatus(
      req.body.orderID,
      req.body.newStatus
    );

    foundOrder.save();

    res.status(200).send(foundOrder);
  }
}
export default OrderController;
