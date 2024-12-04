import { Request, Response } from "express";
import AuthHelper from "../helpers/auth.helper";
import OrderHelper from "../helpers/order.helper";
import { adminModel, customerModel } from "../models/auth.model";
import { signinInterface, signupInterface } from "../types/auth.type";
import CartServices from "./cart.service";
import OrderServices from "./order.service";
import bcrypt from "bcryptjs";

class AuthServices {
  // // private token: string;
  // private role: string;

  // constructor(role = "") {
  //   this.role = role;
  // }

  async register(role: string, userData: signupInterface) {
    // ----------- hashing Pass ---------------
    const salt = await bcrypt.genSalt(10);
    const hashedPass: string = await bcrypt.hash(
      userData.password as string,
      salt
    );
    userData.password = hashedPass;

    // ----------- user Reisteration ---------------

    if (role === "user") {
      const userModel = new customerModel(userData);

      // ----------- create new cart and orderlist for user ---------------
      const cartService = new CartServices(userModel.id as string);
      const orderService = new OrderServices(userModel as any);
      const cart = await cartService.initCart();
      const orderlist = await orderService.initOrdelist();

      return { userModel: userModel, cart: cart, orderlist: orderlist };
    }

    // ----------- admin Reisteration ---------------
    if (role === "admin") {
      const userModel = new adminModel(userData);

      return { userModel: userModel };
    }
    // ------------ saveModels --------------
  }
  async signin(
    req: Request,
    res: Response,
    role: string,
    userData: signinInterface
  ) {
    let foundUser: any;
    //  --------- get user data from db --------
    if (role === "user") {
      foundUser = await customerModel.findOne({ email: userData.email });
    }
    if (role === "admin") {
      foundUser = await adminModel.findOne({ email: userData.email });
    }
    console.log(foundUser);
    // ------ check password -------------
    let isPasswordMatch = await bcrypt.compare(
      userData.password,
      foundUser.password
    );
    //--------get cart and orderlist for sessions -----
    const cartService = new CartServices(foundUser.id as string);
    const orderService = new OrderServices(foundUser);
    const cart = await cartService.getCart();
    const orderlist = await orderService.getOrderlist();
    console.log(orderlist);
    // ------- generate token and init session --------
    if (isPasswordMatch) {
      const token = await AuthHelper.generateToken({
        userID: foundUser.id,
      });
      await AuthHelper.setCookiesAndSession(
        req,
        res,
        token,
        foundUser,
        role,
        orderlist,
        cart
      );
      return {
        message: "Sign in successfully",
        data: { email: foundUser.email, fullname: foundUser.fullName },
      };
    } else {
      return { message: "password not match" };
    }
  }
}
export default AuthServices;
