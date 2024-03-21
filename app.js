const express = require("express");
require('dotenv').config();
const app = express();
const connectDB = require('./db/connect');
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//routes
app.get('/', (req, res) => {
    res.send('E-Commerce API');
})
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

//error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
