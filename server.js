const express = require("express");
const app = express();
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(require("./routes"));

//here or /config/connection.js?
db.set("debug", true);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Connected on localhost:${PORT}`);
    });
});