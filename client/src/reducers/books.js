// eslint-disable-next-line
export default (books = [], action) => {
	switch (action.type) {
		case "FETCH_ALL":
			return action.payload;
		case "CREATE":
			return [...books, action.payload];
		case "UPDATE":
			return books.map((book) => (book._id === action.payload._id ? action.payload : book));
		case "DELETE":
			return books.filter((book) => book._id !== action.payload);
		case "SORT":
			return action.payload;
		case "SEARCH":
			return books.filter((book) =>
				book.title.toLowerCase().match(action.payload.toLowerCase())
			);
		default:
			return books;
	}
};
