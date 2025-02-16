const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRouter");




app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);
app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});