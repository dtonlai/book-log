import { FETCH_ALL, CREATE, UPDATE, DELETE, SORT, SEARCH } from "../constants/actionTypes";
import * as api from "../api";

export const getBooks = () => async (dispatch) => {
	try {
		const { data } = await api.fetchBooks();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createBook = (book) => async (dispatch) => {
	try {
		const { data } = await api.createBook(book);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateBook = (id, book) => async (dispatch) => {
	try {
		const { data } = await api.updateBook(id, book);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteBook = (id) => async (dispatch) => {
	try {
		await api.deleteBook(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const sortBooks = (key) => async (dispatch) => {
	try {
		const { data } = await api.sortBooks(key);
		dispatch({ type: SORT, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const searchBooks = (term) => async (dispatch) => {
	try {
		dispatch({ type: SEARCH, payload: term });
	} catch (error) {
		console.log(error);
	}
};
