import express from "express";
import { create, getAllPosts } from "../controller/post.controller.js";
const router = express.Router();

router.post("/create-post", create);
router.get("/all-posts", getAllPosts);

export default router;
