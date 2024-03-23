const express = require('express');
const apiConfig = require('./constants/apiConfig');
const { errorHandlers } = require('./common');
const controllers = require('./controller');

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(apiConfig.ROOT_URL, controllers);

app.use([
  errorHandlers.errorLogMiddleware,
  errorHandlers.customError,
  errorHandlers.validationErrorMiddleware,
  errorHandlers.handleExceptionSQLMiddleware,
]);
module.exports = app;
