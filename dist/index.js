"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
//express start and dotenv config
const app = (0, express_1.default)();
dotenv_1.default.config();
//display hello messsage on "/" route
app.get("/", (req, res) => {
    res.send(`<h2 style="text-align:center">Hey, I'm Marcin Herman and this is my recruitment task.</h2>`);
});
//setup needed to access request body
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
//initialize routes
app.use("/api/", product_routes_1.default);
//connect to mongodb and start server
mongoose_1.default
    .connect(process.env.CONNECTION_URL)
    .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
