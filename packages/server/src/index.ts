// src/index.ts
import printrequests from "./routes/printrequests";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";


connect("printqueue"); // use your own db name here

import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware:
app.use(express.json());
app.use("/api/printrequests", authenticateUser, printrequests);
app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
}
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});