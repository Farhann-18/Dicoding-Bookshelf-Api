/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Hapi = require("@hapi/hapi");
const routes = require("./routes/index");
const allowedList = require("./middleware/allowedCorsList");
const { PORT } = require("./utils/constants/api");

const init = async (_) => {
  const server = Hapi.server({
    port: PORT,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: allowedList,
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
