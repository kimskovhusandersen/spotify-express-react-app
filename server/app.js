require("dotenv").config();
const cors = require("cors");
const http = require("http");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const express = require("express");
const path = require("path");
const reload = require("reload");
const es6Renderer = require("express-es6-template-engine");
const qs = require("querystring");
const cookieParser = cookieSession({
  secret: process.env.SESSION_SECRET,
  maxAge: 1000 * 60 * 60 * 24 * 90,
});
const packageJson = require("../package.json");
const apiRoutes = require("./api");
const app = express();
const server = http.createServer(app);

// view engine setup
app.engine("html", es6Renderer);
app.set("views", path.resolve(__dirname, "../build/"));
app.set("view engine", "html");

app
  .use(
    packageJson.homepage,
    express.static(path.join(__dirname, "..", "build"), {
      index: false,
    })
  )
  .use(cors())
  .use(cookieParser)
  .use(express.json())
  .use(csurf())
  .use(function (req, res, next) {
    res.cookie("csrfToken", req.csrfToken());
    next();
  })
  .use(`${packageJson.homepage}api`, apiRoutes);

// Wire up reload behavior if app is not running in production mode
if (process.env.NODE_ENV !== "production") {
  reload(app);
}

app.get("/login", (req, res) => {
  if (!req.session.access_token && !req.query.access_token) {
    return res.redirect(
      "https://accounts.spotify.com/authorize?" +
        qs.stringify({
          response_type: "code",
          client_id: process.env.CLIENT_ID,
          scope:
            "user-read-recently-played user-read-private user-read-email user-read-playback-state user-top-read",
          redirect_uri: process.env.REDIRECT_URI,
        })
    );
  }
  return res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session = null;
  return res.redirect("/");
});

// For all requests besides /api, server the index template based on create-react-app's public/index.html file
app.get("*", (req, res) => {
  if (req.session.expires_in < Date.now()) {
    return res.redirect("/login");
  }
  if (!req.session.access_token && !req.query.access_token) {
    return res.sendFile(path.join(__dirname, "login.html"));
  }

  if (
    req.query.access_token &&
    req.query.refresh_token &&
    req.query.expires_in
  ) {
    req.session.access_token = req.query.access_token;
    req.session.refresh_token = req.query.refresh_token;
    req.session.expires_in = Date.now() + req.query.expires_in * 1000 - 5000;
  }

  res.render("index");
});

server.listen(3000, () => console.log("App is running on localhost:3000"));
