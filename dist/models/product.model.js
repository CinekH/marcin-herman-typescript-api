"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const getPrice = (price) => {
    return (price / 100).toFixed(2);
};
const setPrice = (price) => {
    return price * 100;
};
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
    },
    price: { type: Number, get: getPrice, set: setPrice, required: true },
    updateDate: { type: Date, required: false, default: null },
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
    id: false,
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
