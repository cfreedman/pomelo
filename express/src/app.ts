import express from "express";

import authorRouter from "./routes/routes";

const app = express();

app.use(express.json());

app.use("/api/authors/", authorRouter);

app.get("/", (_req, res) => {
  res.send("Hello from this first pomelo app");
});

export default app;
