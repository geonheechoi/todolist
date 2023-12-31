const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect("mongodb+srv://geonheechoi:geonheechoi@cluster0.ynq9tfg.mongodb.net/")
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch((err) => {
        console.log("Error connecting to mongodb", err);
    });

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
