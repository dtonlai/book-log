import axios from "axios";

const url = "http://localhost:5000/";

export const fetchBooks = () => axios.get(url);
export const createBook = (newBook) => axios.post(url, newBook);
export const updateBook = (id, updatedBook) => axios.patch(`${url}${id}`, updatedBook);
export const deleteBook = (id) => axios.delete(`${url}${id}`);
export const sortBooks = (key, sortedBooks) => axios.get(`${url}${key}`, sortedBooks);
