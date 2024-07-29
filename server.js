const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.routes');
const loanRouter = require('./routes/loan.routes');
const authRouter = require('./routes/auth.routes');
const identityRouter = require('./routes/identity.routes');
require('dotenv').config();
const PORT = process.env.PORT;


app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/loan', loanRouter);
app.use('/auth', authRouter);
app.use('/identity', identityRouter);

app.listen(PORT, () => console.log(`server is running at: localhost:${PORT}`));