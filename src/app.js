require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const listingsRouter = require('./listings/listings-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const { CLIENT_ORIGIN } = require('./config');

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use('/api/listings', listingsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world, here is the up and running server!');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  console.error(error);
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
