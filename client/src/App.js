import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { CirclePicker } from "react-color";

import "./index.scss";
import {
	getBooks,
	createBook,
	deleteBook,
	updateBook,
	sortBooks,
	searchBooks,
} from "./actions/books";
import Book from "./components/Book/Book";

//react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
	const dispatch = useDispatch();
	const books = useSelector((state) => state.books);
	const emptyBook = { title: "", author: "", comments: "", status: "Not completed", color: "" };
	const [show, setShow] = useState();
	const [disabled, setDisable] = useState(false);
	const [validated, setValidated] = useState(false);
	const [bookData, setBookData] = useState(emptyBook);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(getBooks());
	}, [dispatch]);

	const handleNavSelect = (key) => {
		switch (key) {
			case "add":
				disabledOff();
				setBookData({
					...emptyBook,
					color: colorArray[Math.floor(Math.random() * Math.floor(colorArray.length))],
				});
				showModal();
				break;
			default:
				dispatch(sortBooks(key));
				break;
		}
	};

	const handleSearch = (e) => {
		dispatch(searchBooks(searchTerm));
	};

	const showModal = () => setShow(true);
	const closeModal = () => setShow(false);
	const disabledOn = () => setDisable(true);
	const disabledOff = () => setDisable(false);

	const viewBook = (selectedBook) => {
		disabledOn();
		setBookData({ ...selectedBook });
		showModal();
	};

	const handleEditChange = () => {
		disabled ? setDisable(false) : setDisable(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
		bookData._id
			? dispatch(updateBook(bookData._id, bookData))
			: dispatch(createBook(bookData));
		closeModal();
	};

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(deleteBook(bookData._id));
		closeModal();
	};

	const handleColorChange = (selectedColor) => {
		setBookData({ ...bookData, color: selectedColor.hex });
	};

	return (
		<>
			{/* Navigation */}
			<Navbar
				collapseOnSelect
				bg="dark"
				variant="dark"
				expand="lg"
				fixed={isMobile ? "bottom" : "top"}
				onSelect={handleNavSelect}
			>
				<Navbar.Brand href="#home">Book-Log</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link eventKey="add">Add book</Nav.Link>
						<NavDropdown title="Sort by" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1" eventKey="title">
								Title
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2" eventKey="author">
								Author
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3" eventKey="status">
								Status
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3" eventKey="series">
								Series
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline onSubmit={handleSearch}>
						<FormControl
							type="text"
							className="mr-sm-2"
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button variant="outline-success" type="submit">
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>

			{/* Form - Add Book */}
			<Modal show={show} onHide={closeModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>{bookData._id ? "View/Edit Book" : "Add Book"}</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Modal.Body>
						{bookData._id ? (
							<Form.Group>
								<Form.Check
									type="switch"
									id="custom-switch"
									label="Edit"
									onClick={handleEditChange}
								/>
							</Form.Group>
						) : (
							<></>
						)}
						<Form.Group controlId="">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								name="title"
								placeholder="The Hitchhiker's Guide to the Galaxy"
								onChange={(e) =>
									setBookData({ ...bookData, title: e.target.value })
								}
								defaultValue={bookData.title}
								disabled={disabled ? true : false}
								required
							/>
						</Form.Group>
						<Form.Group controlId="">
							<Form.Label>Author</Form.Label>
							<Form.Control
								type="text"
								name="author"
								placeholder="Douglas Adams"
								onChange={(e) =>
									setBookData({ ...bookData, author: e.target.value })
								}
								defaultValue={bookData.author}
								disabled={disabled ? true : false}
								required
							/>
						</Form.Group>
						<Form.Group controlId="">
							<Form.Label>Comments</Form.Label>
							<Form.Control
								as="textarea"
								name="comments"
								rows={3}
								onChange={(e) =>
									setBookData({ ...bookData, comments: e.target.value })
								}
								defaultValue={bookData.comments}
								required
								disabled={disabled ? true : false}
							/>
						</Form.Group>
						<Form.Group controlId="">
							<Form.Label>Status</Form.Label>
							<Form.Control
								as="select"
								name="status"
								defaultValue={bookData.status}
								onChange={(e) =>
									setBookData({ ...bookData, status: e.target.value })
								}
								disabled={disabled ? true : false}
								required
							>
								<option>Not completed</option>
								<option>Currently reading</option>
								<option>Completed</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Series</Form.Label>
							<Form.Row>
								<Col xs={10}>
									<Form.Control
										type="text"
										placeholder="Hitchhiker's Guide to the Galaxy"
										defaultValue={bookData.series}
										disabled={disabled ? true : false}
										onChange={(e) =>
											setBookData({ ...bookData, series: e.target.value })
										}
									></Form.Control>
								</Col>
								<Col xs={2}>
									<FormControl
										type="number"
										placeholder="0"
										min="0"
										defaultValue={bookData.seriesIndex}
										disabled={disabled ? true : false}
										onChange={(e) =>
											setBookData({
												...bookData,
												seriesIndex: e.target.value,
											})
										}
									/>
								</Col>
							</Form.Row>
						</Form.Group>
						<Form.Group>
							<Form.Label>Color</Form.Label>
							<CirclePicker
								colors={colorArray}
								width="100%"
								onChange={handleColorChange}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeModal}>
							Close
						</Button>

						{bookData._id ? (
							<Button
								variant="danger"
								onClick={handleDelete}
								disabled={disabled ? true : false}
							>
								Delete
							</Button>
						) : (
							<></>
						)}
						<Button
							variant="primary"
							type="submit"
							onClick={handleSubmit}
							disabled={disabled ? true : false}
						>
							{bookData._id ? "Save" : "Add"}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/* Book Shelf */}
			<Container
				id="book-shelf"
				style={{
					paddingTop: isMobile ? "28px" : "84px",
					paddingBottom: isMobile ? "84px" : "28px",
				}}
			>
				<Row>
					{books.map((book) => (
						<div
							className="book-container my-2 col-0-5"
							onClick={() => viewBook(book)}
							id={book._id}
							key={book._id}
						>
							<Book book={book} className="col-1" />
						</div>
					))}
				</Row>
			</Container>
		</>
	);
};

const colorArray = ["#8C001A", "#FAFF70", "#046865", "#3E92CC", "#57467B", "#6B705C", "#A5A58D"];

export default App;
