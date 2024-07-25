const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.routes');
require('dotenv').config();
const PORT = process.env.PORT;


app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`server is running at: localhost:${PORT}`));