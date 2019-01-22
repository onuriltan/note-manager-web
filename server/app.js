const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

// Connect to mongo
const dbAddress = require('./config/MongoConnection').MongoURI;
mongoose.connect(dbAddress, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Routes
const app = require('./routes/api');
const posts = require('./routes/api/posts/posts');
const auth = require('./routes/api/users/UserService');
server.use('/api', app);
server.use('/api/posts', posts);
server.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  // Static folder
  server.use(express.static(__dirname + '/public'));

  // Handle SPA
  server.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started at port ${port}`)
});
