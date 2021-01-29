import React from "react";

//react-bootstrap
import Row from "react-bootstrap/Row";

const Book = ({ book }) => {
	return (
		<>
			<div
				className="book"
				style={{
					height: book.height,
					backgroundColor: book.color,
					color: "white",
				}}
				onClick={() => {}}
			>
				<div className="book-title">{book.title}</div>
				<div className="accent-container">
					<Row className="accent"></Row>
					<Row className="accent"></Row>
				</div>
			</div>
		</>
	);
};

export default Book;
