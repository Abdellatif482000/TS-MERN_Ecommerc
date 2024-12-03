import { Router, json } from "express";
// --------------------------------
import ProductController from "../controllers/product.controller";
import VerifyClass from "../middelware/verifications.middelware";
import ProdcutValidator from "../validators/product.validator";
import { checkSchema } from "express-validator";

// --------------------------------

const productRoutes = Router();
productRoutes.post(
  "/admin/createProduct",
  VerifyClass.verifyToken,
  VerifyClass.verifyRole("admin"),
  checkSchema(ProdcutValidator.validateCreateProduct),
  ProductController.createProduct
);
productRoutes.get(
  "/getSingleProduct/:prodID",
  ProductController.getSingleProduct
);
productRoutes.get(
  "/getProductsByCategory/:category",
  ProductController.getProductsByCategory
);

productRoutes.put(
  "/updateProduct",
  VerifyClass.verifyToken,
  VerifyClass.verifyRole("admin"),
  checkSchema(ProdcutValidator.validateModifyProduct),
  ProductController.modifyProduct
);
productRoutes.delete(
  "/deleteProduct",
  VerifyClass.verifyToken,
  VerifyClass.verifyRole("admin"),
  ProductController.deleteProduct
);

export default productRoutes;
