/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
const Joi = require("joi");

const initialData = {
  books: [],
  setBooks(data) {
    this.books = data;
  },
};

const bookValidation = Joi.object({
  name: Joi.string()
    .required()
    .error(new Error("Gagal menambahkan buku. Mohon isi nama buku")),
  year: Joi.number()
    .integer()
    .min(2000)
    .max(2050)
    .required()
    .error(new Error("Tahun terbit tidak boleh kosong!")),
  author: Joi.string()
    .required()
    .error(new Error("Nama Penulis tidak boleh kosong!")),
  summary: Joi.string()
    .required()
    .error(new Error("Isi Ringkasan  tidak boleh kosong!")),
  publisher: Joi.string()
    .required()
    .error(new Error("Nama Penerbit tidak boleh kosong!")),
  pageCount: Joi.number()
    .integer()
    .min(1)
    .required()
    .error(new Error("Jumlah halaman tidak boleh kosong!")),
  readPage: Joi.number()
    .integer()
    .custom((value, helpers) => {
      const [{ readPage, pageCount }] = helpers.state.ancestors;
      if (readPage > pageCount) {
        return helpers.error("readPage>pageCount");
      }
      return value;
    })
    .required()
    .error((error) => {
      if (error[0].code === "readPage>pageCount") {
        return new Error(
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        );
      }
      return new Error("Mohon isi jumlah halaman yang sudah dibaca");
    }),
  reading: Joi.boolean().required().error(new Error("Mohon isi reading ")),
});

const bookValidations = Joi.object({
  name: Joi.string()
    .required()
    .error(new Error("Gagal memperbarui buku. Mohon isi nama buku")),
  year: Joi.number()
    .integer()
    .min(2000)
    .max(2050)
    .required()
    .error(new Error("Tahun terbit tidak boleh kosong!")),
  author: Joi.string()
    .required()
    .error(new Error("Nama Penulis tidak boleh kosong!")),
  summary: Joi.string()
    .required()
    .error(new Error("Isi Ringkasan  tidak boleh kosong!")),
  publisher: Joi.string()
    .required()
    .error(new Error("Nama Penerbit tidak boleh kosong!")),
  pageCount: Joi.number()
    .integer()
    .min(1)
    .required()
    .error(new Error("Jumlah halaman tidak boleh kosong!")),
  readPage: Joi.number()
    .integer()
    .custom((value, helpers) => {
      const [{ readPage, pageCount }] = helpers.state.ancestors;
      if (readPage > pageCount) {
        return helpers.error("readPage>pageCount");
      }
      return value;
    })
    .required()
    .error((error) => {
      if (error[0].code === "readPage>pageCount") {
        return new Error(
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        );
      }
      return new Error("Mohon isi jumlah halaman yang sudah dibaca");
    }),
  reading: Joi.boolean().required().error(new Error("Mohon isi reading ")),
});

const getAllBooks = () => {
  const books = initialData.books || [];
  return books;
};
const getAllBookById = (bookId) =>
  initialData.books.filter((book) => book.id === bookId)[0];

const addBook = (book) => {
  book.insertedAt = new Date().toISOString();
  book.updatedAt = new Date().toISOString();

  return book;
};

const updateBook = (currentBook, book) => {
  book.id = currentBook.id;
  book.insertedAt = currentBook.insertedAt;
  book.updatedAt = new Date().toISOString();
  book.finished = book.pageCount === book.readPage;
  return book;
};

const deleteBook = (bookId) => {
  const filteredBook = initialData.books.filter((book) => book.id !== bookId);
  return filteredBook;
};

module.exports = {
  initialData,
  bookValidation,
  bookValidations,
  addBook,
  getAllBooks,
  getAllBookById,
  updateBook,
  deleteBook,
};
