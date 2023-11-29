import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Alacrity Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
