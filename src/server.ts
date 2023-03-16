import express from "express";
import cors from 'cors';

export const app = express();

// Use JSON middleware for parsing request bodies
app.use(cors());
app.use(express.json());

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});