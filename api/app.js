const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");

// Environment Variables
const dotenv = require("dotenv");
dotenv.config();

// Middleware
const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(cookieParser());
server.use(passport.initialize());

// Connect to Mongo
const dbAddress = process.env.MONGO_URL;
mongoose
  .connect(dbAddress, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

// Routes
const app = require("./src/modules");
const posts = require("./src/modules/posts/PostsService");
const auth = require("./src/modules/auth/auth.service");
const facebook = require("./src/modules/auth/facebook.service");
// TODO : Update Google Auth
// const google = require('./routes/api/auth/googleplus.service');
const user = require("./src/modules/auth/user.service");

server.use("/api", app);
server.use("/api/posts", posts);
server.use("/api/auth", auth);
server.use("/api/auth/facebook", facebook);
// TODO : Update Google Auth
// server.use('/api/auth/google', google);
server.use("/api/user", user);

if (process.env.NODE_ENV === "production") {
  // Static folder
  server.use(express.static(__dirname + "/public"));
  // Handle SPA
  server.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
  server.get(/.*/, (req, res) =>
    res.sendFile(__dirname + "/public/index.html")
  );
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
