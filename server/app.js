const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

// Routes
const app = require('./routes');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/users');
server.use('/', app);
server.use('/api/posts', posts);
server.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started at port ${port}`)
});
