import express from "express";
import { getBooks, createBook, updateBook, deleteBook, sortBooks } from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/:key", sortBooks);

export default router;
