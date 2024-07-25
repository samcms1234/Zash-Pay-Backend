const mongoose = require('mongoose');

async function connectMongoDb(uri) {
 return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = { connectMongoDb };