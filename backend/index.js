import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import router from "./routers/routers.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); 

app.use(router);

connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
