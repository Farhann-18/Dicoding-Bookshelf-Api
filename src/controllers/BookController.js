/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const { nanoid } = require("nanoid");
const { logEvents } = require("../middleware/logEvent");
const {
  initialData,
  bookValidation,
  addBook,
  getAllBooks,
  getAllBookById,
  deleteBook,
  bookValidations,
  updateBook,
} = require("../models/book");

const {
  responseSuccessAddBooks,
  responseFailAddBooks,
  responseFail,
  responseSuccess,
} = require("../utils/response");

const addNewBooksHandler = async (request, h) => {
  try {
    const book = request.payload;
    const { error } = bookValidation.validate(book);
    if (error) {
      return h.response(responseFailAddBooks(error.message)).code(400);
    }

    book.finished = book.pageCount === book.readPage;
    const bookId = nanoid(16);
    const result = addBook(book);
    const newBook = { id: bookId, ...result };
    initialData.setBooks([...initialData.books, newBook]);
    JSON.parse(JSON.stringify(initialData.books));
    logEvents(`Buku ${result.name} berhasil ditambahkan`, "log.txt");
    return h.response(responseSuccessAddBooks({ bookId })).code(201);
  } catch (error) {
    console.log({ err: error.message });
    logEvents(`${error.message}`, "error_log.txt");
  }
};

const getAllBooksHandler = async (request, h) => {
  try {
    const results = await Object.values(getAllBooks())?.filter((book) => {
      if (request.query.name !== undefined) {
        return book.name
          .toLowerCase()
          .includes(request.query.name.toLowerCase());
      }
      if (request.query.reading !== undefined) {
        return (
          book.reading === (request.query.reading === "1") ||
          request.query.reading === "true"
        );
      }
      if (request.query.finished !== undefined) {
        return (
          book.finished === (request.query.finished === "1") ||
          request.query.finished === "true"
        );
      }

      return book;
    });

    const books = results?.map((value) => ({
      id: value.id,
      name: value.name,
      publisher: value.publisher,
    }));

    return h.response(responseSuccess({ books })).code(200);
  } catch (error) {
    console.log({ err: error.message });
    logEvents(`${error.message}`, "error_log.txt");
  }
};

const getAllBookByIdHandler = async (request, h) => {
  try {
    const bookId = request.params.id;
    const book = getAllBookById(bookId);
    if (!book) {
      return h.response(responseFail("Buku tidak ditemukan")).code(404);
    }

    return h.response(responseSuccess({ book })).code(200);
  } catch (error) {
    console.log({ err: error.message });
    logEvents(`${error.message}`, "error_log.txt");
  }
};

const updateBookByIdHandler = async (request, h) => {
  try {
    const bookId = request.params.id;
    const book = request.payload;
    const currentBook = getAllBookById(bookId);
    if (!currentBook) {
      return h
        .response(responseFail("Gagal memperbarui buku. Id tidak ditemukan"))
        .code(404);
    }

    const { error } = bookValidations.validate(book);
    if (error) {
      return h.response(responseFailAddBooks(error.message)).code(400);
    }
    const result = updateBook(currentBook, book);
    const filteredBook = initialData.books.filter(
      (filtered) => filtered.id !== bookId
    );
    const newBook = { ...result };
    initialData.setBooks([...filteredBook, newBook]);
    JSON.parse(JSON.stringify(initialData.books));
    logEvents(`Buku ${currentBook.name} berhasil diperbarui`, "log.txt");

    return h
      .response({ status: "success", message: "Buku berhasil diperbarui" })
      .code(200);
  } catch (error) {
    console.log({ err: error.message });
    logEvents(`${error.message}`, "error_log.txt");
  }
};

const deleteBookByIdHandler = async (request, h) => {
  try {
    const { bookId } = request.params;
    const currentBook = getAllBookById(bookId);
    if (!currentBook) {
      return h
        .response(responseFail("Buku gagal dihapus. Id tidak ditemukan"))
        .code(404);
    }

    const result = deleteBook(bookId);
    initialData.setBooks([...result]);
    JSON.parse(JSON.stringify(initialData.books));
    logEvents(`Buku ${currentBook.name} berhasil dihapus`, "log.txt");

    return h
      .response({ status: "success", message: "Buku berhasil dihapus" })
      .code(200);
  } catch (error) {
    console.log({ err: error.message });
    logEvents(`${error.message}`, "error_log.txt");
  }
};

module.exports = {
  addNewBooksHandler,
  getAllBooksHandler,
  getAllBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
