import { body, validationResult } from "express-validator";
import AuthServices from "../services/auth.service";
import { Request, Response } from "express";
import { validateReqData } from "../utils/validate.utils";

const authService = new AuthServices();

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const dataValidation = await validateReqData(req);
      // -----------------------------------
      if (dataValidation.message === "not valid")
        res.status(400).json(dataValidation);
      // -----------------------------------
      if (dataValidation.message === "valid") {
        const newUser: any = await authService.register(
          req.params.role,
          req.body
        );
        const savedUser = await newUser.userModel.save();
        const savedCart = newUser.cart
          ? await newUser.cart.save()
          : "no cart for admins";
        const savedOrderlist = newUser.orderlist
          ? await newUser.orderlist.save()
          : "no orderlist for admins";
        res.status(200).json({
          savedUser: savedUser,
          savedCart: savedCart,
          savedOrderlist: savedOrderlist,
        });
      }
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err.errorResponse);
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const dataValidation = await validateReqData(req);
      // -----------------------------------
      if (dataValidation.message === "not valid")
        res.status(400).json(dataValidation);
      // -----------------------------------
      if (dataValidation.message === "valid") {
        const newUser: any = await authService.signin(
          req,
          res,
          req.params.role,
          req.body
        );
        res.status(200).json(newUser);
      }
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err.errorResponse);
    }
  }
  static logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      res.clearCookie("token", { path: "/" });
      res.send("session ended");
    });
  }
}
