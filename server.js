require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose Connection error" + err.message);
});

mongoose.connection.once('open', () => {
    console.log("MongoDB connected");
});

require('./models/User');
require('./models/Chatroom');
require('./models/Message');

const app = require('./app');

app.listen(8000, () => {
    console.log('Listening on port 8000');
})