/* eslint-disable import/no-useless-path-segments */
/* eslint-disable object-curly-spacing */
const { logEvents } = require("../middleware/logEvent");

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = { logger };
