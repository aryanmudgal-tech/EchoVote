import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import replyRoutes from "./routes/reply.routes.js";
import sequelize from "./config/database.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts", replyRoutes);

// Initialize database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  }); 