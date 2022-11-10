"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
// launch controller for every possible route
router.get("/products-list", product_controller_1.getProductsList);
router.get("/product/:id", product_controller_1.getProduct);
router.put("/product-update", product_controller_1.updateProduct);
router.post("/product-create", product_controller_1.createProduct);
router.delete("/product-delete/:id", product_controller_1.deleteProduct);
exports.default = router;
