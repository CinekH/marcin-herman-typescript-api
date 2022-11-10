import Product from "../models/product.model";
import express from 'express';

export const getProductsList = async (req: express.Request, res: express.Response) => {
  try {
    const products = await Product.find();
    if (products === null) {
      res.status(404).json({ message: "Products did not find." });
      return;
    }
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProduct = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." });
      return;
    }
    const product = await Product.findById(req.params.id);
    if (product === null) {
      res.status(404).json({ message: "Product did not find." });
      return;
    }
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.body?.id) {
      res
        .status(400)
        .json({ message: "There is no ID of product in request." });
      return;
    }
    if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad ID format." });
      return;
    }
    const product = await Product.findById(req.body.id);

    if (product === null) {
      res.status(404).json({ message: "There is no product with this ID." });
      return;
    }

    if (!req.body?.name && !req.body?.price) {
      res.status(400).json({ message: "There is no data to update." });
      return;
    }

    let newName: string | null = nameValidation(req.body.name);
    let newPrice: number = parseFloat(req.body.price);

    product.name = newName === null ? product.name : newName;
    product.price = Number.isNaN(newPrice) ? product.price : newPrice;
    product.updateDate = new Date();

    await product.save();

    res.status(200).json({ message: "Product successfully updated." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.body?.price || !req.body?.name) {
      res.status(400).json({ message: "No required product data." });
      return;
    }
    const price: number | null = Number.isNaN(parseFloat(req.body.price)) ? null : parseFloat(req.body.price);
    const name: string | null = nameValidation(req.body.name);

    if(price === null || name === null) {
      res.status(400).json({ message: "Data validation failed." });
      return;
    }

    const product = new Product({ price: price, name: name });
    await product.save();
    res.status(200).json({ message: "Product successfully created." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.params.id) {
      res
        .status(400)
        .json({ message: "There is no ID of product in request." });
      return;
    }
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." })
      return null;
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product === null) {
      res.status(404).json({ message: "Product did not find." });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};

const nameValidation = (name: string): string | null => {
  if (
    !(
      typeof name === "string" &&
      Object.prototype.toString.call(name) === "[object String]"
    )
  )
    return null;
  if (name.length > 100) return null;
  return name;
};