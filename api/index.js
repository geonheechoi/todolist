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

const jwt = require("jsonwebtoken");
mongoose
  .connect(
    "mongodb+srv://geonheechoi:geonheechoi@cluster0.ynq9tfg.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Error connecting to mongodb", err);
  });

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

const User = require("./models/user");
const Todo = require("./models/todo");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email already exists");
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(200).json({ message: "register success" });
  } catch (err) {
    console.log("error registe", err);
    res.status(500).json({ message: "register error" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json(token);
  } catch (err) {
    console.log("error login", err);
    res.status(500).json({ message: "login error" });
  }
});
