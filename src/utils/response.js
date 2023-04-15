/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
const response = (status, message, data) => ({
  status,
  message,
  data,
});

const responseSuccess = (books, message) => response("success", message, books);

const responseSuccessAddBooks = (books) =>
  response("success", "Buku berhasil ditambahkan", books);

const responseSuccessDeleteBooks = (message) => {
  response("success", message);
};
const responseSuccessUpdateBooks = (message) => {
  response("success", message);
};

const responseFailAddBooks = (message) => response("fail", message);

const responseFail = (message) => response("fail", message);

module.exports = {
  response,
  responseSuccess,
  responseFail,
  responseSuccessAddBooks,
  responseFailAddBooks,
  responseSuccessDeleteBooks,
  responseSuccessUpdateBooks,
};
