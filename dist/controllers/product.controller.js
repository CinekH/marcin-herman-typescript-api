"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.updateProduct = exports.getProduct = exports.getProductsList = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const getProductsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        if (products === null) {
            res.status(404).json({ message: "Products did not find." });
            return;
        }
        res.status(200).json({ products: products });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProductsList = getProductsList;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Bad format of ID." });
            return;
        }
        const product = yield product_model_1.default.findById(req.params.id);
        if (product === null) {
            res.status(404).json({ message: "Product did not find." });
            return;
        }
        res.status(200).json({ product: product });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.id)) {
            res
                .status(400)
                .json({ message: "There is no ID of product in request." });
            return;
        }
        if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Bad ID format." });
            return;
        }
        const product = yield product_model_1.default.findById(req.body.id);
        if (product === null) {
            res.status(404).json({ message: "There is no product with this ID." });
            return;
        }
        if (!((_b = req.body) === null || _b === void 0 ? void 0 : _b.name) && !((_c = req.body) === null || _c === void 0 ? void 0 : _c.price)) {
            res.status(400).json({ message: "There is no data to update." });
            return;
        }
        let newName = nameValidation(req.body.name);
        let newPrice = parseFloat(req.body.price);
        product.name = newName === null ? product.name : newName;
        product.price = Number.isNaN(newPrice) ? product.price : newPrice;
        product.updateDate = new Date();
        yield product.save();
        res.status(200).json({ message: "Product successfully updated." });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateProduct = updateProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        if (!((_d = req.body) === null || _d === void 0 ? void 0 : _d.price) || !((_e = req.body) === null || _e === void 0 ? void 0 : _e.name)) {
            res.status(400).json({ message: "No required product data." });
            return;
        }
        const price = Number.isNaN(parseFloat(req.body.price)) ? null : parseFloat(req.body.price);
        const name = nameValidation(req.body.name);
        if (price === null || name === null) {
            res.status(400).json({ message: "Data validation failed." });
            return;
        }
        const product = new product_model_1.default({ price: price, name: name });
        yield product.save();
        res.status(200).json({ message: "Product successfully created." });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res
                .status(400)
                .json({ message: "There is no ID of product in request." });
            return;
        }
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Bad format of ID." });
            return null;
        }
        const product = yield product_model_1.default.findByIdAndDelete(req.params.id);
        if (product === null) {
            res.status(404).json({ message: "Product did not find." });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully." });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteProduct = deleteProduct;
const nameValidation = (name) => {
    if (!(typeof name === "string" &&
        Object.prototype.toString.call(name) === "[object String]"))
        return null;
    if (name.length > 100)
        return null;
    return name;
};
