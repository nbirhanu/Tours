const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./Router/tourRouter');
const userRouter = require('./Router/userRouter');

// using express
const app = express();

// MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
