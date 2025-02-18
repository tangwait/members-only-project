const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRouter");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");


app.use(session({
    secret: "cats",  
    resave: false,  
    saveUninitialized: false,  
    cookie: { secure: false, maxAge: 1000 * 60 * 60 } 
}));
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);
app.use(express.static("public"));


app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});