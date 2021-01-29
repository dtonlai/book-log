import mongoose from "mongoose";

import Book from "../models/book.js";

export const getBooks = async (req, res) => {
	try {
		const books = await Book.find();
		res.status(201).json(books);
	} catch (error) {
		console.log(error);
	}
};

export const createBook = async (req, res) => {
	let bookTitleArray = req.body.title.split(" ");
	let bookHeight = 13 + bookTitleArray.length;
	let newBook = new Book({ ...req.body, height: `${bookHeight}vh` });
	try {
		newBook.save();
		res.status(201).json(newBook);
	} catch (error) {
		console.log(error);
	}
};

export const updateBook = async (req, res) => {
	const { id: _id } = req.params;
	const book = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
	//pass in an object with ...post spread including _id since it is not included in the post form
	const updatedBook = await Book.findByIdAndUpdate(_id, { ...book, _id }, { new: true });
	res.json(updatedBook);
};

export const deleteBook = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No book with that id");
	await Book.findByIdAndRemove(id);
	res.json({ message: "Book deleted successfully" });
};

export const sortBooks = async (req, res) => {
	let sortedBooks;
	switch (req.params.key) {
		case "title":
			sortedBooks = await Book.find()
				.collation({ locale: "en", strength: 1 })
				.sort({ title: 1 });
			break;
		case "author":
			sortedBooks = await Book.find()
				.collation({ locale: "en", strength: 1 })
				.sort({ author: 1 });
			break;
		case "status":
			sortedBooks = await Book.find()
				.collation({ locale: "en", strength: 1 })
				.sort({ status: 1 });
			break;
		case "series":
			sortedBooks = await Book.find()
				.collation({ locale: "en", strength: 1 })
				.sort({ series: 1, seriesIndex: 1 });
			break;
	}
	res.status(201).json(sortedBooks);
};
