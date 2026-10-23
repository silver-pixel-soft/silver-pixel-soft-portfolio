import dotenv from "dotenv";
import connectDB from "./db/index.ts";
import { app } from "./app.ts";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is live at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
  