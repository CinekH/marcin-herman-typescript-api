import { Schema, model } from "mongoose";

interface IProduct {
  name: string;
  price: number | string;
  updateDate: Date;
}

const getPrice = (price: number): string => {
  return (price / 100).toFixed(2);
};

const setPrice = (price: number): number => {
  return price * 100;
};

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      maxLength: 100,
      required: true,
    },
    price: { type: Number, get: getPrice, set: setPrice, required: true },
    updateDate: { type: Date, required: false, default: null },
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
    id: false,
  }
);

export default model("Product", productSchema);
