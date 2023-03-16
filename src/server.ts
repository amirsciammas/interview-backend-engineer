import express from "express";
import { userRouter } from "./routes/userRoutes";
import { albumRouter } from "./routes/albumRoutes";
import cors from 'cors';

export const app = express();

// Use JSON middleware for parsing request bodies
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/users", userRouter);
app.use("/albums", albumRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});