/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const {
  addNewBooksHandler,
  getAllBooksHandler,
  getAllBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require("../controllers/BookController");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addNewBooksHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getAllBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
