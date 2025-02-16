const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRouter");
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);
app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});