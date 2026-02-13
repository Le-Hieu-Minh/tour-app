import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Tour App is running!");
});

app.listen(port, () => {
  console.log(`Tour App is listening on http://localhost:${port}`);
});