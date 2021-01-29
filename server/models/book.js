import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
	title: { type: String },
	author: { type: String },
	comments: { type: String },
	status: { type: String, default: "Not completed" },
	color: { type: String },
	height: { type: String },
	series: { type: String },
	seriesIndex: { type: Number },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
