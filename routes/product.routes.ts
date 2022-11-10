import express, { Router } from "express";
import {
  getProductsList,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router: Router = express.Router();

// launch controller for every possible route
router.get("/products-list", getProductsList);
router.get("/product/:id", getProduct);
router.put("/product-update", updateProduct);
router.post("/product-create", createProduct);
router.delete("/product-delete/:id", deleteProduct);

export default router;