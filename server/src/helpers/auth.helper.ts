import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { appKeys } from "../config/app.keys";
import LocalStrategy from "passport-local";

class AuthHelper {
  static async setRole(req: Request) {
    return req.params.role;
  }
  static async generateToken(jwtPayload: object): Promise<string> {
    if (!appKeys.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the configuration.");
    }
    let token = await jwt.sign(jwtPayload, appKeys.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }
  static async setCookiesAndSession(
    req: Request,
    res: Response,
    token: string,
    userData: any,
    role: string,
    orderlist: any,
    cart: any
  ) {
    req.session.userSessionData = {
      id: userData._id as string,
      username: userData.fullName as string,
      email: userData.email as string,
      role: role as "admin" | "customer",
      orderlist: role === "user" ? orderlist.orders : "no orderList",
      cart: role === "user" ? cart.items : "no cart",
    };
    console.log(req.session);
    res.cookie("token", token, {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
    });
  }
}

export default AuthHelper;
