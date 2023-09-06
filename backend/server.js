const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const session = require("express-session");
const port = process.env.PORT || 3001;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// const authenticate = require("./middleware");
// app.use(authenticate);
app.use(
  session({
    secret: "chitawankhabar",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const userInfo = require("./login/User");
const post = require("./posts/post");
const ads = require("./ads/ads");

app.use(express.static(path.join(__dirname, "public")));
require("./mongoDB/Connection");
app.use("/", userInfo);
app.use("/post", post);
app.use("/ads", ads);

app.listen(port, () => {
  console.log("App is running in port ", port);
});
