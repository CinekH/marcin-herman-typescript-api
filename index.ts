import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes";
import dotenv from 'dotenv';

const app: Express = express();

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h2 style="text-align:center">Hey, I'm Marcin Herman and this is my recruitment task.</h2>`
  );
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api/", productRoutes);
mongoose
  .connect(process.env.CONNECTION_URL as string)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
