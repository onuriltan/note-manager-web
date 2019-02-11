const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');

// Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Middleware
const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(cookieParser());
server.use(passport.initialize());


// Connect to Mongo
const dbAddress = process.env.MONGO_URL;
mongoose.connect(dbAddress, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Routes
const app = require('./routes/api');
const posts = require('./routes/api/posts/PostsService');
const auth = require('./routes/api/auth/AuthService');
const facebook = require('./routes/api/auth/FacebookService');
const user = require('./routes/api/auth/UserService');

server.use('/api', app);
server.use('/api/posts', posts);
server.use('/api/auth', auth);
server.use('/api/auth/facebook', facebook);
server.use('/api/user', user);

if (process.env.NODE_ENV !== 'production') {
  server.get('/', (req, res) => res.redirect('http://localhost:8080/login'));
  server.get('/dashboard', (req, res) => res.redirect('http://localhost:8080/dashboard'));
  server.get('/login', (req, res) => res.redirect('http://localhost:8080/login'));
}

if (process.env.NODE_ENV === 'production') {
  // Static folder
  server.use(express.static(__dirname + '/public'));
  // Handle SPA
  server.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
  server.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started at port ${port}`)
});
