import Product from "../models/product.model";
import express from 'express';

// /api/products-list
export const getProductsList = async (req: express.Request, res: express.Response) => {
  try {
    //load all product without filter
    const products = await Product.find();

    // if there is no products display message
    if (products === null) {
      res.status(404).json({ message: "Products did not find." });
      return;
    }

    //otherwise display products list
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json(error);
  }
};

// /api/product/:id
export const getProduct = async (req: express.Request, res: express.Response) => {
  try {
    //check if id parameter contains proper id format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." });
      return;
    }

    //otherwise search for product by id
    const product = await Product.findById(req.params.id);

    //if there is no product with this id, display message
    if (product === null) {
      res.status(404).json({ message: "Product did not find." });
      return;
    }

    //otherwise display product
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json(error);
  }
};

// /api/product-update
export const updateProduct = async (req: express.Request, res: express.Response) => {
  try {
    //if there is no id in body diplsay message
    if (!req.body?.id) {
      res
        .status(400)
        .json({ message: "There is no ID of product in request." });
      return;
    }

    //check if id has proper format
    if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad ID format." });
      return;
    }

    //search for product with id
    const product = await Product.findById(req.body.id);

    //if there is no product display message
    if (product === null) {
      res.status(404).json({ message: "There is no product with this ID." });
      return;
    }

    //if there is no name and price display message
    if (!req.body?.name && !req.body?.price) {
      res.status(400).json({ message: "There is no data to update." });
      return;
    }

    //validate name and price
    let newName: string | null = nameValidation(req.body.name);
    let newPrice: number = parseFloat(req.body.price);

    //check if name and price is valid, if not do not update product
    product.name = newName === null ? product.name : newName;
    product.price = Number.isNaN(newPrice) ? product.price : newPrice;
    product.updateDate = new Date();

    //update product (or save without updating if parameters are invalid)
    await product.save();

    res.status(200).json({ message: "Product successfully updated." });
  } catch (error) {
    res.status(500).json(error);
  }
};

// /api/product-create
export const createProduct = async (req: express.Request, res: express.Response) => {
  try {
    //check if body contains required data
    if (!req.body?.price || !req.body?.name) {
      res.status(400).json({ message: "No required product data." });
      return;
    }

    //validate data
    const price: number | null = Number.isNaN(parseFloat(req.body.price)) ? null : parseFloat(req.body.price);
    const name: string | null = nameValidation(req.body.name);

    //if data is invalid dispaly message
    if(price === null || name === null) {
      res.status(400).json({ message: "Data validation failed." });
      return;
    }

    //create new product and save to db
    const product = new Product({ price: price, name: name });
    await product.save();
    res.status(200).json({ message: "Product successfully created." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: express.Request, res: express.Response) => {
  try {
    //check if body contains required id
    if (!req.params.id) {
      res
        .status(400)
        .json({ message: "There is no ID of product in request." });
      return;
    }

    //check if id has proper format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." })
      return null;
    }

    //search for product and delete if exist
    const product = await Product.findByIdAndDelete(req.params.id);

    //check if any product was deleted
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