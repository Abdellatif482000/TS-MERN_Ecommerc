import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import VerifyClass from "./middelware/verifications.middelware";
const MongoDBStore = require("connect-mongodb-session")(session);
import Cookies from "cookies";

// ------------ Files ---------------
import connectMongoDB from "./database/mongo.database";
import { appKeys } from "./config/app.keys";
import { mongoDBConfig } from "./config/db.config";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";
import orderRoutes from "./routes/order.route";
// import paymentRoutes from "./routes/payment.route";
import authRoutes from "./routes/auth.route";
import { compareSync } from "bcryptjs";
import { getCookisValue } from "./middelware/getCookieValue.middelware";
import CartServices from "./services/cart.service";

// ------------------------------------

dotenv.config();
const PORT = process.env.PORT;

const store: any = new MongoDBStore({
  uri: mongoDBConfig.MONGO_URI,
  collection: "sessions",
});

const app = express();
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/api`);
});

// ---------- app.use() ------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: appKeys.SESSION_SECRET!,
    name: "sessionID",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

// -------- DB --------------
connectMongoDB();
// --------- Routes -------------
const routes = [
  productRoutes,
  cartRoutes,
  orderRoutes,
  // paymentRoutes,
  authRoutes,
];
app.use("/api", routes);
// ----------------------

app.get("/trailcart", async (req: Request, res: Response) => {
  // console.log(req.session.userSessionData!.id);
  const cartServ = new CartServices(req.session.userSessionData!.id);
});
