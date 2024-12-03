import mongoose from "mongoose";

export interface CartItem {
  productId: string;
  productDetails: string;
  totalAmount: number;
  productTotalPrice: number;
}
export interface newCartTypes {
  userID: string;
  items: CartItem[];
  totalCartPrice: number;
}

// {
// productId: string;
// totalAmount: number;
// productTotalPrice: number;
//   }
