import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes";
import dotenv from 'dotenv';

//express start and dotenv config
const app: Express = express();
dotenv.config();

//display hello messsage on "/" route
app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h2 style="text-align:center">Hey, I'm Marcin Herman and this is my recruitment task.</h2>`
  );
});

//setup needed to access request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//initialize routes
app.use("/api/", productRoutes);

//connect to mongodb and start server
mongoose
  .connect(process.env.CONNECTION_URL as string)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
