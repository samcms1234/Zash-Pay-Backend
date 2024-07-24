const express = require('express');

const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT;


app.use(bodyParser.json());

app.listen(PORT, () => console.log(`server is running at: localhost:${PORT}`));