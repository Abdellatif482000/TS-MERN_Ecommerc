import ProductModel from "../models/product.model";

class ProductService {
  prodID: string;
  constructor(prodID = "") {
    this.prodID = prodID;
  }

  async getSingleProduct() {
    const getProduct = await ProductModel.findOne({ _id: this.prodID });
    return getProduct;
  }
}

export default ProductService;
